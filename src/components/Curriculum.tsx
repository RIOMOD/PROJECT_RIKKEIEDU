import { GraduationCap, BookOpen } from 'lucide-react';

interface CurriculumProps {
  lang: 'vi' | 'en';
}

interface CurriculumRow {
  subjectCode: string;
  subjectName: string;
  termNo: number;
}

export const Curriculum = ({ lang }: CurriculumProps) => {
  // Translation helper
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  const headers1 = [
    t('SUBJECT CODE', 'SUBJECT CODE'),
    t('SUBJECT NAME', 'SUBJECT NAME'),
    t('TERM NO', 'TERM NO')
  ];

  const headers2 = [
    t('STT', 'STT'),
    t('SUBJECT CODE', 'SUBJECT CODE'),
    t('SUBJECT PREQUISITE', 'SUBJECT PREQUISITE')
  ];

  // 24 subjects matching Academic Transcript
  const curriculumData: CurriculumRow[] = [
    { subjectCode: 'ENT100.1', subjectName: 'English 1 - Topnotch Fundamentals', termNo: -4 },
    { subjectCode: 'ENT101.1', subjectName: 'English 2 - Topnotch 1', termNo: -3 },
    { subjectCode: 'ENT102.1', subjectName: 'English 3 - Topnotch 2', termNo: -2 },
    { subjectCode: 'ENT103.1', subjectName: 'English 4 - Topnotch 3', termNo: -1 },
    { subjectCode: 'ENT104.1', subjectName: 'English 5 - Summit 1', termNo: 0 },
    { subjectCode: 'CF02', subjectName: 'Computing Fundamental', termNo: 0 },
    { subjectCode: 'VO100', subjectName: 'Vovinam', termNo: 0 },
    { subjectCode: 'CF01', subjectName: 'Microsoft Offices', termNo: 0 },
    { subjectCode: 'PDP101', subjectName: 'Personal Development', termNo: 0 },
    { subjectCode: '7393', subjectName: 'Networking', termNo: 1 },
    { subjectCode: '7388', subjectName: 'Programming', termNo: 1 },
    { subjectCode: '7398', subjectName: 'Professional Practice', termNo: 2 },
    { subjectCode: '7400', subjectName: 'Database Design & Development', termNo: 2 },
    { subjectCode: '7407', subjectName: 'Planning a Computing Project', termNo: 2 },
    { subjectCode: '7406', subjectName: 'Security', termNo: 3 },
    { subjectCode: '7408', subjectName: 'Software Development Life Cycle', termNo: 3 },
    { subjectCode: '7419', subjectName: 'Website Design & Development', termNo: 3 },
    { subjectCode: '7429', subjectName: 'Discrete Maths', termNo: 4 },
    { subjectCode: '4902', subjectName: 'Applied Programming and Design Principles', termNo: 4 },
    { subjectCode: '7428', subjectName: 'Business Process Support', termNo: 4 },
    { subjectCode: '7436', subjectName: 'Application Development', termNo: 5 },
    { subjectCode: '7430', subjectName: 'Data Structures & Algorithms', termNo: 5 },
    { subjectCode: '7481', subjectName: 'Internet of Things', termNo: 5 },
    { subjectCode: '7425', subjectName: 'Computer Research Project (Pearson Set)', termNo: 6 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      <main className="dashboard-container">
        
        {/* Page Title */}
        <h2 className="transcript-title">
          {t('CURRICULUM', 'CURRICULUM')}
        </h2>

        {/* Student Information Row */}
        <div className="transcript-info-header" style={{ marginBottom: '16px' }}>
          <div className="transcript-info-left" style={{ gap: '4px' }}>
            <div className="transcript-info-item" style={{ gap: '6px' }}>
              <GraduationCap size={16} className="text-orange-500" style={{ color: 'var(--primary)' }} />
              <span className="transcript-info-label" style={{ color: '#334155', fontWeight: 'bold' }}>
                STUDENT:{' '}
              </span>
              <span className="transcript-info-val" style={{ color: '#334155', fontWeight: 'bold' }}>Nguyễn Văn Hùng - BS00679</span>
            </div>
            <div className="transcript-info-item" style={{ gap: '6px' }}>
              <BookOpen size={16} className="text-orange-500" style={{ color: 'var(--primary)' }} />
              <span className="transcript-info-label" style={{ color: '#334155', fontWeight: 'bold' }}>Syllabus:BC_V6_01</span>
            </div>
          </div>
        </div>

        {/* Table 1: Curriculum List */}
        <div className="transcript-table-wrapper" style={{ borderRadius: '0', border: '1px solid #cbd5e1', marginBottom: '24px' }}>
          <table className="transcript-table">
            <thead>
              <tr className="transcript-thead-tr" style={{ backgroundColor: 'var(--primary)' }}>
                {headers1.map((h, i) => (
                  <th key={i} className="transcript-th" style={{ border: '1px solid #cbd5e1', textTransform: 'uppercase' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {curriculumData.map((row, index) => {
                // Highlight Row 16 (subjectCode === '7408') in light gray to match mockup
                const rowClass = row.subjectCode === '7408' ? 'tr-highlight-gray' : '';

                return (
                  <tr key={index} className={`transcript-tr ${rowClass}`}>
                    {/* Subject Code */}
                    <td className="transcript-td text-center font-mono font-bold" style={{ border: '1px solid #cbd5e1', color: '#0066cc', textDecoration: 'underline', cursor: 'pointer' }}>
                      {row.subjectCode}
                    </td>

                    {/* Subject Name */}
                    <td className="transcript-td subject-name-col" style={{ border: '1px solid #cbd5e1', textAlign: 'center' }}>
                      {row.subjectName}
                    </td>

                    {/* Term No */}
                    <td className="transcript-td text-center font-mono" style={{ border: '1px solid #cbd5e1' }}>
                      {row.termNo}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table 2: Subject Prerequisite */}
        <div className="transcript-obsolete-header" style={{ borderBottom: 'none', marginBottom: '10px', marginTop: '16px' }}>
          <BookOpen size={16} className="text-orange-500" style={{ color: 'var(--primary)' }} />
          <span className="transcript-obsolete-text" style={{ fontWeight: 'bold', color: '#334155' }}>
            {t('Subject Prequisite', 'Subject Prequisite')}
          </span>
        </div>

        <div className="transcript-table-wrapper" style={{ borderRadius: '0', border: '1px solid #cbd5e1', marginBottom: '30px' }}>
          <table className="transcript-table">
            <thead>
              <tr className="transcript-thead-tr" style={{ backgroundColor: 'var(--primary)' }}>
                {headers2.map((h, i) => (
                  <th key={i} className="transcript-th" style={{ border: '1px solid #cbd5e1', textTransform: 'uppercase' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="transcript-tr">
                <td colSpan={3} className="transcript-td text-center" style={{ border: '1px solid #cbd5e1', padding: '16px', color: '#64748b' }}>
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
};
