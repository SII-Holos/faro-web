import { motion } from "framer-motion"
import { LighthouseSvg } from "@/components/LighthouseSvg"
import { Decorations } from "@/components/Decorations"
import { SearchInput } from "@/components/SearchInput"
import { cn } from "@/lib/utils"

interface HomePageProps {
  isDark: boolean
  query: string
  onQueryChange: (q: string) => void
  onSearch: () => void
}

export function HomePage({ isDark, query, onQueryChange, onSearch }: HomePageProps) {
  return (
    <div
      className={cn(
        "h-screen overflow-auto transition-colors duration-300",
        isDark
          ? "bg-gradient-to-b from-dark-bg via-dark-bg-mid to-dark-bg-deep"
          : "bg-gradient-to-b from-light-bg-top via-light-bg-mid to-light-bg-deep",
      )}
    >
      <div className="relative flex flex-col items-center justify-center min-h-full px-6 py-8">
        {/* All decorative elements (boats, gulls, clouds, waves, compass, star) */}
        <Decorations isDark={isDark} />

        {/* Lighthouse illustration */}
        <motion.div
          className="mb-8 relative mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
        >
          <LighthouseSvg isDark={isDark} />
        </motion.div>

        {/* Brand title */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        >
          <h1
            className={cn(
              "text-6xl md:text-7xl font-bold mb-3 tracking-tight transition-colors",
              isDark ? "text-dark-text" : "text-light-text",
            )}
          >
            Faro
          </h1>
          <p
            className={`text-lg md:text-xl transition-colors ${isDark ? "text-dark-text-mid" : "text-light-text-mid"}`}
          >
            为你照亮知识的海洋
          </p>
        </motion.div>

        {/* Search input */}
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
        >
          <SearchInput value={query} onChange={onQueryChange} onSubmit={onSearch} isDark={isDark} autoFocus />
        </motion.div>
      </div>
    </div>
  )
}
