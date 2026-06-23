import { useState } from 'react';
import { Footer } from './Footer';

interface ExamScheduleProps {
  lang: 'vi' | 'en';
}

export const ExamSchedule = ({ lang }: ExamScheduleProps) => {
  const [selectedTerm, setSelectedTerm] = useState('SUMMER 2026');

  // Translation helper
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  const terms = [
    { value: 'SUMMER 2026', label: t('MÙA HÈ 2026', 'SUMMER 2026') },
    { value: 'SPRING 2026', label: t('MÙA XUÂN 2026', 'SPRING 2026') },
    { value: 'FALL 2026', label: t('MÙA THU 2026', 'FALL 2026') }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      <main className="dashboard-container">
        
        {/* Centered Page Title */}
        <h2 className="exam-schedule-title">
          {t('EXAM SCHEDULES', 'EXAM SCHEDULES')}
        </h2>

        {/* Term Dropdown Row */}
        <div className="exam-term-row">
          <label className="exam-term-label">
            {t('Term:', 'Term:')}
          </label>
          <div className="exam-select-wrapper">
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="exam-term-select"
            >
              {terms.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Custom Warning Notice Banner */}
        <div className="exam-warning-banner">
          <div className="exam-warning-icon">!</div>
          <span className="exam-warning-text">
            {t('BẠN CHƯA CÓ LỊCH THI TRONG HỌC KỲ NÀY', 'BẠN CHƯA CÓ LỊCH THI TRONG HỌC KỲ NÀY')}
          </span>
        </div>

        {/* Center Empty State Illustration Section */}
        <div className="exam-empty-state-wrapper">
          <div className="exam-illustration-container">
            <svg 
              width="320" 
              height="300" 
              viewBox="0 0 320 300" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="exam-empty-box-svg"
            >
              {/* Floating Pluses '+' */}
              {/* Top-Right Plus */}
              <path d="M110 95 H120 M115 90 V100" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
              {/* Left Plus */}
              <path d="M85 185 H95 M90 180 V190" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
              
              {/* Floating Circles 'o' */}
              {/* Top Circle */}
              <circle cx="175" cy="80" r="5" stroke="#1E293B" strokeWidth="3.5" fill="none" />
              {/* Bottom Right Circle */}
              <circle cx="240" cy="245" r="4.5" stroke="#1E293B" strokeWidth="3" fill="none" />
              
              {/* Floating solid dot */}
              <circle cx="245" cy="120" r="3" fill="#1E293B" />
              
              {/* Cardboard Box Group */}
              <g className="box-illustration">
                {/* Back flap (inside background shadow) */}
                <path d="M125 152 L160 135 L195 152 L160 170 Z" fill="#D97706" />

                {/* Left Inner Flap Shadow */}
                <path d="M125 152 L160 170 L160 215 L125 190 Z" fill="#B45309" />
                
                {/* Right Inner Flap Shadow */}
                <path d="M160 170 L195 152 L195 190 L160 215 Z" fill="#92400E" />

                {/* Left Flap (folds out to the left) */}
                <path d="M125 152 L95 135 L120 120 L145 137 Z" fill="#FBBF24" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />
                
                {/* Right Flap (folds out to the right) */}
                <path d="M195 152 L225 135 L200 120 L175 137 Z" fill="#FBBF24" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />

                {/* Front Left Panel of Box */}
                <path d="M160 240 L110 210 L110 162 L160 190 Z" fill="#F59E0B" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />

                {/* Front Right Panel of Box */}
                <path d="M160 240 L210 210 L210 162 L160 190 Z" fill="#D97706" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />

                {/* Front Left Flap hanging down */}
                <path d="M110 162 L145 180 L145 200 L110 182 Z" fill="#FBBF24" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />

                {/* Front Right Flap hanging down */}
                <path d="M210 162 L175 180 L175 200 L210 182 Z" fill="#F59E0B" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />

                {/* Front Box Details */}
                {/* Three square dots on the front-left side */}
                <rect x="120" y="195" width="4" height="4" fill="#FFFFFF" />
                <rect x="128" y="199" width="4" height="4" fill="#FFFFFF" />
                <rect x="136" y="203" width="4" height="4" fill="#FFFFFF" />

                {/* Upward pointing arrow on the front-right side */}
                <path d="M190 183 L190 203 M185 188 L190 183 L195 188" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* Floating Green Speech Bubble with Pink X badge */}
              <g className="speech-bubble-group">
                {/* Speech bubble tail */}
                <path d="M192 120 L187 132 L198 128 Z" fill="#10B981" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />
                
                {/* Speech bubble main body (teal/green) */}
                <circle cx="200" cy="100" r="28" fill="#10B981" stroke="#1E293B" strokeWidth="3" />
                
                {/* Inside circle badge (pink) */}
                <circle cx="200" cy="100" r="18" fill="#FDA4AF" stroke="#1E293B" strokeWidth="3" />
                
                {/* Black X mark in badge */}
                <path d="M193 93 L207 107 M207 93 L193 107" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            </svg>
          </div>

          {/* Subtitles below empty illustration */}
          <h3 className="exam-empty-title">
            {t('OOPS, THIS PAGE IS CURRENTLY EMPTY.', 'OOPS, THIS PAGE IS CURRENTLY EMPTY.')}
          </h3>
          <p className="exam-empty-subtitle">
            {t(
              'The content you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
              'The content you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
            )}
          </p>
        </div>

      </main>
      
      {/* Reusable contact footer */}
      <Footer />
    </div>
  );
};
