# To-Do App — Natural Language Task Planner

Type your to-dos the way you'd say them out loud. The app splits a block of
free-form text into individual tasks, then figures out each one's **category**
and **due date/time** so your list is automatically organized by when things
are actually due.

```
Finish the quarterly report by Friday 5pm, buy groceries tomorrow morning,
call the dentist next Monday, pay rent on the 1st, urgent: submit tax
documents by end of day
```

turns into 5 tasks, grouped into **Today / Tomorrow / This Week / Later / No
Date**, each tagged with a category (Work, Shopping, Health, Finance, ...)
and a priority.

## How it works

Everything runs client-side, no backend or account needed:

1. **Splitting** (`src/lib/splitTasks.ts`) — breaks the input on hard
   separators (newlines, `;`, list markers) and then on soft separators
   (`,`, "and", "then", "also") *only* when what follows looks like the start
   of a new task (a recognized action verb such as "buy", "call", "finish",
   optionally preceded by a marker like "urgent:"). This avoids splitting
   "buy milk and eggs" into two tasks while still splitting "call mom and buy
   groceries".
2. **Date/time extraction** (`src/lib/parseDate.ts`) — uses
   [chrono-node](https://github.com/wanasit/chrono) to find and parse the
   natural-language date/time reference in each task ("tomorrow", "next
   Monday", "by Friday 5pm", "end of day", ...), removes it from the title,
   and records whether a specific time (not just a date) was given.
3. **Categorization & priority** (`src/lib/categorize.ts`) — keyword-based
   classification into a fixed set of categories, plus priority detection
   from words like "urgent" / "asap" / "someday".
4. **Grouping** (`src/lib/groupTasks.ts`) — buckets tasks into Overdue /
   Today / Tomorrow / This Week / Later / No Date and sorts each bucket
   chronologically.

Since natural-language parsing is never perfect, every field (title,
category, priority, due date) is directly editable in the task list.

Tasks persist in `localStorage`, so your list survives a page reload.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build
npm run test      # run the parsing unit tests
npm run lint      # lint
```

## Project structure

```
src/
  lib/            parsing, categorization, grouping, formatting (+ unit tests)
  hooks/useTasks  localStorage-backed task state
  components/     TaskInput, TaskList, TaskItem, Filters
  types.ts        Task, Category, Priority
```
