-- WeDo Database Setup
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Create workspaces table
CREATE TABLE IF NOT EXISTS workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  done BOOLEAN DEFAULT FALSE
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) - allow all operations for now
-- You can customize these policies later for better security
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (for simplicity)
-- In production, you may want to restrict these based on workspace membership
-- Note: If policies already exist, you may need to drop them first or modify the names
DROP POLICY IF EXISTS "Allow all operations on workspaces" ON workspaces;
CREATE POLICY "Allow all operations on workspaces" ON workspaces
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all operations on todos" ON todos;
CREATE POLICY "Allow all operations on todos" ON todos
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all operations on messages" ON messages;
CREATE POLICY "Allow all operations on messages" ON messages
  FOR ALL USING (true) WITH CHECK (true);

-- Enable Realtime for todos and messages tables
-- Note: If these commands fail, you can enable Realtime manually in Supabase:
-- Go to Database → Replication → Enable for 'todos' and 'messages' tables
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE todos;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE messages;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_todos_workspace_id ON todos(workspace_id);
CREATE INDEX IF NOT EXISTS idx_messages_workspace_id ON messages(workspace_id);
CREATE INDEX IF NOT EXISTS idx_workspaces_code ON workspaces(code);

