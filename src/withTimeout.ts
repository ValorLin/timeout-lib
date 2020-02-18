import { wait } from "./wait";
import { TimeoutOptions } from "./types";
import { TimeoutError } from "./TimeoutError";

const withTimeout = <T, K>(
    fn: (...args: T[]) => Promise<K>,
    { time, message }: TimeoutOptions,
) => {
    return (...args: T[]): Promise<K> => {
        return Promise.race([
            wait(time).then(() => Promise.reject(new TimeoutError(message))),
            fn(...args),
        ]);
    };
};

export { withTimeout };
