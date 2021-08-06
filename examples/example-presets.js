import _progress from '../cli-progress.js';
import _colors from 'colors';
function showPreset(name) {
    console.log(_colors.magenta('Preset: ' + name));
    var bar = new _progress.Bar({}, _progress.Presets[name] || _progress.Presets.legacy);
    bar.start(200, 0);
    bar.update(Math.floor(Math.random() * 200 + 1));
    bar.stop();
    console.log('');
}
console.log('');
showPreset('legacy');
showPreset('shades_classic');
showPreset('shades_grey');
showPreset('rect');