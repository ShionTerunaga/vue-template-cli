interface SelectOption {
  label: string;
  value: string;
}

interface TechSchema {
  frameworks: readonly SelectOption[];
  css: readonly SelectOption[];
}

export const techSchema = {
  frameworks: [
    { label: "Vue Router", value: "vue-router" },
    { label: "Nuxt.js", value: "nuxt" },
  ],
  css: [
    { label: "Scoped CSS", value: "scoped-css" },
    { label: "Vanilla Extract", value: "vanilla-extract" },
  ],
} as const satisfies TechSchema;

export type Framework = (typeof techSchema.frameworks)[number]["value"];
export type Css = (typeof techSchema.css)[number]["value"];

export interface InstallTemplateArgs {
  appName: string;
  root: string;
  framework: Framework;
  css: Css;
}
