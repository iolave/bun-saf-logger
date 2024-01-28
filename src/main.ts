import os from "os";
import { LogLevel, getLogLevel } from "./helpers/log";
import { notUndefinedBoolean } from "@helpers/boolean";
import { writeToDisk } from "@helpers/file";

export default class SafLogger<RequiredArgs extends Record<string, unknown>> {
        private level: LogLevel = getLogLevel();
        private name?: string;
        private outputOptions: Required<OutputOptions>;
        private logPath?: string;

        constructor(options?: SafLoggerOptions) {
                if (options?.level !== undefined) this.level = options.level;
                this.logPath = options?.logFile;

                this.outputOptions = {
                        outputHostname: notUndefinedBoolean(true, options?.outputHostname),
                        outputLevel: notUndefinedBoolean(true, options?.outputLevel),
                };

                this.name = options?.name;
        }

        private write(level: LogLevel, args: Record<string, unknown> & RequiredArgs): void {
                if (level > this.level) return;

                const logObject: Record<string, unknown> = {};
                if (this.name) logObject["name"] = this.name;
                if (this.outputOptions.outputLevel) logObject["level"] = level;
                if (this.outputOptions.outputHostname) logObject["hostname"] = os.hostname();

                const logOutput = JSON.stringify({...logObject, ...args});
                
                if (this.logPath) writeToDisk(this.logPath, logOutput);
		console.log(logOutput);
        }

        public debug = (args: Record<string, unknown> & RequiredArgs): void => this.write(LogLevel.DEBUG, args);
        public info = (args: Record<string, unknown> & RequiredArgs): void => this.write(LogLevel.INFO, args);
        public warn = (args: Record<string, unknown> & RequiredArgs): void => this.write(LogLevel.WARN, args);
        public error = (args: Record<string, unknown> & RequiredArgs & { error: unknown }): void => this.write(LogLevel.ERROR, args);
}

export type SafLoggerOptions = {
        level?: LogLevel,
        name?: string,
        logFile?: string;
} & OutputOptions;

type OutputOptions = {
        outputHostname?: boolean;
        outputLevel?: boolean;
}

export {
        LogLevel,
}
