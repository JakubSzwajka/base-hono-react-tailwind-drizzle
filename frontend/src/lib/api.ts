import { hc } from 'hono/client'
import { type AppType } from '@server/app'

const apiClient = hc<AppType>('/')

export const api = apiClient.api