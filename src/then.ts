import { log } from "@clack/prompts";

export function showNextSteps() {
    log.message(`Package install:\n\n ex) npm install`);
    log.message(`Application launch:\n\n ex) npm run dev`);
}
