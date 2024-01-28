import { describe, expect, it, beforeEach, afterEach } from "bun:test";
import { LogLevel, getLogLevel } from "../../src/helpers/log";

beforeEach(() => {
        Bun.env.LOG_LEVEL = undefined;
});

afterEach(() => {
        Bun.env.LOG_LEVEL = undefined;
});

describe("getLogLevel", () => {
        it("Should return info level when no LOG_LEVEL is defined", () => {
                Bun.env.LOG_LEVEL = undefined;
                const level = getLogLevel();
                expect(level).toBe(LogLevel.INFO);
        });

        it("Should return info level when LOG_LEVEL is set to a random string", () => {
                Bun.env.LOG_LEVEL = "random key";
                const level = getLogLevel();
                expect(level).toBe(LogLevel.INFO);
        });

        it("Should return error level when LOG_LEVEL is set to error", () => {
                Bun.env.LOG_LEVEL = "error";
                const level = getLogLevel();
                expect(level).toBe(LogLevel.ERROR);
        });
});