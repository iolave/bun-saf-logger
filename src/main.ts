import os from 'node:os';
import { LogLevel } from "./log-utils";
import { LogArgs } from "./log-types";

export default class SafLogger<RequiredArgs extends Record<string, unknown>> {
        private level: LogLevel;
        private name: string;

        constructor(options: SafLoggerOptions) {
                this.level = options.level;
                this.name = options.name;
        }

        public write(level: LogLevel, args: LogArgs & RequiredArgs): void {
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

        public debug = (args: LogArgs & RequiredArgs): void => this.write(LogLevel.DEBUG, args);
        public info = (args: LogArgs & RequiredArgs): void => this.write(LogLevel.INFO, args);
        public warn = (args: LogArgs & RequiredArgs): void => this.write(LogLevel.WARN, args);
        public error = (args: LogArgs & RequiredArgs & { error: unknown }): void => this.write(LogLevel.ERROR, args);
}

export type SafLoggerOptions = {
        level: LogLevel,
        name: string,
}

export {
        LogLevel,
}
