import _progress from '../cli-progress.js';
const bar = new _progress.Bar({
    format: ' >> [\x1B[32m{bar}\x1B[0m] {percentage}% | ETA: {eta}s | {value}/{total}',
    barCompleteChar: '#',
    barIncompleteChar: '#',
    barGlue: '\x1B[33m'
});
bar.start(200, 0);
bar.update(Math.floor(Math.random() * 200 + 1));
bar.stop();