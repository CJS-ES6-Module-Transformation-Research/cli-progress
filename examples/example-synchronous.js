import _progress from '../cli-progress.js';
function fibonacci(n) {
    if (n < 2) {
        return 1;
    } else {
        return fibonacci(n - 2) + fibonacci(n - 1);
    }
}
function runSinglebar(options, limit) {
    const bar = new _progress.Bar(options);
    bar.start(limit, 1);
    const fibonacciNumbers = [];
    for (let i = 1; i <= limit; i++) {
        fibonacciNumbers.push(fibonacci(i));
        bar.update(i);
    }
    bar.stop();
    console.log('\nFibonacci (1-', fibonacciNumbers.length, '): ', fibonacciNumbers.join(', '), '\n');
}
function runMultibar(options, limit) {
    const multibar = new _progress.MultiBar(options);
    const bar1 = multibar.create(limit, 1);
    const bar2 = multibar.create(2124, 541);
    const fibonacciNumbers = [];
    for (let i = 1; i <= limit; i++) {
        fibonacciNumbers.push(fibonacci(i));
        bar1.update(i);
        bar2.increment(89);
        multibar.update();
    }
    multibar.stop();
    console.log('\nFibonacci (1-', fibonacciNumbers.length, '): ', fibonacciNumbers.join(', '), '\n');
}
console.log('\nCalculation without synchronous updates');
runSinglebar({
    format: 'Fibonacci Calculation Progress [{bar}] {percentage}% | ETA: {eta}s | Current: F({value})',
    hideCursor: true,
    synchronousUpdate: false
}, 40);
console.log('\nCalculation WITH synchronous updates');
runSinglebar({
    format: 'Fibonacci Calculation Progress [{bar}] {percentage}% | ETA: {eta}s | Current: F({value})',
    hideCursor: true,
    synchronousUpdate: true
}, 43);
console.log('\nMultibar calculation synchronous enforced updates (synchronous mode not available)');
runMultibar({
    format: 'Fibonacci Calculation Progress [{bar}] {percentage}% | ETA: {eta}s | Current: F({value})',
    hideCursor: true
}, 43);