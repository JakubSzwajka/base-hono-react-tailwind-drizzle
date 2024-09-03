import { Hono } from "hono";
import { logger } from "hono/logger";
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"
import { serveStatic } from 'hono/bun'
import { authRoute } from "./routes/auth";

const app = new Hono();
const api = new Hono();

app.use(logger());

const testPostSchema = z.object({
  name: z.string(),
  age: z.number(),
});


const testApi = new Hono();
const testRoute = testApi.post(
    '/',
    zValidator('json', testPostSchema),
    async (c) => {
        const { name, age } = c.req.valid('json');
        return c.json({ name, age });
    }
).get('/hello', async (c) => {
    return c.json({ message: 'Hello, World!' });
});

const apiRoutes = api.route('/test', testRoute).route('/auth', authRoute);

app.route('/api', apiRoutes);
app.use('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))


export default app;
export type AppType = typeof apiRoutes