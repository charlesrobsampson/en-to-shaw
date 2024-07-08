const en = require('./dictionaries/dictionaries/en.json');
const toAppend = require('./appendedWords.json');
const maps = require('./maps');

const enPronunciations = {
    ...en,
    ...toAppend
};

const diffAvoid = 2;

function pronounce(word) {
    let pronunciation = enPronunciations[word.toLowerCase()];
    if (!pronunciation) {
        console.error(`no pronunciation found for word ${word}`);
        return [word];
    }
    return pronunciation;
}

function sentence(sentence) {
    return sentence.map(pronounce);
}

function toShaw(word, useCompounds = false) {
    if (maps.fixedWords[word]) {
        return maps.fixedWords[word];
    }
    let shaw = '';
    let p = pronounce(word);
    let pronunciation = p[0];
    let filtered = [];
    if (p.length > 1) {
        let closest = {};
        var rcount = (word.match(/r/g) || []).length;
        if (rcount >= 1) {
            let rdiff = -1;
            let best = 0;
            p.forEach((p, i) => {
                let prct = (p.match(/ɹ/g) || []).length;
                let diff = Math.abs(rcount - prct);
                if (rdiff === -1) {
                    rdiff = diff;
                    closest[rdiff] = [p];
                } else {
                    if (diff < rdiff) {
                        rdiff = diff;
                        best = i;
                        closest[rdiff] = [p];
                    } else if (diff === rdiff) {
                        closest[rdiff].push(p);
                    }
                }
            });
            p = closest[rdiff];
            closest = {};
        }
        // find match with closest number of letters
        let ldiff = -1;
        let best = 0;
        p.forEach((p, i) => {
            const plen = p.split(' ').length;
            const wlen = word.length;
            let diff = Math.abs(plen - wlen);
            if (diff < diffAvoid) {
                filtered.push(p);
            }
            if (ldiff === -1) {
                ldiff = diff;
                closest[ldiff] = [p];
            } else {
                if (diff < ldiff) {
                    closest [ldiff] = [p];
                    ldiff = diff;
                    best = i;
                } else if (diff === ldiff) {
                    if (closest[ldiff]) {
                        closest[ldiff].push(p);
                    } else {
                        closest[ldiff] = [p];
                    }
                }
            }
        });
        if (filtered.length === 0) {
            p = closest[ldiff];
        } else {
            p = filtered;
        }
        pronunciation = p.length > 1? p[1] : p[0];
    }

    // first get compounds
    if (useCompounds) {
        const compounds = Object.keys(maps.compounds);
        compounds.forEach(c => {
            while (pronunciation.indexOf(c) > -1) {
                pronunciation = pronunciation.replace(c, maps.compounds[c]);
            }
        });
    }
    // then get doubles
    const dbls = Object.keys(maps.dbls);
    dbls.forEach(d => {
        while (pronunciation.indexOf(d) > -1) {
            pronunciation = pronunciation.replace(d, maps.dbls[d]);
        }
    });
    // then get single letters
    pronunciation.split(' ').forEach(l => {
        if (maps.sngls[l]) {
            shaw += maps.sngls[l] +'';
        } else {
            shaw += l +'';
        }
    });
    return shaw;
}

function toShawSentence(sentence, useCompounds = false) {
    return sentence.map(w => toShaw(w, useCompounds)).join(' ');
}

module.exports = {
    sentence,
    toShawSentence
};