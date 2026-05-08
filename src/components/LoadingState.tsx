/**
 * Loading state — skeleton cards with pulse animation.
 *
 * Uses a simple CSS pulse instead of Framer Motion to keep the loading
 * indicator lightweight (it's visible while data is being fetched, so
 * minimal JS overhead matters).
 */

interface LoadingStateProps {
  isDark: boolean
  count?: number
}

export function LoadingState({ isDark, count = 5 }: LoadingStateProps) {
  return (
    <div className="space-y-7">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="animate-pulse">
          {/* URL line */}
          <div className={`h-3 rounded mb-2 ${isDark ? "bg-dark-border" : "bg-light-border"} w-48`} />
          {/* Title */}
          <div className={`h-5 rounded mb-2 ${isDark ? "bg-dark-border" : "bg-light-border"} w-3/4`} />
          {/* Snippet line 1 */}
          <div className={`h-3.5 rounded mb-1 ${isDark ? "bg-dark-border" : "bg-light-border"} w-full`} />
          {/* Snippet line 2 */}
          <div className={`h-3.5 rounded ${isDark ? "bg-dark-border" : "bg-light-border"} w-5/6`} />
        </div>
      ))}
    </div>
  )
}
