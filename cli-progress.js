const _SingleBar = require('./lib/single-bar.js');
const _MultiBar = require('./lib/multi-bar.js');
const _Presets = require('./presets/index.js');
const _Formatter = require('./lib/formatter.js');
const _defaultFormatValue = require('./lib/format-value.js');
const _defaultFormatBar = require('./lib/format-bar.js');
const _defaultFormatTime = require('./lib/format-time.js');
var __exports;
var Bar;
var SingleBar;
var MultiBar;
var Presets;
var Format;
__exports = {};
module.exports = __exports;
Bar = _SingleBar;
module.exports.Bar = Bar;
SingleBar = _SingleBar;
module.exports.SingleBar = SingleBar;
MultiBar = _MultiBar;
module.exports.MultiBar = MultiBar;
Presets = _Presets;
module.exports.Presets = Presets;
Format = {
    Formatter: _Formatter,
    BarFormat: _defaultFormatBar,
    ValueFormat: _defaultFormatValue,
    TimeFormat: _defaultFormatTime
};
module.exports.Format = Format;