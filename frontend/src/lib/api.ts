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


export const createMessage = async (message: string) => {
  const res = await api.messages.$post({
    json: {
      message
    }
  })
  return await res.json()
}


const getMessages = async () => {
  const res = await api.messages.$get()
  if (!res.ok) {
    throw new Error('Failed to fetch')
  }
  const data = await res.json()
  return data
}

export const getMessagesQueryOptions = queryOptions({ queryKey: ['messages'], queryFn: getMessages })
