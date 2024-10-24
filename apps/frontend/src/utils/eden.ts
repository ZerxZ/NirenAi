import { treaty, type Treaty } from "@elysiajs/eden";
import type { App } from "@niren-ai/backend/src";

export function createEdenClient(client = "localhost:3000", config: Treaty.Config = {}) {
    const configTreaty = Object.assign({}, config || {})
    return treaty<App>(client, configTreaty);
}