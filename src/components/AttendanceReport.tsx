import { useState } from 'react';

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
  commentVi?: string;
  commentEn?: string;
}

export const AttendanceReport = ({ lang }: AttendanceReportProps) => {
  const [selectedCampus, setSelectedCampus] = useState('RK');
  const [selectedTerm, setSelectedTerm] = useState('MÙA HÈ 2025');
  const [selectedCourse, setSelectedCourse] = useState('SE07202 - Business Process Support (7408)');

  // Translation helper
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  const campuses = [
    { value: 'RK', label: 'RK' },
    { value: 'APTECH', label: 'RIKKEI APTECH' },
    { value: 'ARENA', label: 'RIKKEI ARENA' }
  ];

  const terms = [
    { value: 'MÙA HÈ 2025', label: t('MÙA HÈ 2025', 'SUMMER 2025') },
    { value: 'MÙA THU NĂM 2025', label: t('MÙA THU NĂM 2025', 'MÙA THU NĂM 2025') },
    { value: 'MÙA XUÂN 2025', label: t('MÙA XUÂN 2025', 'SPRING 2025') }
  ];

  const courses = [
    { value: 'SE07202 - Business Process Support (7408)', label: 'SE07202 - Business Process Support (7408)' },
    { value: 'SE07203 - PHÁT TRIỂN ỨNG DỤNG (7436)', label: 'SE07203 - ' + t('PHÁT TRIỂN ỨNG DỤNG (7436)', 'APPLICATION DEVELOPMENT (7436)') },
    { value: 'SE07101 - DỰ ÁN NGHIÊN CỨU MÁY TÍNH', label: 'SE07101 - ' + t('DỰ ÁN NGHIÊN CỨU MÁY TÍNH', 'COMPUTER RESEARCH PROJECT') }
  ];

  // Mock sessions from screenshot (sessions 7 to 18)
  const sessions: AttendanceSession[] = [
    {
      index: 7,
      dateVi: 'Thứ Bảy (31/05)',
      dateEn: 'Saturday (31/05)',
      slot: 3,
      teacher: 'VuNV35',
      subjectCode: 'SE07202',
      statusVi: 'Hiện tại',
      statusEn: 'Present',
      isPresent: true
    },
    {
      index: 8,
      dateVi: 'Thứ Bảy (31/05)',
      dateEn: 'Saturday (31/05)',
      slot: 7,
      teacher: 'VF_HCM_04',
      subjectCode: 'SE07202',
      statusVi: 'Hiện tại',
      statusEn: 'Present',
      isPresent: true,
      commentVi: 'Hệ thống tự động điểm danh, slot Online',
      commentEn: 'Automatic check-in, Online slot'
    },
    {
      index: 9,
      dateVi: 'Thứ Bảy (07/06)',
      dateEn: 'Saturday (07/06)',
      slot: 3,
      teacher: 'VuNV35',
      subjectCode: 'SE07202',
      statusVi: 'Hiện tại',
      statusEn: 'Present',
      isPresent: true
    },
    {
      index: 10,
      dateVi: 'Thứ Bảy (07/06)',
      dateEn: 'Saturday (07/06)',
      slot: 7,
      teacher: 'VF_HCM_04',
      subjectCode: 'SE07202',
      statusVi: 'Hiện tại',
      statusEn: 'Present',
      isPresent: true,
      commentVi: 'Hệ thống tự động điểm danh, slot Online',
      commentEn: 'Automatic check-in, Online slot'
    },
    {
      index: 11,
      dateVi: 'Thứ Bảy (14/06)',
      dateEn: 'Saturday (14/06)',
      slot: 3,
      teacher: 'VuNV35',
      subjectCode: 'SE07202',
      statusVi: 'Hiện tại',
      statusEn: 'Present',
      isPresent: true
    },
    {
      index: 12,
      dateVi: 'Thứ Bảy (14/06)',
      dateEn: 'Saturday (14/06)',
      slot: 7,
      teacher: 'VF_HCM_04',
      subjectCode: 'SE07202',
      statusVi: 'Hiện tại',
      statusEn: 'Present',
      isPresent: true,
      commentVi: 'Hệ thống tự động điểm danh, slot Online',
      commentEn: 'Automatic check-in, Online slot'
    },
    {
      index: 13,
      dateVi: 'Thứ Bảy (21/06)',
      dateEn: 'Saturday (21/06)',
      slot: 3,
      teacher: 'VuNV35',
      subjectCode: 'SE07202',
      statusVi: 'Hiện tại',
      statusEn: 'Present',
      isPresent: true
    },
    {
      index: 14,
      dateVi: 'Thứ Bảy (21/06)',
      dateEn: 'Saturday (21/06)',
      slot: 7,
      teacher: 'VF_HCM_04',
      subjectCode: 'SE07202',
      statusVi: 'Hiện tại',
      statusEn: 'Present',
      isPresent: true,
      commentVi: 'Hệ thống tự động điểm danh, slot Online',
      commentEn: 'Automatic check-in, Online slot'
    },
    {
      index: 15,
      dateVi: 'Thứ Bảy (28/06)',
      dateEn: 'Saturday (28/06)',
      slot: 3,
      teacher: 'VuNV35',
      subjectCode: 'SE07202',
      statusVi: 'Vắng mặt',
      statusEn: 'Absent',
      isPresent: false
    },
    {
      index: 16,
      dateVi: 'Thứ Bảy (28/06)',
      dateEn: 'Saturday (28/06)',
      slot: 7,
      teacher: 'VF_HCM_04',
      subjectCode: 'SE07202',
      statusVi: 'Hiện tại',
      statusEn: 'Present',
      isPresent: true,
      commentVi: 'Hệ thống tự động điểm danh, slot Online',
      commentEn: 'Automatic check-in, Online slot'
    },
    {
      index: 17,
      dateVi: 'Thứ Bảy (05/07)',
      dateEn: 'Saturday (05/07)',
      slot: 3,
      teacher: 'VuNV35',
      subjectCode: 'SE07202',
      statusVi: 'Hiện tại',
      statusEn: 'Present',
      isPresent: true
    },
    {
      index: 18,
      dateVi: 'Thứ Bảy (05/07)',
      dateEn: 'Saturday (05/07)',
      slot: 7,
      teacher: 'VF_HCM_04',
      subjectCode: 'SE07202',
      statusVi: 'Hiện tại',
      statusEn: 'Present',
      isPresent: true,
      commentVi: 'Hệ thống tự động điểm danh, slot Online',
      commentEn: 'Automatic check-in, Online slot'
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
          <span>✏️</span> {t('CHỌN CƠ SỞ/CHƯƠNG TRÌNH, HỌC KỲ, MÔN HỌC... RỒI XEM BÁO CÁO.', 'SELECT CAMPUS/PROGRAM, TERM, COURSE... TO VIEW REPORT.')}
        </div>

        {/* Orange filter selectors row */}
        <div className="attendance-filters-row">
          {/* Campus Selector */}
          <div className="attendance-filter-group">
            <label className="attendance-filter-label">
              🏛️ {t('CƠ SỞ / CHƯƠNG TRÌNH', 'CAMPUS / PROGRAM')}
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
              📅 {t('HỌC KỲ', 'TERM')}
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
              📖 {t('MÔN HỌC', 'COURSE')}
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
                ABSENT: <span className="highlight-red">20.00%</span> absent so far (3 absent on 15 total).
              </>
            ) : (
              <>
                VẮNG MẶT: <span className="highlight-red">20,00%</span> vắng mặt tính đến thời điểm hiện tại (3 vắng mặt trên tổng số 15).
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
                  
                  {/* Column 7: Comment / Description */}
                  <td className="attendance-td attendance-col-empty" style={{ textAlign: 'left', fontStyle: 'italic', color: '#64748B', fontSize: '12px' }}>
                    {session.commentVi || session.commentEn ? t(session.commentVi || '', session.commentEn || '') : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
};
