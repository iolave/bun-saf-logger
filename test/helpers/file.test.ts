import { describe, it, beforeEach, afterEach } from "bun:test";
import SafLogger from "../../src/main";

beforeEach(() => {
        Bun.env.LOG_LEVEL = undefined;
});

afterEach(() => {
        Bun.env.LOG_LEVEL = undefined;
});

describe("testing", () => {
        it("testing...", () => {
                // const logger = new SafLogger<{message: string}>({ logFile: "/tmp/saf_test.log" });
                // logger.info({message: "test_message_1"})
                // logger.info({message: "test_message_2"})
                // logger.info({message: "test_message_3"})
        });
});