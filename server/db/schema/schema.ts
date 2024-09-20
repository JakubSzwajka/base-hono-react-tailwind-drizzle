import { pgTable, text, timestamp, uuid, index } from 'drizzle-orm/pg-core';

const baseModel = {
  id: uuid('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const message = pgTable('messages', {
  ...baseModel,
  userId: uuid('user_id').notNull(),
  conversationId: uuid('conversation_id').notNull(),
  query: text('query').notNull(),
  completion: text('completion').notNull(),
  toolsResponse: text('tools_response'),
}, (table) => {
  return {
    userIdIndex: index('user_id_idx').on(table.userId),
  }
});