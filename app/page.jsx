"use client"

import { useEffect, useState } from "react"
import { VerseCard } from "@/components/verse-card"

export default function Home() {
  const [verses, setVerses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchVerses() {
      try {
        const response = await fetch("/api/verses")
        const data = await response.json()

        if (data.error) {
          setError(data.error)
        } else {
          setVerses(data.verses)
        }
      } catch (err) {
        console.error("[v0] Error fetching verses:", err)
        setError("Failed to load verses")
      } finally {
        setLoading(false)
      }
    }

    fetchVerses()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Quranic Verses</h1>
          </div>
          <p className="mt-3 text-center text-muted-foreground">Discover the beauty and wisdom of the Holy Quran</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
              <p className="text-muted-foreground">Loading verses...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mx-auto max-w-2xl rounded-xl border border-destructive/50 bg-destructive/10 p-6 text-center">
            <p className="text-destructive">{error}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Please make sure Supabase is configured and the database is set up correctly.
            </p>
          </div>
        )}

        {!loading && !error && verses.length === 0 && (
          <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              No verses found. Please run the seed script to add verses to the database.
            </p>
          </div>
        )}

        {!loading && !error && verses.length > 0 && (
          <div className="mx-auto max-w-4xl space-y-6">
            {verses.map((verse) => (
              <VerseCard key={verse.id} verse={verse} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Data provided by Quran API</p>
        </div>
      </footer>
    </div>
  )
}
