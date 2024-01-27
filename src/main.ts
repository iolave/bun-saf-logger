import os from 'os';
import { LogLevel, getLogLevelFromEnv } from "./log-utils";
import { notUndefinedBoolean } from './boolean-utils';

export default class SafLogger<RequiredArgs extends Record<string, unknown>> {
        private level: LogLevel = getLogLevelFromEnv();
        private name?: string;
        private outputOptions: Required<OutputOptions>;

        constructor(options: SafLoggerOptions) {
                if (options.level !== undefined) this.level = options.level;

                this.outputOptions = {
                        outputHostname: notUndefinedBoolean(true, options.outputHostname),
                        outputLevel: notUndefinedBoolean(true, options.outputLevel),
                };

                this.name = options.name;
        }

        private write(level: LogLevel, args: Record<string, unknown> & RequiredArgs): void {
                if (level > this.level) return;

                const logObject: Record<string, unknown> = {};
                if (this.name) logObject["name"] = this.name;
                if (this.outputOptions.outputLevel) logObject["level"] = level;
                if (this.outputOptions.outputHostname) logObject["hostname"] = os.hostname();

		console.log(JSON.stringify({...logObject, ...args}));
        }

        public debug = (args: Record<string, unknown> & RequiredArgs): void => this.write(LogLevel.DEBUG, args);
        public info = (args: Record<string, unknown> & RequiredArgs): void => this.write(LogLevel.INFO, args);
        public warn = (args: Record<string, unknown> & RequiredArgs): void => this.write(LogLevel.WARN, args);
        public error = (args: Record<string, unknown> & RequiredArgs & { error: unknown }): void => this.write(LogLevel.ERROR, args);
}

export type SafLoggerOptions = {
        level?: LogLevel,
        name?: string,

} & OutputOptions;

type OutputOptions = {
        outputHostname?: boolean;
        outputLevel?: boolean;
}

export {
        LogLevel,
}
