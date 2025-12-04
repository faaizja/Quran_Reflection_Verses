// Script to fetch verses from Quran API and save to Supabase
require("dotenv").config({ path: ".env.local" })
const { createClient } = require("@supabase/supabase-js")

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials. Please add them to your environment variables.")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Fetch a few verses from the Quran API
async function fetchAndSaveVerses() {
  console.log("[v0] Starting to fetch verses from Quran API...")

  // Fetch verses from different surahs
  const versesToFetch = [
    { surah: 1, ayah: 1 }, // Al-Fatihah
    { surah: 1, ayah: 2 },
    { surah: 2, ayah: 255 }, // Ayat al-Kursi
    { surah: 112, ayah: 1 }, // Al-Ikhlas
    { surah: 112, ayah: 2 },
    { surah: 112, ayah: 3 },
    { surah: 112, ayah: 4 },
  ]

  for (const verse of versesToFetch) {
    try {
      console.log(`[v0] Fetching Surah ${verse.surah}, Ayah ${verse.ayah}...`)

      // Fetch from Quran API
      const response = await fetch(`https://quranapi.pages.dev/api/${verse.surah}/${verse.ayah}.json`)

      if (!response.ok) {
        console.error(`Failed to fetch verse ${verse.surah}:${verse.ayah}`)
        continue
      }

      const data = await response.json()
      console.log("[v0] Received data:", JSON.stringify(data, null, 2))

      // Extract the verse data
      const verseData = {
        surah_name: data.surahName,
        ayah_no: data.ayahNo,
        english: data.english,
        arabic: data.arabic1,
      }

      console.log("[v0] Preparing to insert:", verseData)

      // Insert into Supabase
      const { data: insertedData, error } = await supabase
        .from("verses")
        .upsert(verseData, { onConflict: "surah_name,ayah_no" })
        .select()

      if (error) {
        console.error(`Error inserting verse:`, error)
      } else {
        console.log(`[v0] Successfully saved: ${data.surahName} - Ayah ${data.ayahNumber}`)
      }

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error) {
      console.error(`Error processing verse ${verse.surah}:${verse.ayah}:`, error)
    }
  }

  console.log("[v0] Finished seeding verses!")
}

fetchAndSaveVerses()
