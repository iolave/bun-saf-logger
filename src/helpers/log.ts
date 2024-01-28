import { getEnvValue } from "./environment";

export enum LogLevel {
        SILENT = -1,
        ERROR = 0,
        WARN = 1,
        INFO = 2,
        // HTTP = 3,
        // VERBOSE = 4,
        DEBUG = 5,
        // SILLY = 6
}

export function getLogLevel(): LogLevel {
        const envLevel = getEnvValue<string>("LOG_LEVEL", "INFO").toUpperCase();
        
        // @ts-expect-error if an unknown key is passed to
        // an enum, undefined will be returned
        const level = LogLevel[envLevel] as LogLevel | undefined;
        
        if (level === undefined) return LogLevel.INFO

        return level;
}
