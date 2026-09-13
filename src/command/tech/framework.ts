import { select } from "@clack/prompts";
import { onPromptCancel } from "../common/command-core";
import { isFramework } from "./validation";
import { techSchema } from "@/shared/tech.static";
import { isSome, type Option } from "ts-utility-kit/option";
import { checkPromiseReturn, createErr, createOk, isErr } from "ts-utility-kit/result";

export async function selectFramework(optionFramework: Option<unknown>) {
  if (isSome(optionFramework) && isFramework(optionFramework.value)) {
    return createOk(optionFramework.value);
  }

  const response = await checkPromiseReturn({
    fn: async () =>
      await select({
        message: "Select a framework for your project:",
        options: techSchema.frameworks.map(({ label, value }) => ({
          label,
          value,
        })),
        initialValue: techSchema.frameworks[0].value,
      }),
    err: (error) => {
      if (error instanceof Error) {
        return createErr(new Error(`Prompt failed: ${error.message}`));
      }
      return createErr(new Error("Prompt failed: Unknown error"));
    },
  });

  if (isErr(response)) {
    return response;
  }

  onPromptCancel(response.value);

  if (isFramework(response.value)) {
    return createOk(response.value);
  }

  return createErr(new Error("Framework selection is invalid"));
}
