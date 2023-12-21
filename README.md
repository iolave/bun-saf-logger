# SaF Logger

|||
|-|-|
|![sfaf](resources/saf-logger.png)|SaF logger is a JSON based logger library written in typescript and made to work within bun ecosystem.|


## Features

- Follows the [RFC5424](https://tools.ietf.org/html/rfc5424) logging level standard.
- Exposes simple logging methods.
- Accepts the `LOG_LEVEL` env.

## Installation

```shell
bun add github:iolave/bun-saf-logger
# or
bun add saf-logger
```

## Usage
### Creating an instance
```typescript
import SafLogger, { LogLevel } from "saf-logger";

const logger = new SafLogger({
        level: LogLevel.DEBUG,
        name: "my-logger",
});
```

### Logging
```typescript
...
logger.info({message: 'my info message'});
logger.warn({message: 'my warn message'});
logger.error({message: 'my error message', error: new Error()});
logger.debug({message: 'my debug message'});

/* Will output
{"name":"my-logger","level":2,"hostname":"my-hostname","message":"my info message"}
{"name":"my-logger","level":1,"hostname":"my-hostname","message":"my warn message"}
{"name":"my-logger","level":0,"hostname":"my-hostname","message":"my error message","error":{}}
{"name":"my-logger","level":5,"hostname":"my-hostname","message":"my debug message"}
*/
```

