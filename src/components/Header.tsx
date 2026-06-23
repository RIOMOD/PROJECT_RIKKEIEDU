import { useState } from 'react';
import { Bell, Menu, BookOpen, GraduationCap, LogOut, Globe } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  title: string;
  lang: 'vi' | 'en';
  onLangChange: (lang: 'vi' | 'en') => void;
}

export const Header = ({ onMenuToggle, title, lang, onLangChange }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Mock student info
  const student = {
    name: 'Nguyễn Văn Hùng',
    id: 'BH00256',
    class: 'RK-IT-K15',
    major: 'Software Engineering',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120'
  };

  // Mock notification data
  const notifications = [
    { id: 1, title: 'Mở đăng ký thuốc 6 tháng cuối năm 2026', time: '10 phút trước', read: false },
    { id: 2, title: 'Thông báo thay đổi địa điểm học tập', time: '2 giờ trước', read: false },
    { id: 3, title: 'Quyết định công nhận kết quả rèn luyện học kỳ mùa Xuân 2026', time: '1 ngày trước', read: true },
    { id: 4, title: 'Thời khóa biểu thi cuối kỳ Tiếng Anh Block 2', time: '3 ngày trước', read: true }
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
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="bell-button"
            aria-label="Notifications"
          >
            <Bell size={21} fill="currentColor" fillOpacity={0.1} />
            <span className="bell-badge">10+</span>
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="dropdown-panel">
              <div className="dropdown-header">
                <span>Thông báo mới</span>
                <span style={{ fontSize: '12px', color: 'var(--primary)', cursor: 'pointer' }}>
                  Xem tất cả
                </span>
              </div>
              <div className="dropdown-item-list">
                {notifications.map(n => (
                  <div 
                    key={n.id} 
                    className={`dropdown-notification-item ${!n.read ? 'unread' : ''}`}
                  >
                    {!n.read && <div className="unread-dot" />}
                    <div className="notification-details">
                      <span className="notification-title">{n.title}</span>
                      <span className="notification-time">{n.time}</span>
                    </div>
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
              <div className="profile-header-card">
                <img 
                  src={student.avatar}
                  alt={student.name}
                  className="profile-avatar-large"
                />
                <span className="profile-name">{student.name}</span>
                <span className="profile-code">{student.id}</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="profile-detail-item">
                  <GraduationCap size={16} style={{ color: '#94A3B8' }} />
                  <div>
                    <span className="profile-detail-label" style={{ display: 'block' }}>Chuyên ngành</span>
                    <span className="profile-detail-val">{student.major}</span>
                  </div>
                </div>
                
                <div className="profile-detail-item">
                  <BookOpen size={16} style={{ color: '#94A3B8' }} />
                  <div>
                    <span className="profile-detail-label" style={{ display: 'block' }}>Lớp học</span>
                    <span className="profile-detail-val">{student.class}</span>
                  </div>
                </div>
                
                <button className="profile-logout-btn">
                  <LogOut size={16} />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
