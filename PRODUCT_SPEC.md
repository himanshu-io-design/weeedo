This project is a small web app called WeDo.
The frontend is already done in this codebase and matches my Figma design.
Do NOT change the visual styles, layouts, or text. Only wire up the backend and logic.

Goal:
Make this a fully working real-time collaborative app using Supabase as the backend. Multiple people can join the same workspace and see:

shared to-do list (add/toggle/delete)

shared group chat (send/receive messages)
updating live.

How it should work (user flow):

On the landing flow, a user can either:

Create a workspace → they enter their name and a workspace name.

The app generates a short workspace code.

That code + workspace name are saved in the database as a new workspace.

The user is then taken to the main dashboard for that workspace.

Join a workspace → they enter a workspace code and their name.

The app checks if that workspace code exists.

If it exists, they join its dashboard. If not, show an error.

On the workspace dashboard:

The top area shows:

Workspace name

Workspace code + a small “copy” icon that copies the code to clipboard.

On the left is the To-do list:

Everyone in that workspace sees the same list.

A text input + button lets you add a new task.

Each task has:

text

who created it (user name)

a checkbox to mark it done

a delete button

When any user adds/toggles/deletes a task, the list updates in real-time for everyone in that workspace (no refresh).

On the right is the Group chat:

Everyone in that workspace sees the same messages.

There is a messages area, and an input for sending a message.

Each message shows:

author name

text

time sent

Messages from the current user are right-aligned; others are left-aligned.

When any user sends a message, it appears in real-time for everyone.

Backend requirements (Supabase):

Use Supabase as the backend.

Set up tables for:

workspaces (workspace id/code + name + created_at)

todos (id, workspace_id, text, created_by, created_at, done)

messages (id, workspace_id, author, text, created_at)

Use Supabase realtime so that changes in todos and messages broadcast instantly to all clients in the same workspace (no manual refresh).

Client behavior details:

Store the user’s display name in memory (and optionally localStorage) so it’s used for:

“created_by” on todos

“author” on messages

When I have two browser windows open on the same workspace code:

Adding / toggling / deleting todos in one window should appear almost immediately in the other.

Sending a chat message in one window should appear almost immediately in the other.

VERY IMPORTANT:

The design is already pixel-perfect. Please do not redesign the UI.

Only:

connect components to Supabase,

set up the database tables and realtime subscriptions,

add minimal logic to make everything function.

Deliverables from you (Cursor):

Set up Supabase integration for this app:

A clear place where I can paste my Supabase URL and anon key (for example, a single config file).

Database tables created in my Supabase project (you can provide the SQL for me to run in the Supabase SQL editor).

Frontend wired up so:

“create workspace” writes to Supabase

“join workspace” reads and checks the workspace

todos and messages read from Supabase and update via realtime

Add a short README in the repo that tells me:

where to paste my Supabase URL/key

how to run the project locally (the exact npm command)

how to test real-time (open 2 windows in same workspace code).

Assume I know zero coding, so please keep file changes organized and explain what you changed in simple language.