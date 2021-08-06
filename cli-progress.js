import _SingleBar from './lib/single-bar.js';
import _MultiBar from './lib/multi-bar.js';
import _Presets from './presets/index.js';
import _Formatter from './lib/formatter.js';
import _defaultFormatValue from './lib/format-value.js';
import _defaultFormatBar from './lib/format-bar.js';
import _defaultFormatTime from './lib/format-time.js';
var defaultExport = {};
var __exports;
var Bar;
var SingleBar;
var MultiBar;
var Presets;
var Format;
__exports = {};
defaultExport = __exports;
Bar = _SingleBar;
var Bar0 = Bar;
SingleBar = _SingleBar;
var SingleBar0 = SingleBar;
MultiBar = _MultiBar;
var MultiBar0 = MultiBar;
Presets = _Presets;
var Presets0 = Presets;
Format = {
    Formatter: _Formatter,
    BarFormat: _defaultFormatBar,
    ValueFormat: _defaultFormatValue,
    TimeFormat: _defaultFormatTime
};
var Format0 = Format;
defaultExport.Bar = Bar0;
defaultExport.SingleBar = SingleBar0;
defaultExport.MultiBar = MultiBar0;
defaultExport.Presets = Presets0;
defaultExport.Format = Format0;
export default defaultExport;