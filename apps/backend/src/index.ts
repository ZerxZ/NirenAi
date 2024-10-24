import { ChatOpenAI } from "@langchain/openai"
import { Elysia, t as T } from "elysia"
import { ApiController } from "./api"
import { plugin } from "./plugin"

const app = new Elysia()
	.use(plugin)
	.use(ApiController)
	.get("/", ({ logestic }) => {
		logestic.info("Hello, world!")
		return "Hello, world!"
	})

export type App = typeof app

app.listen(3000, async (server) => {
	const createBoxText = (text: string, width: number): string => {
		const paddingLength = Math.max(0, (width - text.length) / 2)
		const padding = " ".repeat(paddingLength)
		return `${padding}${text}${padding}`.padEnd(width)
	}
	const ELYSIA_VERSION = (await import("elysia/package.json")).version
	const url = server.url.toString()
	const swaggerUrl = `${url}swagger`
	const title = `🦊 Elysia v${ELYSIA_VERSION}`
	const message = `🦊 Elysia is running at ${url}`
	
	const swaggerMessage = `🦊 View documentation at ${swaggerUrl}`
	const boxWidth = Math.max(title.length, message.length, swaggerMessage.length ) + 4
	const border = "─".repeat(boxWidth)
	const emptyLine = createBoxText("", boxWidth)
	console.log(`
      ┌${border}┐
      │${emptyLine}│
      │${createBoxText(title, boxWidth)}│
      │${createBoxText(message , boxWidth)}│
      │${createBoxText(swaggerMessage , boxWidth)}│
      │${emptyLine}│
      └${border}┘
`)
})
