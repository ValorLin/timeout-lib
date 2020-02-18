import { wait } from "../wait";
import { timeout } from "../timeout";
import { TimeoutError } from "../TimeoutError";

jest.useFakeTimers();

describe('@timeout()', () => {
    afterEach(() => {
        jest.clearAllTimers();
    });

    it('should throw timeout error when timeout < executeTime', async () => {
        expect.assertions(2);

        class Test {
            @timeout({
                time: 30 * 1000,
                message: 'Failed to run rask.',
            })
            getHello() {
                return wait(60 * 1000).then(() => 'Hello');
            }
        }

        try {
            const promise = new Test().getHello();
            jest.advanceTimersByTime(40 * 1000);
            await promise;
        } catch (error) {
            expect(error).toBeInstanceOf(TimeoutError);
            expect(error.message).toBe('Failed to run rask.')
        }
    });
});