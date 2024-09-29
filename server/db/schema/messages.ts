import { pgTable, text, index } from 'drizzle-orm/pg-core';
import { baseModel } from './baseModel';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import type { InferSelectModel } from 'drizzle-orm';

export const messages = pgTable('messages', {
  ...baseModel,
  userId: text('user_id').notNull(),
  message: text('message').notNull(),
}, (table) => {
  return {
    userIdIndex: index('user_id_idx').on(table.userId),
  }
});
export type Message = InferSelectModel<typeof messages>;

export const insertMessageSchema = createInsertSchema(messages, {
    message: z.string().min(1),
})

export const selectMessageSchema = createSelectSchema(messages);