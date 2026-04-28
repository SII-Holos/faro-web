import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HomePage } from "@/pages/HomePage";
import { ResultsPage } from "@/pages/ResultsPage";
import { ThemeToggle } from "@/components/ThemeToggle";

type Page = "home" | "results";

const THEME_KEY = "faro-theme";

function getInitialTheme(): boolean {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved !== null) return saved === "dark";
  return false; // default to light
}

export default function App() {
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [page, setPage] = useState<Page>("home");
  const [currentQuery, setCurrentQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) return;
    setCurrentQuery(searchQuery);
    setPage("results");
  }, [searchQuery]);

  const handleBackToHome = useCallback(() => {
    setPage("home");
    setSearchQuery("");
  }, []);

  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        {page === "home" ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <HomePage
              isDark={isDark}
              query={searchQuery}
              onQueryChange={setSearchQuery}
              onSearch={handleSearch}
            />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
          >
            <ResultsPage
              isDark={isDark}
              initialQuery={currentQuery}
              onLogoClick={handleBackToHome}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ThemeToggle isDark={isDark} onToggle={() => setIsDark((d) => !d)} />
    </div>
  );
}
