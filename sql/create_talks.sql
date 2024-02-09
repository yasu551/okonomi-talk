CREATE TABLE IF NOT EXISTS talks (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  speaker TEXT,
  description TEXT,
  place TEXT NOT NULL,
  start_at TEXT NOT NULL,
  finish_at TEXT NOT NULL,
  url TEXT
)
