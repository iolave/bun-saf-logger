import { getEnvValue } from "@helpers/environment";
import { describe, it, beforeEach, afterEach, expect } from "bun:test";

const env = "TEST_ENV";

beforeEach(() => {
        Bun.env[env] = undefined;
});

afterEach(() => {
        Bun.env[env] = undefined;
});

describe("getEnvValue", () => {
        it("Should get a string", () => {
                const envValue = "SOME_STRING";
                const defaultValue = "DEFAULT_VALUE";
                Bun.env[env] = envValue;

                const res = getEnvValue<string>(env, defaultValue);
                expect(res).toBeString();
                expect(res).toBe(envValue);
        });

        it("Should get string default value", () => {
                const defaultValue = "DEFAULT_VALUE";

                const res = getEnvValue<string>(env, defaultValue);
                expect(res).toBeString();
                expect(res).toBe(defaultValue);
        });

        it("Should get a number", () => {
                const envValue = 1;
                Bun.env[env] = envValue.toString();
                const defaultValue = 0;

                const res = getEnvValue<number>(env, defaultValue);
                expect(res).toBeNumber();
                expect(res).toBe(envValue);
        });

        it("Should get number default value", () => {
                const envValue = "SOME_STRING";
                Bun.env[env] = envValue;
                const defaultValue = -1;

                const res = getEnvValue<number>(env, defaultValue);
                expect(res).toBeNumber();
                expect(res).toBe(defaultValue);
        });

        it("Should get a boolean", () => {
                const envValue = true;
                Bun.env[env] = `${envValue}`;
                const defaultValue = false;

                const res = getEnvValue<boolean>(env, defaultValue);
                expect(res).toBeBoolean();
                expect(res).toBe(envValue);
        });

        it("Should get boolean default value", () => {
                const envValue = "SOME_STRING";
                Bun.env[env] = envValue;
                const defaultValue = false;

                const res = getEnvValue<boolean>(env, defaultValue);
                expect(res).toBeBoolean();
                expect(res).toBe(defaultValue);
        });
});