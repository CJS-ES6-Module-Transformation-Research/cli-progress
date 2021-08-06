const _progress = require('../cli-progress.js');
const _colors = require('colors');
function myFormatter(options, params, payload) {
    const bar = options.barCompleteString.substr(0, Math.round(params.progress * options.barsize));
    if (params.value >= params.total) {
        return '# ' + _colors.grey(payload.task) + '   ' + _colors.green(params.value + '/' + params.total) + ' --[' + bar + ']-- ';
    } else {
        return '# ' + payload.task + '   ' + _colors.yellow(params.value + '/' + params.total) + ' --[' + bar + ']-- ';
    }
}
function Example5() {
    console.log('');
    const b1 = new _progress.Bar({
        format: myFormatter,
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true,
        stopOnComplete: true
    });
    b1.start(200, 0, { task: 'Task 1' });
    const timer = setInterval(function () {
        b1.increment();
        if (b1.isActive === false) {
            clearInterval(timer);
        }
    }, 20);
}
Example5();