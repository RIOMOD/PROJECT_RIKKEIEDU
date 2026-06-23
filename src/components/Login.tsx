import { useState, useEffect } from 'react';
import { Globe, ShieldAlert } from 'lucide-react';
import logoRikkeiedu from '../assets/logorikkeiedu.png';
import imglogin1 from '../assets/imglogin1.png';
import imglogin2 from '../assets/imglogin2.png';
import imglogin3 from '../assets/imglogin3.png';

interface LoginProps {
  onLogin: (lang: 'vi' | 'en') => void;
  currentLang: 'vi' | 'en';
  onLangChange: (lang: 'vi' | 'en') => void;
}

export const Login = ({ onLogin, currentLang, onLangChange }: LoginProps) => {
  const [activeTab, setActiveTab] = useState<'student' | 'parent'>('student');
  const [selectedCampus, setSelectedCampus] = useState('');
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const images = [imglogin1, imglogin2, imglogin3];

  const slideTexts = [
    {
      titleVi: 'Hình thức E-learning',
      titleEn: 'E-learning Mode',
      descVi: 'Học mọi lúc, mọi nơi với hệ thống các video, bài giảng trực tuyến đa dạng và linh hoạt',
      descEn: 'Learn anytime, anywhere with a diverse and flexible system of online videos and lectures'
    },
    {
      titleVi: 'Kho học liệu miễn phí',
      titleEn: 'Free Learning Resources',
      descVi: 'Miễn phí truy cập kho tài liệu khổng lồ, bao gồm bài giảng, video và tài liệu đọc phù hợp với mọi đối tượng.',
      descEn: 'Free access to a massive repository, including lectures, videos, and reading materials suitable for all learners.'
    },
    {
      titleVi: 'Bài tập vận dụng mô phỏng',
      titleEn: 'Simulation Practice Exercises',
      descVi: 'Áp dụng kiến thức thông qua các bài tập mô phỏng tình huống thực tế',
      descEn: 'Apply knowledge through practical situational simulation exercises'
    }
  ];

  // Auto-slideshow for the marketing banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);

  const t = (viText: string, enText: string) => {
    return currentLang === 'en' ? enText : viText;
  };

  const handleLoginClick = () => {
    if (!selectedCampus) {
      setErrorMsg(
        t(
          'Vui lòng chọn cơ sở trước khi đăng nhập!',
          'Please select the campus before logging in!'
        )
      );
      return;
    }
    setErrorMsg('');
    // Successful login callback
    onLogin(currentLang);
  };

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      
      {/* LEFT COLUMN: Login Form */}
      <div style={{
        width: '50%',
        height: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 80px',
        position: 'relative',
        boxSizing: 'border-box',
        boxShadow: '10px 0 30px rgba(0, 0, 0, 0.02)'
      }}>
        
        {/* Language Switcher at Top-Right of form container */}
        <div style={{
          position: 'absolute',
          top: '32px',
          right: '48px'
        }}>
          <button 
            onClick={() => onLangChange(currentLang === 'vi' ? 'en' : 'vi')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#f1f5f9',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '12.5px',
              fontWeight: '600',
              color: '#334155',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
          >
            <Globe size={14} style={{ color: '#0d226b' }} />
            <span>{currentLang === 'vi' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}</span>
          </button>
        </div>

        {/* Form Container */}
        <div style={{ maxWidth: '440px', width: '100%', margin: '0 auto' }}>
          
          {/* Rikkei Edu Logo */}
          <div style={{ marginBottom: '24px' }}>
            <img 
              src={logoRikkeiedu} 
              alt="Rikkei Edu Logo" 
              style={{ height: '56px', objectFit: 'contain', display: 'block' }} 
            />
          </div>

          <h2 style={{
            fontSize: '24px',
            fontWeight: '800',
            color: '#0d226b',
            margin: '0 0 8px 0',
            letterSpacing: '-0.5px'
          }}>
            {t('Đăng nhập tài khoản của bạn', 'Log in to your account')}
          </h2>

          <p style={{
            fontSize: '14px',
            color: '#64748b',
            margin: '0 0 28px 0'
          }}>
            {t('Chào mừng! Vui lòng chọn phương thức để đăng nhập:', 'Welcome! Select method to login:')}
          </p>

          {/* Error Message Alert */}
          {errorMsg && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fca5a5',
              color: '#991b1b',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '20px',
              fontWeight: '500',
              animation: 'fadeIn 0.25s ease'
            }}>
              <ShieldAlert size={16} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Toggle Tabs (Staff & Student vs Parents) */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <button
              onClick={() => {
                setActiveTab('student');
                setErrorMsg('');
              }}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '8px',
                border: activeTab === 'student' ? '1px solid #f97316' : '1px solid #cbd5e1',
                backgroundColor: activeTab === 'student' ? '#f97316' : '#ffffff',
                color: activeTab === 'student' ? '#ffffff' : '#334155',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === 'student' ? '0 4px 6px -1px rgba(249,115,22,0.2)' : 'none'
              }}
            >
              {t('Sinh viên & Nhân viên', 'Staff & Student')}
            </button>
            <button
              onClick={() => {
                setActiveTab('parent');
                setErrorMsg('');
              }}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '8px',
                border: activeTab === 'parent' ? '1px solid #0d226b' : '1px solid #cbd5e1',
                backgroundColor: activeTab === 'parent' ? '#0d226b' : '#ffffff',
                color: activeTab === 'parent' ? '#ffffff' : '#334155',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === 'parent' ? '0 4px 6px -1px rgba(13,34,107,0.2)' : 'none'
              }}
            >
              {t('Phụ huynh', 'Parents')}
            </button>
          </div>

          {/* Campus Selector Dropdown */}
          <div style={{ marginBottom: '20px' }}>
            <select
              value={selectedCampus}
              onChange={(e) => {
                setSelectedCampus(e.target.value);
                setErrorMsg('');
              }}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                fontWeight: '500',
                color: selectedCampus ? '#1e293b' : '#94a3b8',
                backgroundColor: '#ffffff',
                outline: 'none',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = activeTab === 'student' ? '#f97316' : '#0d226b'}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            >
              <option value="" disabled>{t('Vui lòng chọn cơ sở học tập', 'Please select the campus')}</option>
              <option value="HN">{t('Cơ sở Hà Nội', 'Hanoi Campus')}</option>
              <option value="HCM">{t('Cơ sở Hồ Chí Minh', 'HCMC Campus')}</option>
              <option value="FUK">{t('Cơ sở Fukuoka (Nhật Bản)', 'Fukuoka Campus')}</option>
            </select>
          </div>

          {/* Google Login Button */}
          <button
            onClick={() => handleLoginClick()}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '24px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              color: '#334155',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              marginBottom: '16px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.borderColor = '#94a3b8';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
          >
            {/* Colored Google G SVG logo */}
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#ea4335" d="M12 5.04c1.67 0 3.19.58 4.37 1.71l3.26-3.26C17.65 1.58 15.01 1 12 1 7.37 1 3.4 3.65 1.58 7.55l3.85 2.99C6.38 7.52 9.01 5.04 12 5.04z"/>
              <path fill="#4285f4" d="M23.49 12.27c0-.82-.07-1.6-.21-2.27H12v4.51h6.47c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-1.99 3.7-4.91 3.7-8.69z"/>
              <path fill="#fbbc05" d="M5.43 10.54C4.94 12.02 4.94 13.98 5.43 15.46L1.58 18.45C.57 16.44 0 14.28 0 12s.57-4.44 1.58-6.45l3.85 2.99z"/>
              <path fill="#34a853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.7-2.87c-1.12.75-2.55 1.2-4.26 1.2-2.99 0-5.62-2.48-6.57-5.51L1.58 15.9C3.4 19.8 7.37 22.46 12 23z"/>
            </svg>
            <span>{t('Đăng nhập bằng Google', 'Login with Google')}</span>
          </button>

          {/* RKID Direct Sign In Button */}
          <button
            onClick={() => handleLoginClick()}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '24px',
              border: 'none',
              backgroundColor: activeTab === 'student' ? '#f97316' : '#0d226b',
              color: '#ffffff',
              fontSize: '14.5px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'student' 
                ? '0 4px 12px rgba(249,115,22,0.3)' 
                : '0 4px 12px rgba(13,34,107,0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.filter = 'brightness(1.08)';
              e.currentTarget.style.transform = 'translateY(-0.5px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.filter = 'none';
              e.currentTarget.style.transform = 'none';
            }}
          >
            {activeTab === 'student' ? t('Đăng nhập bằng RKID', 'Sign in with RKID') : t('Đăng nhập dành cho Phụ huynh', 'Sign in for Parents')}
          </button>

          {/* Caption warning */}
          <p style={{
            fontSize: '11.5px',
            color: '#94a3b8',
            textAlign: 'center',
            marginTop: '20px',
            lineHeight: '1.4'
          }}>
            ⚠️ {t('Vui lòng chọn cơ sở học tập trước khi đăng nhập bằng tài khoản Google!', 'Please select the campus before login if login with google!')}
          </p>

        </div>

      </div>

      {/* RIGHT COLUMN: Marketing Slide Showcase Banner */}
      <div style={{
        width: '50%',
        height: '100%',
        backgroundColor: '#0D226B', // Rikkei Blue
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxSizing: 'border-box',
        padding: '40px'
      }}>
        
        {/* Decorative Grid Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          opacity: 0.35,
          pointerEvents: 'none'
        }} />

        {/* Modern Accent Glow background shapes */}
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)',
          top: '-10%',
          right: '-10%',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
          bottom: '-5%',
          left: '-5%',
          pointerEvents: 'none'
        }} />

        {/* Title */}
        <h1 style={{
          color: '#ffffff',
          fontSize: '36px',
          fontWeight: '900',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          margin: '0 0 10px 0',
          fontFamily: "'Outfit', sans-serif",
          textShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 2
        }}>
          Academic Portal
        </h1>
        
        <p style={{
          color: '#cbd5e1',
          fontSize: '14.5px',
          fontWeight: '500',
          margin: '0 0 32px 0',
          letterSpacing: '1px',
          zIndex: 2
        }}>
          {t('Cổng thông tin Đào tạo Quốc tế Rikkei Edu', 'Rikkei Edu International Academic Portal')}
        </p>

        {/* CIRCULAR CONTAINER FOR SLIDESHOW */}
        <div style={{
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255,255,255,0.05)',
          overflow: 'hidden',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '6px solid rgba(255, 255, 255, 0.1)'
        }}>
          {images.map((imgSrc, idx) => (
            <img
              key={idx}
              src={imgSrc}
              alt={`Login Slide ${idx + 1}`}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
                opacity: idx === currentImageIdx ? 1 : 0,
                transform: idx === currentImageIdx ? 'scale(1)' : 'scale(1.05)',
                pointerEvents: 'none'
              }}
            />
          ))}
        </div>

        {/* SLIDE TEXT CONTENT WITH TRANSITION */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          minHeight: '75px',
          maxWidth: '380px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          position: 'relative'
        }}>
          {slideTexts.map((st, idx) => (
            <div
              key={idx}
              style={{
                position: idx === currentImageIdx ? 'relative' : 'absolute',
                opacity: idx === currentImageIdx ? 1 : 0,
                transition: 'opacity 0.6s ease-in-out',
                pointerEvents: idx === currentImageIdx ? 'auto' : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <h3 style={{
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: '800',
                margin: '0 0 8px 0',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.2px'
              }}>
                {t(st.titleVi, st.titleEn)}
              </h3>
              <p style={{
                color: '#cbd5e1',
                fontSize: '13.5px',
                lineHeight: '1.5',
                margin: 0,
                textAlign: 'center',
                fontWeight: '400'
              }}>
                {t(st.descVi, st.descEn)}
              </p>
            </div>
          ))}
        </div>

        {/* SLIDE INDICATORS (DOTS) */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginTop: '28px',
          zIndex: 2
        }}>
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIdx(idx)}
              style={{
                width: idx === currentImageIdx ? '28px' : '10px',
                height: '10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: idx === currentImageIdx ? '#f97316' : 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

    </div>
  );
};
