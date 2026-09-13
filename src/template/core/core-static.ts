import type { Option } from "ts-utility-kit/option";
import type { Css } from "@/shared/tech.static";

export interface TechMaterial {
  path: string;
  styleSheet: Option<Css>;
}

export interface RunSuccess {
  name: string;
}
