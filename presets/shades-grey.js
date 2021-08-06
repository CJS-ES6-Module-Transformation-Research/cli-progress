const _colors = require('colors');
var __exports;
__exports = {
    format: _colors.grey(' {bar}') + ' {percentage}% | ETA: {eta}s | {value}/{total}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591'
};
module.exports = __exports;