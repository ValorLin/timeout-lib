import { withTimeout } from "../withTimeout";
import { wait } from "../wait";
import { TimeoutError } from "../TimeoutError";

jest.useFakeTimers();

describe('withTimeout()', () => {
	afterEach(() => {
		jest.clearAllTimers();
	});

	it('should do nothing when timeout > executeTime ', async () => {
		const getHello = withTimeout(
			() => wait(10 * 1000).then(() => 'Hello'),
			{ time: 30 * 1000 }
		);

		const promise = getHello();
		jest.advanceTimersByTime(10 * 1000 + 1);
		expect(await promise).toBe('Hello');
	});

	it('should throw error when timeout < executeTime', async () => {
		expect.assertions(2);

		const getHello = withTimeout(
			() => wait(60 * 1000).then(() => 'Hello'),
			{
				time: 30 * 1000,
				message: 'Failed to get hello.'
			}
		);

		try {
			const promise = getHello();
			jest.advanceTimersByTime(30 * 1000 + 1);
			await promise;
		} catch (error) {
			expect(error).toBeInstanceOf(TimeoutError);
			expect(error.message).toBe('Failed to get hello.');
		}
	});
});