import { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { OnlineServices } from './components/OnlineServices';
import { RegistrationHistory } from './components/RegistrationHistory';
import { TeacherFeedback } from './components/TeacherFeedback';
import { WeeklyTimetable } from './components/WeeklyTimetable';
import { ClassTimetable } from './components/ClassTimetable';
import { ExamSchedule } from './components/ExamSchedule';
import { AttendanceReport } from './components/AttendanceReport';
import { MarkReport } from './components/MarkReport';
import { AcademicTranscript } from './components/AcademicTranscript';
import { Curriculum } from './components/Curriculum';
import { Profile } from './components/Profile';
import { Login } from './components/Login';
import { TuitionReport } from './components/TuitionReport';
import { Footer } from './components/Footer';
import { QA } from './components/QA';
import { NoticeDetail } from './components/NoticeDetail';
import { StudentHandbook } from './components/StudentHandbook';
import { StudentPortfolio } from './components/StudentPortfolio';
import { Construction, ArrowLeft } from 'lucide-react';

function App() {
  // Check if we are viewing the student portfolio page
  if (window.location.pathname.includes('/portfolio/')) {
    return <StudentPortfolio />;
  }

  // Check if we are viewing a notice detail in a new tab
  const urlParams = new URLSearchParams(window.location.search);
  const noticeId = urlParams.get('noticeId');
  if (noticeId) {
    return <NoticeDetail id={Number(noticeId)} />;
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('trang-chu');
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'parent'>('student');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'light');

  useEffect(() => {
    if (theme === 'dark' && isLoggedIn) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme, isLoggedIn]);

  const scrollPositions = useRef<Record<string, number>>({});

  const handleNavigation = (newItem: string, resetScroll?: boolean) => {
    const container = document.querySelector('.scrollable-content');
    if (container) {
      if (newItem !== activeItem) {
        scrollPositions.current[activeItem] = container.scrollTop;
      }
    }
    if (resetScroll) {
      scrollPositions.current[newItem] = 0;
      if (container && newItem !== activeItem) {
        container.scrollTop = 0;
      }
    }
    setActiveItem(newItem);
  };

  useEffect(() => {
    const container = document.querySelector('.scrollable-content');
    if (container) {
      const savedPos = scrollPositions.current[activeItem] || 0;
      container.scrollTop = savedPos;
      
      const handle = setTimeout(() => {
        container.scrollTop = savedPos;
      }, 0);
      return () => clearTimeout(handle);
    }
  }, [activeItem]);

  // Human-readable title mapping for breadcrumbs & page headers (Bilingual)
  const menuTitles: Record<string, { vi: string; en: string }> = {
    'trang-chu': { vi: 'Trang chủ', en: 'Home' },
    'dv-truc-tuyen': { vi: 'Trang chủ / Cổng thông tin học thuật RIKKEI', en: 'Home / Academic Portal RIKKEI' },
    'dv-hoc-vu': { vi: 'Trang chủ / Cổng thông tin học thuật RIKKEI', en: 'Home / Academic Portal RIKKEI' },
    'dv-thong-tin': { vi: 'Trang chủ / Cổng thông tin học thuật RIKKEI', en: 'Home / Academic Portal RIKKEI' },
    'dv-khao-thi': { vi: 'Trang chủ / Cổng thông tin học thuật RIKKEI', en: 'Home / Academic Portal RIKKEI' },
    'lich-su-dk': { vi: 'Trang chủ / Cổng thông tin học thuật RIKKEI', en: 'Home / Academic Portal RIKKEI' },
    'phan-hoi-clgd': { vi: 'Trang chủ / Nhận xét', en: 'Home / Feedback' },
    'tkb-hang-tuan': { vi: 'Trang chủ / Thời khóa biểu hàng tuần', en: 'Home / Weekly Timetable' },
    'tkb-lop-hoc': { vi: 'Trang chủ / Thời khóa biểu lớp học', en: 'Home / Class Timetable' }, // Match screenshot breadcrumbs
    'xem-lich-thi': { vi: 'Home / View Exam Schedule', en: 'Home / View Exam Schedule' },
    'bc-diem-danh': { vi: 'Trang chủ / Báo cáo điểm danh', en: 'Home / Attendance Report' },
    'bc-mark': { vi: 'Trang chủ / Báo cáo Mark', en: 'Home / Mark Report' },
    'bang-diem-ht': { vi: 'Trang chủ / Bảng điểm học tập', en: 'Home / Academic Transcript' },
    'chuong-trinh-gd': { vi: 'Trang chủ / Chương trình khung', en: 'Home / Curriculum' },
    'so-tay-sv': { vi: 'Sổ tay sinh viên', en: 'Student Handbook' },
    'profile': { vi: 'Home / RIKKEI Academic Portal', en: 'Home / RIKKEI Academic Portal' },
    'hoc-phi': { vi: 'Trang chủ / Báo cáo đóng học phí', en: 'Home / Tuition Payment Report' },
    'dk-vang-thi': { vi: 'Trang chủ  >  Khảo thí  >  Đăng ký vắng thi', en: 'Home  >  Testing/Exam  >  Exam Absence Registration' },
    'phuc-khao': { vi: 'Trang chủ  >  Khảo thí  >  Phúc khảo', en: 'Home  >  Testing/Exam  >  Re-evaluation' },
    'dk-thi-lai': { vi: 'Trang chủ  >  Khảo thí  >  Đăng ký thi lại / Thi bổ sung', en: 'Home  >  Testing/Exam  >  Re-taking / Supplementary Exam' },
    'bao-luu-kqht': { vi: 'Trang chủ  >  Đăng ký học vụ  >  Bảo lưu kết quả học tập', en: 'Home  >  Academic Affairs  >  Academic Suspension' },
    'q-a': { vi: 'Home / Q&A', en: 'Home / Q&A' }
  };

  // Helper to render page content based on selected sidebar item
  const renderContent = () => {
    if (activeItem === 'trang-chu') {
      return <Dashboard lang={lang} role={userRole} setActiveItem={handleNavigation} />;
    }
    
    if (
      activeItem === 'dv-truc-tuyen' ||
      activeItem === 'dv-hoc-vu' ||
      activeItem === 'dv-thong-tin' ||
      activeItem === 'dv-khao-thi' ||
      activeItem === 'dk-vang-thi' ||
      activeItem === 'phuc-khao' ||
      activeItem === 'dk-thi-lai' ||
      activeItem === 'bao-luu-kqht'
    ) {
      return <OnlineServices lang={lang} activeItem={activeItem} setActiveItem={handleNavigation} />;
    }

    if (activeItem === 'lich-su-dk') {
      return <RegistrationHistory lang={lang} />;
    }

    if (activeItem === 'phan-hoi-clgd') {
      return <TeacherFeedback lang={lang} />;
    }

    if (activeItem === 'tkb-hang-tuan') {
      return <WeeklyTimetable lang={lang} />;
    }

    if (activeItem === 'tkb-lop-hoc') {
      return <ClassTimetable lang={lang} />;
    }

    if (activeItem === 'xem-lich-thi') {
      return <ExamSchedule lang={lang} />;
    }

    if (activeItem === 'bc-diem-danh') {
      return <AttendanceReport lang={lang} />;
    }

    if (activeItem === 'bc-mark') {
      return <MarkReport lang={lang} />;
    }

    if (activeItem === 'bang-diem-ht') {
      return <AcademicTranscript lang={lang} />;
    }

    if (activeItem === 'chuong-trinh-gd') {
      return <Curriculum lang={lang} />;
    }

    if (activeItem === 'profile') {
      return <Profile lang={lang} />;
    }

    if (activeItem === 'hoc-phi') {
      return <TuitionReport lang={lang} />;
    }

    if (activeItem === 'q-a') {
      return <QA lang={lang} />;
    }

    if (activeItem === 'so-tay-sv') {
      return <StudentHandbook lang={lang} />;
    }

    const currentTitle = menuTitles[activeItem]?.[lang] || 'Cổng thông tin';

    // Interactive Placeholder for sub-features
    return (
      <div className="placeholder-screen">
        <div className="placeholder-icon-wrapper">
          <Construction size={48} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 className="placeholder-title">{currentTitle}</h2>
          <p className="placeholder-desc">
            {lang === 'en' 
              ? 'This feature is currently under development according to RK RIKKEI student portal roadmaps. Return to home to view recent announcements.'
              : 'Tính năng này đang được phát triển theo lộ trình của cổng thông tin sinh viên RK. Quay lại trang chủ để xem thông báo mới nhất.'
            }
          </p>
        </div>
        <button 
          onClick={() => handleNavigation('trang-chu')}
          className="back-btn"
        >
          <ArrowLeft size={16} />
          <span>{lang === 'en' ? 'Back to Home' : 'Quay lại trang chủ'}</span>
        </button>
      </div>
    );
  };

  const getPageTitle = () => {
    return menuTitles[activeItem]?.[lang] || 'Portal';
  };

  if (!isLoggedIn) {
    return (
      <Login 
        onLogin={(userLang, role) => {
          setLang(userLang);
          setUserRole(role);
          setIsLoggedIn(true);
        }}
        currentLang={lang}
        onLangChange={setLang}
      />
    );
  }

  return (
    <div className={`app-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Navigation Drawer Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeItem={activeItem}
        setActiveItem={handleNavigation}
        lang={lang}
        role={userRole}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="main-content-wrapper">
        {/* Top Navbar Header */}
        <Header 
          onMenuToggle={() => setSidebarOpen(true)} 
          title={getPageTitle()} 
          lang={lang}
          onLangChange={setLang}
          setActiveItem={handleNavigation}
          onLogout={() => setIsLoggedIn(false)}
          theme={theme}
          onThemeToggle={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
          activeItem={activeItem}
        />

        {/* Dynamic Inner Page Content */}
        <div className="scrollable-content" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
          <div style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
            {renderContent()}
          </div>
          <Footer lang={lang} />
        </div>
      </div>
    </div>
  );
}

export default App;
