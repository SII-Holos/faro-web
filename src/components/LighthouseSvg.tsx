/**
 * Lighthouse SVG illustration — the visual identity of Faro.
 *
 * Colors adapt to dark/light theme via the `isDark` prop, matching the
 * Figma design exactly.  All geometry is pure flat shapes: no gradients,
 * no blur — consistent with the flat illustration style.
 */

interface LighthouseSvgProps {
  isDark: boolean
  className?: string
}

export function LighthouseSvg({ isDark, className }: LighthouseSvgProps) {
  return (
    <svg
      width="150"
      height="190"
      viewBox="0 0 180 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Light beams */}
      <g opacity={isDark ? "0.4" : "0.3"}>
        <path d="M85 30 L40 0 L50 30 Z" fill={isDark ? "#D4A574" : "#FFF9E6"} />
        <path d="M95 30 L140 0 L130 30 Z" fill={isDark ? "#D4A574" : "#FFF9E6"} />
        <path d="M75 35 L20 20 L40 40 Z" fill={isDark ? "#E8BB8C" : "#FFEAA7"} />
        <path d="M105 35 L160 20 L140 40 Z" fill={isDark ? "#E8BB8C" : "#FFEAA7"} />
      </g>

      {/* Lantern room */}
      <ellipse cx="90" cy="25" rx="15" ry="8" fill={isDark ? "#D4A574" : "#FFD93D"} />
      <rect x="75" y="25" width="30" height="15" fill={isDark ? "#C87B6A" : "#FF6B6B"} rx="2" />
      <rect x="77" y="28" width="26" height="3" fill={isDark ? "#E8BB8C" : "#FFE66D"} />
      <rect x="77" y="34" width="26" height="3" fill={isDark ? "#E8BB8C" : "#FFE66D"} />

      {/* Tower body — red/white stripes */}
      <rect x="80" y="40" width="20" height="25" fill={isDark ? "#C87B6A" : "#FF6B6B"} />
      <rect x="78" y="65" width="24" height="25" fill={isDark ? "#B8C4D8" : "white"} />
      <rect x="76" y="90" width="28" height="25" fill={isDark ? "#C87B6A" : "#FF6B6B"} />
      <rect x="74" y="115" width="32" height="30" fill={isDark ? "#B8C4D8" : "white"} />

      {/* Base */}
      <path d="M70 145 L110 145 L115 165 L65 165 Z" fill={isDark ? "#506175" : "#5F6F81"} />
      <rect x="62" y="165" width="56" height="8" fill={isDark ? "#3d4e63" : "#4A5D6F"} rx="1" />

      {/* Rocks */}
      <ellipse cx="90" cy="180" rx="45" fill={isDark ? "#5B6F8C" : "#8B9DAF"} />
      <ellipse cx="90" cy="185" rx="50" ry="15" fill={isDark ? "#4a5f7a" : "#6C8299"} />
      <ellipse cx="70" cy="190" rx="25" ry="12" fill={isDark ? "#5B6F8C" : "#8B9DAF"} />
      <ellipse cx="110" cy="192" rx="30" ry="10" fill={isDark ? "#5B6F8C" : "#8B9DAF"} />

      {/* Waves */}
      <path
        d="M20 200 Q35 195 50 200 T80 200 T110 200 T140 200 T170 200"
        stroke={isDark ? "#6B8CAD" : "#4A90E2"}
        strokeWidth="3"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M10 210 Q30 205 50 210 T90 210 T130 210 T170 210"
        stroke={isDark ? "#7A9FBF" : "#5BA3F5"}
        strokeWidth="3"
        fill="none"
        opacity="0.3"
      />
    </svg>
  )
}
