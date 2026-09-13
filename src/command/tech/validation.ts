import { techSchema, type Css, type Framework } from "@/shared/tech.static";

export function isFramework(value: unknown): value is Framework {
    return (
        typeof value === "string" &&
        techSchema.frameworks.some((framework) => framework.value === value)
    );
}

export function isCss(value: unknown): value is Css {
    return (
        typeof value === "string" &&
        techSchema.css.some((css) => css.value === value)
    );
}
