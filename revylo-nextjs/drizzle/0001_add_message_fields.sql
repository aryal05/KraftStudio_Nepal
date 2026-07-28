-- Add isStarred and priority fields to messages table
ALTER TABLE "messages" ADD COLUMN "isStarred" boolean DEFAULT false NOT NULL;
ALTER TABLE "messages" ADD COLUMN "priority" varchar(20) DEFAULT 'normal' NOT NULL;
