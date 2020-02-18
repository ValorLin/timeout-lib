class TimeoutError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'TimeoutError';
        // fix instanceof
        // see: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export { TimeoutError }