# Quranic Verses Application

A beautiful Next.js application that fetches and displays verses from the Holy Quran using the Quran API and Supabase.

## Features

- 📖 Fetches verses from Quran API
- 💾 Stores verses in Supabase database
- 🎨 Beautiful, responsive UI with Arabic and English text
- 🌙 Dark mode support
- ⚡ Built with Next.js 15 and Tailwind CSS

## Setup Instructions

### 1. Supabase Setup

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign in
3. Click "New project"
4. Fill in:
   - **Name**: quran-verses (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is fine
5. Click "Create new project" (wait 2-3 minutes for setup)

### 2. Get Supabase Credentials

Once your project is ready:

1. In your Supabase dashboard, click on "Project Settings" (gear icon in sidebar)
2. Click on "API" in the left menu
3. You'll see:
   - **Project URL** (starts with https://xxxxx.supabase.co)
   - **anon/public key** (a long string starting with eyJ...)
   - **service_role key** (another long string - keep this SECRET!)

### 3. Create Database Table

1. In Supabase dashboard, click "SQL Editor" in the left sidebar
2. Click "New query"
3. Copy the contents of `scripts/01-create-verses-table.sql` from this project
4. Paste it into the SQL editor
5. Click "Run" (or press Cmd/Ctrl + Enter)
6. You should see "Success. No rows returned"

### 4. Download and Set Up the Project

1. **Download the project**:
   - Click the three dots (⋯) at the top right of the code block
   - Click "Download ZIP"
   - Extract the ZIP file to your desired location

2. **Install dependencies**:
   \`\`\`bash
   cd quran-verses
   npm install
   \`\`\`

3. **Set up environment variables**:
   - Create a file called `.env.local` in the root of your project
   - Add the following (replace with your actual Supabase values):
   
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   \`\`\`

### 5. Seed the Database

Run the seed script to fetch verses from the Quran API and save them to Supabase:

\`\`\`bash
npm run seed
\`\`\`

You should see output like:
\`\`\`
[v0] Starting to fetch verses from Quran API...
[v0] Fetching Surah 1, Ayah 1...
[v0] Successfully saved: Al-Fatihah - Ayah 1
...
[v0] Finished seeding verses!
\`\`\`

### 6. Run the Application

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app!

## Project Structure

\`\`\`
quran-verses/
├── app/
│   ├── api/
│   │   └── verses/
│   │       └── route.js          # API endpoint to fetch verses from Supabase
│   ├── globals.css                # Global styles and theme
│   ├── layout.jsx                 # Root layout
│   └── page.jsx                   # Main page component
├── components/
│   └── verse-card.jsx             # Reusable verse card component
├── lib/
│   └── supabase.js                # Supabase client configuration
├── scripts/
│   ├── 01-create-verses-table.sql # SQL script to create database table
│   └── 02-seed-verses.js          # Script to fetch and save verses
├── .env.local                     # Environment variables (you create this)
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
\`\`\`

## How It Works

1. **Database**: The `verses` table stores Quran verses with surah name, ayah number, Arabic text, and English translation
2. **Seeding**: The seed script fetches verses from the Quran API and stores them in Supabase
3. **Backend**: Next.js API route (`/api/verses`) queries Supabase and returns verses
4. **Frontend**: React components fetch verses and display them beautifully

## Troubleshooting

**Error: Missing Supabase environment variables**
- Make sure your `.env.local` file exists and has the correct values
- Restart the dev server after creating/modifying `.env.local`

**No verses showing up**
- Make sure you ran `npm run seed` successfully
- Check the Supabase dashboard → Table Editor → verses table to verify data exists

**Seed script fails**
- Double-check your `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`
- Make sure the SQL table was created successfully

## Adding More Verses

To add more verses, edit `scripts/02-seed-verses.js` and add more entries to the `versesToFetch` array:

\`\`\`js
const versesToFetch = [
  { surah: 1, ayah: 1 },
  { surah: 2, ayah: 255 },
  // Add more verses here
  { surah: 18, ayah: 10 },
]
\`\`\`

Then run `npm run seed` again.

## License

This project is open source and available for educational purposes.
