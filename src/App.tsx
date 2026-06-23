import { useState } from 'react';
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
import { Construction, ArrowLeft } from 'lucide-react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('trang-chu');
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  // Human-readable title mapping for breadcrumbs & page headers (Bilingual)
  const menuTitles: Record<string, { vi: string; en: string }> = {
    'trang-chu': { vi: 'Trang chủ', en: 'Home' },
    'dv-truc-tuyen': { vi: 'Trang chủ / Cổng thông tin học thuật FPT', en: 'Home / Academic Portal FPT' },
    'lich-su-dk': { vi: 'Trang chủ / Cổng thông tin học thuật FPT', en: 'Home / Academic Portal FPT' },
    'thay-doi-lop': { vi: 'Yêu cầu thay đổi lớp học', en: 'Request Change Class' },
    'phan-hoi-clgd': { vi: 'Trang chủ / Nhận xét', en: 'Home / Feedback' },
    'xem-lich-trinh': { vi: 'Xem lịch trình học tập', en: 'View Schedule' },
    'tkb-hang-tuan': { vi: 'Trang chủ / Thời khóa biểu hàng tuần', en: 'Home / Weekly Timetable' },
    'tkb-lop-hoc': { vi: 'Trang chủ / Thời khóa biểu lớp học', en: 'Home / Class Timetable' }, // Match screenshot breadcrumbs
    'xem-lich-thi': { vi: 'Home / View Exam Schedule', en: 'Home / View Exam Schedule' },
    'hoc-phi': { vi: 'Thông tin đóng học phí', en: 'Course Fee' },
    'tot-nghiep': { vi: 'Thông tin nhận bằng tốt nghiệp', en: 'Diploma period' },
    'bc-diem-danh': { vi: 'Trang chủ / Báo cáo điểm danh', en: 'Home / Attendance Report' },
    'bc-mark': { vi: 'Home / Mark Report', en: 'Home / Mark Report' },
    'bang-diem-ht': { vi: 'Home / Academic Transcript', en: 'Home / Academic Transcript' },
    'chuong-trinh-gd': { vi: 'Chương trình giảng dạy', en: 'Curriculum' },
    'so-tay-sv': { vi: 'Sổ tay sinh viên', en: 'Student Handbook' }
  };

  // Helper to render page content based on selected sidebar item
  const renderContent = () => {
    if (activeItem === 'trang-chu') {
      return <Dashboard />;
    }
    
    if (activeItem === 'dv-truc-tuyen') {
      return <OnlineServices />;
    }

    if (activeItem === 'lich-su-dk') {
      return <RegistrationHistory />;
    }

    if (activeItem === 'phan-hoi-clgd') {
      return <TeacherFeedback />;
    }

    if (activeItem === 'tkb-hang-tuan') {
      return <WeeklyTimetable />;
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
              ? 'This feature is currently under development according to BTEC FPT student portal roadmaps. Return to home to view recent announcements.'
              : 'Tính năng này đang được phát triển theo lộ trình của cổng thông tin sinh viên BTEC. Quay lại trang chủ để xem thông báo mới nhất.'
            }
          </p>
        </div>
        <button 
          onClick={() => setActiveItem('trang-chu')}
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

  return (
    <div className="app-container">
      {/* Navigation Drawer Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        lang={lang}
      />

      {/* Main Content Area */}
      <div className="main-content-wrapper">
        {/* Top Navbar Header */}
        <Header 
          onMenuToggle={() => setSidebarOpen(true)} 
          title={getPageTitle()} 
          lang={lang}
          onLangChange={setLang}
        />

        {/* Dynamic Inner Page Content */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
