import { Language } from '../language';
import { DefaultMap } from '../utils/default-map';
import { WiktionaryEdition } from '../wiktionary/wiktionary-edition';
import { PronunciationSource, WordPronunciation } from './pronunciation-source';

type BlocklistEntry = [
  edition: `${WiktionaryEdition}`,
  language: Language,
  word: string,
  pronunciation: string,
];

// This is a list of known bad Wiktionary entries.
const blocklist: BlocklistEntry[] = [
  //////////////////////////////////////////////////////////////////////////////
  // Not fixed in Wiktionary

  //////////////////////////////////////////////////////////////////////////////
  // Fixed in Wiktionary, but not yet part of a dump

  ['en', 'en', 'have', '/ə/'],

  //////////////////////////////////////////////////////////////////////////////
  // Unclear how to fix in Wiktionary

  ['fr', 'en', 'beuk', 'ut'],

  //////////////////////////////////////////////////////////////////////////////
  // Not fixable in Wiktionary
];

export class BlocklistingPronunciationSource implements PronunciationSource {
  // An efficient copy of the edition-relevant part of the blocklist
  private blockSet = new DefaultMap(
    (_language: Language) =>
      new DefaultMap((_word: string) => new Set<string>()),
  );

  constructor(private source: PronunciationSource) {
    for (const [edition, language, word, pronunciation] of blocklist) {
      if (edition === source.edition) {
        this.blockSet
          .getOrCreate(language)
          .getOrCreate(word)
          .add(pronunciation);
      }
    }
  }

  get edition() {
    return this.source.edition;
  }

  async *getPronunciations(): AsyncIterable<WordPronunciation> {
    for await (const wordPronunciation of this.source.getPronunciations()) {
      const blocked = this.blockSet
        .get(wordPronunciation.language)
        ?.get(wordPronunciation.word)
        ?.has(wordPronunciation.pronunciation);
      if (!blocked) yield wordPronunciation;
    }
  }
}
