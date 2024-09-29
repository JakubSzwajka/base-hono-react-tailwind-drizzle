import { z } from 'zod'

export const createMessageSchema = z.object({
    message: z.string().min(1)
})

export type CreateMessageSchema = z.infer<typeof createMessageSchema>
