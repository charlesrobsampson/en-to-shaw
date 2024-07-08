const convert = require('./index');

const args = process.argv.splice(2);
console.log(convert.toShawSentence(args));
console.log(convert.toShawSentence(args, true));