import { Hono } from "hono";
import { logger } from "hono/logger";
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"
import { serveStatic } from 'hono/bun'
import { authRoute } from "./routes/auth";
import messagesApiRouter from "./routes/messages";

const app = new Hono();
const api = new Hono();

app.use(logger());

const apiRoutes = api.basePath('/api').route('/auth', authRoute).route('/messages', messagesApiRouter);

app.route('/', apiRoutes);
app.use('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))


export default app;
export type AppType = typeof apiRoutes