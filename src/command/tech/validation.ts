import { techSchema, type Css, type Framework, type Library } from "@/shared/tech.static";
import { isArray } from "@/utils/is";

export function isFramework(value: unknown): value is Framework {
  return (
    typeof value === "string" &&
    techSchema.frameworks.some((framework) => framework.value === value)
  );
}

export function isCss(value: unknown): value is Css {
  return typeof value === "string" && techSchema.css.some((css) => css.value === value);
}

export function isLibrary(value: unknown): value is Library {
  return (
    typeof value === "string" && techSchema.libraries.some((library) => library.value === value)
  );
}

export function isLibraryArray(value: unknown): value is Library[] {
  return isArray(value) && value.every(isLibrary);
}
