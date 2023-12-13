import { describe, expect, it } from "bun:test";
import uselessFunc from "../../src/functions/useless-one";

describe("uselessFunc", () => {
        it("should throw an error because x is less than 100", () => {
                expect(() => uselessFunc(99)).toThrow("x is lower than 100");
        });

        it("should throw an error because x is higher than 200", () => {
                expect(() => uselessFunc(201)).toThrow("x is higher than 200");
        });

        it("should return the number", () => {
                expect(uselessFunc(150)).toBe(150);
        });
});
