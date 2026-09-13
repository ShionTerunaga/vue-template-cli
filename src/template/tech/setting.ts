import path from "node:path";
import { fileURLToPath } from "node:url";
import { createSome } from "ts-utility-kit/option";
import { createOk, isErr, type Result } from "ts-utility-kit/result";
import { selectCss } from "@/command/tech/css";
import { selectFramework } from "@/command/tech/framework";
import { optionCss, optionFramework } from "@/command/common/commander-option";
import type { TechMaterial } from "../core/core-static";
import { foundFolder } from "@/utils/found-file";

export async function resolveTemplate(): Promise<Result<TechMaterial, Error>> {
    const cliDir = path.dirname(fileURLToPath(import.meta.url));
    const frameworkResult = await selectFramework(await optionFramework);

    if (isErr(frameworkResult)) {
        return frameworkResult;
    }

    const cssResult = await selectCss(await optionCss);

    if (isErr(cssResult)) {
        return cssResult;
    }

    const resultPath = foundFolder([
        path.join(cliDir, "template", frameworkResult.value, cssResult.value)
    ]);

    if (isErr(resultPath)) {
        return resultPath;
    }

    return createOk({
        path: resultPath.value,
        styleSheet: createSome(cssResult.value)
    });
}
