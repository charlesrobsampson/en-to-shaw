import { getAlpha2Code } from '@cospired/i18n-iso-languages';
import { Language } from '../language';
import {
  findTemplates,
  parseWiktionaryPage,
  isHeading,
} from '../wiktionary/wiktionary-page-parser';
import { WiktionaryEdition } from '../wiktionary/wiktionary-edition';
import { PronunciationSource, WordPronunciation } from './pronunciation-source';
import {
  parseWiktionaryDump,
  WiktionaryPage,
} from '../wiktionary/wiktionary-dump-parser';
import { decodeXML } from 'entities';
import { log } from '../issue-logging';
import {
  MismatchingRedundantWordInfoIssue,
  PronunciationOutsideOfLanguageSectionIssue,
  PronunciationOutsideOfPronunciationSectionIssue,
  UnexpectedLanguageLineFormatIssue,
  UnexpectedPronunciationLineFormatIssue,
  MissingTemplateArgumentIssue,
  UnsupportedLanguageNameIssue,
} from './pronunciation-retrieval-issues';

// prettier-ignore
const languageAliases = new Map<string, Language>([
  ['Thai', 'th'],               // alias for 'Thailändisch'
  ['Neugriechisch', 'el'],      // alias for 'Griechisch'
  ['Pandschabi', 'pa'],         // alias for 'Panjabi'
  ['Scots', 'en'],              // variety of English
  ['Suaheli', 'sw'],            // alias for 'Swahili'
  ['Westfriesisch', 'fy'],      // alias for 'Friesisch'
].map(([name, language]) => [name.toLowerCase(), language]));

// prettier-ignore
const ignoredLanguageNames = new Set<string>([
  'akkadisch',                      // dead
  'altenglisch',                    // dead
  'altgriechisch',                  // dead
  'asturisch',                      // no ISO 639-1 code
  'balinesisch',                    // no ISO 639-1 code
  'faliskisch',                     // dead
  'friaulisch',                     // no ISO 639-1 code
  'frühneuhochdeutsch',             // dead
  'gotisch',                        // dead
  'hawaiianisch',                   // no ISO 639-1 code
  'huastekisches zentral-nahuatl',  // no ISO 639-1 code
  'international',                  // not a language
  'klassisches nahuatl',            // dead
  'krimtatarisch',                  // no ISO 639-1 code
  'lettgallisch',                   // dead
  'mittelhochdeutsch',              // dead
  'niederdeutsch',                  // no ISO 639-1 code
  'niedersorbisch',                 // no ISO 639-1 code
  'obersorbisch',                   // no ISO 639-1 code
  'papiamentu',                     // no ISO 639-1 code
  'prußisch',                       // no ISO 639-1 code
  'sumerisch',                      // dead
  'südpikenisch',                   // dead
  'umschrift',                      // not a language
  'venezianisch',                   // no ISO 639-1 code
  'zentral-nahuatl',                // no ISO 639-1 code
]);

function parseGermanLanguageName(languageName: string): Language | null {
  return (
    getAlpha2Code(languageName, 'de') ??
    languageAliases.get(languageName.toLowerCase()) ??
    null
  );
}

function removeAccents(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function removeMarkup(value: string): string {
  return decodeXML(value)
    .replace(/®|\{\{\(R\)\}\}|\[|\]/g, '')
    .trim();
}

async function* getPronunciationsFromPage(
  page: WiktionaryPage,
): AsyncIterable<WordPronunciation> {
  if (page.isSpecial) return;

  const Invalid = Symbol();

  let language: Language | null | typeof Invalid = null;
  let inPronunciationBlock = false;

  for (const line of parseWiktionaryPage(page)) {
    if (isHeading(line)) {
      // heading

      inPronunciationBlock = false;

      if (line.level === 2) {
        // expecting word (redundantly) and language

        language = Invalid;

        const regex = /^(.+)\(\{\{Sprache\|([^}]+)\}\}\)$/;
        const match = line.title.match(regex);
        if (!match) {
          log(new UnexpectedLanguageLineFormatIssue(line));
        } else {
          const redundantWord = match[1].trim();
          if (
            removeMarkup(removeAccents(redundantWord)) !==
            removeAccents(page.title)
          ) {
            // The redundant word is fundamentally different from the page title
            log(new MismatchingRedundantWordInfoIssue(line));
          } else {
            const languageName = match[2].trim();
            if (!ignoredLanguageNames.has(languageName.toLowerCase())) {
              const newLanguage = parseGermanLanguageName(languageName);
              if (newLanguage === null) {
                log(new UnsupportedLanguageNameIssue(languageName, line));
              } else {
                language = newLanguage;
              }
            }
          }
        }
      }
    } else {
      // content line

      if (line.text === '{{Aussprache}}') {
        inPronunciationBlock = true;
      } else if (!line.text.startsWith(':')) {
        inPronunciationBlock = false;
      }

      // Parse pronunciation information
      if (line.text.includes('{{Lautschrift')) {
        if (!inPronunciationBlock) {
          log(new PronunciationOutsideOfPronunciationSectionIssue(line));
        } else if (language === null) {
          log(new PronunciationOutsideOfLanguageSectionIssue(line));
        } else if (language === Invalid) {
          // No need to yield another error
        } else if (!line.text.startsWith(':{{IPA}}')) {
          log(new UnexpectedPronunciationLineFormatIssue(line));
        } else {
          // Stop parsing the line once pronunciations get prefixed with qualifiers such as "plural"
          const unqualifiedText =
            line.text.match(
              /:\{\{IPA\}\}\s*(\{\{Lautschrift\|.*?\}\},?\s*)*/,
            )?.[0] ?? '';
          const pronunciationTemplates = findTemplates(
            'Lautschrift',
            ['pronunciation'],
            unqualifiedText,
          );

          for (const template of pronunciationTemplates) {
            const { pronunciation } = template;
            if (pronunciation === undefined) {
              log(
                new MissingTemplateArgumentIssue(
                  template,
                  'pronunciation',
                  line,
                ),
              );
              continue;
            }

            if (pronunciation.length === 0) {
              // Some articles contain empty pronunciation placeholders
              continue;
            }

            yield {
              sourceEdition: page.edition,
              language,
              word: page.title,
              pronunciation,
            };
          }
        }
      }
    }
  }
}

export const pronunciationSourceWiktionaryDe: PronunciationSource = {
  edition: WiktionaryEdition.German,
  getPronunciations: async function* () {
    for await (const page of parseWiktionaryDump(WiktionaryEdition.German)) {
      yield* getPronunciationsFromPage(page);
    }
  },
};
