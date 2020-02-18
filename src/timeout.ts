import { TimeoutOptions } from "./types";
import { withTimeout } from "./withTimeout";

const timeout = (options: TimeoutOptions) => {
    return (_: any, __: string, descriptor: PropertyDescriptor) => {
        descriptor.value = withTimeout(descriptor.value, options);
    };
};

export { timeout }