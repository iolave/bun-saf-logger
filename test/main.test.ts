import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";
import os from "node:os";
import SafLogger, { LogLevel } from "../src/main";

const name = 'saf-logger';
const message = 'dummy-action';

beforeEach(() => {
	console.log = mock(() => {});
	os.hostname = mock(() => "hostname");
});

afterEach(() => {
	mock.restore()
});

describe("SafLogger Levels", () => {
	it("Should replace LOG_LEVEL env", () => {
		Bun.env.LOG_LEVEL = "SILENT";
		const logger = new SafLogger({ level: LogLevel.INFO, name });
		logger.info({ message });
		expect(console.log).toHaveBeenCalledTimes(1);
		Bun.env.LOG_LEVEL = undefined;
	});

	it("Should not log when level is SILENT and info is called", () => {
		const logger = new SafLogger({ level: LogLevel.SILENT, name });
		logger.info({ message });
		expect(console.log).toHaveBeenCalledTimes(0);
	});

	it("Should not log when level is ERROR and info is called", () => {
		const logger = new SafLogger({ level: LogLevel.ERROR, name });
		logger.info({ message });
		expect(console.log).toHaveBeenCalledTimes(0);
	});

	it("Should not log when level is WARN and info is called", () => {
		const logger = new SafLogger({ level: LogLevel.WARN, name });
		logger.info({ message });
		expect(console.log).toHaveBeenCalledTimes(0);
	});

	it("Should log when level is INFO and info is called", () => {
		const logger = new SafLogger({ level: LogLevel.INFO, name });
		logger.info({ message });
		expect(console.log).toHaveBeenCalledTimes(1);
	});

	it("Should log when level is DEBUG and info is called", () => {
		const logger = new SafLogger({ level: LogLevel.DEBUG, name });
		logger.info({ message });
		expect(console.log).toHaveBeenCalledTimes(1);
	});

	it("Should log when level is DEBUG and debug is called", () => {
		const logger = new SafLogger({ level: LogLevel.DEBUG, name });
		logger.debug({ message });
		expect(console.log).toHaveBeenCalledTimes(1);
	});
});

describe("SafLogger.error", () => {
	it("Should log with args and error", () => {
		const logger = new SafLogger({ level: LogLevel.DEBUG, name });

		const tmpObject = {
			message,
			error: new Error(),
		};

		logger.error(tmpObject);
		
		const trueObject = {
			name,
			level: LogLevel.ERROR,
			hostname: os.hostname(),
			...tmpObject,
		}

		expect(console.log).toHaveBeenCalledTimes(1);
		expect(console.log).toHaveBeenCalledWith(JSON.stringify(trueObject));
	});
});

describe("SafLogger.warn", () => {
	it("Should log with args and error", () => {
		const logger = new SafLogger({ level: LogLevel.DEBUG, name });

		const tmpObject = {
			message,
			error: new Error(),
		};

		logger.warn(tmpObject);
		
		const trueObject = {
			name,
			level: LogLevel.WARN,
			hostname: os.hostname(),
			...tmpObject,
		}

		expect(console.log).toHaveBeenCalledTimes(1);
		expect(console.log).toHaveBeenCalledWith(JSON.stringify(trueObject));
	});
});

describe("SafLogger.info", () => {
	it("Should log with args", () => {
		const logger = new SafLogger({ level: LogLevel.DEBUG, name });

		const tmpObject = { message };

		logger.info(tmpObject);
		
		const trueObject = {
			name,
			level: LogLevel.INFO,
			hostname: os.hostname(),
			...tmpObject,
		}

		expect(console.log).toHaveBeenCalledTimes(1);
		expect(console.log).toHaveBeenCalledWith(JSON.stringify(trueObject));
	});
});

describe("SafLogger.debug", () => {
	it("Should log with args", () => {
		const logger = new SafLogger({ level: LogLevel.DEBUG, name, outputHostname: true, outputLevel: true });

		const logObject = {
			message,
		};

		logger.debug(logObject);
		
		const trueObject = {
			name,
			level: LogLevel.DEBUG,
			hostname: os.hostname(),
			...logObject,
		}

		expect(console.log).toHaveBeenCalledTimes(1);
		expect(console.log).toHaveBeenCalledWith(JSON.stringify(trueObject));
	});
});
