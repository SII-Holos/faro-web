import { motion, type Variants } from "framer-motion";
import type { SearchResult } from "@/api/client";
import { ResultCard } from "./ResultCard";

interface ResultListProps {
  results: SearchResult[];
  isDark: boolean;
}

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 25 },
  },
};

export function ResultList({ results, isDark }: ResultListProps) {
  return (
    <motion.div
      className="space-y-7"
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {results.map((result, i) => (
        <motion.div key={result.url + i} variants={itemVariants}>
          <ResultCard result={result} isDark={isDark} index={i} />
        </motion.div>
      ))}
    </motion.div>
  );
}
