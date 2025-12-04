-- Create the verses table to store Quran verses
CREATE TABLE IF NOT EXISTS verses (
  id SERIAL PRIMARY KEY,
  surah_name VARCHAR(255) NOT NULL,
  ayah_no INTEGER NOT NULL,
  english TEXT NOT NULL,
  arabic TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(surah_name, ayah_no)
);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_surah_name ON verses(surah_name);
CREATE INDEX IF NOT EXISTS idx_ayah_no ON verses(ayah_no);
