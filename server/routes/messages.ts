import { Hono } from "hono";
import { isAuthenticatedMiddleware } from "../kinde";
import { zValidator } from "@hono/zod-validator";
import { createMessageSchema } from "../sharedTypes";
import { decodeBase64 } from "hono/utils/encode";
import { db, messagesTable } from "../db";
import { insertMessageSchema } from "../db/schema/messages";


type Message = {
    id: number
    message: string
    createdAt: Date
    isUser: boolean
}


const messagesApi = new Hono()
const messagesApiRouter = messagesApi.get('/', async (c) => {
  const messages = await db.select().from(messagesTable)
  return c.json({
    items: messages
  })
}).post('/', isAuthenticatedMiddleware, zValidator("json", createMessageSchema), async (c) => {
  const { message } = c.req.valid("json")
  const validatedMessage = insertMessageSchema.parse({
    message,
    userId: c.get("user").id,
  })
  const result = await db.insert(messagesTable).values(validatedMessage).returning().then((res) => res[0])
  c.status(201)
  return c.json({
    item: result
  })
})

export default messagesApiRouter