import type { Option } from "ts-utility-kit/option";
import { techSchema, type Css } from "@/shared/tech.static";
import { cssCommand } from "../css/css-core";
import { isCss } from "./validation";

export async function selectCss(optionCss: Option<unknown>) {
  return await cssCommand<Css>({
    optionCss,
    isCss,
    csses: techSchema.css.map(({ label, value }) => ({
      title: label,
      value,
    })),
  });
}
