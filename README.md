# Timeout Lib

## Install

```bash
$ npm install timeout-lib
// Or use yarn
$ yarn add timeout-lib
```

## Usage

### withTimeout()
```typescript
import { withTimeout } from 'timeout-lib';

const fn = async () => { 
    // long task
}

const fnWithTimeout = withTimeout(fn, {
    time: 30 * 1000
});

try {
    await fnWithTimeout();
} catch(err) {
    if(err instanceof TimeoutError) {
        console.log(`Got a TimeoutError while executing fn()`)
    }
}
```

### @timeout()
```typescript
import { timeout, TimeoutError } from 'timeout-lib';

class Demo {
    @timeout({time: 30 * 1000})
    async fn() {
        // long task
    }
}

try {
    await new Demo().fn();
} catch(err) {
    if(err instanceof TimeoutError) {
        console.log(`Got a TimeoutError while executing fn()`)
    }
}
```

## License

[MIT](LICENSE).
