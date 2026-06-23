import { useState } from 'react';
import { Bell, Menu, BookOpen, GraduationCap, LogOut, Globe } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  title: string;
  lang: 'vi' | 'en';
  onLangChange: (lang: 'vi' | 'en') => void;
  setActiveItem: (item: string) => void;
  onLogout: () => void;
}

export const Header = ({ onMenuToggle, title, lang, onLangChange, setActiveItem, onLogout }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Mock student info
  const student = {
    name: 'Nguyễn Văn Hùng',
    id: 'BS00679',
    class: 'k6',
    major: 'Kỹ thuật phần mềm',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120'
  };

  // Mock notification data
  const notifications = [
    { id: 1, title: 'Thông báo mở đợt BHYT 6.2026', time: '1 week ago', read: false },
    { id: 2, title: 'Cảnh báo còn 0 buổi vắng', time: '2 weeks ago', read: false },
    { id: 3, title: 'Cảnh báo SV chỉ còn được vắng 1 buổi', time: '3 weeks ago', read: false },
    { id: 4, title: 'Cảnh báo còn 0 buổi vắng', time: '3 weeks ago', read: false },
    { id: 5, title: 'Cảnh báo còn 0 buổi vắng', time: '3 weeks ago', read: false },
    { id: 6, title: 'Cảnh báo còn 0 buổi vắng', time: '3 months ago', read: true },
    { id: 7, title: 'Cảnh báo còn 0 buổi vắng', time: '4 months ago', read: true },
    { id: 8, title: 'Cảnh báo còn 0 buổi vắng', time: '4 months ago', read: true },
    { id: 9, title: 'Cảnh báo SV chỉ còn được vắng 1 buổi', time: '5 months ago', read: true },
    { id: 10, title: 'Cảnh báo còn 0 buổi vắng', time: '6 months ago', read: true },
    { id: 11, title: 'Cảnh báo SV chỉ còn được vắng 1 buổi', time: '6 months ago', read: true },
    { id: 12, title: 'Cảnh báo còn 0 buổi vắng', time: '7 months ago', read: true },
    { id: 13, title: 'Cảnh báo còn 0 buổi vắng', time: '7 months ago', read: true },
    { id: 14, title: 'Cảnh báo SV chỉ còn được vắng 1 buổi', time: '8 months ago', read: true },
    { id: 15, title: 'Cảnh báo còn 0 buổi vắng', time: '8 months ago', read: true }
  ];

  return (
    <header className="header">
      {/* Left side: Hamburger (mobile only) & Title */}
      <div className="header-left">
        <button 
          onClick={onMenuToggle}
          className="mobile-menu-toggle"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>
        <span className="header-title">{title}</span>
      </div>

      {/* Right side: Language Switcher, Notifications, and Profile */}
      <div className="header-right" style={{ position: 'relative' }}>
        
        {/* Language Switcher */}
        <button 
          onClick={() => onLangChange(lang === 'vi' ? 'en' : 'vi')}
          className="lang-toggle-btn"
          title="Switch Language"
        >
          <Globe size={15} />
          <span>{lang === 'vi' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}</span>
        </button>

        {/* Bell Notifications */}
        {/* Bell Notifications */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="bell-button"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              background: 'none', 
              border: 'none', 
              padding: '6px 12px 6px 6px', 
              cursor: 'pointer',
              position: 'relative'
            }}
            aria-label="Notifications"
          >
            <Bell size={24} style={{ color: '#f37021' }} fill="#f37021" fillOpacity={0.1} />
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#f37021', lineHeight: 1, marginLeft: '-2px' }}>!</span>
            <span style={{
              backgroundColor: '#e12d4a',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 'bold',
              padding: '3px 8px',
              borderRadius: '6px',
              display: 'inline-block',
              lineHeight: 1
            }}>10+</span>
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="dropdown-panel" style={{ width: '360px', top: '50px' }}>
              <div className="dropdown-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '8px', padding: '14px 16px', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B' }}>Notifications</span>
                <span style={{
                  backgroundColor: '#E2E8F0',
                  color: '#475569',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}>15</span>
              </div>
              <div className="dropdown-item-list" style={{ maxHeight: '420px', overflowY: 'auto' }}>
                {notifications.map(n => (
                  <div 
                    key={n.id} 
                    className="dropdown-notification-item"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      padding: '12px 16px',
                      borderBottom: '1px solid #F1F5F9',
                      cursor: 'pointer',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <div className="notification-details" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span className="notification-title" style={{ fontSize: '13px', fontWeight: n.read ? 'normal' : '600', color: '#1E293B' }}>
                        {n.title}
                      </span>
                      <span className="notification-time" style={{ fontSize: '11.5px', color: '#64748B' }}>
                        {n.time}
                      </span>
                    </div>
                    {!n.read && (
                      <div 
                        style={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          backgroundColor: '#dc2626', 
                          flexShrink: 0 
                        }} 
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Info */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="avatar-button"
            aria-label="User Profile"
          >
            <img 
              src={student.avatar}
              alt={student.name}
              className="avatar-image"
            />
          </button>

          {/* Profile Dropdown Panel */}
          {showProfile && (
            <div className="dropdown-panel profile-dropdown-panel">
              <div 
                className="profile-header-card"
                onClick={() => {
                  setActiveItem('profile');
                  setShowProfile(false);
                }}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={student.avatar}
                  alt={student.name}
                  className="profile-avatar-large"
                />
                <span className="profile-name">{student.name}</span>
                <span className="profile-code">{student.id}</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div 
                  className="profile-detail-item"
                  onClick={() => {
                    setActiveItem('profile');
                    setShowProfile(false);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <GraduationCap size={16} style={{ color: '#94A3B8' }} />
                  <div>
                    <span className="profile-detail-label" style={{ display: 'block' }}>
                      {lang === 'en' ? 'Major' : 'Chuyên ngành'}
                    </span>
                    <span className="profile-detail-val">
                      {lang === 'en' ? 'Software Engineering' : 'Kỹ thuật phần mềm'}
                    </span>
                  </div>
                </div>
                
                <div className="profile-detail-item">
                  <BookOpen size={16} style={{ color: '#94A3B8' }} />
                  <div>
                    <span className="profile-detail-label" style={{ display: 'block' }}>
                      {lang === 'en' ? 'Class' : 'Lớp học'}
                    </span>
                    <span className="profile-detail-val">{student.class}</span>
                  </div>
                </div>
                
                <button className="profile-logout-btn" onClick={onLogout}>
                  <LogOut size={16} />
                  <span>{lang === 'en' ? 'Log out' : 'Đăng xuất'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
