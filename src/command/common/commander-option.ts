import { optionConversion, type Option } from "ts-utility-kit/option";
import { commanderCore } from "./command-core";

async function optionCommand(opt: unknown): Promise<Option<unknown>> {
    return optionConversion(opt);
}

export const optionName: Promise<Option<unknown>> = (async function () {
    const program = await commanderCore;

    return await optionCommand(program.opts().name);
})();

export const optionFramework: Promise<Option<unknown>> = (async function () {
    const program = await commanderCore;

    return await optionCommand(program.opts().framework);
})();

export const optionCss: Promise<Option<unknown>> = (async function () {
    const program = await commanderCore;

    const css = program.opts().css;

    return await optionCommand(css);
})();

export const optionUseAllComponents: Promise<Option<unknown>> =
    (async function () {
        const program = await commanderCore;

        return await optionCommand(program.opts().useAllComponents);
    })();
