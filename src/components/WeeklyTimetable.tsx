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

export const WeeklyTimetable = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedWeek, setSelectedWeek] = useState('22/06 To 28/06');
  const [detailSession, setDetailSession] = useState<ClassSession | null>(null);

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
    { key: 'Mon', label: 'Mon', date: '22/06' },
    { key: 'Tue', label: 'Tue', date: '23/06' },
    { key: 'Wed', label: 'Wed', date: '24/06' },
    { key: 'Thu', label: 'Thu', date: '25/06' },
    { key: 'Fri', label: 'Fri', date: '26/06' },
    { key: 'Sat', label: 'Sat', date: '27/06' },
    { key: 'Sun', label: 'Sun', date: '28/06' }
  ];

  // Mock sessions list for week "22/06 To 28/06"
  const sessions: ClassSession[] = [
    // Monday
    {
      subjectCode: 'SE08202',
      subjectName: 'Java Web Application Development',
      type: '7428 (Offline)',
      roomName: 'Sydney 6',
      teacherCode: 'QuangNV78',
      teacherName: 'Nguyễn Văn Quang',
      status: 'Attended',
      dayIndex: 0,
      slotIndex: 3
    },
    {
      subjectCode: 'SE08202',
      subjectName: 'Java Web Application Development',
      type: '7428 (Online)',
      roomName: 'Online 1 - VF HCM 01',
      teacherCode: 'QuangNV78',
      teacherName: 'Nguyễn Văn Quang',
      status: 'Not yet',
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
            ACTIVITIES FOR HUNGNVBS00679 (NGUYỄN VĂN HÙNG)
          </h2>
          <p style={{ color: '#F97316', fontSize: '12px', fontWeight: '700', letterSpacing: '0.2px' }}>
            ⚠️ THESE ACTIVITIES DO NOT INCLUDE EXTRA-CURRICULUM ACTIVITIES, SUCH AS CLUB ACTIVITIES ...
          </p>
        </div>

        {/* Dropdown Filters */}
        <div className="timetable-filters-row">
          <div className="timetable-filter-group">
            <span className="timetable-filter-label">Year</span>
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
            <span className="timetable-filter-label">Week</span>
            <select 
              value={selectedWeek} 
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="timetable-filter-select"
              style={{ minWidth: '180px' }}
            >
              {weeks.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Timetable Table Grid */}
        <div className="services-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="timetable-table">
            <thead>
              <tr>
                <th style={{ width: '120px' }}></th>
                {days.map((d) => (
                  <th key={d.key}>
                    {d.label}
                    <span className="day-num">{d.date}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slots.map((slot, slotIdx) => (
                <tr key={slot.name}>
                  {/* Slot Left Cell */}
                  <td className="timetable-slot-cell">
                    <strong>{slot.name}</strong>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', fontWeight: 'normal' }}>
                      ({slot.time})
                    </div>
                  </td>
                  
                  {/* Week Days cells */}
                  {days.map((day, dayIdx) => {
                    const session = getSession(dayIdx, slotIdx);
                    return (
                      <td key={day.key}>
                        {session ? (
                          <div className="timetable-card">
                            <span 
                              onClick={() => setDetailSession(session)}
                              className="timetable-card-link"
                            >
                              {session.subjectCode}
                            </span>
                            <div style={{ color: '#64748B' }}>
                              ({session.type})
                            </div>
                            <div style={{ color: '#334155', fontWeight: '500', marginTop: '2px' }}>
                              at <span style={{ color: '#2563EB', cursor: 'pointer' }} className="hover:underline">{session.roomName}</span> - <span style={{ color: '#2563EB', cursor: 'pointer' }} className="hover:underline">{session.teacherCode}</span>
                            </div>
                            
                            {/* Attendance status */}
                            {session.status === 'Attended' ? (
                              <div className="attendance-badge-success">(Attended)</div>
                            ) : (
                              <div className="attendance-badge-pending">(Not yet)</div>
                            )}
                          </div>
                        ) : null}
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
          <h4 className="timetable-notes-title">More Note:</h4>
          <ul className="timetable-notes-list">
            <li>
              <span className="attendance-badge-success" style={{ fontSize: '12px', marginRight: '6px' }}>(Attended)</span>: 
              hungnvbs00679 had attended this activity / Nguyễn Văn Hùng đã tham gia hoạt động này
            </li>
            <li>
              <span className="attendance-badge-pending" style={{ fontSize: '12px', marginRight: '6px' }}>(Absent)</span>: 
              hungnvbs00679 had NOT attended this activity / Nguyễn Văn Hùng đã vắng mặt buổi này
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
              Chi tiết ca học: {detailSession.subjectCode}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#475569' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BookOpen size={16} style={{ color: '#94A3B8' }} />
                <div>
                  <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>Môn học</span>
                  <span style={{ fontWeight: '600', color: '#1E293B' }}>{detailSession.subjectName}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} style={{ color: '#94A3B8' }} />
                <div>
                  <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>Phòng học / Link online</span>
                  <span style={{ fontWeight: '600', color: '#1E293B' }}>{detailSession.roomName}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={16} style={{ color: '#94A3B8' }} />
                <div>
                  <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>Giảng viên</span>
                  <span style={{ fontWeight: '600', color: '#1E293B' }}>{detailSession.teacherName} ({detailSession.teacherCode})</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CalendarIcon size={16} style={{ color: '#94A3B8' }} />
                <div>
                  <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>Thời gian ca học</span>
                  <span style={{ fontWeight: '600', color: '#1E293B' }}>Monday, 22/06/2026 (Ca {detailSession.slotIndex + 1})</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={16} style={{ color: '#94A3B8' }} />
                <div>
                  <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>Trạng thái điểm danh</span>
                  <span 
                    style={{ fontWeight: '700' }} 
                    className={detailSession.status === 'Attended' ? 'attendance-badge-success' : 'attendance-badge-pending'}
                  >
                    {detailSession.status === 'Attended' ? 'Đã tham gia (Attended)' : 'Chưa điểm danh (Not yet)'}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-actions" style={{ marginTop: '24px', justifyContent: 'flex-end' }}>
              <button onClick={() => setDetailSession(null)} className="modal-btn-confirm" style={{ padding: '8px 24px' }}>
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
