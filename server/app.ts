import { Hono } from "hono";
import { logger } from "hono/logger";
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"

const app = new Hono();

const testPostSchema = z.object({
  name: z.string(),
  age: z.number(),
});

const route = app.post(
    '/test',
    zValidator('json', testPostSchema),
    async (c) => {
        const { name, age } = c.req.valid('json');
        return c.json({ name, age });
    }
)

app.use(logger());
app.get("/", (c) => c.text("Hello, World!"));

export default app;