import { Hono } from "hono";
import { getUser, kindeServerClient, sessionManager } from "../kinde";

export const authRoute = new Hono().get("/login", async (c) => {
    const loginUrl = await kindeServerClient.login(sessionManager);
    return c.redirect(loginUrl.toString());
  }).get("/register", async (c) => {
    const registerUrl = await kindeServerClient.register(sessionManager);
    return c.redirect(registerUrl.toString());
  }).get("/callback", async (c) => {
    const callbackUrl = new URL(c.req.url);
    console.log('callbackUrl data: ', c.req);
    await kindeServerClient.handleRedirectToApp(sessionManager, callbackUrl);
    return c.redirect(callbackUrl.toString());
  }).get("/logout", async (c) => {
    const logoutUrl = await kindeServerClient.logout(sessionManager);
    console.log('logoutUrl data: ', c.req);
    return c.redirect(logoutUrl.toString());
  }).get("/me", getUser, async (c) => {
    const user = c.var.user;
    return c.json({user});
  });
  