import { wait } from "./wait";
import { TimeoutOptions } from "./types";
import { TimeoutError } from "./TimeoutError";

const withTimeout = <A extends any[], R>(
    fn: (...args: A) => Promise<R>,
    { time, message }: TimeoutOptions,
) => {
    return (...args: A): Promise<R> => {
        return Promise.race([
            wait(time).then(() => Promise.reject(new TimeoutError(message))),
            fn(...args),
        ]);
    };
};

export { withTimeout };
