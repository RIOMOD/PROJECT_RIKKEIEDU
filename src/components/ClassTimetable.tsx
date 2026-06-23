import { useState } from 'react';
import { Users, Calendar, School, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [activeView, setActiveView] = useState<'group' | 'week'>('group'); // Default to TIMETABLE BY GROUPS as in screenshot
  
  // Filter States
  const [selectedCampus, setSelectedCampus] = useState('BTEC');
  const [selectedTerm, setSelectedTerm] = useState('SUMMER 2025');
  const [selectedGroup, setSelectedGroup] = useState('SE07203');
  
  // Accordion open/collapsed states
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({
    1: true // Default Week 1 is open
  });
  
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    '7408': true, // Expanded by default
    '7428': false // Collapsed by default
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

  // Dropdown Options
  const campuses = ['BTEC', 'FPT APTECH', 'FPT ARENA'];
  const terms = ['SUMMER 2025', 'SPRING 2025', 'FALL 2025'];
  const groups = ['SE07203', 'SE08202', 'SE08201'];

  // Week 1 Timetable mock data (6 days: Mon-Sat)
  const week1Schedule: WeekScheduleItem[] = [
    { slot: 1, dayIndex: 2, text: '7393 - (F609) - ThanhCT13' }, // Wed Slot 1
    { slot: 2, dayIndex: 2, text: '7393 - (F609) - ThanhCT13' }, // Wed Slot 2
    { slot: 3, dayIndex: 3, text: '7388 - (F609) - QuangNV78' }, // Thu Slot 3
    { slot: 4, dayIndex: 3, text: '7388 - (F609) - QuangNV78' }  // Thu Slot 4
  ];

  // Group sessions mock data matching the screenshot mockup exactly
  const sessions: GroupSessionItem[] = [
    { sessionNum: 1, type: 'Offline', date: 'Monday 05/05/2025', slot: 1, room: 'F609', teacher: 'QuangNV78', attendance: 'Attended' },
    { sessionNum: 2, type: 'Offline', date: 'Monday 05/05/2025', slot: 2, room: 'F609', teacher: 'QuangNV78', attendance: 'Attended' },
    { sessionNum: 3, type: 'Offline', date: 'Monday 12/05/2025', slot: 1, room: 'F609', teacher: 'QuangNV78', attendance: 'Attended' },
    { sessionNum: 4, type: 'Offline', date: 'Monday 12/05/2025', slot: 2, room: 'F609', teacher: 'QuangNV78', attendance: 'Attended' },
    { sessionNum: 5, type: 'Offline', date: 'Monday 19/05/2025', slot: 1, room: 'F609', teacher: 'QuangNV78', attendance: 'Attended' },
    { sessionNum: 6, type: 'Offline', date: 'Monday 19/05/2025', slot: 2, room: 'F609', teacher: 'QuangNV78', attendance: 'Attended' },
    { sessionNum: 7, type: 'Offline', date: 'Monday 26/05/2025', slot: 1, room: 'F609', teacher: 'QuangNV78', attendance: 'Attended' },
    { sessionNum: 8, type: 'Offline', date: 'Monday 26/05/2025', slot: 2, room: 'F609', teacher: 'QuangNV78', attendance: 'Attended' },
    { sessionNum: 9, type: 'Offline', date: 'Monday 02/06/2025', slot: 1, room: 'F609', teacher: 'QuangNV78', attendance: 'Attended' },
    { sessionNum: 10, type: 'Offline', date: 'Monday 02/06/2025', slot: 2, room: 'F609', teacher: 'QuangNV78', attendance: 'Attended' }
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
        <div className="class-timetable-filters">
          <div className="class-timetable-filter-group">
            <span className="class-timetable-filter-label">
              <School size={14} /> CAMPUS / PROGRAM
            </span>
            <select 
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className="class-timetable-select"
            >
              {campuses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="class-timetable-filter-group">
            <span className="class-timetable-filter-label">
              <Calendar size={14} /> TERM
            </span>
            <select 
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="class-timetable-select"
            >
              {terms.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="class-timetable-filter-group">
            <span className="class-timetable-filter-label">
              <Users size={14} /> GROUP
            </span>
            <select 
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="class-timetable-select"
            >
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
            <span>TIMETABLE BY GROUPS</span>
          </button>
          <button 
            onClick={() => setActiveView('week')}
            className={`view-toggle-btn ${activeView === 'week' ? 'active' : ''}`}
          >
            <Calendar size={16} />
            <span>TIMETABLE BY WEEK</span>
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
            
            {/* Accordion 1: 7408 (SOFTWARE DEVELOPMENT LIFE CYCLE) */}
            <div>
              <div 
                onClick={() => toggleGroup('7408')}
                className="timetable-accordion-header"
              >
                <span>7408 (SOFTWARE DEVELOPMENT LIFE CYCLE)</span>
                {expandedGroups['7408'] ? (
                  <ChevronDown size={18} className="chevron-icon" />
                ) : (
                  <ChevronUp size={18} className="chevron-icon" />
                )}
              </div>

              {expandedGroups['7408'] && (
                <div className="timetable-accordion-body">
                  <table className="group-timetable-table">
                    <thead className="group-timetable-thead">
                      <tr>
                        <th className="group-timetable-th" style={{ width: '120px' }}>SESSION NO</th>
                        <th className="group-timetable-th">DESCRIPTION</th>
                        <th className="group-timetable-th">DAY</th>
                        <th className="group-timetable-th" style={{ width: '100px' }}>SLOT</th>
                        <th className="group-timetable-th">ROOM</th>
                        <th className="group-timetable-th">TEACHER</th>
                        <th className="group-timetable-th">ATTENDANCE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessions.map((sess) => (
                        <tr key={sess.sessionNum} className="group-timetable-tr">
                          <td className="group-timetable-td" style={{ fontWeight: '600' }}>
                            {sess.sessionNum}
                          </td>
                          <td className="group-timetable-td">
                            {sess.type}
                          </td>
                          <td className="group-timetable-td">
                            <span className="group-timetable-link">
                              {sess.date}
                            </span>
                          </td>
                          <td className="group-timetable-td">
                            {sess.slot}
                          </td>
                          <td className="group-timetable-td">
                            <span className="group-timetable-link">
                              {sess.room}
                            </span>
                          </td>
                          <td className="group-timetable-td">
                            {sess.teacher}
                          </td>
                          <td className="group-timetable-td" style={{ fontWeight: '500' }}>
                            {sess.attendance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Accordion 2: 7428 (BUSINESS PROCESS SUPPORT) */}
            <div>
              <div 
                onClick={() => toggleGroup('7428')}
                className="timetable-accordion-header"
              >
                <span>7428 (BUSINESS PROCESS SUPPORT)</span>
                {expandedGroups['7428'] ? (
                  <ChevronDown size={18} className="chevron-icon" />
                ) : (
                  <ChevronUp size={18} className="chevron-icon" />
                )}
              </div>

              {expandedGroups['7428'] && (
                <div className="timetable-accordion-body" style={{ padding: '24px', textAlign: 'center' }}>
                  <div style={{ color: '#64748B', fontSize: '13px' }}>
                    No sessions scheduled for this module.
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

      </main>
    </div>
  );
};
