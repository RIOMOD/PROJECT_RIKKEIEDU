import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Printer, 
  Globe, 
  Sun, 
  Moon, 
  Calendar 
} from 'lucide-react';
import { BtecLogo } from './BtecLogo';

export const StudentPortfolio = () => {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  // Mock student profile data matching the database
  const student = {
    name: 'Nguyễn Công Trứ',
    id: 'N24DTCN088',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120',
    dob: '15/12/2004',
    gender: t('Nam', 'Male'),
    telephone: '0879378668',
    email: 'truncn24dtcn088@rikkei.edu.vn',
    class: 'K24',
    campus: 'CNTT2',
    term: 'Term 7',
    major: t('Lập trình máy tính', 'Computer Programming'),
    gpa: '3.62 / 4.0',
    status: t('Đang học', 'Active'),
    skills: [
      'HTML5 / CSS3 / JavaScript (ES6)',
      'React.js / TypeScript',
      'Java (Java Web / Spring Boot)',
      'Object-Oriented Programming (OOP)',
      'Database Design & SQL Server',
      'Git / GitHub Version Control'
    ],
    projects: [
      {
        name: t('Hệ Thống Quản Lý Đào Tạo Học Thuật', 'Academic Training Management System'),
        tech: 'React, TypeScript, CSS Grid, Firebase',
        desc: t(
          'Xây dựng cổng thông tin học thuật dành cho sinh viên và phụ huynh. Tích hợp quản lý thời khóa biểu, điểm danh chuyên cần, lịch sử đăng ký học vụ và phản hồi chất lượng giảng dạy.',
          'Developed an academic portal for students and parents. Integrated weekly timetable, attendance reporting, academic service logs, and teacher feedback workflows.'
        )
      },
      {
        name: t('Ứng Dụng E-Commerce Bán Thiết Bị Công Nghệ', 'E-Commerce Technology Store'),
        tech: 'Java Web, Servlet/JSP, SQL Server, Bootstrap',
        desc: t(
          'Thiết kế và triển khai ứng dụng web bán hàng trực tuyến với giỏ hàng linh hoạt, thanh toán đa phương thức và trang dashboard quản trị kho hàng.',
          'Designed and deployed an online web application with flexible cart options, multi-channel payment integration, and a warehouse admin dashboard.'
        )
      }
    ],
    certs: [
      t('Học bổng Sinh viên Xuất sắc Học kỳ 1 & 2', 'Outstanding Student Scholarship - Semester 1 & 2'),
      t('Chứng chỉ Hoàn thành khóa học Java Backend RIKKEI', 'Certificate of Completion - Java Backend Developer (RIKKEI)'),
      t('Giải Ba cuộc thi Bách Khoa Hackathon 2025', '3rd Prize - BK Hackathon 2025')
    ]
  };

  return (
    <div className="portfolio-wrapper" style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-cream, #F2F7FF)',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: "'Be Vietnam Pro', 'Inter', sans-serif",
      transition: 'background-color 0.3s ease'
    }}>
      <style>{`
        .portfolio-wrapper {
          --primary-color: #0D226B;
          --secondary-color: #EF562F;
          --text-main: #1E293B;
          --text-sub: #64748B;
          --card-bg: #FFFFFF;
          --border-color: #E2E8F0;
        }

        html.dark .portfolio-wrapper {
          --primary-color: #1C2541;
          --secondary-color: #EF562F;
          --text-main: #F3F4F6;
          --text-sub: #9CA3AF;
          --card-bg: #1C2541;
          --border-color: #3A506B;
          background-color: #0B132B !important;
        }

        .portfolio-toolbar {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          width: 100%;
          max-width: 900px;
          justify-content: flex-end;
        }

        .portfolio-toolbar-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-main);
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .portfolio-toolbar-btn:hover {
          border-color: var(--secondary-color);
          color: var(--secondary-color);
        }

        .portfolio-card {
          width: 100%;
          max-width: 900px;
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .portfolio-header {
          background: linear-gradient(135deg, #0D226B, #3B82F6);
          padding: 32px 40px;
          color: #FFFFFF;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        html.dark .portfolio-header {
          background: linear-gradient(135deg, #0B132B, #1C2541);
          border-bottom: 1px solid #3A506B;
        }

        .portfolio-body {
          padding: 40px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 768px) {
          .portfolio-body {
            grid-template-columns: 280px 1fr;
          }
        }

        .portfolio-sidebar {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .portfolio-avatar-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .portfolio-avatar {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          border: 4px solid var(--card-bg);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          object-fit: cover;
          margin-bottom: 16px;
        }

        .portfolio-title-name {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 4px;
        }

        .portfolio-title-role {
          font-size: 13.5px;
          color: var(--secondary-color);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .portfolio-section-title {
          font-size: 14px;
          font-weight: 800;
          color: var(--text-main);
          border-bottom: 2px solid var(--secondary-color);
          padding-bottom: 6px;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .portfolio-info-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .portfolio-info-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--text-main);
        }

        .portfolio-info-item svg {
          color: var(--secondary-color);
          flex-shrink: 0;
        }

        .portfolio-tag {
          display: inline-block;
          background-color: var(--bg-cream, #F2F7FF);
          border: 1px solid var(--border-color);
          color: var(--text-main);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          margin: 4px;
        }

        html.dark .portfolio-tag {
          background-color: #0B132B !important;
        }

        .portfolio-main {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .project-item {
          padding: 16px;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          margin-bottom: 16px;
          transition: all 0.2s ease;
        }

        .project-item:hover {
          border-color: var(--secondary-color);
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }

        .project-name {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-main);
          margin: 0 0 4px 0;
        }

        .project-tech {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          color: var(--secondary-color);
          background-color: rgba(239, 86, 47, 0.08);
          padding: 2px 8px;
          border-radius: 4px;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .project-desc {
          font-size: 13px;
          color: var(--text-sub);
          line-height: 1.5;
          margin: 0;
        }

        .cert-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--text-main);
          margin-bottom: 12px;
        }

        .cert-item svg {
          color: var(--secondary-color);
          margin-top: 2px;
          flex-shrink: 0;
        }

        @media print {
          body, .portfolio-wrapper {
            background-color: #FFFFFF !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .portfolio-toolbar {
            display: none !important;
          }
          .portfolio-card {
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            max-width: 100% !important;
          }
          .portfolio-header {
            background: #0D226B !important;
            color: #FFFFFF !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .portfolio-body {
            grid-template-columns: 240px 1fr !important;
            padding: 30px !important;
          }
          .portfolio-tag {
            background-color: #F1F5F9 !important;
            border: 1px solid #E2E8F0 !important;
            color: #1E293B !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* TOOLBAR */}
      <div className="portfolio-toolbar">
        <button className="portfolio-toolbar-btn" onClick={() => setLang(l => l === 'en' ? 'vi' : 'en')}>
          <Globe size={15} />
          <span>{lang === 'en' ? 'Tiếng Việt' : 'English'}</span>
        </button>

        <button className="portfolio-toolbar-btn" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          <span>{theme === 'dark' ? t('Giao diện sáng', 'Light Mode') : t('Giao diện tối', 'Dark Mode')}</span>
        </button>

        <button className="portfolio-toolbar-btn" onClick={() => window.print()}>
          <Printer size={15} />
          <span>{t('In hồ sơ', 'Print CV')}</span>
        </button>
      </div>

      {/* CARD CONTENT */}
      <div className="portfolio-card">
        {/* BANNER HEADER */}
        <div className="portfolio-header">
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 4px 0', letterSpacing: '0.5px' }}>
              {t('HỒ SƠ NĂNG LỰC SINH VIÊN', 'STUDENT PORTFOLIO')}
            </h2>
            <p style={{ fontSize: '13px', margin: 0, opacity: 0.9 }}>
              {t('Hệ thống Đào tạo Quốc tế BTEC FPT - Rikkei Edu', 'BTEC FPT International Academy - Rikkei Edu')}
            </p>
          </div>
          <BtecLogo height={45} />
        </div>

        {/* BODY */}
        <div className="portfolio-body">
          {/* SIDEBAR COLUMN */}
          <div className="portfolio-sidebar">
            <div className="portfolio-avatar-section">
              <img src={student.avatar} alt={student.name} className="portfolio-avatar" />
              <h3 className="portfolio-title-name">{student.name}</h3>
              <span className="portfolio-title-role">{student.major}</span>
            </div>

            {/* INFO */}
            <div>
              <div className="portfolio-section-title">{t('Thông tin liên hệ', 'Contact Info')}</div>
              <div className="portfolio-info-list">
                <div className="portfolio-info-item">
                  <User size={15} />
                  <span>{student.id} ({student.class})</span>
                </div>
                <div className="portfolio-info-item">
                  <Mail size={15} />
                  <span style={{ fontSize: '11.5px', wordBreak: 'break-all' }}>{student.email}</span>
                </div>
                <div className="portfolio-info-item">
                  <Phone size={15} />
                  <span>{student.telephone}</span>
                </div>
                <div className="portfolio-info-item">
                  <Calendar size={15} />
                  <span>{student.dob}</span>
                </div>
                <div className="portfolio-info-item">
                  <MapPin size={15} />
                  <span>{student.campus === 'CNTT2' ? 'Hải Phòng' : 'Hà Nội'}</span>
                </div>
              </div>
            </div>

            {/* SKILLS */}
            <div>
              <div className="portfolio-section-title">{t('Kỹ năng cốt lõi', 'Key Skills')}</div>
              <div style={{ margin: '0 -4px' }}>
                {student.skills.map((s, idx) => (
                  <span key={idx} className="portfolio-tag">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN COLUMN */}
          <div className="portfolio-main">
            {/* ACADEMIC PROGRESS */}
            <div>
              <div className="portfolio-section-title">{t('Tiến trình học tập', 'Academic Progress')}</div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                textAlign: 'center'
              }}>
                <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-sub)', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>GPA</span>
                  <strong style={{ fontSize: '18px', color: 'var(--secondary-color)', display: 'block', marginTop: '4px' }}>{student.gpa}</strong>
                </div>
                <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-sub)', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>{t('Trạng thái', 'Status')}</span>
                  <strong style={{ fontSize: '18px', color: '#10B981', display: 'block', marginTop: '4px' }}>{student.status}</strong>
                </div>
                <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-sub)', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>{t('Học kỳ', 'Semester')}</span>
                  <strong style={{ fontSize: '18px', color: 'var(--primary-color)', display: 'block', marginTop: '4px' }}>{student.term}</strong>
                </div>
              </div>
            </div>

            {/* PROJECTS */}
            <div>
              <div className="portfolio-section-title">{t('Dự án thực tế', 'Practical Projects')}</div>
              <div>
                {student.projects.map((proj, idx) => (
                  <div key={idx} className="project-item">
                    <h4 className="project-name">{proj.name}</h4>
                    <span className="project-tech">{proj.tech}</span>
                    <p className="project-desc">{t(proj.desc, proj.desc)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ACHIEVEMENTS */}
            <div>
              <div className="portfolio-section-title">{t('Thành tích & Chứng nhận', 'Achievements & Certifications')}</div>
              <div>
                {student.certs.map((c, idx) => (
                  <div key={idx} className="cert-item">
                    <Award size={16} />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
