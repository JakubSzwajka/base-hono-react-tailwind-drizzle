import { hc } from 'hono/client'
import { type AppType } from '@server/app'
import { queryOptions } from '@tanstack/react-query'

const apiClient = hc<AppType>('/')

export const api = apiClient.api


const getUser = async () => {
    const response = await api.auth['me'].$get()
    if (!response.ok) {
      throw new Error('Failed to fetch')
    }
    const data = await response.json()
    return data
  }

export const userQueryOptions = queryOptions({ queryKey: ['user'], queryFn: getUser, staleTime: Infinity })