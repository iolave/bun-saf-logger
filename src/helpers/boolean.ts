export function notUndefinedBoolean(defaultValue: boolean, value?: boolean): boolean {
        if (value === undefined) return defaultValue;
        return value;
}
