export function VerseCard({ verse }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg">
      {/* Surah Name Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="text-sm font-medium text-primary">
          {verse.surah_name} - Verse {verse.ayah_no}
        </span>
      </div>

      {/* Arabic Text */}
      <div className="mb-6 text-right">
        <p className="text-balance text-3xl leading-loose text-foreground sm:text-4xl">{verse.arabic}</p>
      </div>

      {/* Divider */}
      <div className="relative mb-6 h-px bg-gradient-to-r from-transparent via-border to-transparent">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background p-2">
          <svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* English Translation */}
      <div>
        <p className="text-balance text-lg leading-relaxed text-muted-foreground">{verse.english}</p>
      </div>
    </div>
  )
}
