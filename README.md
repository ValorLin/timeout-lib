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
import { withTimeout, TimeoutError } from 'timeout-lib';

const _fn = async () => { 
    await new Promise(() => {});
}

const fn = withTimeout(_fn, { time: 1000 });

try {
    await fn();
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
    @timeout({ time: 1000 })
    async fn() {
        await new Promise(() => {});
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
