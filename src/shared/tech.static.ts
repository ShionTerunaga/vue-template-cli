interface SelectOption {
  label: string;
  value: string;
}

interface LibraryOption extends SelectOption {
  unitTest: boolean;
  storybook: boolean;
}

interface TechSchema {
  frameworks: readonly SelectOption[];
  css: readonly SelectOption[];
  libraries: readonly LibraryOption[];
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
  libraries: [],
} as const satisfies TechSchema;

export type Framework = (typeof techSchema.frameworks)[number]["value"];
export type Css = (typeof techSchema.css)[number]["value"];
export type Library = (typeof techSchema.libraries)[number]["value"];
export type LibrarySetting = (typeof techSchema.libraries)[number];

export interface InstallTemplateArgs {
  appName: string;
  root: string;
  framework: Framework;
  css: Css;
}
