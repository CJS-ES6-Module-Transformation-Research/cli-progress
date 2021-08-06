const _progress = require('../cli-progress.js');
const _colors = require('colors');
function Example5() {
    console.log('');
    var b1 = new _progress.Bar({
        format: 'CLI Progress |' + _colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Speed: {speed}',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });
    b1.start(200, 0, { speed: 'N/A' });
    var value = 0;
    var speedData = [];
    var timer = setInterval(function () {
        value++;
        speedData.push(Math.random() * 2 + 5);
        var currentSpeedData = speedData.splice(-10);
        b1.update(value, {
            speed: (currentSpeedData.reduce(function (a, b) {
                return a + b;
            }, 0) / currentSpeedData.length).toFixed(2) + 'Mb/s'
        });
        if (value >= b1.getTotal()) {
            clearInterval(timer);
            b1.stop();
        }
    }, 20);
}
Example5();