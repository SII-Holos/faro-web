import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SearchInput } from "@/components/SearchInput";
import { ResultList } from "@/components/ResultList";
import { LoadingState } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";
import { Pagination } from "@/components/Pagination";
import { useSearch, type SearchState } from "@/hooks/useSearch";
import { cn } from "@/lib/utils";
import type { SearchResult } from "@/api/client";

interface ResultsPageProps {
  isDark: boolean;
  initialQuery: string;
  onLogoClick: () => void;
}

/** Small lighthouse logo used in the results page header. */
function HeaderLogo({ isDark }: { isDark: boolean }) {
  return (
    <svg viewBox="0 0 40 50" fill="none" className="w-9 h-9">
      <ellipse cx="20" cy="8" rx="5" ry="3" fill={isDark ? "#D4A574" : "#FFD93D"} />
      <rect x="15" y="8" width="10" height="5" fill={isDark ? "#C87B6A" : "#FF6B6B"} rx="1" />
      <rect x="17" y="13" width="6" height="8" fill={isDark ? "#B8C4D8" : "white"} />
      <rect x="16" y="21" width="8" height="8" fill={isDark ? "#C87B6A" : "#FF6B6B"} />
      <path d="M14 29 L26 29 L28 34 L12 34 Z" fill={isDark ? "#506175" : "#5F6F81"} />
    </svg>
  );
}

const RESULTS_PER_PAGE = 10;

export function ResultsPage({ isDark, initialQuery, onLogoClick }: ResultsPageProps) {
  const [query, setQuery] = useState(initialQuery);
  const { state, execute } = useSearch();
  const [page, setPage] = useState(1);

  // Fire the initial search on mount.
  useEffect(() => {
    execute(initialQuery);
  }, [initialQuery, execute]);

  const handleSearch = () => {
    if (query.trim()) {
      setPage(1);
      execute(query);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const results: SearchResult[] =
    state.status === "success" ? state.data.results : [];
  const totalResults: number =
    state.status === "success" ? state.data.total : 0;
  const latencyMs: number | null =
    state.status === "success" ? state.data.latency_ms : null;
  const totalPages = Math.max(1, Math.ceil(totalResults / RESULTS_PER_PAGE));

  // Paginate client-side for now (API returns up to `limit` results).
  const paginatedResults = results.slice(
    (page - 1) * RESULTS_PER_PAGE,
    page * RESULTS_PER_PAGE,
  );

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        isDark ? "bg-dark-bg" : "bg-light-bg",
      )}
    >
      {/* Header bar */}
      <div
        className={cn(
          "border-b transition-colors",
          isDark ? "border-dark-border bg-dark-bg-mid/80" : "border-light-border bg-white/60",
        )}
      >
        <div className="px-6 md:px-12 lg:px-24 py-4 flex items-center gap-8">
          {/* Logo → back to home */}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <HeaderLogo isDark={isDark} />
            <span
              className={cn(
                "text-2xl font-bold transition-colors",
                isDark ? "text-dark-text" : "text-light-text",
              )}
            >
              Faro
            </span>
          </button>

          {/* Compact search bar */}
          <SearchInput
            value={query}
            onChange={setQuery}
            onSubmit={handleSearch}
            isDark={isDark}
            compact
          />
        </div>
      </div>

      {/* Results area */}
      <div className="py-5">
        <div className="px-6 md:px-12 lg:px-24 flex gap-8">
          {/* Spacer aligns results with the search box */}
          <div className="w-[120px] flex-shrink-0 hidden md:block" />

          <div className="flex-1 max-w-2xl">
            {/* Status line */}
            <SearchStatusLine
              state={state}
              totalResults={totalResults}
              latencyMs={latencyMs}
              isDark={isDark}
            />

            {/* Content */}
            {state.status === "loading" && <LoadingState isDark={isDark} />}
            {state.status === "success" && results.length === 0 && (
              <EmptyState isDark={isDark} />
            )}
            {state.status === "success" && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <ResultList results={paginatedResults} isDark={isDark} />
                <Pagination
                  current={page}
                  total={totalPages}
                  onPageChange={handlePageChange}
                  isDark={isDark}
                />
              </motion.div>
            )}
            {state.status === "error" && (
              <ErrorState message={state.error} isDark={isDark} onRetry={handleSearch} />
            )}

            {/* Bottom decoration — small boat */}
            <div className={`mt-20 ${isDark ? "opacity-25" : "opacity-30"}`}>
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
                <path d="M10 40 L70 40 L60 50 L20 50 Z" fill={isDark ? "#705A45" : "#8B4513"} />
                <path d="M40 10 L40 40 L65 25 Z" fill={isDark ? "#C87B6A" : "#FF6B6B"} />
                <path
                  d="M5 50 Q40 45 75 50"
                  stroke={isDark ? "#6B8CAD" : "#4A90E2"}
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SearchStatusLine({
  state,
  totalResults,
  latencyMs,
  isDark,
}: {
  state: SearchState;
  totalResults: number;
  latencyMs: number | null;
  isDark: boolean;
}) {
  if (state.status !== "success") return <div className="mb-4 h-5" />;

  return (
    <div className={`mb-4 text-sm ${isDark ? "text-dark-text-mid" : "text-light-text-mid"}`}>
      找到约 {totalResults} 条结果
      {latencyMs !== null ? ` (${(latencyMs / 1000).toFixed(2)}秒)` : ""}
    </div>
  );
}

function ErrorState({
  message,
  isDark,
  onRetry,
}: {
  message: string;
  isDark: boolean;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center py-16">
      <p className={`text-lg mb-2 ${isDark ? "text-dark-text-mid" : "text-light-text-mid"}`}>
        搜索出了点问题
      </p>
      <p className={`text-sm mb-4 ${isDark ? "text-dark-text-dim" : "text-light-text-mid"}`}>
        {message}
      </p>
      <button
        onClick={onRetry}
        className={cn(
          "px-6 py-2 rounded-full text-sm transition-colors",
          isDark
            ? "bg-dark-accent hover:bg-dark-accent-glow text-white"
            : "bg-light-accent hover:bg-[#FF5252] text-white",
        )}
      >
        重试
      </button>
    </div>
  );
}
