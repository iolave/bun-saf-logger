import { describe, expect, it, beforeEach, afterEach } from "bun:test";
import { LogLevel, getLogLevelFromEnv } from "../src/log-utils";

beforeEach(() => {
        Bun.env.LOG_LEVEL = undefined;
});

afterEach(() => {
        Bun.env.LOG_LEVEL = undefined;
});

describe("getLogLevelFromEnv", () => {
        it("Should return info level when no LOG_LEVEL is defined", () => {
                Bun.env.LOG_LEVEL = undefined;
                const level = getLogLevelFromEnv();
                expect(level).toBe(LogLevel.INFO);
        });

        it("Should return info level when LOG_LEVEL is set to a random string", () => {
                Bun.env.LOG_LEVEL = "random key";
                const level = getLogLevelFromEnv();
                expect(level).toBe(LogLevel.INFO);
        });

        it("Should return error level when LOG_LEVEL is set to error", () => {
                Bun.env.LOG_LEVEL = "error";
                const level = getLogLevelFromEnv();
                expect(level).toBe(LogLevel.ERROR);
        });
});