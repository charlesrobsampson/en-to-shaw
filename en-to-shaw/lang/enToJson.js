const convert = require('./index');

const args = process.argv.splice(2);
const shaw = convert.toShawSentence(args, true, true);
const sound = convert.shawToSound(shaw);
console.log(convert.soundJson(convert.toShawSentence(args, true), sound, .1));