/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthAuthImport } from './routes/auth/_auth'
import { Route as AppAppImport } from './routes/app/_app'
import { Route as AppAppIndexImport } from './routes/app/_app.index'
import { Route as AuthAuthLoginImport } from './routes/auth/_auth.login'
import { Route as AppAppAboutImport } from './routes/app/_app.about'

// Create Virtual Routes

const AuthImport = createFileRoute('/auth')()
const AppImport = createFileRoute('/app')()

// Create/Update Routes

const AuthRoute = AuthImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const AppRoute = AppImport.update({
  path: '/app',
  getParentRoute: () => rootRoute,
} as any)

const AuthAuthRoute = AuthAuthImport.update({
  id: '/_auth',
  getParentRoute: () => AuthRoute,
} as any)

const AppAppRoute = AppAppImport.update({
  id: '/_app',
  getParentRoute: () => AppRoute,
} as any)

const AppAppIndexRoute = AppAppIndexImport.update({
  path: '/',
  getParentRoute: () => AppAppRoute,
} as any)

const AuthAuthLoginRoute = AuthAuthLoginImport.update({
  path: '/login',
  getParentRoute: () => AuthAuthRoute,
} as any)

const AppAppAboutRoute = AppAppAboutImport.update({
  path: '/about',
  getParentRoute: () => AppAppRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/app': {
      id: '/app'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/app/_app': {
      id: '/app/_app'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof AppAppImport
      parentRoute: typeof AppRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/auth/_auth': {
      id: '/auth/_auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthAuthImport
      parentRoute: typeof AuthRoute
    }
    '/app/_app/about': {
      id: '/app/_app/about'
      path: '/about'
      fullPath: '/app/about'
      preLoaderRoute: typeof AppAppAboutImport
      parentRoute: typeof AppAppImport
    }
    '/auth/_auth/login': {
      id: '/auth/_auth/login'
      path: '/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthAuthLoginImport
      parentRoute: typeof AuthAuthImport
    }
    '/app/_app/': {
      id: '/app/_app/'
      path: '/'
      fullPath: '/app/'
      preLoaderRoute: typeof AppAppIndexImport
      parentRoute: typeof AppAppImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AppRoute: AppRoute.addChildren({
    AppAppRoute: AppAppRoute.addChildren({
      AppAppAboutRoute,
      AppAppIndexRoute,
    }),
  }),
  AuthRoute: AuthRoute.addChildren({
    AuthAuthRoute: AuthAuthRoute.addChildren({ AuthAuthLoginRoute }),
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/app",
        "/auth"
      ]
    },
    "/app": {
      "filePath": "app",
      "children": [
        "/app/_app"
      ]
    },
    "/app/_app": {
      "filePath": "app/_app.tsx",
      "parent": "/app",
      "children": [
        "/app/_app/about",
        "/app/_app/"
      ]
    },
    "/auth": {
      "filePath": "auth",
      "children": [
        "/auth/_auth"
      ]
    },
    "/auth/_auth": {
      "filePath": "auth/_auth.tsx",
      "parent": "/auth",
      "children": [
        "/auth/_auth/login"
      ]
    },
    "/app/_app/about": {
      "filePath": "app/_app.about.tsx",
      "parent": "/app/_app"
    },
    "/auth/_auth/login": {
      "filePath": "auth/_auth.login.tsx",
      "parent": "/auth/_auth"
    },
    "/app/_app/": {
      "filePath": "app/_app.index.tsx",
      "parent": "/app/_app"
    }
  }
}
ROUTE_MANIFEST_END */
