import { useState } from 'react';
import { LearningIllustration } from './LearningIllustration';
import { Search } from 'lucide-react';
import { Footer } from './Footer';

interface DashboardProps {
  lang: 'vi' | 'en';
}

export const Dashboard = ({ lang }: DashboardProps) => {
  const [searchQuery, setSearchQuery] = useState('');

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
        {/* Top Section: Split Grid Layout */}
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
      </main>
      <Footer lang={lang} />
    </div>
  );
};
