import { execFileSync } from "node:child_process";
import { realpathSync } from "node:fs";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

type PackageJson = {
    name: string;
    version: string;
    description?: string;
    type?: string;
    license?: string;
    engines?: Record<string, string>;
    bin?: Record<string, string>;
    files?: string[];
    preferGlobal?: boolean;
    packageManager?: string;
    dependencies?: Record<string, string>;
};

const currentDir = dirname(fileURLToPath(import.meta.url));
const configuredRoot = process.env.RELEASE_ROOT;
const repoRoot = configuredRoot
    ? path.resolve(configuredRoot)
    : path.resolve(currentDir, "..", "..");
const preservedEntries = new Set([".git", "bin", "LICENSE", "package.json"]);

function isTemporaryRoot(target: string): boolean {
    const resolvedTarget = realpathSync(target);
    const temporaryRoots = [os.tmpdir(), "/tmp"].map((root) =>
        realpathSync(root)
    );

    return temporaryRoots.some((temporaryRoot) => {
        const relativePath = path.relative(temporaryRoot, resolvedTarget);
        return (
            relativePath !== "" &&
            !relativePath.startsWith("..") &&
            !path.isAbsolute(relativePath)
        );
    });
}

function assertSafeContext(): void {
    if (process.env.PREPARE_RELEASE_BRANCH !== "1") {
        throw new Error("PREPARE_RELEASE_BRANCH=1 is required.");
    }

    if (configuredRoot) {
        if (!isTemporaryRoot(repoRoot)) {
            throw new Error(
                "RELEASE_ROOT is only supported for directories inside the system temp directory."
            );
        }
        return;
    }

    const branch = execFileSync("git", ["branch", "--show-current"], {
        cwd: repoRoot,
        encoding: "utf8"
    }).trim();

    if (branch !== "release") {
        throw new Error(
            `Release preparation must run on the release branch. Current branch: ${branch}`
        );
    }
}

async function assertRequiredEntries(): Promise<void> {
    const requiredEntries = ["bin", "LICENSE", "package.json"];

    for (const entry of requiredEntries) {
        const stat = await fs
            .stat(path.join(repoRoot, entry))
            .catch(() => null);

        if (!stat) {
            throw new Error(`Required release entry not found: ${entry}`);
        }
    }
}

async function writeReleasePackageJson(): Promise<void> {
    const packageJsonPath = path.join(repoRoot, "package.json");
    const sourcePackage = JSON.parse(
        await fs.readFile(packageJsonPath, "utf8")
    ) as PackageJson;
    const releasePackage = {
        name: sourcePackage.name,
        version: sourcePackage.version,
        description: sourcePackage.description,
        type: sourcePackage.type,
        license: sourcePackage.license,
        engines: sourcePackage.engines,
        bin: sourcePackage.bin,
        files: sourcePackage.files,
        preferGlobal: sourcePackage.preferGlobal,
        packageManager: sourcePackage.packageManager,
        dependencies: sourcePackage.dependencies
    };

    await fs.writeFile(
        packageJsonPath,
        `${JSON.stringify(releasePackage, null, 2)}\n`,
        "utf8"
    );
}

async function removeDevelopmentEntries(): Promise<void> {
    const entries = await fs.readdir(repoRoot);

    for (const entry of entries) {
        if (preservedEntries.has(entry)) {
            continue;
        }

        await fs.rm(path.join(repoRoot, entry), {
            recursive: true,
            force: true
        });
        console.log(`Removed: ${entry}`);
    }
}

async function main(): Promise<void> {
    assertSafeContext();

    const skipBuild = process.env.RELEASE_SKIP_BUILD === "1";
    if (skipBuild && !configuredRoot) {
        throw new Error(
            "RELEASE_SKIP_BUILD is only supported with a temporary RELEASE_ROOT."
        );
    }

    if (!skipBuild) {
        execFileSync("pnpm", ["build"], { cwd: repoRoot, stdio: "inherit" });
    }

    await assertRequiredEntries();
    await writeReleasePackageJson();
    await removeDevelopmentEntries();

    console.log(`Release branch prepared: ${repoRoot}`);
}

main().catch((error: unknown) => {
    console.error("Failed to prepare release branch:", error);
    process.exit(1);
});
