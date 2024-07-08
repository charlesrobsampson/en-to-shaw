const compounds = {
    'ɑ ɹ': '𐑸',
    'ɔ ɹ': '𐑹',
    'ɛ ə ɹ': '𐑺',
    'ɜ ɹ': '𐑻',
    'ə ɹ': '𐑼',
    'i ə ɹ': '𐑽',
    'ɪ ɹ': '𐑽',
    'i ə': '𐑾',
    'j u': '𐑿'
};

const dbls = {
    't ʃ': '𐑗',
    'd ʒ': '𐑡',
    'e ɪ': '𐑱',
    'a ɪ': '𐑲',
    'ə ʊ': '𐑴',
    'a ʊ': '𐑬',
    'æ w': '𐑬',
    'ɔ ɪ': '𐑶',
};

const sngls = {
    p: '𐑐',
    b: '𐑚',
    t: '𐑑',
    d: '𐑛',
    k: '𐑒',
    g: '𐑜',
    ɡ: '𐑜',
    f: '𐑓',
    v: '𐑝',
    θ: '𐑔',
    ð: '𐑞',
    s: '𐑕',
    z: '𐑟',
    ʃ: '𐑖',
    ʒ: '𐑠',
    j: '𐑘',
    w: '𐑢',
    ŋ: '𐑙',
    h: '𐑣',
    l: '𐑤',
    ɹ: '𐑮',
    m: '𐑥',
    n: '𐑯',
    ɪ: '𐑦',
    i: '𐑰',
    ɛ: '𐑧',
    e: '𐑧',
    æ: '𐑨',
    ə: '𐑩',// pretty much matches a
    ɜ: '𐑩',
    a: '𐑳',// pretty much matches ə
    ɔ: '𐑪',// pretty much same as ɑ
    ʊ: '𐑫',
    u: '𐑵',
    ɑ: '𐑭',// pretty much same as ɔ
    ɒ: '𐑷'
};

const fixedWords = {
    the: '𐑞',
    to: '𐑑',
    and: '𐑯',
    you: '𐑿'
};

const proToShaw = {
    ...sngls,
    ...dbls,
    ...compounds
};

const shawTogroup = {
};

module.exports = {
    compounds,
    dbls,
    sngls,
    proToShaw,
    fixedWords
};