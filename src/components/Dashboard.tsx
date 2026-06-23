import { useState } from 'react';
import { LearningIllustration } from './LearningIllustration';
import { Search } from 'lucide-react';

interface DashboardProps {
  lang: 'vi' | 'en';
  role?: 'student' | 'parent';
  setActiveItem?: (item: string) => void;
}

export const Dashboard = ({ lang, role = 'student', setActiveItem }: DashboardProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalSuccessMsg, setModalSuccessMsg] = useState('');
  const [modalErrorMsg, setModalErrorMsg] = useState('');

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      setModalErrorMsg(t('Vui lòng điền đầy đủ các thông tin!', 'Please fill in all details!'));
      return;
    }
    if (newPassword !== confirmPassword) {
      setModalErrorMsg(t('Mật khẩu mới không khớp!', 'New passwords do not match!'));
      return;
    }
    setModalErrorMsg('');
    setModalSuccessMsg(t('Thay đổi mật khẩu thành công!', 'Password changed successfully!'));
    setTimeout(() => {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setModalSuccessMsg('');
      setPasswordModalOpen(false);
    }, 1800);
  };

  // Translation helper
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  // Mock announcements from the screenshot
  const announcements = [
    {
      id: 1,
      date: '05/06/26',
      time: '14:13',
      type: t('[THÔNG BÁO]', '[ANNOUNCEMENT]'),
      content: t('MỞ ĐĂNG KÝ BHYT 6 THÁNG CUỐI NĂM 2026', 'OPEN REGISTRATION FOR HEALTH INSURANCE IN THE LAST 6 MONTHS OF 2026')
    },
    {
      id: 2,
      date: '29/05/26',
      time: '11:11',
      type: t('Quyết định', 'Decision'),
      content: t('Vv công nhận kết quả rèn luyện của sinh viên thuộc Chương trình đào tạo liên kết với nước ngoài (RK) học bất kỳ Mùa xuân năm 2026', 'Regarding the recognition of student training results under the international partnership program (RK) for Spring Semester 2026')
    },
    {
      id: 3,
      date: '28/05/26',
      time: '14:07',
      type: t('THÔNG BÁO', 'ANNOUNCEMENT'),
      content: t('THAY ĐỔI ĐỊA ĐIỂM HỌC TẬP', 'CHANGE OF STUDY LOCATION')
    },
    {
      id: 4,
      date: '23/04/26',
      time: '08:36',
      type: t('[KHẢO THÍ]_THÔNG BÁO', '[EXAMINATION]_ANNOUNCEMENT'),
      content: t('DSSV KHÔNG ĐỦ ĐIỀU KIỆN THI CUỐI KỲ TIẾNG ANH BLOCK 2_SP26', 'LIST OF STUDENTS INELIGIBLE FOR ENGLISH BLOCK 2 FINAL EXAMINATIONS_SP26')
    }
  ];

  // Filter announcements based on search query
  const filteredAnnouncements = announcements.filter(item => {
    const fullText = `${item.date} ${item.time} ${item.type} ${item.content}`.toLowerCase();
    return fullText.includes(searchQuery.toLowerCase());
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%' }}>
      <main className="dashboard-container">
        {role === 'parent' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '16px 8px', animation: 'fadeIn 0.5s ease' }}>
            {/* Top Section: Greetings & Student Metadata */}
            <div style={{ textAlign: 'left' }}>
              <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A', margin: '0 0 8px 0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {t('Welcome back, parents of Nguyễn Văn Hùng', 'Welcome back, parents of Nguyễn Văn Hùng')}
              </h1>
              <p 
                onClick={() => setActiveItem && setActiveItem('profile')}
                style={{ fontSize: '18px', color: '#EF562F', fontWeight: '700', margin: '0 0 16px 0', cursor: 'pointer', display: 'inline-block' }}
                onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                {t('Lập trình máy tính', 'Computer Programming')}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '12.5px' }}>
                <span style={{ backgroundColor: '#EF562F', color: '#FFFFFF', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold' }}>BS00679</span>
                <span style={{ backgroundColor: '#F59E0B', color: '#FFFFFF', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold' }}>15/12/2004</span>
                <span style={{ backgroundColor: '#EF562F', color: '#FFFFFF', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold' }}>k6</span>
                <span style={{ backgroundColor: '#10B981', color: '#FFFFFF', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold' }}>HL</span>
                <span style={{ backgroundColor: '#3B82F6', color: '#FFFFFF', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold' }}>SUMMER 2026</span>
              </div>
            </div>

            {/* Split Grid Section */}
            <div className="dashboard-layout" style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center' }}>
              {/* Left Side illustration */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LearningIllustration />
              </div>

              {/* Right Side Hawking Quote & Menu buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', textAlign: 'left' }}>
                <div style={{ borderLeft: '4px solid #EF562F', paddingLeft: '16px' }}>
                  <blockquote style={{ fontSize: '17.5px', fontWeight: '700', color: '#1e293b', fontStyle: 'italic', margin: '0 0 8px 0', lineHeight: '1.5' }}>
                    {t(
                      '"Dù cuộc sống có vẻ khó khăn thế nào, luôn có điều gì đó bạn có thể làm và thành công."',
                      '"However difficult life may seem, there is always something you can do and succeed at."'
                    )}
                  </blockquote>
                  <cite style={{ fontSize: '13px', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', fontStyle: 'normal' }}>
                    STEVEN HAWKING
                  </cite>
                </div>

                {/* Direct Action Navigation items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Student Profile redirect */}
                  <div 
                    onClick={() => setActiveItem && setActiveItem('profile')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #E2E8F0',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#EF562F';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                    }}
                  >
                    <div style={{
                      backgroundColor: '#FDF2F8',
                      color: '#DB2777',
                      padding: '12px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {/* Avatar/Users Icon representation */}
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#1E293B', margin: '0 0 2px 0' }}>
                        {t('Hồ sơ Sinh viên', 'Student Profile')}
                      </h4>
                      <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: '1.4' }}>
                        {t('Xem hồ sơ sinh viên gồm thông tin cá nhân, học tập, quyết định, vv...', 'View student profile details including personal info, academic status, decisions, etc...')}
                      </p>
                    </div>
                  </div>

                  {/* Change Password modal */}
                  <div 
                    onClick={() => setPasswordModalOpen(true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #E2E8F0',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#EF562F';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                    }}
                  >
                    <div style={{
                      backgroundColor: '#F0FDF4',
                      color: '#16A34A',
                      padding: '12px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#1E293B', margin: '0 0 2px 0' }}>
                        {t('Đổi mật khẩu', 'Change Password')}
                      </h4>
                      <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: '1.4' }}>
                        {t('Thay đổi mật khẩu đăng nhập', 'Change your portal login password')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Change Password Modal */}
            {passwordModalOpen && (
              <div className="modal-overlay" onClick={() => setPasswordModalOpen(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'left' }}>
                  <h3 className="modal-title" style={{ fontSize: '17px', fontWeight: '800', color: '#0d226b', marginBottom: '16px' }}>
                    {t('Thay đổi mật khẩu', 'Change Password')}
                  </h3>

                  {modalErrorMsg && (
                    <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', padding: '10px 12px', borderRadius: '6px', fontSize: '12.5px', marginBottom: '12px', fontWeight: '500' }}>
                      {modalErrorMsg}
                    </div>
                  )}

                  {modalSuccessMsg && (
                    <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '10px 12px', borderRadius: '6px', fontSize: '12.5px', marginBottom: '12px', fontWeight: '500' }}>
                      {modalSuccessMsg}
                    </div>
                  )}

                  <form onSubmit={handlePasswordChangeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '4px' }}>
                        {t('Mật khẩu hiện tại', 'Current Password')}
                      </label>
                      <input 
                        type="password" 
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)} 
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '4px' }}>
                        {t('Mật khẩu mới', 'New Password')}
                      </label>
                      <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '4px' }}>
                        {t('Xác nhận mật khẩu mới', 'Confirm New Password')}
                      </label>
                      <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} 
                      />
                    </div>

                    <div className="modal-actions" style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button type="button" onClick={() => setPasswordModalOpen(false)} style={{ backgroundColor: '#F1F5F9', border: 'none', color: '#475569', padding: '8px 16px', borderRadius: '6px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                        {t('Hủy', 'Cancel')}
                      </button>
                      <button type="submit" style={{ backgroundColor: '#EF562F', border: 'none', color: '#FFFFFF', padding: '8px 16px', borderRadius: '6px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                        {t('Xác nhận', 'Confirm')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="dashboard-layout">
            
            {/* Left Side: Greeting & Announcements */}
            <div className="dashboard-left">
              
              {/* Greeting */}
              <div>
                <h2 className="greeting-title">{t('Chào mừng trở lại,', 'Welcome back,')}</h2>
                <h2 className="greeting-title">Nguyễn Văn Hùng</h2>
              </div>

              {/* Announcements List */}
              <div className="announcements-list">
                {filteredAnnouncements.length > 0 ? (
                  filteredAnnouncements.map((ann) => (
                    <div key={ann.id} className="announcement-item">
                      {/* Calendar + Star SVG Icon (exactly like mockup) */}
                      <div className="announcement-icon-wrapper">
                        {/* Calendar Outline */}
                        <svg 
                          width="22" 
                          height="22" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        
                        {/* Purple/Blue/Orange Star Emblem overlay */}
                        <div className="announcement-star-badge">
                          <svg 
                            width="10" 
                            height="10" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            stroke="currentColor" 
                            strokeWidth="2"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </div>
                      </div>

                      {/* Announcement Content */}
                      <div>
                        <p className="announcement-text">
                          <span className="announcement-meta">
                            {ann.date} {ann.time}
                          </span>
                          - <span className="announcement-type">{ann.type}</span> {ann.content}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div 
                    style={{
                      textAlign: 'center',
                      padding: '32px',
                      color: 'var(--text-muted)',
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      borderRadius: '12px',
                      border: '1.5px dashed var(--border-color)'
                    }}
                  >
                    {t('Không tìm thấy thông báo nào phù hợp.', 'No matching announcements found.')}
                  </div>
                )}
              </div>

              {/* Search bar section */}
              <div className="search-section">
                <label className="search-label">{t('Hơn', 'Search')}</label>
                <div className="search-bar-wrapper">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('Tìm kiếm tin tức...', 'Search announcements...')}
                    className="search-input"
                  />
                  <div className="search-icon">
                    <Search size={18} />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: Remote Learning Vector Illustration */}
            <div className="dashboard-right">
              <LearningIllustration />
            </div>

          </div>
        )}
      </main>
    </div>
  );
};
