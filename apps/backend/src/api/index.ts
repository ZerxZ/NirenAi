import { Elysia } from "elysia"
import { LOGGER } from "@niren-ai/backend/tools/logger"


export const ApiController = new Elysia({
	prefix: "/api",
	detail: {
		tags: ["Api"],
	},
})
.get("/status", () => {
	
	LOGGER.info("API is running!")
	return "API is running!"
})
