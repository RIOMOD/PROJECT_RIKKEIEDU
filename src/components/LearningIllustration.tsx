export const LearningIllustration = () => {
  return (
    <svg
      viewBox="0 0 500 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-[450px] md:max-w-none animate-fade-in"
      style={{ overflow: 'visible' }}
    >
      {/* BACKGROUND ELEMENTS */}
      
      {/* Lightbulb (top right) */}
      <g stroke="#E5E7EB" strokeWidth="1.5" fill="none" transform="translate(390, 80)">
        <path d="M10 20 C10 14.5 14.5 10 20 10 C25.5 10 30 14.5 30 20 C30 24 27.5 26.5 26 28.5 L26 31 L14 31 L14 28.5 C12.5 26.5 10 24 10 20 Z" />
        <path d="M15 34 L25 34 M17 37 L23 37" />
        <line x1="20" y1="5" x2="20" y2="1" />
        <line x1="9" y1="12" x2="6" y2="9" />
        <line x1="31" y1="12" x2="34" y2="9" />
      </g>

      {/* Atom icon (far right) */}
      <g stroke="#E5E7EB" strokeWidth="1.5" fill="none" transform="translate(420, 160)">
        <ellipse cx="20" cy="20" rx="20" ry="6" transform="rotate(-30 20 20)" />
        <ellipse cx="20" cy="20" rx="20" ry="6" transform="rotate(30 20 20)" />
        <ellipse cx="20" cy="20" rx="20" ry="6" transform="rotate(90 20 20)" />
        <circle cx="20" cy="20" r="3" fill="#E5E7EB" />
      </g>

      {/* Clock (middle right) */}
      <g transform="translate(400, 210)">
        <circle cx="15" cy="15" r="14" stroke="#009F4D" strokeWidth="2" fill="white" />
        <path d="M15 6 L15 15 L21 17" stroke="#009F4D" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Gear (top middle) */}
      <g stroke="#E5E7EB" strokeWidth="1.5" fill="none" transform="translate(290, 60)">
        <circle cx="15" cy="15" r="8" />
        <path d="M15 2 L15 5 M15 25 L15 28 M2 15 L5 15 M25 15 L28 15 M6 6 L8 8 M22 22 L24 24 M6 24 L8 22 M22 6 L24 8" strokeLinecap="round" />
      </g>

      {/* Decorative Circles / Tech rings */}
      <circle cx="260" cy="290" r="25" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="80" cy="140" r="15" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4" />

      {/* MAIN LAPTOP SCREEN (LIVE PRESENTATION) */}
      <g transform="translate(160, 130)">
        {/* Screen Frame */}
        <rect x="0" y="0" width="180" height="110" rx="8" fill="#1F2937" />
        <rect x="5" y="5" width="170" height="90" rx="4" fill="#F3F4F6" />
        
        {/* Live Video Presentation Inner Graphics */}
        {/* Presenter (Teacher) */}
        <g transform="translate(50, 15)">
          {/* Hair back */}
          <path d="M25 25 C20 20 20 40 25 45 Z" fill="#111" />
          {/* Body / Blazer */}
          <path d="M10 70 C10 50 20 45 40 45 C60 45 70 50 70 70 Z" fill="#009F4D" />
          {/* Inner Shirt */}
          <path d="M35 45 L40 58 L45 45 Z" fill="white" />
          {/* Face */}
          <circle cx="40" cy="32" r="14" fill="#FDBA74" />
          {/* Hair front */}
          <path d="M24 25 C24 15 56 15 56 25 C56 20 48 18 40 20 C32 18 24 20 24 25 Z" fill="#111" />
          {/* Glasses */}
          <rect x="30" y="28" width="8" height="6" rx="2" stroke="#111" strokeWidth="1.5" fill="none" />
          <rect x="42" y="28" width="8" height="6" rx="2" stroke="#111" strokeWidth="1.5" fill="none" />
          <line x1="38" y1="31" x2="42" y2="31" stroke="#111" strokeWidth="1.5" />
          {/* Arm / Hand gesturing */}
          <path d="M15 65 C12 60 5 45 15 35 C20 42 22 55 22 65 Z" fill="#009F4D" />
          <circle cx="15" cy="35" r="5" fill="#FDBA74" />
        </g>

        {/* Live Interface Buttons */}
        <rect x="10" y="80" width="30" height="8" rx="2" fill="#E5E7EB" />
        <circle cx="15" cy="84" r="2" fill="#374151" />
        <circle cx="21" cy="84" r="2" fill="#374151" />
        <circle cx="27" cy="84" r="2" fill="#374151" />
        
        {/* Fullscreen & Chat Controls */}
        <rect x="145" y="80" width="25" height="8" rx="2" fill="#E5E7EB" />
        <rect x="149" y="82" width="6" height="4" stroke="#374151" strokeWidth="1" fill="none" />
        <rect x="158" y="82" width="8" height="4" rx="1" fill="#374151" />

        {/* Live badge */}
        <g transform="translate(12, 12)">
          <rect x="0" y="0" width="35" height="12" rx="3" fill="#EF4444" />
          <circle cx="6" cy="6" r="2.5" fill="white" />
          <text x="12" y="9" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">LIVE</text>
        </g>

        {/* Viewers badge */}
        <g transform="translate(138, 55)">
          <rect x="0" y="0" width="32" height="12" rx="3" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          {/* User Icon */}
          <path d="M6 9 C6 7.5 8 7 10 7 C12 7 14 7.5 14 9 Z" fill="#4B5563" />
          <circle cx="10" cy="5" r="2" fill="#4B5563" />
          <text x="17" y="9" fill="#1F2937" fontSize="7" fontWeight="bold" fontFamily="sans-serif">72</text>
        </g>

        {/* Laptop Stand / Base */}
        <path d="M70 110 L110 110 L120 120 L60 120 Z" fill="#D1D5DB" />
        <line x1="55" y1="120" x2="125" y2="120" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* LEFT STUDENT (BOY) */}
      <g transform="translate(45, 140)">
        {/* Blue Chair */}
        <path d="M75 120 L65 175 M85 120 L95 175 M80 85 L85 120 L55 120 L58 85 Z" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Body */}
        {/* Legs */}
        <path d="M50 120 L35 155 L42 165 L55 130 Z" fill="#2563EB" /> {/* Left leg */}
        <path d="M55 122 L65 150 L85 150 L85 135 L68 122 Z" fill="#2563EB" /> {/* Right leg */}
        
        {/* Torso & Arms */}
        <path d="M45 80 C45 65 72 65 72 80 L68 122 L48 122 Z" fill="#EF4444" /> {/* Orange/Red shirt */}
        
        {/* Left arm typing */}
        <path d="M46 80 Q32 90 40 102" stroke="#EF4444" strokeWidth="9" strokeLinecap="round" />
        <path d="M40 102 L52 102" stroke="#FDBA74" strokeWidth="8" strokeLinecap="round" />
        
        {/* Head */}
        <circle cx="58" cy="52" r="12" fill="#FDBA74" />
        {/* Black Hair */}
        <path d="M46 50 C46 38 70 38 70 50 C70 44 65 42 58 44 C51 42 46 44 46 50 Z" fill="#111" />
        
        {/* Yellow Shoes */}
        <rect x="33" y="160" width="14" height="8" rx="3" fill="#FBBF24" />
        <rect x="78" y="146" width="14" height="8" rx="3" fill="#FBBF24" />

        {/* Laptop (White) */}
        <g transform="translate(32, 94)">
          <rect x="0" y="0" width="22" height="15" rx="1" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1" transform="rotate(-15)" />
          <line x1="-2" y1="12" x2="20" y2="12" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
        </g>
        
        {/* Speech bubbles/floating UI (left) */}
        <g transform="translate(-20, -40)" strokeWidth="1">
          <rect x="0" y="25" width="22" height="14" rx="3" fill="#3B82F6" />
          <line x1="4" y1="30" x2="10" y2="30" stroke="white" strokeWidth="1.5" />
          <line x1="4" y1="34" x2="14" y2="34" stroke="white" strokeWidth="1.5" />
          <path d="M12 39 L16 43 L16 39 Z" fill="#3B82F6" />
        </g>
      </g>

      {/* RIGHT STUDENT (GIRL) */}
      <g transform="translate(320, 180)">
        {/* Beanbag (dark green/black circular bottom) */}
        <ellipse cx="60" cy="115" rx="55" ry="30" fill="#374151" />
        <ellipse cx="60" cy="108" rx="50" ry="25" fill="#1F2937" />

        {/* Body */}
        {/* Legs crossed / up */}
        <path d="M22 100 C30 80 50 78 60 95 C70 78 90 80 98 100 C98 115 22 115 22 100 Z" fill="#009F4D" /> {/* Green pants */}
        
        {/* Torso */}
        <path d="M40 50 C40 40 80 40 80 50 L85 92 L35 92 Z" fill="#3B82F6" /> {/* Blue hoodie */}
        
        {/* Laptop (black) */}
        <g transform="translate(26, 75)">
          <rect x="5" y="-5" width="24" height="16" rx="1" fill="#1F2937" transform="rotate(10)" />
          <line x1="0" y1="12" x2="28" y2="8" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
          <circle cx="16" cy="4" r="1.5" fill="#EF4444" /> {/* Brand icon */}
        </g>

        {/* Head */}
        <circle cx="60" cy="22" r="11" fill="#FDBA74" />
        {/* Black Hair */}
        <path d="M48 20 C48 8 72 8 72 20 C72 15 67 12 60 14 C53 12 48 15 48 20 Z" fill="#111" />
        <path d="M48 20 L48 32 L52 32 Z" fill="#111" />
        <path d="M72 20 L72 32 L68 32 Z" fill="#111" />

        {/* Green Headphones */}
        <path d="M47 22 A13 13 0 0 1 73 22" stroke="#009F4D" strokeWidth="3" fill="none" />
        <rect x="45" y="19" width="5" height="10" rx="2" fill="#009F4D" />
        <rect x="70" y="19" width="5" height="10" rx="2" fill="#009F4D" />

        {/* Yellow Shoes */}
        <rect x="18" y="102" width="12" height="8" rx="2.5" fill="#FBBF24" />
        <rect x="90" y="102" width="12" height="8" rx="2.5" fill="#FBBF24" />
      </g>

      {/* PLANT IN POT (bottom center-right) */}
      <g transform="translate(340, 270)">
        {/* Pot */}
        <path d="M10 30 L5 50 L25 50 L20 30 Z" fill="#EF4444" />
        <rect x="8" y="27" width="14" height="4" rx="1" fill="#DC2626" />
        {/* Leaves */}
        <path d="M15 27 C10 15 5 18 2 12 C10 10 13 20 15 27 Z" fill="#10B981" />
        <path d="M15 27 C20 15 25 18 28 12 C20 10 17 20 15 27 Z" fill="#059669" />
        <path d="M15 27 C15 10 10 5 15 0 C20 5 15 10 15 27 Z" fill="#34D399" />
      </g>
      
      {/* RED QUESTION MARK FLOATING HELP (far right) */}
      <g transform="translate(440, 220)">
        <circle cx="15" cy="15" r="14" fill="#EF4444" className="cursor-pointer hover:scale-110 transition-transform" />
        <text
          x="15"
          y="22"
          fill="white"
          fontSize="20"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          ?
        </text>
      </g>
    </svg>
  );
};
