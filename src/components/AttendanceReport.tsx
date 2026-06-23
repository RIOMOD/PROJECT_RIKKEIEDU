import { useState } from 'react';
import { Footer } from './Footer';

interface AttendanceReportProps {
  lang: 'vi' | 'en';
}

interface AttendanceSession {
  index: number;
  dateVi: string;
  dateEn: string;
  slot: number;
  teacher: string;
  subjectCode: string;
  statusVi: string;
  statusEn: string;
  isPresent: boolean;
}

export const AttendanceReport = ({ lang }: AttendanceReportProps) => {
  const [selectedCampus, setSelectedCampus] = useState('BTEC');
  const [selectedTerm, setSelectedTerm] = useState('MÙA THU NĂM 2025');
  const [selectedCourse, setSelectedCourse] = useState('SE07101 - DỰ ÁN NGHIÊN CỨU MÁY TÍNH');

  // Translation helper
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  const campuses = [
    { value: 'BTEC', label: 'BTEC' },
    { value: 'APTECH', label: 'FPT APTECH' },
    { value: 'ARENA', label: 'FPT ARENA' }
  ];

  const terms = [
    { value: 'MÙA THU NĂM 2025', label: t('MÙA THU NĂM 2025', 'FALL 2025') },
    { value: 'MÙA HÈ 2025', label: t('MÙA HÈ 2025', 'SUMMER 2025') },
    { value: 'MÙA XUÂN 2025', label: t('MÙA XUÂN 2025', 'SPRING 2025') }
  ];

  const courses = [
    { value: 'SE07101 - DỰ ÁN NGHIÊN CỨU MÁY TÍNH', label: 'SE07101 - ' + t('DỰ ÁN NGHIÊN CỨU MÁY TÍNH', 'COMPUTER RESEARCH PROJECT') },
    { value: 'SE08202 - PHÁT TRIỂN ỨNG DỤNG WEB JAVA', label: 'SE08202 - ' + t('PHÁT TRIỂN ỨNG DỤNG WEB JAVA', 'JAVA WEB APPLICATION DEVELOPMENT') }
  ];

  // Mock sessions from screenshot (sessions 16 to 26)
  const sessions: AttendanceSession[] = [
    {
      index: 16,
      dateVi: 'Thứ Sáu (03/10)',
      dateEn: 'Friday (03/10)',
      slot: 4,
      teacher: 'QuangNV78',
      subjectCode: 'SE07101',
      statusVi: 'Hiện tại',
      statusEn: 'Present',
      isPresent: true
    },
    {
      index: 17,
      dateVi: 'Thứ Hai (06/10)',
      dateEn: 'Monday (06/10)',
      slot: 1,
      teacher: 'QuangNV78',
      subjectCode: 'SE07101',
      statusVi: 'Hiện tại',
      statusEn: 'Present',
      isPresent: true
    },
    {
      index: 18,
      dateVi: 'Thứ Hai (06/10)',
      dateEn: 'Monday (06/10)',
      slot: 2,
      teacher: 'QuangNV78',
      subjectCode: 'SE07101',
      statusVi: 'Hiện tại',
      statusEn: 'Present',
      isPresent: true
    },
    {
      index: 19,
      dateVi: 'Thứ Sáu (10/10)',
      dateEn: 'Friday (10/10)',
      slot: 3,
      teacher: 'QuangNV78',
      subjectCode: 'SE07101',
      statusVi: 'Hiện tại',
      statusEn: 'Present',
      isPresent: true
    },
    {
      index: 20,
      dateVi: 'Thứ Sáu (10/10)',
      dateEn: 'Friday (10/10)',
      slot: 4,
      teacher: 'QuangNV78',
      subjectCode: 'SE07101',
      statusVi: 'Hiện tại',
      statusEn: 'Present',
      isPresent: true
    },
    {
      index: 21,
      dateVi: 'Thứ Hai (13/10)',
      dateEn: 'Monday (13/10)',
      slot: 1,
      teacher: 'QuangNV78',
      subjectCode: 'SE07101',
      statusVi: 'Vắng mặt',
      statusEn: 'Absent',
      isPresent: false
    },
    {
      index: 22,
      dateVi: 'Thứ Hai (13/10)',
      dateEn: 'Monday (13/10)',
      slot: 2,
      teacher: 'QuangNV78',
      subjectCode: 'SE07101',
      statusVi: 'Vắng mặt',
      statusEn: 'Absent',
      isPresent: false
    },
    {
      index: 23,
      dateVi: 'Thứ Sáu (17/10)',
      dateEn: 'Friday (17/10)',
      slot: 3,
      teacher: 'QuangNV78',
      subjectCode: 'SE07101',
      statusVi: 'Vắng mặt',
      statusEn: 'Absent',
      isPresent: false
    },
    {
      index: 24,
      dateVi: 'Thứ Sáu (17/10)',
      dateEn: 'Friday (17/10)',
      slot: 4,
      teacher: 'QuangNV78',
      subjectCode: 'SE07101',
      statusVi: 'Vắng mặt',
      statusEn: 'Absent',
      isPresent: false
    },
    {
      index: 25,
      dateVi: 'Thứ Hai (20/10)',
      dateEn: 'Monday (20/10)',
      slot: 1,
      teacher: 'QuangNV78',
      subjectCode: 'SE07101',
      statusVi: 'Vắng mặt',
      statusEn: 'Absent',
      isPresent: false
    },
    {
      index: 26,
      dateVi: 'Thứ Hai (20/10)',
      dateEn: 'Monday (20/10)',
      slot: 2,
      teacher: 'QuangNV78',
      subjectCode: 'SE07101',
      statusVi: 'Vắng mặt',
      statusEn: 'Absent',
      isPresent: false
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      <main className="dashboard-container">
        
        {/* Page Title */}
        <h2 className="attendance-report-title">
          {t('XEM ĐIỂM THAM DỰ CỦA NGUYỄN VĂN HÙNG (HUNGNVBS00679)', 'VIEW ATTENDANCE FOR NGUYỄN VĂN HÙNG (HUNGNVBS00679)')}
        </h2>

        {/* Guideline line */}
        <div className="attendance-guideline">
          <span>👉</span> {t('CHỌN CƠ SỞ/CHƯƠNG TRÌNH, HỌC KỲ, MÔN HỌC... RỒI XEM BÁO CÁO.', 'SELECT CAMPUS/PROGRAM, TERM, COURSE... TO VIEW REPORT.')}
        </div>

        {/* Orange filter selectors row */}
        <div className="attendance-filters-row">
          {/* Campus Selector */}
          <div className="attendance-filter-group">
            <label className="attendance-filter-label">
              🏛️ {t('KHUÔN VIÊN/CHƯƠNG TRÌNH', 'CAMPUS/PROGRAM')}
            </label>
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className="attendance-filter-select"
            >
              {campuses.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Term Selector */}
          <div className="attendance-filter-group">
            <label className="attendance-filter-label">
              📅 {t('THUẬT NGỮ', 'TERM')}
            </label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="attendance-filter-select"
            >
              {terms.map(tOption => (
                <option key={tOption.value} value={tOption.value}>{tOption.label}</option>
              ))}
            </select>
          </div>

          {/* Course Selector */}
          <div className="attendance-filter-group">
            <label className="attendance-filter-label">
              📖 {t('KHÓA HỌC', 'COURSE')}
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="attendance-filter-select course-select"
            >
              {courses.map(courseOpt => (
                <option key={courseOpt.value} value={courseOpt.value}>{courseOpt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Attendance statistics banner */}
        <div className="attendance-stats-banner">
          <div className="attendance-stats-icon">!</div>
          <span className="attendance-stats-text">
            {lang === 'en' ? (
              <>
                ABSENT: <span className="highlight-red">38.33%</span> absent up to current time (23 absent out of 60 people).
              </>
            ) : (
              <>
                VẮNG MẶT: <span className="highlight-red">38,33%</span> vắng mặt tính đến thời điểm hiện tại (23 người vắng mặt trên tổng số 60 người).
              </>
            )}
          </span>
        </div>

        {/* Sessions table */}
        <div className="attendance-table-wrapper">
          <table className="attendance-table">
            <tbody>
              {sessions.map((session) => (
                <tr key={session.index} className="attendance-tr">
                  {/* Column 1: Index */}
                  <td className="attendance-td attendance-col-index">
                    {session.index}
                  </td>
                  
                  {/* Column 2: Date */}
                  <td className="attendance-td attendance-col-date">
                    {t(session.dateVi, session.dateEn)}
                  </td>
                  
                  {/* Column 3: Slot */}
                  <td className="attendance-td attendance-col-slot">
                    {session.slot}
                  </td>
                  
                  {/* Column 4: Teacher */}
                  <td className="attendance-td attendance-col-teacher">
                    {session.teacher}
                  </td>
                  
                  {/* Column 5: Subject Code */}
                  <td className="attendance-td attendance-col-subject">
                    {session.subjectCode}
                  </td>
                  
                  {/* Column 6: Status */}
                  <td className="attendance-td attendance-col-status">
                    <span className={session.isPresent ? 'status-present' : 'status-absent'}>
                      {t(session.statusVi, session.statusEn)}
                    </span>
                  </td>
                  
                  {/* Column 7: Empty cell for visual alignment */}
                  <td className="attendance-td attendance-col-empty"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
