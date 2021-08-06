const _stringWidth = require('string-width');
const _defaultFormatValue = require('./format-value.js');
const _defaultFormatBar = require('./format-bar.js');
const _defaultFormatTime = require('./format-time.js');
var __exports;
__exports = function defaultFormatter(options, params, payload) {
    let s = options.format;
    const formatTime = options.formatTime || _defaultFormatTime;
    const formatValue = options.formatValue || _defaultFormatValue;
    const formatBar = options.formatBar || _defaultFormatBar;
    const percentage = Math.floor(params.progress * 100) + '';
    const stopTime = params.stopTime || Date.now();
    const elapsedTime = Math.round((stopTime - params.startTime) / 1000);
    const context = Object.assign({}, payload, {
        bar: formatBar(params.progress, options),
        percentage: formatValue(percentage, options, 'percentage'),
        total: formatValue(params.total, options, 'total'),
        value: formatValue(params.value, options, 'value'),
        eta: formatValue(params.eta, options, 'eta'),
        eta_formatted: formatTime(params.eta, options, 5),
        duration: formatValue(elapsedTime, options, 'duration'),
        duration_formatted: formatTime(elapsedTime, options, 1)
    });
    s = s.replace(/\{(\w+)\}/g, function (match, key) {
        if (typeof context[key] !== 'undefined') {
            return context[key];
        }
        return match;
    });
    const fullMargin = Math.max(0, params.maxWidth - _stringWidth(s) - 2);
    const halfMargin = Math.floor(fullMargin / 2);
    switch (options.align) {
    case 'right':
        s = fullMargin > 0 ? ' '.repeat(fullMargin) + s : s;
        break;
    case 'center':
        s = halfMargin > 0 ? ' '.repeat(halfMargin) + s : s;
        break;
    case 'left':
    default:
        break;
    }
    return s;
};
module.exports = __exports;