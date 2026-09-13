import fs from "node:fs/promises";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(currentDir, "..", "..");
const templateRoot = path.join(repoRoot, "template");

const caution = [
  "# CAUTION:",
  "# Be careful when using generative AI tools.",
  "# Secrets such as API keys, tokens, and private environment values may be leaked to external services.",
  "# Do not paste confidential values into AI prompts unless your policy explicitly allows it.",
  "#",
  "# 注意:",
  "# 生成AIを利用する際は注意してください。",
  "# APIキー、トークン、秘密情報などは外部サービスに送信・学習される可能性があります。",
  "# 組織のルールで許可されていない限り、機密情報をプロンプトへ貼り付けないでください。",
];

const templateEnvSchema = [
  {
    projects: [
      ["nuxt", "scoped-css"],
      ["nuxt", "vanilla-extract"],
    ],
    variables: {
      NUXT_PUBLIC_API_KEY: "https://hp-api.onrender.com/api/characters",
    },
  },
  {
    projects: [
      ["vue-router", "scoped-css"],
      ["vue-router", "vanilla-extract"],
    ],
    variables: {
      VITE_API_KEY: "https://hp-api.onrender.com/api/characters",
    },
  },
] as const;

function serializeEnv(variables: Readonly<Record<string, string>>): string {
  const entries = Object.entries(variables).map(([name, value]) => `${name}="${value}"`);
  return [...caution, ...entries, ""].join("\n");
}

async function writeTemplateEnvs(): Promise<void> {
  for (const group of templateEnvSchema) {
    const content = serializeEnv(group.variables);

    for (const project of group.projects) {
      const projectDir = path.join(templateRoot, ...project);
      const projectStat = await fs.stat(projectDir).catch(() => null);

      if (!projectStat?.isDirectory()) {
        throw new Error(`Template project directory not found: ${projectDir}`);
      }

      const envPath = path.join(projectDir, ".env");
      await fs.writeFile(envPath, content, "utf8");
      console.log(`Generated: ${envPath}`);
    }
  }
}

writeTemplateEnvs().catch((error: unknown) => {
  console.error("Failed to generate template .env files:", error);
  process.exit(1);
});
