const compounds = {
    'ɑ ɹ': '𐑸',
    'ɔ ɹ': '𐑹',
    'ɛ ə ɹ': '𐑺',
    'ɛ ɹ': '𐑺',
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
    'æ ɪ': '𐑱',
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
    you: '𐑿',
    of: '𐑝',
};

const proToShaw = {
    ...sngls,
    ...dbls,
    ...compounds
};

const lmh = {
    0: 'low',
    1: 'mid',
    2: 'high',
    3: 'top',
};

const groups = {
    0: 'smooth',
    1: 'rough',
    2: 'buzzer',
    3: 'blip',
};

const shawToGroup = {
    𐑐: {
        group: 1,
        pattern: '2'
    },
    𐑚: {
        group: 1,
        pattern: '0'
    },
    𐑑: {
        group: 2,
        pattern: '2'
    },
    𐑛: {
        group: 2,
        pattern: '0'
    },
    𐑒: {
        group: 2,
        pattern: '0 1 2'
    },
    𐑜: {
        group: 2,
        pattern: '2 1 0'
    },
    𐑓: {
        group: 0,
        pattern: '1 0 2'
    },
    𐑝: {
        group: 0,
        pattern: '2 0 1'
    },
    𐑔: {
        group: 2,
        pattern: '1 0 2'
    },
    𐑞: {
        group: 2,
        pattern: '2 0 1'
    },
    𐑕: {
        group: 0,
        pattern: '2 0'
    },
    𐑟: {
        group: 0,
        pattern: '0 2'
    },
    𐑖: {
        group: 1,
        pattern: '1 2 0'
    },
    𐑠: {
        group: 2,
        pattern: '1 2 0'
    },
    𐑗: {
        group: 1,
        pattern: '0 2'
    },
    𐑡: {
        group: 1,
        pattern: '2 0'
    },
    𐑘: {
        group: 0,
        pattern: '2 1 0'
    },
    𐑢: {
        group: 0,
        pattern: '0 1 2'
    },
    𐑙: {
        group: 2,
        pattern: '2 0 2'
    },
    𐑣: {
        group: 2,
        pattern: '0 2 0'
    },
    𐑤: {
        group: 0,
        pattern: '0 2 1'
    },
    𐑮: {
        group: 2,
        pattern: '0 2 1'
    },
    𐑥: {
        group: 0,
        pattern: '0 1'
    },
    𐑯: {
        group: 0,
        pattern: '1 0'
    },
    𐑦: {
        group: 0,
        pattern: '0'
    },
    𐑰: {
        group: 0,
        pattern: '2'
    },
    𐑧: {
        group: 0,
        pattern: '2 3'
    },
    𐑱: {
        group: 0,
        pattern: '0 2 0'
    },
    𐑨: {
        group: 0,
        pattern: '3 2'
    },
    𐑲: {
        group: 0,
        pattern: '2 0 2'
    },
    𐑩: {
        group: 3,
        pattern: '1 1'
    },
    𐑳: {
        group: 3,
        pattern: '1 1'
    },
    𐑪: {
        group: 3,
        pattern: '0 0'
    },
    𐑴: {
        group: 1,
        pattern: '1 0'
    },
    𐑫: {
        group: 2,
        pattern: '2 0'
    },
    𐑵: {
        group: 2,
        pattern: '0 2'
    },
    𐑬: {
        group: 2,
        pattern: '1 0'
    },
    𐑶: {
        group: 2,
        pattern: '0 1'
    },
    𐑭: {
        group: 3,
        pattern: '0 0'
    },
    𐑷: {
        group: 3,
        pattern: '0 0'
    },
    𐑸: {
        group: 1,
        pattern: '2 0 2'
    },
    𐑹: {
        group: 1,
        pattern: '0 1 2'
    },
    𐑺: {
        group: 1,
        pattern: '2 1 0'
    },
    𐑻: {
        group: 1,
        pattern: '0 2 1'
    },
    𐑼: {
        group: 1,
        pattern: '1 0 2'
    },
    𐑽: {
        group: 1,
        pattern: '2 0 1'
    },
    𐑾: {
        group: 1,
        pattern: '3 2'
    },
    𐑿: {
        group: 0,
        pattern: '1 2 0'
    }
};

module.exports = {
    compounds,
    dbls,
    sngls,
    proToShaw,
    fixedWords,
    shawToGroup,
    lmh,
    groups
};