/**
 * Empty state — a small lighthouse illustration + friendly message.
 *
 * Keeps the ocean theme alive even when there are no results.
 */

interface EmptyStateProps {
  isDark: boolean;
}

export function EmptyState({ isDark }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center py-16">
      {/* Mini lighthouse */}
      <svg width="60" height="80" viewBox="0 0 180 220" fill="none" className="mb-6 opacity-50">
        <ellipse cx="90" cy="25" rx="15" ry="8" fill={isDark ? "#D4A574" : "#FFD93D"} />
        <rect x="75" y="25" width="30" height="15" fill={isDark ? "#C87B6A" : "#FF6B6B"} rx="2" />
        <rect x="80" y="40" width="20" height="25" fill={isDark ? "#C87B6A" : "#FF6B6B"} />
        <rect x="78" y="65" width="24" height="25" fill={isDark ? "#B8C4D8" : "white"} />
        <path d="M70 145 L110 145 L115 165 L65 165 Z" fill={isDark ? "#506175" : "#5F6F81"} />
      </svg>

      <p className={`text-lg mb-1 ${isDark ? "text-dark-text-mid" : "text-light-text-mid"}`}>
        没有找到相关结果
      </p>
      <p className={`text-sm ${isDark ? "text-dark-text-dim" : "text-light-text-mid"}`}>
        试试换个关键词？
      </p>
    </div>
  );
}
