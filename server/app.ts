import { Hono } from "hono";
import { logger } from "hono/logger";
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"
import { serveStatic } from 'hono/bun'

const app = new Hono();
const api = new Hono();

const testPostSchema = z.object({
  name: z.string(),
  age: z.number(),
});

api.post(
    '/test',
    zValidator('json', testPostSchema),
    async (c) => {
        const { name, age } = c.req.valid('json');
        return c.json({ name, age });
    }
)
api.get('/hello', (c) => c.text('Hello, World!'));

app.route('/api', api); 
app.use(logger());


app.use('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export default app;