import { useState } from 'react';
import { Footer } from './Footer';
import { Users, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface ClassTimetableProps {
  lang: 'vi' | 'en';
}

interface WeekScheduleItem {
  slot: number;
  dayIndex: number; // 0: Mon, 1: Tue, ... 5: Sat (Monday to Saturday)
  text: string;
}

interface GroupSessionItem {
  sessionNum: number;
  type: string;
  date: string;
  slot: number;
  room: string;
  teacher: string;
  attendance: string;
}

export const ClassTimetable = ({ lang }: ClassTimetableProps) => {
  const [activeView, setActiveView] = useState<'group' | 'week'>('week'); // Default to Week as in first screenshot
  
  // Accordion open/collapsed states
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({
    1: true // Default Week 1 is open
  });
  
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    '7388': true // Default 7388 Lập trình is open
  });

  const toggleWeek = (weekNum: number) => {
    setExpandedWeeks(prev => ({ ...prev, [weekNum]: !prev[weekNum] }));
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  // Translation helper
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  // Mock Dropdown Options
  const campuses = ['BTEC', 'FPT APTECH', 'FPT ARENA'];
  const terms = ['MÙA HÈ 2025', 'MÙA XUÂN 2025', 'MÙA THU 2025'];
  const groups = ['SE08202', 'SE08201', 'SE08203'];

  // Week 1 Timetable mock data (6 days: Mon-Sat)
  const week1Schedule: WeekScheduleItem[] = [
    { slot: 1, dayIndex: 2, text: '7393 - (F609) - ThanhCT13' }, // Wed Slot 1
    { slot: 2, dayIndex: 2, text: '7393 - (F609) - ThanhCT13' }, // Wed Slot 2
    { slot: 3, dayIndex: 3, text: '7388 - (F609) - QuangNV78' }, // Thu Slot 3
    { slot: 4, dayIndex: 3, text: '7388 - (F609) - QuangNV78' }  // Thu Slot 4
  ];

  // Group 7388 Session mock data (10 sessions)
  const sessions: GroupSessionItem[] = [
    { sessionNum: 1, type: t('Ngoại tuyến', 'Offline'), date: t('Thứ năm, ngày 08/05/2025', 'Thursday, 08/05/2025'), slot: 3, room: 'F609', teacher: 'QuangNV78', attendance: t('Đã tham dự', 'Attended') },
    { sessionNum: 2, type: t('Ngoại tuyến', 'Offline'), date: t('Thứ năm, ngày 08/05/2025', 'Thursday, 08/05/2025'), slot: 4, room: 'F609', teacher: 'QuangNV78', attendance: t('Đã tham dự', 'Attended') },
    { sessionNum: 3, type: t('Ngoại tuyến', 'Offline'), date: t('Thứ tư, ngày 14/05/2025', 'Wednesday, 14/05/2025'), slot: 1, room: 'F609', teacher: 'QuangNV78', attendance: t('Đã tham dự', 'Attended') },
    { sessionNum: 4, type: t('Ngoại tuyến', 'Offline'), date: t('Thứ tư, ngày 14/05/2025', 'Wednesday, 14/05/2025'), slot: 2, room: 'F609', teacher: 'QuangNV78', attendance: t('Đã tham dự', 'Attended') },
    { sessionNum: 5, type: t('Ngoại tuyến', 'Offline'), date: t('Thứ năm, ngày 22/05/2025', 'Thursday, 22/05/2025'), slot: 3, room: 'F609', teacher: 'QuangNV78', attendance: t('Đã tham dự', 'Attended') },
    { sessionNum: 6, type: t('Ngoại tuyến', 'Offline'), date: t('Thứ năm, ngày 22/05/2025', 'Thursday, 22/05/2025'), slot: 4, room: 'F609', teacher: 'QuangNV78', attendance: t('Đã tham dự', 'Attended') },
    { sessionNum: 7, type: t('Ngoại tuyến', 'Offline'), date: t('Thứ năm, ngày 29/05/2025', 'Thursday, 29/05/2025'), slot: 3, room: 'F609', teacher: 'QuangNV78', attendance: t('Đã tham dự', 'Attended') },
    { sessionNum: 8, type: t('Ngoại tuyến', 'Offline'), date: t('Thứ năm, ngày 29/05/2025', 'Thursday, 29/05/2025'), slot: 4, room: 'F609', teacher: 'QuangNV78', attendance: t('Đã tham dự', 'Attended') },
    { sessionNum: 9, type: t('Ngoại tuyến', 'Offline'), date: t('Thứ năm, ngày 05/06/2025', 'Thursday, 05/06/2025'), slot: 3, room: 'F609', teacher: 'QuangNV78', attendance: t('Đã tham dự', 'Attended') },
    { sessionNum: 10, type: t('Ngoại tuyến', 'Offline'), date: t('Thứ năm, ngày 05/06/2025', 'Thursday, 05/06/2025'), slot: 4, room: 'F609', teacher: 'QuangNV78', attendance: t('Đã tham dự', 'Attended') }
  ];

  // Helper to get week cell content
  const getWeekCell = (dayIdx: number, slotNum: number) => {
    return week1Schedule.find(item => item.dayIndex === dayIdx && item.slot === slotNum) || null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      
      {/* Main Container */}
      <main className="dashboard-container">
        
        {/* Top Filters Row */}
        <div className="timetable-filters-row" style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="timetable-filter-group">
            <span className="timetable-filter-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} /> {t('KHUÔN VIÊN/CHƯƠNG TRÌNH', 'CAMPUS/PROGRAM')}
            </span>
            <select className="timetable-filter-select">
              {campuses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="timetable-filter-group">
            <span className="timetable-filter-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} /> {t('THUẬT NGỮ', 'TERM')}
            </span>
            <select className="timetable-filter-select">
              {terms.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="timetable-filter-group">
            <span className="timetable-filter-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Users size={13} /> {t('NHÓM', 'GROUP')}
            </span>
            <select className="timetable-filter-select">
              {groups.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        {/* View Toggle Buttons */}
        <div className="view-toggle-row">
          <button 
            onClick={() => setActiveView('group')}
            className={`view-toggle-btn ${activeView === 'group' ? 'active' : ''}`}
          >
            <Users size={16} />
            <span>{t('THỜI KHÓA BIỂU THEO NHÓM', 'TIMETABLE BY GROUP')}</span>
          </button>
          <button 
            onClick={() => setActiveView('week')}
            className={`view-toggle-btn ${activeView === 'week' ? 'active' : ''}`}
          >
            <Calendar size={16} />
            <span>{t('THỜI KHÓA BIỂU THEO TUẦN', 'TIMETABLE BY WEEK')}</span>
          </button>
        </div>

        {/* Dynamic Views Rendering */}
        
        {/* VIEW 1: BY WEEK ACCORDIONS */}
        {activeView === 'week' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {Array.from({ length: 18 }, (_, i) => i + 1).map((w) => {
              const isOpen = expandedWeeks[w];
              return (
                <div key={w}>
                  {/* Accordion Header */}
                  <div 
                    onClick={() => toggleWeek(w)}
                    className={`accordion-header ${isOpen ? 'active' : ''}`}
                  >
                    <span>{t(`TUẦN ${w}`, `WEEK ${w}`)}</span>
                    {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                  </div>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="accordion-body">
                      {w === 1 ? (
                        <div className="services-table-wrapper" style={{ border: 'none', boxShadow: 'none' }}>
                          <table className="services-table" style={{ border: '1px solid var(--border-color)' }}>
                            <thead style={{ backgroundColor: '#E2E8F0' }}>
                              <tr>
                                <th className="services-th" style={{ color: '#475569', width: '80px', textAlign: 'center', borderRight: '1px solid var(--border-color)' }}>
                                  {t('CHỖ', 'SLOT')}
                                </th>
                                <th className="services-th" style={{ color: '#475569', textAlign: 'center', borderRight: '1px solid var(--border-color)' }}>{t('THỨ HAI (05/05)', 'MON (05/05)')}</th>
                                <th className="services-th" style={{ color: '#475569', textAlign: 'center', borderRight: '1px solid var(--border-color)' }}>{t('THỨ BA (06/05)', 'TUE (06/05)')}</th>
                                <th className="services-th" style={{ color: '#475569', textAlign: 'center', borderRight: '1px solid var(--border-color)' }}>{t('THỨ TƯ (07/05)', 'WED (07/05)')}</th>
                                <th className="services-th" style={{ color: '#475569', textAlign: 'center', borderRight: '1px solid var(--border-color)' }}>{t('THỨ NĂM (08/05)', 'THU (08/05)')}</th>
                                <th className="services-th" style={{ color: '#475569', textAlign: 'center', borderRight: '1px solid var(--border-color)' }}>{t('THỨ SÁU (09/05)', 'FRI (09/05)')}</th>
                                <th className="services-th" style={{ color: '#475569', textAlign: 'center' }}>{t('THỨ BẢY (10/05)', 'SAT (10/05)')}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[1, 2, 3, 4].map((slotNum) => (
                                <tr key={slotNum} className="services-tr">
                                  {/* Slot Cell */}
                                  <td className="services-td center" style={{ fontWeight: '600', backgroundColor: '#F8FAFC', borderRight: '1px solid var(--border-color)', width: '80px' }}>
                                    {slotNum}
                                  </td>
                                  
                                  {/* Day Cells */}
                                  {Array.from({ length: 6 }).map((_, dayIdx) => {
                                    const cellData = getWeekCell(dayIdx, slotNum);
                                    return (
                                      <td 
                                        key={dayIdx} 
                                        className="services-td" 
                                        style={{ 
                                          textAlign: 'center', 
                                          borderRight: dayIdx < 5 ? '1px solid var(--border-color)' : 'none',
                                          height: '48px',
                                          verticalAlign: 'middle',
                                          fontSize: '12px',
                                          color: '#334155'
                                        }}
                                      >
                                        {cellData ? cellData.text : null}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>
                          {t('Không có lịch học cho tuần này.', 'No activities scheduled for this week.')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW 2: BY GROUP ACCORDIONS */}
        {activeView === 'group' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            
            {/* Accordion 1: 7388 (Lập trình) */}
            <div>
              <div 
                onClick={() => toggleGroup('7388')}
                className={`accordion-header ${expandedGroups['7388'] ? 'active' : ''}`}
              >
                <span>7388 {t('(LẬP TRÌNH)', '(PROGRAMMING)')}</span>
                {expandedGroups['7388'] ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              </div>

              {expandedGroups['7388'] && (
                <div className="accordion-body" style={{ padding: '0px' }}>
                  <div className="services-table-wrapper" style={{ border: 'none', boxShadow: 'none' }}>
                    <table className="services-table">
                      <thead className="services-thead">
                        <tr>
                          <th className="services-th center" style={{ width: '80px' }}>{t('PHIÊN SỐ', 'SESSION NO')}</th>
                          <th className="services-th">{t('SỰ MIÊU TẢ', 'DESCRIPTION')}</th>
                          <th className="services-th">{t('NGÀY', 'DATE')}</th>
                          <th className="services-th center" style={{ width: '80px' }}>{t('CHỖ', 'SLOT')}</th>
                          <th className="services-th">{t('PHÒNG', 'ROOM')}</th>
                          <th className="services-th">{t('GIÁO VIÊN', 'TEACHER')}</th>
                          <th className="services-th">{t('SỰ THAM DỰ', 'ATTENDANCE')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sessions.map((sess) => (
                          <tr key={sess.sessionNum} className="services-tr">
                            <td className="services-td center stt">{sess.sessionNum}</td>
                            <td className="services-td">{sess.type}</td>
                            <td className="services-td">
                              <span style={{ color: '#2563EB', cursor: 'pointer' }} className="hover:underline">
                                {sess.date}
                              </span>
                            </td>
                            <td className="services-td center">{sess.slot}</td>
                            <td className="services-td">
                              <span style={{ color: '#2563EB', cursor: 'pointer' }} className="hover:underline">
                                {sess.room}
                              </span>
                            </td>
                            <td className="services-td">{sess.teacher}</td>
                            <td className="services-td" style={{ fontWeight: '600', color: '#009F4D' }}>{sess.attendance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: 7393 (Mạng máy tính) */}
            <div>
              <div 
                onClick={() => toggleGroup('7393')}
                className={`accordion-header ${expandedGroups['7393'] ? 'active' : ''}`}
              >
                <span>7393 {t('(MẠNG MÁY TÍNH)', '(COMPUTER NETWORK)')}</span>
                {expandedGroups['7393'] ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              </div>

              {expandedGroups['7393'] && (
                <div className="accordion-body">
                  <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>
                    {t('Không có phiên học nào được hiển thị.', 'No sessions scheduled for this module.')}
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* Footer contacts */}
      <Footer />

    </div>
  );
};
