const convert = require('./index');

const args = process.argv.splice(2);
console.log(convert.sentence(args));