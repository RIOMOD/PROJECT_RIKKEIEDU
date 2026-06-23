import { FptLogo } from './FptLogo';

interface BtecLogoProps {
  className?: string;
  height?: number | string;
}

export const BtecLogo = ({ className, height = 50 }: BtecLogoProps) => {
  return (
    <div className={`flex flex-col items-center ${className}`} style={{ height }}>
      <svg
        viewBox="0 0 260 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        {/* Stylized Dotted "B" Shape */}
        <g transform="translate(10, 5)">
          {/* Column 1 */}
          <circle cx="5" cy="10" r="3.5" fill="#F27024" />
          <circle cx="5" cy="20" r="4.2" fill="#F27024" />
          <circle cx="5" cy="30" r="4.5" fill="#F27024" />
          <circle cx="5" cy="40" r="4.2" fill="#F27024" />
          <circle cx="5" cy="50" r="3.5" fill="#F27024" />
          
          {/* Column 2 */}
          <circle cx="15" cy="8" r="3.0" fill="#F27024" />
          <circle cx="15" cy="18" r="3.8" fill="#F27024" />
          <circle cx="14" cy="30" r="4.0" fill="#F27024" />
          <circle cx="15" cy="42" r="3.8" fill="#F27024" />
          <circle cx="15" cy="52" r="3.0" fill="#F27024" />

          {/* Column 3 */}
          <circle cx="25" cy="10" r="2.8" fill="#F27024" />
          <circle cx="26" cy="24" r="3.2" fill="#F27024" />
          <circle cx="26" cy="36" r="3.2" fill="#F27024" />
          <circle cx="25" cy="50" r="2.8" fill="#F27024" />

          {/* Column 4 (outer loop curves of B) */}
          <circle cx="35" cy="14" r="2.5" fill="#F27024" />
          <circle cx="37" cy="24" r="2.2" fill="#F27024" />
          <circle cx="37" cy="36" r="2.2" fill="#F27024" />
          <circle cx="35" cy="46" r="2.5" fill="#F27024" />

          {/* Connection dots */}
          <circle cx="43" cy="18" r="2.0" fill="#F27024" />
          <circle cx="43" cy="42" r="2.0" fill="#F27024" />
        </g>

        {/* BTEC Text */}
        <text
          x="65"
          y="42"
          fill="#F27024"
          fontSize="36"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1px"
        >
          BTEC
        </text>

        {/* Alliance with text */}
        <text
          x="12"
          y="62"
          fill="#005C9E"
          fontSize="8.5"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.2px"
        >
          Alliance with
        </text>

        {/* FPT Text or Inline Small Logo */}
        <text
          x="126"
          y="62"
          fill="#005C9E"
          fontSize="8.5"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Education
        </text>
      </svg>
      {/* Inline mini FPT Logo */}
      <div style={{ transform: 'scale(0.24) translate(210px, -100px)', width: 0, height: 0 }}>
        <FptLogo height={50} />
      </div>
    </div>
  );
};
