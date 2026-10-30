import { useState, useRef, useEffect } from 'react';
import { Bell, Menu, BookOpen, GraduationCap, LogOut, Globe, Sun, Moon, Search } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  title: string;
  lang: 'vi' | 'en';
  onLangChange: (lang: 'vi' | 'en') => void;
  setActiveItem: (item: string, resetScroll?: boolean) => void;
  onLogout: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  activeItem: string;
}

export const Header = ({ onMenuToggle, title, lang, onLangChange, setActiveItem, onLogout, theme, onThemeToggle, activeItem }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getProfile = () => {
    const saved = localStorage.getItem('student_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name && parsed.id) {
          return {
            name: parsed.name,
            id: parsed.id,
            class: parsed.class || 'K24',
            major: parsed.major || 'Kỹ thuật phần mềm',
            avatar: parsed.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120'
          };
        }
      } catch (e) {}
    }
    return {
      name: 'Nguyễn Công Trứ',
      id: 'N24DTCN088',
      class: 'K24',
      major: 'Kỹ thuật phần mềm',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120'
    };
  };

  const [student, setStudent] = useState(getProfile);

  useEffect(() => {
    const handleProfileUpdate = () => {
      setStudent(getProfile());
    };
    window.addEventListener('student_profile_updated', handleProfileUpdate);
    return () => {
      window.removeEventListener('student_profile_updated', handleProfileUpdate);
    };
  }, []);

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

  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  const getSearchItems = () => [
    // Menu items
    {
      title: t('Thời khóa biểu hàng tuần', 'Weekly Timetable'),
      category: t('Chức năng', 'Menu'),
      action: () => setActiveItem('tkb-hang-tuan')
    },
    {
      title: t('Báo cáo điểm danh', 'Attendance Report'),
      category: t('Chức năng', 'Menu'),
      action: () => setActiveItem('bc-diem-danh')
    },
    {
      title: t('Bảng điểm học tập', 'Academic Transcript'),
      category: t('Chức năng', 'Menu'),
      action: () => setActiveItem('bang-diem-ht')
    },
    {
      title: t('Chương trình khung', 'Curriculum'),
      category: t('Chức năng', 'Menu'),
      action: () => setActiveItem('chuong-trinh-gd')
    },
    {
      title: t('Hồ sơ Sinh viên', 'Student Profile'),
      category: t('Chức năng', 'Menu'),
      action: () => setActiveItem('profile')
    },
    
    // Profile student details records search
    {
      title: t('Học sinh: Nguyễn Công Trứ - N24DTCN088', 'Student: Nguyen Cong Tru - N24DTCN088'),
      category: t('Hồ sơ', 'Profile'),
      action: () => setActiveItem('profile')
    },
    {
      title: t('Số điện thoại học sinh: 0879378668', 'Student phone: 0879378668'),
      category: t('Hồ sơ', 'Profile'),
      action: () => setActiveItem('profile')
    },
    {
      title: t('Email: truncn24dtcn088@rikkei.edu.vn', 'Email: truncn24dtcn088@rikkei.edu.vn'),
      category: t('Hồ sơ', 'Profile'),
      action: () => setActiveItem('profile')
    },
    {
      title: t('Địa chỉ cũ: Cẩm Vũ, Cẩm Giàng, Hải Dương', 'Old Address: Cam Vu, Cam Giang, Hai Duong'),
      category: t('Hồ sơ', 'Profile'),
      action: () => setActiveItem('profile')
    },
    {
      title: t('Địa chỉ mới: Xã Tuệ Tĩnh, Hải Phòng', 'New Address: Tue Tinh, Hai Phong'),
      category: t('Hồ sơ', 'Profile'),
      action: () => setActiveItem('profile')
    },
    {
      title: t('Số CMND/CCCD: 030204001944', 'ID Card Number: 030204001944'),
      category: t('Hồ sơ', 'Profile'),
      action: () => setActiveItem('profile')
    },

    // Timetable & Attendance records search
    {
      title: t('Giảng viên: VuNV35 (Vũ Ngọc Vương)', 'Teacher: VuNV35 (Vu Ngoc Vuong)'),
      category: t('Thời khóa biểu', 'Timetable'),
      action: () => setActiveItem('bc-diem-danh')
    },
    {
      title: t('Giảng viên: VF_HCM_04 (Vũ Phương HCM)', 'Teacher: VF_HCM_04 (Vu Phuong HCM)'),
      category: t('Thời khóa biểu', 'Timetable'),
      action: () => setActiveItem('bc-diem-danh')
    },
    {
      title: t('Lớp học/Phòng: Sydney 6 (Offline)', 'Classroom: Sydney 6 (Offline)'),
      category: t('Thời khóa biểu', 'Timetable'),
      action: () => setActiveItem('tkb-hang-tuan')
    },
    {
      title: t('Lớp học/Phòng: Sydney 3 (Offline)', 'Classroom: Sydney 3 (Offline)'),
      category: t('Thời khóa biểu', 'Timetable'),
      action: () => setActiveItem('tkb-hang-tuan')
    },
    {
      title: t('Lớp học/Phòng: Online 1 (7428 Online)', 'Classroom: Online 1 (7428 Online)'),
      category: t('Thời khóa biểu', 'Timetable'),
      action: () => setActiveItem('tkb-hang-tuan')
    },
    {
      title: t('Tỉ lệ vắng mặt: 20,00% (3 buổi vắng)', 'Absent Rate: 20.00% (3 absent slots)'),
      category: t('Thời khóa biểu', 'Timetable'),
      action: () => setActiveItem('bc-diem-danh')
    },

    // Curriculum details records search
    {
      title: t('Mã môn: SE08202 - Đăng ký phúc khảo', 'Subject: SE08202 - Re-evaluation'),
      category: t('Học tập', 'Academic'),
      action: () => setActiveItem('chuong-trinh-gd')
    },
    {
      title: t('Mã môn: 4902.01.CNTT2 - Thiết kế lập trình', 'Subject: 4902.01.CNTT2 - Applied Programming'),
      category: t('Học tập', 'Academic'),
      action: () => setActiveItem('chuong-trinh-gd')
    },
    {
      title: t('Mã chương trình khung: BC_V6_01', 'Syllabus Code: BC_V6_01'),
      category: t('Học tập', 'Academic'),
      action: () => setActiveItem('chuong-trinh-gd')
    },
    {
      title: t('Môn: English 1 - Topnotch Fundamentals (ENT100.1)', 'Subject: English 1 - Topnotch Fundamentals (ENT100.1)'),
      category: t('Học tập', 'Academic'),
      action: () => setActiveItem('chuong-trinh-gd')
    },
    {
      title: t('Môn: English 2 - Topnotch 1 (ENT101.1)', 'Subject: English 2 - Topnotch 1 (ENT101.1)'),
      category: t('Học tập', 'Academic'),
      action: () => setActiveItem('chuong-trinh-gd')
    },
    {
      title: t('Môn: English 3 - Topnotch 2 (ENT102.1)', 'Subject: English 3 - Topnotch 2 (ENT102.1)'),
      category: t('Học tập', 'Academic'),
      action: () => setActiveItem('chuong-trinh-gd')
    },
    {
      title: t('Môn: English 4 - Topnotch 3 (ENT103.1)', 'Subject: English 4 - Topnotch 3 (ENT103.1)'),
      category: t('Học tập', 'Academic'),
      action: () => setActiveItem('chuong-trinh-gd')
    },
    {
      title: t('Môn: English 5 - Summit 1 (ENT104.1)', 'Subject: English 5 - Summit 1 (ENT104.1)'),
      category: t('Học tập', 'Academic'),
      action: () => setActiveItem('chuong-trinh-gd')
    },
    {
      title: t('Môn: Computing Fundamental (CF02)', 'Subject: Computing Fundamental (CF02)'),
      category: t('Học tập', 'Academic'),
      action: () => setActiveItem('chuong-trinh-gd')
    },
    {
      title: t('Môn: Vovinam (V0100)', 'Subject: Vovinam (V0100)'),
      category: t('Học tập', 'Academic'),
      action: () => setActiveItem('chuong-trinh-gd')
    },
    {
      title: t('Môn: Microsoft Offices (CF01)', 'Subject: Microsoft Offices (CF01)'),
      category: t('Học tập', 'Academic'),
      action: () => setActiveItem('chuong-trinh-gd')
    },
    {
      title: t('Môn: Personal Development (PDP101)', 'Subject: Personal Development (PDP101)'),
      category: t('Học tập', 'Academic'),
      action: () => setActiveItem('chuong-trinh-gd')
    },
    {
      title: t('Môn: Networking (7393)', 'Subject: Networking (7393)'),
      category: t('Học tập', 'Academic'),
      action: () => setActiveItem('chuong-trinh-gd')
    },
    {
      title: t('Môn: Programming (7388)', 'Subject: Programming (7388)'),
      category: t('Học tập', 'Academic'),
      action: () => setActiveItem('chuong-trinh-gd')
    },

    ...notifications.map(n => ({
      title: n.title,
      category: t('Thông báo', 'Notification'),
      action: () => {
        handleNotificationClick(n);
      }
    }))
  ];

  const renderTitle = (rawTitle: string) => {
    // If we are on the homepage, render search box with search icon and suggestions dropdown
    if (activeItem === 'trang-chu') {
      const allItems = getSearchItems();
      const filteredItems = searchQuery.trim() 
        ? allItems.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];

      return (
        <div ref={searchRef} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <Search 
            size={16} 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              color: 'var(--text-muted, #94A3B8)',
              pointerEvents: 'none',
              zIndex: 10
            }} 
          />
          <input 
            type="text" 
            className="header-search-input"
            placeholder={t('Tìm kiếm nhanh...', 'Quick search...')} 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            style={{
              padding: '8px 12px 8px 36px',
              borderRadius: '20px',
              border: '1px solid var(--border-color, #E2E8F0)',
              backgroundColor: 'var(--bg-cream, #F8FAFC)',
              color: 'var(--text-dark, #1E293B)',
              fontSize: '13px',
              outline: 'none',
              position: 'relative',
              zIndex: 5
            }}
          />
 
          {/* Suggestions Dropdown panel */}
          {showSuggestions && searchQuery.trim() !== '' && (
            <div 
              className="header-search-suggestions"
              style={{
                position: 'absolute',
                top: '42px',
                left: '0',
                backgroundColor: 'var(--bg-sidebar, #FFFFFF)',
                border: '1px solid var(--border-color, #CBD5E1)',
                borderRadius: '10px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                zIndex: 9999,
                maxHeight: '260px',
                overflowY: 'auto',
                padding: '8px 0',
              }}
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      item.action();
                      setSearchQuery('');
                      setShowSuggestions(false);
                    }}
                    style={{
                      padding: '10px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '13px',
                      transition: 'background-color 0.2s',
                      color: 'var(--text-dark, #1E293B)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-cream, #F1F5F9)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '220px' }}>
                      {item.title}
                    </span>
                    <span 
                      style={{
                        fontSize: '10.5px',
                        fontWeight: '700',
                        backgroundColor: item.category.includes('Thông báo') || item.category.includes('Notification') ? '#FEF2F2' : '#F0F9FF',
                        color: item.category.includes('Thông báo') || item.category.includes('Notification') ? '#EF4444' : '#0284C7',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        textTransform: 'uppercase'
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                ))
              ) : (
                <div style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-muted, #64748B)', textAlign: 'center', fontStyle: 'italic' }}>
                  {t('Không tìm thấy kết quả', 'No results found')}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // Otherwise, strip "Trang chủ / ", "Home / ", "Trang chủ  >  ", "Home  >  "
    let cleanTitle = rawTitle;
    if (cleanTitle.startsWith('Trang chủ / ')) {
      cleanTitle = cleanTitle.substring('Trang chủ / '.length);
    } else if (cleanTitle.startsWith('Home / ')) {
      cleanTitle = cleanTitle.substring('Home / '.length);
    } else if (cleanTitle.startsWith('Trang chủ  >  ')) {
      cleanTitle = cleanTitle.substring('Trang chủ  >  '.length);
    } else if (cleanTitle.startsWith('Home  >  ')) {
      cleanTitle = cleanTitle.substring('Home  >  '.length);
    } else if (cleanTitle.startsWith('Trang chủ > ')) {
      cleanTitle = cleanTitle.substring('Trang chủ > '.length);
    } else if (cleanTitle.startsWith('Home > ')) {
      cleanTitle = cleanTitle.substring('Home > '.length);
    }

    // Render breadcrumbs for separators like " > " or "  >  "
    if (cleanTitle.includes(' > ') || cleanTitle.includes('  >  ') || cleanTitle.includes(' >') || cleanTitle.includes('> ')) {
      const parts = cleanTitle.split(/\s*>\s*/);
      return (
        <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', flexWrap: 'wrap' }}>
          {parts.map((part, index) => {
            const isLast = index === parts.length - 1;
            return (
              <span key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                {index > 0 && <span style={{ color: '#94A3B8' }}>&gt;</span>}
                <span 
                  style={{ 
                    fontWeight: isLast ? '600' : 'normal', 
                    color: isLast ? 'var(--breadcrumb-active, #0056B3)' : 'var(--breadcrumb-text, #64748B)',
                    cursor: isLast ? 'default' : 'pointer'
                  }}
                  onClick={() => {
                    if (isLast) return;
                    const trimmedPart = part.trim();
                    if (trimmedPart === 'Đăng ký học vụ' || trimmedPart === 'Academic Affairs') {
                      setActiveItem('dv-hoc-vu');
                    } else if (trimmedPart === 'Khảo thí' || trimmedPart === 'Testing/Exam') {
                      setActiveItem('dv-khao-thi');
                    } else {
                      setActiveItem('trang-chu');
                    }
                  }}
                >
                  {part.trim()}
                </span>
              </span>
            );
          })}
        </span>
      );
    }

    // Render breadcrumbs for separators like " / "
    if (cleanTitle.includes(' / ')) {
      const parts = cleanTitle.split(/\s*\/\s*/);
      return (
        <span className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', flexWrap: 'wrap' }}>
          {parts.map((part, index) => {
            const isLast = index === parts.length - 1;
            return (
              <span key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                {index > 0 && <span style={{ color: '#94A3B8' }}>/</span>}
                <span 
                  style={{ 
                    fontWeight: isLast ? '600' : 'normal', 
                    color: isLast ? 'var(--breadcrumb-active, #0056B3)' : 'var(--breadcrumb-text, #64748B)',
                    cursor: isLast ? 'default' : 'pointer'
                  }}
                  onClick={() => {
                    if (isLast) return;
                    const trimmedPart = part.trim();
                    if (trimmedPart === 'Đăng ký học vụ' || trimmedPart === 'Academic Affairs') {
                      setActiveItem('dv-hoc-vu');
                    } else if (trimmedPart === 'Khảo thí' || trimmedPart === 'Testing/Exam') {
                      setActiveItem('dv-khao-thi');
                    } else {
                      setActiveItem('trang-chu');
                    }
                  }}
                >
                  {part.trim()}
                </span>
              </span>
            );
          })}
        </span>
      );
    }

    return <span className="header-title">{cleanTitle}</span>;
  };

  const handleNotificationClick = (n: { id: number; title: string }) => {
    let targetId = 999;
    if (n.title.includes('BHYT')) {
      targetId = 1;
    } else if (n.title.includes('còn 0 buổi vắng')) {
      targetId = 101;
    } else if (n.title.includes('chỉ còn được vắng 1 buổi')) {
      targetId = 102;
    } else {
      targetId = 100 + n.id;
    }
    window.open(window.location.origin + window.location.pathname + '?noticeId=' + targetId, '_blank');
  };

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
        {renderTitle(title)}
      </div>

      {/* Right side: Language Switcher, Theme Switcher, Notifications, and Profile */}
      <div className="header-right" style={{ position: 'relative' }}>
        
        {/* Theme Switcher Toggle */}
        <button 
          onClick={onThemeToggle}
          className="theme-toggle-btn"
          title={theme === 'light' ? (lang === 'vi' ? 'Chuyển sang giao diện tối' : 'Switch to dark theme') : (lang === 'vi' ? 'Chuyển sang giao diện sáng' : 'Switch to light theme')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            color: theme === 'light' ? '#64748B' : '#F59E0B',
            transition: 'background-color 0.2s, color 0.2s',
            marginRight: '4px'
          }}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Language Switcher */}
        <button 
          onClick={() => onLangChange(lang === 'vi' ? 'en' : 'vi')}
          className="lang-toggle-btn"
          title="Switch Language"
        >
          <Globe size={15} />
          <span className="lang-toggle-desktop">{lang === 'vi' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}</span>
          <span className="lang-toggle-mobile">{lang === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
        </button>

        {/* Bell Notifications */}
        {/* Bell Notifications */}
        <div ref={notificationRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
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
            <div className="dropdown-panel notifications-dropdown" style={{ top: '50px' }}>
              <div className="dropdown-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '8px', padding: '14px 16px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--text-dark)' }}>Notifications</span>
                <span style={{
                  backgroundColor: 'var(--bg-cream)',
                  color: 'var(--text-muted)',
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
                    onClick={() => handleNotificationClick(n)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      padding: '12px 16px',
                      borderBottom: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      backgroundColor: 'var(--bg-sidebar)'
                    }}
                  >
                    <div className="notification-details" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span className="notification-title" style={{ fontSize: '13px', fontWeight: n.read ? 'normal' : '600', color: 'var(--text-dark)' }}>
                        {n.title}
                      </span>
                      <span className="notification-time" style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
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
        <div ref={profileRef} style={{ position: 'relative' }}>
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
                      {lang === 'en' ? 'Computer Programming' : 'Lập trình máy tính'}
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
