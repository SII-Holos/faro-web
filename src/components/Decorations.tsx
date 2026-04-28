/**
 * Decorative ocean-scene elements — boats, seagulls, clouds, waves, star.
 *
 * These are pure decoration with no interactive behaviour.  Each element
 * matches the Figma design and adapts its palette to the current theme.
 */

import { Compass } from "lucide-react";

interface DecorationsProps {
  isDark: boolean;
}

export function Decorations({ isDark }: DecorationsProps) {
  return (
    <>
      {/* Floating compass — right of lighthouse */}
      <div className="absolute -right-16 top-12 animate-bounce">
        <Compass
          className={`w-12 h-12 ${isDark ? "text-dark-sea-light opacity-40" : "text-light-sea opacity-60"}`}
          strokeWidth={1.5}
        />
      </div>

      {/* Star — left of lighthouse */}
      <div className={`absolute -left-14 top-2 ${isDark ? "opacity-35" : "opacity-50"}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill={isDark ? "#D4A574" : "#FFD93D"}>
          <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
        </svg>
      </div>

      {/* Top wave decoration */}
      <div className="absolute inset-x-0 top-0 h-64 overflow-hidden opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
          <path
            d="M0,100 C300,150 600,50 900,100 L900,0 L0,0 Z"
            fill={isDark ? "#2a3a52" : "#FFDAB9"}
          />
          <path
            d="M0,150 C400,100 800,200 1200,150 L1200,0 L0,0 Z"
            fill={isDark ? "#354659" : "#FFE4C4"}
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Bottom waves */}
      <div className={`w-full max-w-4xl mt-4 ${isDark ? "opacity-30" : "opacity-50"}`}>
        <svg width="100%" height="80" viewBox="0 0 800 80" preserveAspectRatio="none">
          <path
            d="M0,35 Q200,15 400,35 T800,35"
            stroke={isDark ? "#6B8CAD" : "#4A90E2"}
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M0,50 Q200,30 400,50 T800,50"
            stroke={isDark ? "#7A9FBF" : "#5BA3F5"}
            strokeWidth="2.5"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M0,65 Q200,45 400,65 T800,65"
            stroke={isDark ? "#8BA3C7" : "#6DB4F7"}
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Boat — left */}
      <div className={`absolute bottom-28 left-12 hidden lg:block ${isDark ? "opacity-40" : "opacity-65"}`}>
        <svg width="110" height="80" viewBox="0 0 80 60" fill="none">
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

      {/* Boat — right */}
      <div className={`absolute bottom-20 right-16 hidden lg:block ${isDark ? "opacity-35" : "opacity-55"}`}>
        <svg width="95" height="72" viewBox="0 0 80 60" fill="none">
          <path d="M10 40 L70 40 L60 50 L20 50 Z" fill={isDark ? "#5B6F8C" : "#6C8299"} />
          <path d="M40 10 L40 40 L65 25 Z" fill={isDark ? "#7A9FBF" : "#4A90E2"} />
          <path
            d="M5 50 Q40 45 75 50"
            stroke={isDark ? "#7A9FBF" : "#5BA3F5"}
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Seagull — right */}
      <div
        className={`absolute top-28 right-24 hidden md:block animate-pulse ${isDark ? "opacity-30" : "opacity-50"}`}
      >
        <svg width="50" height="40" viewBox="0 0 40 30" fill="none">
          <path
            d="M5 15 Q12 8 20 15 Q28 8 35 15"
            stroke={isDark ? "#8BA3C7" : "#5F6F81"}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Seagull — left */}
      <div
        className={`absolute top-40 left-32 hidden md:block animate-pulse ${isDark ? "opacity-25" : "opacity-40"}`}
        style={{ animationDelay: "1s" }}
      >
        <svg width="45" height="35" viewBox="0 0 40 30" fill="none">
          <path
            d="M5 15 Q12 8 20 15 Q28 8 35 15"
            stroke={isDark ? "#8BA3C7" : "#5F6F81"}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Cloud — left */}
      <div className={`absolute top-12 left-1/4 hidden xl:block ${isDark ? "opacity-20" : "opacity-35"}`}>
        <svg width="90" height="55" viewBox="0 0 80 50" fill="none">
          <ellipse cx="25" cy="30" rx="18" ry="15" fill={isDark ? "#2a3a52" : "white"} />
          <ellipse cx="45" cy="25" rx="22" ry="18" fill={isDark ? "#2a3a52" : "white"} />
          <ellipse cx="60" cy="30" rx="15" ry="12" fill={isDark ? "#2a3a52" : "white"} />
        </svg>
      </div>

      {/* Cloud — right */}
      <div className={`absolute top-20 right-1/4 hidden xl:block ${isDark ? "opacity-18" : "opacity-30"}`}>
        <svg width="75" height="48" viewBox="0 0 80 50" fill="none">
          <ellipse cx="25" cy="30" rx="18" ry="15" fill={isDark ? "#2a3a52" : "white"} />
          <ellipse cx="45" cy="25" rx="22" ry="18" fill={isDark ? "#2a3a52" : "white"} />
          <ellipse cx="60" cy="30" rx="15" ry="12" fill={isDark ? "#2a3a52" : "white"} />
        </svg>
      </div>
    </>
  );
}
