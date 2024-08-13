const convert = require('./index');

const args = process.argv.splice(2);
let shawString = [];
args.forEach(arg => {
    const uchar = '\ud801';
    const chars = [];
    const s = arg.split(uchar);
    let word = '';
    s.forEach(c => {
        if (c.length > 0) {
            chars.push(`${uchar}${c}`);
        }
    });
    word += chars.join('*-*');
    shawString.push(word);
});
console.log('-- ', args.join(' '));
const shaw = shawString.join('*-* *-*');
const sound = convert.shawToSound(shaw);
console.log(convert.forTidal(sound, .1));


// 𐑐 𐑚 𐑑 𐑛 𐑒 𐑜 𐑓 𐑝 𐑔 𐑞 𐑕 𐑟 𐑖 𐑠 𐑗 𐑡 𐑘 𐑢 𐑙 𐑣 𐑤 𐑮 𐑥 𐑯 𐑦 𐑰 𐑧 𐑱 𐑨 𐑲 𐑩 𐑳  𐑪 𐑴 𐑫 𐑵 𐑬 𐑶 𐑭 𐑷 𐑸 𐑹 𐑺 𐑻 𐑼 𐑽 𐑾 𐑿