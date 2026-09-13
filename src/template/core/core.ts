import { installApp } from "../tech/installer";
import { resolveTemplate } from "../tech/setting";
import { isErr, type Result, type Unit } from "ts-utility-kit/result";

export async function createApp({ appPath }: { appPath: string }): Promise<Result<Unit, Error>> {
  const materialResult = await resolveTemplate();

  if (isErr(materialResult)) {
    return materialResult;
  }

  return await installApp({
    appPath,
    material: materialResult.value,
  });
}
