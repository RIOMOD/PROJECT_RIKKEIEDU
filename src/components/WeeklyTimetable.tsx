import { useState } from 'react';
import { BookOpen, MapPin, User, Calendar as CalendarIcon, Clock } from 'lucide-react';

interface ClassSession {
  subjectCode: string;
  subjectName: string;
  type: string;
  roomName: string;
  teacherCode: string;
  teacherName: string;
  status: 'Attended' | 'Not yet' | 'Absent';
  dayIndex: number; // 0: Mon, 1: Tue, ... 6: Sun
  slotIndex: number; // 0: Slot 1, 1: Slot 2, ... 6: Slot 7
}

interface WeeklyTimetableProps {
  lang: 'vi' | 'en';
}

export const WeeklyTimetable = ({ lang }: WeeklyTimetableProps) => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedWeek, setSelectedWeek] = useState('22/06 To 28/06');
  const [detailSession, setDetailSession] = useState<ClassSession | null>(null);

  // Translation helper
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  // Dropdown list options
  const weeks = [
    '22/06 To 28/06',
    '15/06 To 21/06',
    '08/06 To 14/06',
    '01/06 To 07/06'
  ];

  const slots = [
    { name: 'Slot 1', time: '7:15-9:15' },
    { name: 'Slot 2', time: '9:25-11:25' },
    { name: 'Slot 3', time: '12:00-14:00' },
    { name: 'Slot 4', time: '14:10-16:10' },
    { name: 'Slot 5', time: '16:20-18:20' },
    { name: 'Slot 6', time: '18:30-20:30' },
    { name: 'Slot 7', time: '20:30-22:30' }
  ];

  const days = [
    { key: 'Mon', label: t('Thứ 2', 'Mon'), date: '22/06' },
    { key: 'Tue', label: t('Thứ 3', 'Tue'), date: '23/06' },
    { key: 'Wed', label: t('Thứ 4', 'Wed'), date: '24/06' },
    { key: 'Thu', label: t('Thứ 5', 'Thu'), date: '25/06' },
    { key: 'Fri', label: t('Thứ 6', 'Fri'), date: '26/06' },
    { key: 'Sat', label: t('Thứ 7', 'Sat'), date: '27/06' },
    { key: 'Sun', label: t('Chủ nhật', 'Sun'), date: '28/06' }
  ];

  // Mock sessions list for week "22/06 To 28/06" exactly matching the screenshot mockup
  const sessions: ClassSession[] = [
    // Monday
    {
      subjectCode: 'SE08202',
      subjectName: 'Java Web Application Development',
      type: '7428 (Offline)',
      roomName: 'Sydney 6',
      teacherCode: '',
      teacherName: '',
      status: 'Attended',
      dayIndex: 0,
      slotIndex: 3
    },
    {
      subjectCode: 'SE08202',
      subjectName: 'Java Web Application Development',
      type: '7428 (Online)',
      roomName: 'Online 1',
      teacherCode: '',
      teacherName: '',
      status: 'Attended',
      dayIndex: 0,
      slotIndex: 6
    },
    // Thursday
    {
      subjectCode: 'SE08202',
      subjectName: 'Java Web Application Development',
      type: '7408 (Offline)',
      roomName: 'Sydney 3',
      teacherCode: 'QuangNV78',
      teacherName: 'Nguyễn Văn Quang',
      status: 'Not yet',
      dayIndex: 3,
      slotIndex: 2
    },
    {
      subjectCode: 'SE08202',
      subjectName: 'Java Web Application Development',
      type: '7408 (Offline)',
      roomName: 'Sydney 3',
      teacherCode: 'QuangNV78',
      teacherName: 'Nguyễn Văn Quang',
      status: 'Not yet',
      dayIndex: 3,
      slotIndex: 3
    },
    // Friday
    {
      subjectCode: 'SE08202',
      subjectName: 'Java Web Application Development',
      type: '7408 (Offline)',
      roomName: 'Sydney 6',
      teacherCode: 'QuangNV78',
      teacherName: 'Nguyễn Văn Quang',
      status: 'Not yet',
      dayIndex: 4,
      slotIndex: 0
    },
    {
      subjectCode: 'SE08202',
      subjectName: 'Java Web Application Development',
      type: '7408 (Offline)',
      roomName: 'Sydney 6',
      teacherCode: 'QuangNV78',
      teacherName: 'Nguyễn Văn Quang',
      status: 'Not yet',
      dayIndex: 4,
      slotIndex: 1
    },
    {
      subjectCode: '4902.01.HL',
      subjectName: 'Capstone Project - Web Frontend Development',
      type: '4902 (Offline)',
      roomName: 'Sydney 6',
      teacherCode: 'QuangNV78',
      teacherName: 'Nguyễn Văn Quang',
      status: 'Not yet',
      dayIndex: 4,
      slotIndex: 2
    },
    {
      subjectCode: '4902.01.HL',
      subjectName: 'Capstone Project - Web Frontend Development',
      type: '4902 (Offline)',
      roomName: 'Sydney 6',
      teacherCode: 'QuangNV78',
      teacherName: 'Nguyễn Văn Quang',
      status: 'Not yet',
      dayIndex: 4,
      slotIndex: 3
    }
  ];

  // Helper to get session in a slot/day grid cell
  const getSession = (dayIdx: number, slotIdx: number) => {
    // Only return data if week matches the mock week
    if (selectedWeek !== '22/06 To 28/06') return null;
    return sessions.find(s => s.dayIndex === dayIdx && s.slotIndex === slotIdx) || null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      
      {/* Main Container */}
      <main className="dashboard-container">
        
        {/* Page Titles */}
        <div>
          <h2 className="services-section-title" style={{ textAlign: 'left', marginBottom: '8px' }}>
            {t('HOẠT ĐỘNG CHO HUNGNVBS00679 (NGUYỄN VĂN HÙNG)', 'ACTIVITIES FOR HUNGNVBS00679 (NGUYỄN VĂN HÙNG)')}
          </h2>
          <p style={{ color: '#F97316', fontSize: '12px', fontWeight: '700', letterSpacing: '0.2px', marginBottom: '20px' }}>
            {t('✏️ CÁC HOẠT ĐỘNG NÀY KHÔNG BAO GỒM HOẠT ĐỘNG NGOẠI KHÓA, HOẠT ĐỘNG CỦA CÂU LẠC BỘ...', '✏️ THESE ACTIVITIES DO NOT INCLUDE EXTRA-CURRICULUM ACTIVITIES, SUCH AS CLUB ACTIVITIES...')}
          </p>
        </div>

        {/* Dropdown Filters */}
        <div className="timetable-filters-row">
          <div className="timetable-filter-group">
            <span className="timetable-filter-label">{t('Năm học', 'Year')}</span>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="timetable-filter-select"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <div className="timetable-filter-group">
            <span className="timetable-filter-label">{t('Tuần học', 'Week')}</span>
            <select 
              value={selectedWeek} 
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="timetable-filter-select"
            >
              {weeks.map((w, idx) => (
                <option key={idx} value={w}>{w}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Timetable Grid Table */}
        <div className="timetable-table-wrapper">
          <table className="timetable-table">
            <thead>
              <tr>
                <th style={{ width: '120px' }}>
                  {t('Ca học', 'Slot')}
                </th>
                {days.map((d, idx) => (
                  <th key={idx}>
                    <div>{d.label}</div>
                    <div className="timetable-header-date">{d.date}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slots.map((s, slotIdx) => (
                <tr key={slotIdx}>
                  {/* Slot cell details */}
                  <td className="timetable-slot-cell">
                    <div className="timetable-slot-name">{s.name}</div>
                    <div className="timetable-slot-time">{s.time}</div>
                  </td>
                  
                  {/* Days columns cells */}
                  {days.map((_, dayIdx) => {
                    const session = getSession(dayIdx, slotIdx);
                    return (
                      <td key={dayIdx} className="timetable-grid-cell">
                        {session ? (
                          <div 
                            onClick={() => setDetailSession(session)}
                            className="timetable-session-card"
                          >
                            <div className="session-card-header">
                              <span className="session-subject">{session.subjectCode}</span>
                              <span 
                                className={session.status === 'Attended' ? 'status-badge-success' : 'status-badge-pending'}
                              >
                                {session.status === 'Attended' ? t('(Đã điểm danh)', '(Attended)') : t('(Chưa)', '(Not yet)')}
                              </span>
                            </div>
                            <div className="session-room">
                              <span>🚪 {session.roomName}</span>
                            </div>
                            <div className="session-type">
                              <span>🏷️ {session.type}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="timetable-empty-cell">-</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes list */}
        <div className="timetable-notes">
          <h4 className="timetable-notes-title">{t('✏️ GHI CHÚ THÊM:', '✏️ MORE NOTE:')}</h4>
          <ul className="timetable-notes-list">
            <li>
              • <span className="attendance-attended" style={{ marginRight: '4px' }}>(Attended)</span>: 
              {t('Nguyễn Văn Hùng đã tham gia hoạt động này', 'hungnvbs00679 had attended this activity')}
            </li>
            <li>
              • <span className="attendance-absent" style={{ marginRight: '4px' }}>(Absent)</span>: 
              {t('Nguyễn Văn Hùng đã vắng mặt buổi này', 'hungnvbs00679 had NOT attended this activity')}
            </li>
          </ul>
        </div>
      </main>

      {/* Class Session Details Modal */}
      {detailSession && (
        <div className="modal-overlay" onClick={() => setDetailSession(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px', textAlign: 'left' }}>
            <div className="modal-icon" style={{ backgroundColor: '#EFF6FF', color: '#3B82F6', margin: '0 0 16px 0' }}>
              <BookOpen size={26} />
            </div>
            
            <h3 className="modal-title" style={{ marginBottom: '16px', fontSize: '17px' }}>
              {t('Chi tiết ca học:', 'Class Session Details:')} {detailSession.subjectCode}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#475569' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BookOpen size={16} style={{ color: '#94A3B8' }} />
                <div>
                  <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>{t('Môn học', 'Subject')}</span>
                  <span style={{ fontWeight: '600', color: '#1E293B' }}>{detailSession.subjectName}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} style={{ color: '#94A3B8' }} />
                <div>
                  <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>{t('Phòng học / Link online', 'Room / Online Link')}</span>
                  <span style={{ fontWeight: '600', color: '#1E293B' }}>{detailSession.roomName}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={16} style={{ color: '#94A3B8' }} />
                <div>
                  <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>{t('Giảng viên', 'Lecturer')}</span>
                  <span style={{ fontWeight: '600', color: '#1E293B' }}>{detailSession.teacherName || '-'} {detailSession.teacherCode ? `(${detailSession.teacherCode})` : ''}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CalendarIcon size={16} style={{ color: '#94A3B8' }} />
                <div>
                  <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>{t('Thời gian ca học', 'Session Time')}</span>
                  <span style={{ fontWeight: '600', color: '#1E293B' }}>Monday, 22/06/2026 (Ca {detailSession.slotIndex + 1})</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={16} style={{ color: '#94A3B8' }} />
                <div>
                  <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>{t('Trạng thái điểm danh', 'Check-in Status')}</span>
                  <span 
                    style={{ fontWeight: '700' }} 
                    className={detailSession.status === 'Attended' ? 'attendance-badge-success' : 'attendance-badge-pending'}
                  >
                    {detailSession.status === 'Attended' ? t('Đã tham gia (Attended)', 'Attended') : t('Chưa điểm danh (Not yet)', 'Not yet check-in')}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-actions" style={{ marginTop: '24px', justifyContent: 'flex-end' }}>
              <button onClick={() => setDetailSession(null)} className="modal-btn-confirm" style={{ padding: '8px 24px' }}>
                {t('Đóng lại', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
