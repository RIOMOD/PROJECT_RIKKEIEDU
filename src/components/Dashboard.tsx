import { useState } from 'react';
import { LearningIllustration } from './LearningIllustration';
import { Footer } from './Footer';
import { Search, Monitor, HelpCircle, Key, FileText, ChevronRight } from 'lucide-react';

export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock announcements from the screenshot
  const announcements = [
    {
      id: 1,
      date: '05/06/26',
      time: '14:13',
      type: '[THÔNG BÁO]',
      content: 'MỞ ĐĂNG KÝ Thuốc 6 THÁNG CUỐI NĂM 2026'
    },
    {
      id: 2,
      date: '29/05/26',
      time: '11:11',
      type: 'Quyết định',
      content: 'Vv công nhận kết quả rèn luyện của sinh viên thuộc Chương trình đào tạo liên kết với nước ngoài (BTEC) học bất kỳ Mùa xuân năm 2026'
    },
    {
      id: 3,
      date: '28/05/26',
      time: '14:07',
      type: 'THÔNG BÁO',
      content: 'THAY ĐỔI ĐỊA ĐIỂM HỌC TẬP'
    },
    {
      id: 4,
      date: '23/04/26',
      time: '08:36',
      type: '[KHẢO THÍ]_THÔNG BÁO',
      content: 'DSSV KHÔNG ĐỦ ĐIỀU KIỆN THI CUỐI KỲ TIẾNG ANH BLOCK 2_SP26'
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
              <h2 className="greeting-title">Chào mừng trở lại,</h2>
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
                  Không tìm thấy thông báo nào phù hợp.
                </div>
              )}
            </div>

            {/* Search bar section */}
            <div className="search-section">
              <label className="search-label">Hơn</label>
              <div className="search-bar-wrapper">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm tin tức..."
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

        {/* Middle Section: Orange Action Banners (Tin tức, Hỏi đáp, Ứng dụng) */}
        <div className="orange-action-banner">
          <a href="#" className="action-card-item">
            <div className="action-card-icon">
              <Monitor size={22} />
            </div>
            <span>Tin tức</span>
          </a>
          <a href="#" className="action-card-item">
            <div className="action-card-icon">
              <HelpCircle size={22} />
            </div>
            <span>Hỏi & Đáp</span>
          </a>
          <a href="#" className="action-card-item">
            <div className="action-card-icon blue-bg">
              <Key size={22} />
            </div>
            <span>Ứng dụng</span>
          </a>
        </div>

        {/* Lower Section: Illustration & Quote / Academic shortcuts */}
        <div className="quote-info-section">
          
          {/* Quote Illustration SVG */}
          <div className="quote-left-illustration">
            <svg
              viewBox="0 0 250 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', maxWidth: '240px', height: 'auto', overflow: 'visible' }}
            >
              {/* Floor line */}
              <line x1="10" y1="220" x2="240" y2="220" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
              
              {/* Floating Clock */}
              <g transform="translate(110, 30)">
                <circle cx="15" cy="15" r="14" stroke="#3B82F6" strokeWidth="2" fill="white" />
                <path d="M15 6 L15 15 L21 15" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Speech bubble with heart */}
              <g transform="translate(130, 80)">
                <path d="M10 25 C10 15 25 10 35 15 C45 20 40 35 30 35 C28 35 25 38 22 40 L22 35 C15 35 10 30 10 25 Z" fill="#FEE2E2" />
                <path d="M22 21 C22 21 21 18 24 18 C26 18 27 20 27 20 C27 20 28 18 30 18 C33 18 32 21 32 21 C32 23 27 26 27 26 C27 26 22 23 22 21 Z" fill="#EF4444" />
              </g>

              {/* Stool / Chair */}
              <path d="M85 150 L75 220 M95 150 L105 220" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="90" cy="150" rx="14" ry="4" fill="#2563EB" />

              {/* Potted Plant */}
              <g transform="translate(160, 160)">
                <path d="M10 30 L5 60 L25 60 L20 30 Z" fill="#EF4444" />
                <rect x="8" y="27" width="14" height="3" fill="#DC2626" />
                <path d="M15 27 Q10 12 0 10 Q10 5 15 27 Z" fill="#10B981" />
                <path d="M15 27 Q20 12 30 10 Q20 5 15 27 Z" fill="#059669" />
              </g>

              {/* Girl studying */}
              <g transform="translate(60, 70)">
                {/* Hair */}
                <path d="M22 35 C16 35 10 42 12 55 L28 55 Z" fill="#1E293B" />
                {/* Body */}
                <path d="M15 80 L35 80 L40 120 L10 120 Z" fill="#F472B6" /> {/* Pink shirt */}
                <path d="M15 120 L35 120 L25 150 L5 145 Z" fill="#3B82F6" /> {/* Blue pants */}
                {/* Arm / laptop */}
                <path d="M35 90 Q50 90 48 105" stroke="#F472B6" strokeWidth="6" strokeLinecap="round" />
                <rect x="42" y="100" width="18" height="12" rx="1" fill="#475569" transform="rotate(-10)" />
                {/* Head */}
                <circle cx="24" cy="40" r="10" fill="#FDBA74" />
                {/* Hair cover */}
                <path d="M14 36 C14 26 34 26 34 36 C34 32 29 30 24 30 C19 30 14 32 14 36 Z" fill="#1E293B" />
              </g>
            </svg>
          </div>

          {/* Quote & Academic Reports Info */}
          <div className="quote-right-content">
            <div className="quote-text-container">
              <h3 className="quote-heading">
                “Dù cuộc sống có khó khăn đến đâu, luôn có <span className="highlight">điều bạn có thể làm</span> và thành công.”
              </h3>
              <p className="quote-author">STEVEN HAWKING</p>
            </div>

            {/* Academic Shortcuts List */}
            <div className="info-cards-list">
              <a href="#" className="academic-info-card">
                <div className="academic-info-icon" style={{ backgroundColor: '#A78B71' }}>
                  <FileText size={22} />
                </div>
                <div>
                  <h4 className="academic-info-title">Báo cáo học tập:</h4>
                  <p className="academic-info-desc">Thông tin về tình trạng học tập của bạn</p>
                </div>
                <ChevronRight size={18} style={{ marginLeft: 'auto', color: '#94A3B8' }} />
              </a>

              <a href="#" className="academic-info-card">
                <div className="academic-info-icon" style={{ backgroundColor: '#2563EB' }}>
                  <FileText size={22} />
                </div>
                <div>
                  <h4 className="academic-info-title">Bảng điểm</h4>
                  <p className="academic-info-desc">Thông tin về điểm số và điểm trung bình tích lũy (GPA) hiện tại của bạn</p>
                </div>
                <ChevronRight size={18} style={{ marginLeft: 'auto', color: '#94A3B8' }} />
              </a>
            </div>
          </div>

        </div>

      </main>

      {/* Two-column Footer contact details */}
      <Footer />
    </div>
  );
};
