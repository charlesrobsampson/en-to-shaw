const convert = require('./index');

const args = process.argv.splice(2);
console.log('-- ', convert.toShawSentence(args, true));

const shaw = convert.toShawSentence(args, true, true);
const sound = convert.shawToSound(shaw);
// console.log('sound');
// console.log(sound);


console.log(convert.forTidal(sound, .1, true));