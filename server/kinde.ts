import { createKindeServerClient, GrantType, type SessionManager, type UserType } from "@kinde-oss/kinde-typescript-sdk"
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { createFactory, createMiddleware } from "hono/factory";

if (!process.env.KINDE_DOMAIN || !process.env.KINDE_CLIENT_ID || !process.env.KINDE_CLIENT_SECRET || !process.env.KINDE_REDIRECT_URI || !process.env.KINDE_LOGOUT_REDIRECT_URI) {
  throw new Error("Missing Kinde environment variables")
}

export const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: process.env.KINDE_DOMAIN,
  clientId: process.env.KINDE_CLIENT_ID,
  clientSecret: process.env.KINDE_CLIENT_SECRET,
  redirectURL: process.env.KINDE_REDIRECT_URI,
  logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI,
})


let store: Record<string, unknown> = {};

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    const result = getCookie(c, key);
    return result;
  },
  async setSessionItem(key: string, value: unknown) {
    if (typeof value === "string") {
      setCookie(c, key, value);
    } else {
      setCookie(c, key, JSON.stringify(value));
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
      deleteCookie(c, key);
    });
  },
});

type Env = {
  Variables: {
    user: UserType
  }
}


export const isAuthenticatedMiddleware = createMiddleware<Env>(async (c, next) => {
  try {
    const isAuthenticated = await kindeClient.isAuthenticated(sessionManager(c));
    if (!isAuthenticated) {
        return c.json({ error: 'Unauthorized' }, 401);
    }
  
    const user = await kindeClient.getUserProfile(sessionManager(c));
    if (user.email.includes('szwajka')) {
      // :) 
      c.set('user', user);
      await next();
    } else {
      return c.json({ error: 'Unauthorized' }, 401);
    }

  } catch (error) {
    console.error(error)
    return c.json({ error: 'Unauthorized' }, 401);
  }
})
