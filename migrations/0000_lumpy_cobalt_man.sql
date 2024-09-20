CREATE TABLE IF NOT EXISTS "messages" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"user_id" uuid NOT NULL,
	"conversation_id" uuid NOT NULL,
	"query" text NOT NULL,
	"completion" text NOT NULL,
	"tools_response" text
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "messages" USING btree ("user_id");