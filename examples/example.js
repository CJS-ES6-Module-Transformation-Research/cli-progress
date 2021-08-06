import _progress from '../cli-progress.js';
Example1(function () {
    Example2(function () {
        Example3(function () {
            Example4(function () {
                Example5(function () {
                    Example6(function () {
                        console.log('\nDemo finished!');
                    });
                });
            });
        });
    });
});
function Example1(onComplete) {
    console.log('\nExample 1 - Standard configuration (4s)');
    const b1 = new _progress.Bar();
    b1.start(200, 0);
    let value = 0;
    const timer = setInterval(function () {
        value++;
        b1.update(value);
        if (value >= b1.getTotal()) {
            clearInterval(timer);
            b1.stop();
            onComplete.apply(this);
        }
    }, 20);
}
function Example2(onComplete) {
    console.log('\nExample 2 - Custom configuration');
    const b2 = new _progress.Bar({
        barCompleteChar: '#',
        barIncompleteChar: '_',
        format: ' |- Current Upload Progress: {percentage}%' + ' - ' + '||{bar}||',
        fps: 5,
        stream: process.stdout,
        barsize: 30
    });
    b2.start(100, 0);
    const timer = setInterval(function () {
        b2.increment();
        if (b2.value >= b2.getTotal()) {
            clearInterval(timer);
            b2.stop();
            onComplete.apply(this);
        }
    }, 50);
}
function Example3(onComplete) {
    console.log('\nExample 3 - Stop the Bar Automatically');
    const b3 = new _progress.Bar({
        stopOnComplete: true,
        clearOnComplete: true
    });
    b3.start(200, 0);
    let value = 0;
    const timer = setInterval(function () {
        value++;
        b3.update(value);
        if (value >= b3.getTotal()) {
            clearInterval(timer);
            onComplete.apply(this);
        }
    }, 20);
}
function Example4(onComplete) {
    console.log('\nExample 4 - Start ZERO');
    const b1 = new _progress.Bar();
    b1.start(0, 0);
    setTimeout(function () {
        b1.stop();
        onComplete.apply(this);
    }, 1000);
}
function Example5(onComplete) {
    console.log('\nExample 5 - Custom Payload');
    const b1 = new _progress.Bar({ format: 'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | Speed: {speed}' });
    b1.start(200, 0, { speed: 'N/A' });
    let value = 0;
    const speedData = [];
    let timer = setInterval(function () {
        value++;
        speedData.push(Math.random() * 2 + 5);
        const currentSpeedData = speedData.splice(-10);
        b1.update(value, {
            speed: (currentSpeedData.reduce(function (a, b) {
                return a + b;
            }, 0) / currentSpeedData.length).toFixed(2) + 'mb/s'
        });
        if (value >= b1.getTotal()) {
            clearInterval(timer);
            b1.stop();
            onComplete.apply(this);
        }
    }, 20);
}
function Example6(onComplete) {
    console.log('\nExample 6 - Set dynamically the total progress');
    const b1 = new _progress.Bar({}, _progress.Presets.shades_grey);
    b1.start(200, 0);
    let value = 0;
    const timer = setInterval(function () {
        value++;
        b1.update(value);
        if (value > 1500) {
            b1.setTotal(3000);
        } else if (value > 150) {
            b1.setTotal(2000);
        }
        if (value >= b1.getTotal()) {
            clearInterval(timer);
            b1.stop();
            onComplete.apply(this);
        }
    }, 15);
}