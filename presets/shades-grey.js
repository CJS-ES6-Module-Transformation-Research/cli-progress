import _colors from 'colors';
var defaultExport = {};
var __exports;
__exports = {
    format: _colors.grey(' {bar}') + ' {percentage}% | ETA: {eta}s | {value}/{total}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591'
};
defaultExport = __exports;
export default defaultExport;