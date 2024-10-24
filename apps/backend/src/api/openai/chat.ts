import { ChatOpenAI } from "@langchain/openai";
import {Elysia,t} from "elysia";
export const body = t.Object({
    content: t.String(),
    apiKey: t.String(),
    baseURL: t.String(),
    model: t.String()
});

export const  response = t.String();

export const ChatController = new Elysia().ws("/chat",{
    body,
    response,
    async message(ws,message) {
        //@ts-ignore
        const {logestic, body} = ws.data;
        const {content, apiKey, baseURL,model} = body;
        logestic.info(`Received message: ${message}`);
        const chat = new ChatOpenAI(
            {
                model: model,
                apiKey: apiKey,
            
            },
            {
                baseURL: baseURL
            }
        );
        const result = (await chat.invoke([{role: "user", content}]));
        console.log(result);
        ws.send(result.content.toString());
        logestic.info(`Sent message: ${result.content}`);
    }
})