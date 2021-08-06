var __exports;
class ETA {
    constructor(length, initTime, initValue) {
        this.etaBufferLength = length || 100;
        this.valueBuffer = [initValue];
        this.timeBuffer = [initTime];
        this.eta = '0';
    }
    update(time, value, total) {
        this.valueBuffer.push(value);
        this.timeBuffer.push(time);
        this.calculate(total - value);
    }
    getTime() {
        return this.eta;
    }
    calculate(remaining) {
        const currentBufferSize = this.valueBuffer.length;
        const buffer = Math.min(this.etaBufferLength, currentBufferSize);
        const v_diff = this.valueBuffer[currentBufferSize - 1] - this.valueBuffer[currentBufferSize - buffer];
        const t_diff = this.timeBuffer[currentBufferSize - 1] - this.timeBuffer[currentBufferSize - buffer];
        const vt_rate = v_diff / t_diff;
        this.valueBuffer = this.valueBuffer.slice(-this.etaBufferLength);
        this.timeBuffer = this.timeBuffer.slice(-this.etaBufferLength);
        const eta = Math.ceil(remaining / vt_rate / 1000);
        if (isNaN(eta)) {
            this.eta = 'NULL';
        } else if (!isFinite(eta)) {
            this.eta = 'INF';
        } else if (eta > 10000000) {
            this.eta = 'INF';
        } else if (eta < 0) {
            this.eta = 0;
        } else {
            this.eta = eta;
        }
    }
}
__exports = ETA;
module.exports = __exports;