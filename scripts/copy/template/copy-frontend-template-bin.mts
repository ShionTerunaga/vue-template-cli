import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ignoredDirectoryNames = new Set([
    ".next",
    ".nitro",
    ".tanstack",
    ".turbo",
    ".vercel",
    ".wrangler",
    "build",
    "coverage",
    "dist",
    "dist-ssr",
    "node_modules",
    "out",
    "storybook-static"
]);
const ignoredFileNames = new Set([".DS_Store", "count.txt", "next-env.d.ts"]);

function shouldIgnoreFile(name: string): boolean {
    return (
        ignoredFileNames.has(name) ||
        name.startsWith(".env.") ||
        name.endsWith(".local") ||
        name.endsWith(".log") ||
        name.endsWith(".pem") ||
        name.endsWith(".tsbuildinfo")
    );
}

function copyDir(src: string, dest: string): void {
    const stat = fs.statSync(src);

    if (!stat.isDirectory()) {
        throw new Error(`Source is not a directory: ${src}`);
    }

    fs.mkdirSync(dest, { recursive: true });

    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        if (entry.isDirectory() && ignoredDirectoryNames.has(entry.name)) {
            continue;
        }

        if (entry.isFile() && shouldIgnoreFile(entry.name)) {
            continue;
        }

        const srcPath = path.join(src, entry.name);
        const destName = entry.name === ".env" ? "env" : entry.name;
        const destPath = path.join(dest, destName);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
            continue;
        }

        if (entry.isSymbolicLink()) {
            const target = fs.readlinkSync(srcPath);

            try {
                fs.rmSync(destPath, { force: true, recursive: true });
            } catch {}

            fs.symlinkSync(target, destPath);
            continue;
        }

        fs.copyFileSync(srcPath, destPath);
        fs.chmodSync(destPath, fs.statSync(srcPath).mode);
    }
}

async function main(): Promise<void> {
    const repoRoot = path.resolve(__dirname, "..", "..", "..");
    const sourceTemplateDir = path.join(repoRoot, "template");
    const binDir = path.join(repoRoot, "bin");
    const destTemplateDir = path.join(binDir, "template");

    if (!fs.existsSync(sourceTemplateDir)) {
        throw new Error(`template directory not found: ${sourceTemplateDir}`);
    }

    fs.mkdirSync(binDir, { recursive: true });
    fs.rmSync(destTemplateDir, { recursive: true, force: true });

    console.log("Copying template into bin/template...");
    copyDir(sourceTemplateDir, destTemplateDir);

    console.log(`Done: ${destTemplateDir}`);
}

main().catch((error: unknown) => {
    console.error("Failed to copy template into bin:", error);
    process.exit(1);
});
