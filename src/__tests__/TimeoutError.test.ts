import { TimeoutError } from "../TimeoutError";

describe('TimeoutError', () => {
    it('should be instance of Error', () => {
        expect(new TimeoutError()).toBeInstanceOf(Error);
    });

    it('should have right name', () => {
        expect(new TimeoutError().name).toBe('TimeoutError');
    });
});