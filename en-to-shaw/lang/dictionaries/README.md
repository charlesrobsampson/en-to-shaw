# WikiPronunciationDict


WikiPronunciationDict is a multilingual pronunciation dictionary for English, French, German, and Italian, based on data from Wiktionary, the free dictionary. A pronunciation dictionary (also called *pronouncing dictionary* or *phonetic dictionary*) contains a list of vocabulary words along with their pronunciations.

WikiPronunciationDict is free, machine-readable, and can be used in speech processing tasks such as automated speech recognition (ASR).

The following chart shows the current number of dictionary words for each supported language.

![Dictionary sizes in words](https://quickchart.io/chart?c=%7Btype%3A%27bar%27%2Cdata%3A%7Blabels%3A%5B%27English%27%2C%27French%27%2C%27German%27%2C%27Italian%27%5D%2Cdatasets%3A%5B%7Bdata%3A%5B69588%2C1362197%2C636901%2C91307%5D%7D%5D%7D%2Coptions%3A%7Blegend%3A%7Bdisplay%3Afalse%7D%2Ctitle%3A%7Bdisplay%3Atrue%2Ctext%3A%27Dictionary+sizes+in+words%27%7D%2Cplugins%3A%7Bdatalabels%3A%7Bcolor%3A%27white%27%7D%7D%7D%7D&w=500&h=300&bkg=%23ffffff&f=svg)

## Where to get the dictionary files

There are several ways of getting the WikiPronunciationDict dictionary files.

### Downloading from GitHub

All dictionary files are hosted on GitHub at `https://github.com/DanielSWolf/wiki-pronunciation-dict/raw/<version>/dictionaries/<file>`. For instance, you can find the latest English data file at https://github.com/DanielSWolf/wiki-pronunciation-dict/raw/main/dictionaries/en.json.

### Cloning using Git

The dictionary files are part of the Git repository. After cloning the repository from https://github.com/DanielSWolf/wiki-pronunciation-dict.git, you'll find all dictionary files in the */dictionaries* directory.

### Using NPM

If you're using Node.js, add a dependency to `wiki-pronunciation-dict` to your package. You can then load the files using the `require` function. For instance, the following statement will give you an object containing all English word pronunciations:

```js
const englishPronunciations = require('wiki-pronunciation-dict/dictionaries/en.json');
```

## File organization

The dictionary files are organized as follows:

```text
dictionaries/
├── de.json
├── de-metadata.json
├── en.json
├── en-metadata.json
└── ...
```

For every supported language, there are two files: a *data file* named *&lt;language&gt;.json* containing the actual pronunciations and a *metadata file* named *&lt;language&gt;-metadata.json* with information about that language. In either case, *&lt;language&gt;* is the [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) code of the language in question: `"de"` for German, `"en"` for English, and so on.

Let's look at these two types of files.

### Data files

The following is an extract from the German data file:

*de.json*
```yaml
{
  "’n": ["ə n", "n"],
  "’naus": ["n a ʊ s"],
  "’ndrangheta": ["n d ʀ a ŋ ɡ e t a"],
  "’ne": ["n ə"],
  ...
  "honig": ["h o n ɪ ç", "h o n ɪ k"],
  "honigbär": ["h o n ɪ ç b e ɐ", "h o n ɪ ç b ɛ ɐ", "h o n ɪ k b ɛ ɐ"],
  "honigbiene": ["h o n ɪ ç b i n ə", "h o n ɪ k b i n ə"],
  "honigbienen": ["h o n ɪ ç b i n ə n"],
  ...
  "zytotropes": ["t s y t o t ʀ o p ə s"],
  "zytozentren": ["t s y t o t s ɛ n t ʀ ə n"],
  "zytozentrum": ["t s y t o t s ɛ n t ʀ ʊ m"],
  "zytozentrums": ["t s y t o t s ɛ n t ʀ ʊ m s"]
}
```

Each data file contains a single large JSON object with key/value entries. Each entry contains the spelling of a word, followed by one or more pronunciations. The entries are ordered alphabetically by the spelling of the word, taking into account the sorting rules of the language in question.

The *spelling* of each word is given as a string consisting entirely of the graphemes listed in the corresponding metadata file (see the [next section](#metadata-files)).

The *pronunciations* for a word are given as an array of one or more items. To simplify processing, phonemes are separated by space characters. This is a common format for pronunciation dictionaries and should allow you to easily transform the data to the formats expected by various speech-related tools. Only the phonemes listed in the corresponding metadata file (see the [next section](#metadata-files)) are used. If there are multiple pronunciations for a given word, they are ordered by the IPA numbers of their constituent phonemes.

### Metadata files

The following is a shortened version of the German metadata file:

*de-metadata.json*
```yaml
{
  "language": "de",
  "languageName": "German",
  "graphemes": ["’", "a", "ä", "b", "c", "d", "e", "é", "è", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ß", "t", "u", "ü", "v", "w", "x", "y", "z"],
  "phonemes": ["a", "ɐ", "b", "ç", "d", "e", "ə", "ɛ", "f", "ɡ", "h", "i", "ɪ", "j", "k", "l", "m", "n", "ŋ", "o", "ø", "œ", "ɔ", "p", "ʀ", "s", "ʃ", "t", "u", "ʊ", "v", "x", "y", "ʏ", "z", "ʒ"],
  "graphemeDistribution": {
    "e": 1304401,
    "n": 628926,
    "r": 609023,
    "s": 578426,
    "t": 564335,
    ...
  "phonemeDistribution": {
    "t": 711284,
    "n": 587828,
    "ə": 558426,
    "a": 491716,
    "s": 470862,
    ...
  }
}
```

Let's consider each property in turn.

| Property | Description |
|---|---|
| `language` | The ISO 639-1 code of the language in question. This is identical with the first part of the file name. |
| `languageName` | The English name of the language. |
| `graphemes` | A list of all *graphemes* used in the language. Basically, graphemes are letters and letter-like characters. In this example, you can see that the German language uses the letters `"a"` through `"z"`, the apostrophe, three umlauts (`"ä"`, `"ö"`, and `"ü"`), and the eszett `"ß"`. All words in a given data file use only the graphemes listed in the corresponding metadata file. See below for details on how the graphemes for each language were chosen. <br/> &emsp; In the metadata file, the graphemes are ordered alphabetically according to the sorting rules of the language in question. The German metadata file uses German sorting rules, which is why the `"ß"` is positioned immediately after the regular `"s"`. |
| `phonemes` | A list of all *phonemes* used in the language. A phoneme is a group of similar, interchangeable sounds within a given language. All pronunciations in a given data file use only the phonemes listed in the corresponding metadata file. All phonemes use [IPA notation](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet). [See below](#choice-of-graphemes-and-phonemes) for details on how the phonemes for each language were chosen. <br/> &emsp; The phonemes in the metadata file are ordered by their IPA numbers. With few exceptions, this is the order in which they appear on the official IPA chart. |
| `graphemeDistribution` | The number of occurrences for each grapheme in the corresponding data file, in descending order. In this example, you can see that `"e"` is by far the most frequently-used German letter, followed by `"n"`, and so on. |
| `phonemeDistribution` | The number of occurrences for each phoneme in the corresponding data file, in descending order. In this example, you can see that the most common sound in the German pronunciation dictionary is the *voiceless alveolar plosive* `"t"`, followed by the *voiced alveolar nasal* `"n"`, and so on. |

## Building new dictionaries from the latest Wiktionary data

In this section, I'll describe how you can run the extraction process yourself rather than using the existing dictionary files.

WikiPronunciationDict is a Node.js package. Make sure you have a recent version of Node.js installed (I'm using version 15.7.0), then follow these steps:

1. Clone the Git repository.
1. From the *wiki-pronunciation-dict* directory, run `npm install` or -- if you're using Yarn -- `yarn` to install all library dependencies.
1. Run `npm run build` or `yarn build`.

Running the build script will perform the following steps:

1. For every supported edition of Wiktionary:
   1. The latest official dump file is downloaded to the */downloads* directory. This step is skipped if the file already exists.
   1. The raw pronunciations are extracted from the dump file and saved in an edition-specific file in the */cache* directory. This step is skipped if such a file already exists.
1. Raw pronunciation information is collected from all editions and processed as described below.
1. The dictionary files are re-created.
1. HTML log files are created with information about any non-fatal issues that occurred during the build.
1. This README file is updated with the latest figures.

The first run of the build script may take some time, depending on the speed of your internet connection and your computer. Due to the two-step caching in the */downloads* and */cache* directories, subsequent builds will run much faster.

To re-download and extract the latest Wiktionary dumps, delete the appropriate files from **both** the */downloads* and the */cache* directory (or delete both directories). If you've made any changes to the extraction code and want to re-extract the existing dump files, delete the appropriate files from the */cache* directory only (or delete the full */cache* directory).

**Note:** I've done my best to reduce the memory consumption of the build script, but you may still run into an out-of-memory error. If that happens, just run the build script again. It will pick up the cache files created during the first run. Because *loading* cache files takes a lot less memory than parsing Wiktionary dumps to create them, the script should finish successfully on the second attempt.

## Technical details

### Pronunciation sources

There are many language-specific editions of Wiktionary: the English edition ([en.wiktionary.org](https://en.wiktionary.org)), where words are explained in English; the German edition ([de.wiktionary.org](https://de.wiktionary.org)), where explanations are in German; and so on. What's important to know is that each of these editions covers not only a single language, but potentially *all* languages. For instance, the German word *Rhabarber* (rhubarb) is covered not only in the [German edition](https://de.wiktionary.org/wiki/Rhabarber) of Wiktionary, but also in the [English edition](https://en.wiktionary.org/wiki/Rhabarber), in the [French edition](https://fr.wiktionary.org/wiki/Rhabarber), and in several others.

This has two implications. First, it is possible to create pronunciation dictionaries for many languages by parsing a single edition of Wiktionary. For existing projects that do this, [see below](#similar-projects). Second, in order to obtain the largest possible pronunciation vocabulary, it makes sense to parse multiple editions of Wiktionary and to combine the results. This is what WikiPronunciationDict does. The following chart shows the number of raw pronunciations per target language that WikiPronunciationDict extracts from the various editions of Wiktionary.

![Source distribution](https://quickchart.io/chart?c=%7Btype%3A%27bar%27%2Cdata%3A%7Blabels%3A%5B%27English%27%2C%27French%27%2C%27German%27%2C%27Italian%27%5D%2Cdatasets%3A%5B%7Blabel%3A%27en.wiktionary.org%27%2Cdata%3A%5B157347%2C75829%2C57052%2C30049%5D%7D%2C%7Blabel%3A%27fr.wiktionary.org%27%2Cdata%3A%5B53968%2C1634556%2C21867%2C73625%5D%7D%2C%7Blabel%3A%27de.wiktionary.org%27%2Cdata%3A%5B6447%2C12264%2C786186%2C3016%5D%7D%2C%7Blabel%3A%27it.wiktionary.org%27%2Cdata%3A%5B3174%2C18379%2C818%2C36433%5D%7D%5D%7D%2Coptions%3A%7Btitle%3A%7Bdisplay%3Atrue%2Ctext%3A%27Source+distribution%27%7D%2Cscales%3A%7BxAxes%3A%5B%7Bstacked%3Atrue%7D%5D%2CyAxes%3A%5B%7Bstacked%3Atrue%2Cticks%3A%7Bdisplay%3Afalse%7D%7D%5D%7D%7D%7D&w=500&h=300&bkg=%23ffffff&f=svg)

As you can see, incorporating pronunciations from additional editions of Wiktionary drastically improved the vocabulary size for some languages, such as Italian.

WikiPronunciationDict uses custom code to download the Wiktionary dump files, to parse the Wikitext code within, and to extract word pronunciations. This is complicated by the fact that each edition of Wiktionary uses a different template syntax and thus requires specialized extraction code.

The English edition of Wiktionary is a special case. It makes liberate use of Lua scripts to automatically generate pronunciations where possible. Fully scraping its content requires not only clever parsing, but also a lot of work to evaluate the Lua scripts. Fortunately, the excellent [Wiktextract](https://github.com/tatuylonen/wiktextract) project has already implemented all of that. So WikiPronunciationDict uses Wiktextract internally to parse the English edition of Wiktionary.

### Choice of graphemes and phonemes

I manually assembled the sets of graphemes and phonemes for each language.

For the graphemes, my goal was to keep the set small, while still including all relevant graphemes not just for native words, but also for common foreign words. During extraction, WikiPronunciationDict creates a number of statistics, allowing me to select the most common graphemes while discarding less common ones. When in doubt, I researched the orthography of the language in question to allow an informed decision.

All graphemes were converted to lower case using the appropriate rules for the language in question.

For the phonemes, my goal was again to keep the sets as small as possible without losing relevant nuances. Wherever possible, I used plain IPA symbols without diacritics or suprasegmentals. In developing these sets, I relied heavily on the [PHOIBLE repository](https://phoible.org/). For each common language, it contains multiple phoneme sets that were created by linguists. For each language, I created a custom phoneme set combining PHOIBLE data with phoneme statistics generated by WikiPronunciationDict.

### Normalization of word spellings and pronunciations

Once the raw word spellings and pronunciations are extracted from Wiktionary, WikiPronunciationDict performs a number of steps to bring them into a consistent form.

Word spellings are processed using the following steps.

1. The word is converted to lower case using language-specific rules.
1. If the word is a prefix (ending with "-", such as "un-") or a suffix (starting with "-", such as "-ed"), it is dropped.
1. The word is split into language-specific graphemes using a language-specific list of parser rules I created. These include substitution rules and rules for silently dropping words containing certain substrings, such as whitespace. If the word contains character sequences not covered by such a rule, it is dropped.

Pronunciations are processed using the following steps. If any step fails, the pronunciation is dropped.

1. If the pronunciation is empty or a placeholder such as "…", it is dropped.
1. If the pronunciation is a prefix (ending with "-") or a suffix (starting with "-"), it is dropped.
1. If the pronunciation contains optional parts in parentheses (such as /ˈmɛm(ə)ɹi/), it is split into one version with and one without the optional parts, then the remaining steps are performed for both versions.
1. A custom IPA parser is used to convert the pronunciation string into a structured list of IPA letters with associated flags based on diacritics and suprasegmentals. The parser includes rules for uncommon or obsolete IPA symbols as well as invalid symbols that are visually similar to valid IPA symbols.
1. The parsed phonemes are converted into language-specific phonemes using a language-specific list of rules I created. These include phoneme substitution rules. If the pronunciation contains sequences not covered by such a rule, it is dropped.

## Similar projects

There are many other projects that attempt to extract some form of structured data from Wiktionary. As far as I'm aware, only two of them generate pronunciation dictionaries.

### WikiPron

[WikiPron](https://pypi.org/project/wikipron/) is the companion code project to the 2020 paper [Massively Multilingual Pronunciation Modeling with WikiPron](https://www.aclweb.org/anthology/2020.lrec-1.521/). It performs sophisticated postprocessing to ensure consistent and reliable output. Besides the code for extracting data from Wiktionary, the maintainers also publish pre-extracted data files and even ready-to-use G2P models.

In contrast to WikiPronunciationDict, WikiPron only uses the English edition of Wiktionary, yielding fewer pronunciations per language.

### wikt2pron

[wikt2pron](https://github.com/abuccts/wikt2pron) was developed as part of the Google Summer of Code 2017 with support from the CMU Sphinx community. As with WikiPron, you can download not only the scripts but also pre-extracted data files and models. Also like WikiPron, it only uses the English edition of Wiktionary, yielding fewer pronunciations than WikiPronunciationDict.
