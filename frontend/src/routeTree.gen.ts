/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthImport } from './routes/_auth'
import { Route as AuthenticatedAppImport } from './routes/_authenticated/_app'
import { Route as AuthLoginImport } from './routes/_auth/login'
import { Route as AuthenticatedAppIndexImport } from './routes/_authenticated/_app/index'
import { Route as AuthenticatedAppProfileImport } from './routes/_authenticated/_app/profile'
import { Route as AuthenticatedAppAboutImport } from './routes/_authenticated/_app/about'

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedAppRoute = AuthenticatedAppImport.update({
  id: '/_app',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

const AuthenticatedAppIndexRoute = AuthenticatedAppIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedAppRoute,
} as any)

const AuthenticatedAppProfileRoute = AuthenticatedAppProfileImport.update({
  path: '/profile',
  getParentRoute: () => AuthenticatedAppRoute,
} as any)

const AuthenticatedAppAboutRoute = AuthenticatedAppAboutImport.update({
  path: '/about',
  getParentRoute: () => AuthenticatedAppRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_authenticated/_app': {
      id: '/_authenticated/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedAppImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_app/about': {
      id: '/_authenticated/_app/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AuthenticatedAppAboutImport
      parentRoute: typeof AuthenticatedAppImport
    }
    '/_authenticated/_app/profile': {
      id: '/_authenticated/_app/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthenticatedAppProfileImport
      parentRoute: typeof AuthenticatedAppImport
    }
    '/_authenticated/_app/': {
      id: '/_authenticated/_app/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedAppIndexImport
      parentRoute: typeof AuthenticatedAppImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AuthRoute: AuthRoute.addChildren({ AuthLoginRoute }),
  AuthenticatedRoute: AuthenticatedRoute.addChildren({
    AuthenticatedAppRoute: AuthenticatedAppRoute.addChildren({
      AuthenticatedAppAboutRoute,
      AuthenticatedAppProfileRoute,
      AuthenticatedAppIndexRoute,
    }),
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/_authenticated"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/login"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/_app"
      ]
    },
    "/_auth/login": {
      "filePath": "_auth/login.tsx",
      "parent": "/_auth"
    },
    "/_authenticated/_app": {
      "filePath": "_authenticated/_app.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/_app/about",
        "/_authenticated/_app/profile",
        "/_authenticated/_app/"
      ]
    },
    "/_authenticated/_app/about": {
      "filePath": "_authenticated/_app/about.tsx",
      "parent": "/_authenticated/_app"
    },
    "/_authenticated/_app/profile": {
      "filePath": "_authenticated/_app/profile.tsx",
      "parent": "/_authenticated/_app"
    },
    "/_authenticated/_app/": {
      "filePath": "_authenticated/_app/index.tsx",
      "parent": "/_authenticated/_app"
    }
  }
}
ROUTE_MANIFEST_END */
