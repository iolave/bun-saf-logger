type Primitive = string | boolean | number;

export function getEnvValue<T extends Primitive>(env: string, defaultValue: T): T {
        const rawValue = Bun.env[env];

        if (!rawValue) return defaultValue;
        
        if (typeof defaultValue === "string") return rawValue as T;

        if (typeof defaultValue === "boolean") {
                const lowerCaseValue = rawValue.toLowerCase();
                if (lowerCaseValue === "true") return true as T;
                if (lowerCaseValue === "false") return false as T;
                return defaultValue;
        }

        const number = Number(rawValue);
        if (Number.isNaN(number)) return defaultValue;
        return number as T;
}