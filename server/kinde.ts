import { createKindeServerClient, GrantType, type SessionManager, type UserType } from "@kinde-oss/kinde-typescript-sdk"
import { createFactory, createMiddleware } from "hono/factory";

if (!process.env.KINDE_DOMAIN || !process.env.KINDE_CLIENT_ID || !process.env.KINDE_CLIENT_SECRET || !process.env.KINDE_REDIRECT_URI || !process.env.KINDE_LOGOUT_REDIRECT_URI) {
  throw new Error("Missing Kinde environment variables")
}

export const kindeServerClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: process.env.KINDE_DOMAIN,
  clientId: process.env.KINDE_CLIENT_ID,
  clientSecret: process.env.KINDE_CLIENT_SECRET,
  redirectURL: process.env.KINDE_REDIRECT_URI,
  logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI,
})



let store: Record<string, unknown> = {};

export const sessionManager: SessionManager = {
  async getSessionItem(key: string) {
    return store[key];
  },
  async setSessionItem(key: string, value: unknown) {
    store[key] = value;
  },
  async removeSessionItem(key: string) {
    delete store[key];
  },
  async destroySession() {
    store = {};
  }
};

type Env = {
  Variables: {
    user: UserType
  }
}


export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const isAuthenticated = await kindeServerClient.isAuthenticated(sessionManager);
    if (!isAuthenticated) {
        return c.json({ error: 'Unauthorized' }, 401);
    }
  
    const user = await kindeServerClient.getUserProfile(sessionManager);
    console.log('user', user)
    c.set('user', user);
    await next();
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Unauthorized' }, 401);
  }
})
