import { cors } from "@elysiajs/cors"
import { serverTiming } from "@elysiajs/server-timing"
import { swagger ,type ElysiaSwaggerConfig} from "@elysiajs/swagger"
import { compile as c, trpc } from "@elysiajs/trpc"
import { initTRPC } from "@trpc/server"
import { type Elysia, t as T } from "elysia"
import { LOGESTIC } from "./tools/logger"

const t = initTRPC.create()
const p = t.procedure

const router = t.router({
	greet: p

		// 💡 Using Zod
		//.input(z.string())
		// 💡 Using Elysia's T
		.input(c(T.String()))
		.query(({ input }) => input),
})

export type Router = typeof router



const swaggerConfig:ElysiaSwaggerConfig= {
				documentation: {
					tags: [
						{ name: "OpenAI", description: "OpenAI API" },
						{ name: "Character", description: "Character API" },
					],
				},
				scalarConfig: {
					theme: "bluePlanet",
					forceDarkModeState: "dark",
					defaultHttpClient: { targetKey: "javascript", clientKey: "fetch" },
				},
			}


export function plugin(app: Elysia) {
	return app
		.use(
			swagger(swaggerConfig),
		)
		.use(trpc(router))
		.use(LOGESTIC)
		.use(serverTiming())
		.use(cors())
}
