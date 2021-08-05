const _progress = require('../cli-progress.js');
const files = {
    'eta.js        ': 187,
    'generic-bar.js': 589,
    'multi-bar.js  ': 5342,
    'options.js    ': 42,
    'single-bar.js ': 2123,
    'terminal.js   ': 4123
};
const bars = [];
const multibar = new _progress.MultiBar({
    format: ' {bar} | "{file}" | {value}/{total}',
    hideCursor: true,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    clearOnComplete: true,
    stopOnComplete: true
});
console.log('Downloading files..\n');
for (const filename in files) {
    const size = files[filename];
    bars.push(multibar.create(size, 0, { file: filename }));
}
const timer = setInterval(function () {
    for (let i = 0; i < bars.length; i++) {
        const bar = bars[i];
        if (bar.value < bar.total) {
            bar.increment();
        }
    }
    if (multibar.isActive === false) {
        clearInterval(timer);
        console.log('Download complete!');
    }
}, 3);