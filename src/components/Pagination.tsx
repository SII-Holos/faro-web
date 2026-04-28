import { cn } from "@/lib/utils";

interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
  isDark: boolean;
}

export function Pagination({ current, total, onPageChange, isDark }: PaginationProps) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="mt-12 flex items-center gap-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "w-9 h-9 rounded-full text-sm transition-colors duration-150",
            page === current
              ? isDark
                ? "bg-dark-accent text-white"
                : "bg-light-accent text-white"
              : isDark
                ? "text-dark-text hover:bg-dark-border"
                : "text-light-text hover:bg-light-bg-top",
          )}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
