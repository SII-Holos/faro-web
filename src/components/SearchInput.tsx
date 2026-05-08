import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isDark: boolean
  /** Compact variant used in the results page header. */
  compact?: boolean
  placeholder?: string
  autoFocus?: boolean
}

export function SearchInput({
  value,
  onChange,
  onSubmit,
  isDark,
  compact = false,
  placeholder = "探索未知的世界...",
  autoFocus = false,
}: SearchInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex-1 max-w-2xl">
        <div
          className={cn(
            "flex items-center border-2 rounded-full px-5 py-2.5 transition-colors duration-150",
            isDark ? "border-dark-accent bg-dark-card" : "border-light-accent bg-white",
          )}
        >
          <Search className={`w-5 h-5 mr-3 ${isDark ? "text-dark-text-mid" : "text-light-text-mid"}`} />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={cn(
              "flex-1 outline-none bg-transparent",
              isDark
                ? "text-dark-text placeholder:text-dark-text-dim"
                : "text-light-text placeholder:text-light-text-mid",
            )}
          />
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-16">
      <div className="relative group">
        {/* Background glow on hover */}
        <div
          className={cn(
            "absolute inset-0 rounded-full blur-sm opacity-40 group-hover:opacity-60 transition-opacity duration-200",
            isDark ? "bg-dark-border" : "bg-white",
          )}
        />

        <div
          className={cn(
            "relative rounded-full shadow-lg flex items-center px-6 py-4 border-4 transition-colors duration-150",
            isDark ? "bg-dark-card border-dark-accent" : "bg-white border-light-accent",
          )}
        >
          <Search className={`w-6 h-6 mr-4 ${isDark ? "text-dark-text-mid" : "text-light-text-mid"}`} />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={cn(
              "flex-1 outline-none bg-transparent text-lg",
              isDark
                ? "text-dark-text placeholder:text-dark-text-dim"
                : "text-light-text placeholder:text-light-text-mid",
            )}
          />
          <button
            type="submit"
            className={cn(
              "ml-4 px-8 py-2 rounded-full transition-colors duration-150",
              isDark
                ? "bg-dark-accent hover:bg-dark-accent-glow text-white"
                : "bg-light-accent hover:bg-[#FF5252] text-white",
            )}
          >
            搜索
          </button>
        </div>
      </div>
    </form>
  )
}
