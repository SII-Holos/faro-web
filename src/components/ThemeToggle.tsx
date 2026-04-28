import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-8 right-8 z-20 p-3 rounded-full transition-colors duration-200 ${
        isDark
          ? "bg-dark-border hover:bg-dark-hover text-dark-accent-glow"
          : "bg-white/90 hover:bg-white text-light-text"
      } shadow-lg`}
      aria-label="切换主题"
    >
      {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );
}
