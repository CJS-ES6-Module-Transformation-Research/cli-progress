import _progress from '../cli-progress.js';
import _colors from 'colors';
function showPreset(name, pos) {
    console.log(_colors.magenta('Preset: ' + name));
    var bar = new _progress.Bar({ align: pos }, _progress.Presets[name] || _progress.Presets.legacy);
    bar.start(200, 0);
    bar.update(Math.floor(Math.random() * 200 + 1));
    bar.stop();
    console.log('');
}
console.log('');
showPreset('legacy', 'center');
showPreset('shades_classic', 'right');
showPreset('shades_grey', 'left');
showPreset('rect', 'center');