interface FptLogoProps {
  className?: string;
  height?: number | string;
}

export const FptLogo = ({ className, height = 24 }: FptLogoProps) => {
  return (
    <svg
      className={className}
      height={height}
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <g transform="skewX(-18) translate(40, 10)">
        {/* Blue Pill - F */}
        <rect x="0" y="10" width="76" height="150" rx="18" fill="#005C9E" />
        
        {/* Orange Pill - P */}
        <rect x="90" y="10" width="76" height="150" rx="18" fill="#F37021" />
        
        {/* Green Pill - T */}
        <rect x="180" y="10" width="76" height="150" rx="18" fill="#009F4D" />
        
        {/* F Character Path */}
        <path
          d="M 22 45 L 56 45 L 56 61 L 38 61 L 38 78 L 53 78 L 53 94 L 38 94 L 38 128 L 22 128 Z"
          fill="white"
        />
        
        {/* Correct P Path: Stem + Loop */}
        <path
          d="M 112 45 L 140 45 C 152 45 156 53 156 68 C 156 83 148 91 138 91 L 128 91 L 128 128 L 112 128 Z M 128 60 L 128 77 L 138 77 C 141 77 142 74 142 68 C 142 62 141 60 138 60 Z"
          fill="white"
        />
        
        {/* T Character Path */}
        <path
          d="M 194 45 L 244 45 L 244 61 L 227 61 L 227 128 L 211 128 L 211 61 L 194 61 Z"
          fill="white"
        />
      </g>
      
      {/* Trademark Registered Circle (R) */}
      <circle cx="295" cy="165" r="10" stroke="#005C9E" strokeWidth="2.5" />
      <text
        x="295"
        y="169"
        fill="#005C9E"
        fontSize="12"
        fontWeight="bold"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        R
      </text>
    </svg>
  );
};
