import os from 'node:os';
import { LogLevel, getLogLevelFromEnv } from "./log-utils";

export default class SafLogger<RequiredArgs extends Record<string, unknown>> {
        private level: LogLevel = getLogLevelFromEnv();
        private name: string;

        constructor(options: SafLoggerOptions) {
                if (options.level !== undefined) {
                        this.level = options.level;
                }
                this.name = options.name;
        }

        public write(level: LogLevel, args: Record<string, unknown> & RequiredArgs): void {
                if (level > this.level) {
                        return
                };

		const hostname = os.hostname();
		const logObject = {
			name: this.name,
			level,  
			hostname,
			...args,
		}

		console.log(JSON.stringify(logObject));
        }

        public debug = (args: Record<string, unknown> & RequiredArgs): void => this.write(LogLevel.DEBUG, args);
        public info = (args: Record<string, unknown> & RequiredArgs): void => this.write(LogLevel.INFO, args);
        public warn = (args: Record<string, unknown> & RequiredArgs): void => this.write(LogLevel.WARN, args);
        public error = (args: Record<string, unknown> & RequiredArgs & { error: unknown }): void => this.write(LogLevel.ERROR, args);
}

export type SafLoggerOptions = {
        level?: LogLevel,
        name: string,
}

export {
        LogLevel,
}
