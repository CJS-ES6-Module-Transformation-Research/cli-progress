const _SingleBar = require('./lib/single-bar.js');
const _MultiBar = require('./lib/multi-bar.js');
const _Presets = require('./presets/index.js');
const _Formatter = require('./lib/formatter.js');
const _defaultFormatValue = require('./lib/format-value.js');
const _defaultFormatBar = require('./lib/format-bar.js');
const _defaultFormatTime = require('./lib/format-time.js');
var __exports;
__exports = {
    Bar: _SingleBar,
    SingleBar: _SingleBar,
    MultiBar: _MultiBar,
    Presets: _Presets,
    Format: {
        Formatter: _Formatter,
        BarFormat: _defaultFormatBar,
        ValueFormat: _defaultFormatValue,
        TimeFormat: _defaultFormatTime
    }
};
module.exports = __exports;