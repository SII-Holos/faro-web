import { cn } from "@/lib/utils"
import type { SearchResult } from "@/api/client"

interface ResultCardProps {
  result: SearchResult
  isDark: boolean
  index: number
}

/** Format a Unix timestamp to a relative time string like "3 days ago". */
function relativeTime(unix: number): string | null {
  if (!unix) return null
  const seconds = Math.floor(Date.now() / 1000 - unix)
  if (seconds < 60) return "just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`
  return `${Math.floor(seconds / 2592000)} months ago`
}

export function ResultCard({ result, isDark, index }: ResultCardProps) {
  const metaParts: string[] = [result.domain]
  if (result.language) metaParts.push(result.language)
  if (result.word_count) metaParts.push(`${result.word_count} words`)
  if (result.author) metaParts.push(`by ${result.author}`)
  const timeAgo = relativeTime(result.published_at)
  if (timeAgo) metaParts.push(timeAgo)

  return (
    <div className="group cursor-pointer" style={{ animationDelay: `${index * 60}ms` }}>
      {/* URL + redirect indicator */}
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-xs ${isDark ? "text-dark-sea" : "text-light-sea"}`}>{result.url}</span>
        {result.redirected_from && (
          <span className={`text-xs ${isDark ? "text-dark-text-dim" : "text-light-text-mid"}`}>
            → {result.redirected_from}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className={cn(
          "text-xl group-hover:underline mb-1 transition-colors",
          isDark ? "text-dark-text" : "text-light-text",
        )}
      >
        <a href={result.url} target="_blank" rel="noopener noreferrer">
          {result.title}
        </a>
      </h3>

      {/* Snippet */}
      <p className={cn("text-sm leading-relaxed", isDark ? "text-dark-text-mid" : "text-light-text-mid")}>
        {result.content}
      </p>

      {/* Meta line */}
      <p className={`text-xs mt-1 ${isDark ? "text-dark-text-dim" : "text-light-text-mid"}`}>{metaParts.join(" · ")}</p>
    </div>
  )
}
