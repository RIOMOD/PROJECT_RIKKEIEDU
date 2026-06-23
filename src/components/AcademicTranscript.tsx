import { FileSpreadsheet, GraduationCap, BookOpen } from 'lucide-react';

interface AcademicTranscriptProps {
  lang: 'vi' | 'en';
}

interface TranscriptRow {
  no: number;
  term: number;
  semesterVi: string;
  semesterEn: string;
  subjectCode: string;
  replacedSubject: string;
  subjectName: string;
  credit: number;
  grade: string;
}

export const AcademicTranscript = ({ lang }: AcademicTranscriptProps) => {
  // Translation helper
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  const headers = [
    t('No', 'No'),
    t('Term', 'Term'),
    t('Semester', 'Semester'),
    t('Subject Code', 'Subject Code'),
    t('Replaced Subject', 'Replaced Subject'),
    t('Subject Name', 'Subject Name'),
    t('Credit', 'Credit'),
    t('Grade (Number)', 'Grade (Number)')
  ];

  // 24 transcript rows matching mockup
  const transcriptData: TranscriptRow[] = [
    {
      no: 1,
      term: -4,
      semesterVi: 'FALL 2022',
      semesterEn: 'FALL 2022',
      subjectCode: 'ENT100.1',
      replacedSubject: 'ENT100',
      subjectName: 'English 1 - Topnotch Fundamentals',
      credit: 0,
      grade: '8.2'
    },
    {
      no: 2,
      term: -3,
      semesterVi: 'SPRING 2023',
      semesterEn: 'SPRING 2023',
      subjectCode: 'ENT101.1',
      replacedSubject: '',
      subjectName: 'English 2 - Topnotch 1',
      credit: 0,
      grade: '8.2'
    },
    {
      no: 3,
      term: -2,
      semesterVi: 'SPRING 2023',
      semesterEn: 'SPRING 2023',
      subjectCode: 'ENT102.1',
      replacedSubject: '',
      subjectName: 'English 3 - Topnotch 2',
      credit: 0,
      grade: '7'
    },
    {
      no: 4,
      term: -1,
      semesterVi: 'SUMMER 2023',
      semesterEn: 'SUMMER 2023',
      subjectCode: 'ENT103.1',
      replacedSubject: 'ENT301',
      subjectName: 'English 4 - Topnotch 3',
      credit: 0,
      grade: '7.3'
    },
    {
      no: 5,
      term: 0,
      semesterVi: 'SUMMER 2023',
      semesterEn: 'SUMMER 2023',
      subjectCode: 'ENT104.1',
      replacedSubject: 'ENT4011',
      subjectName: 'English 5 - Summit 1',
      credit: 0,
      grade: '7.7'
    },
    {
      no: 6,
      term: 0,
      semesterVi: 'SPRING 2023',
      semesterEn: 'SPRING 2023',
      subjectCode: 'CF02',
      replacedSubject: '',
      subjectName: 'Computing Fundamental',
      credit: 0,
      grade: '5.4'
    },
    {
      no: 7,
      term: 0,
      semesterVi: 'FALL 2024',
      semesterEn: 'FALL 2024',
      subjectCode: 'VO100',
      replacedSubject: '',
      subjectName: 'Vovinam',
      credit: 0,
      grade: ''
    },
    {
      no: 8,
      term: 0,
      semesterVi: 'FALL 2022',
      semesterEn: 'FALL 2022',
      subjectCode: 'CF01',
      replacedSubject: '',
      subjectName: 'Microsoft Offices',
      credit: 0,
      grade: '6.5'
    },
    {
      no: 9,
      term: 0,
      semesterVi: 'SPRING 2023',
      semesterEn: 'SPRING 2023',
      subjectCode: 'PDP101',
      replacedSubject: '',
      subjectName: 'Personal Development',
      credit: 0,
      grade: '7.9'
    },
    {
      no: 10,
      term: 1,
      semesterVi: 'SUMMER 2023',
      semesterEn: 'SUMMER 2023',
      subjectCode: '7393',
      replacedSubject: '',
      subjectName: 'Networking',
      credit: 0,
      grade: ''
    },
    {
      no: 11,
      term: 1,
      semesterVi: 'SPRING 2024',
      semesterEn: 'SPRING 2024',
      subjectCode: '7388',
      replacedSubject: '',
      subjectName: 'Programming',
      credit: 0,
      grade: ''
    },
    {
      no: 12,
      term: 2,
      semesterVi: 'FALL 2023',
      semesterEn: 'FALL 2023',
      subjectCode: '7398',
      replacedSubject: '',
      subjectName: 'Professional Practice',
      credit: 0,
      grade: ''
    },
    {
      no: 13,
      term: 2,
      semesterVi: 'FALL 2023',
      semesterEn: 'FALL 2023',
      subjectCode: '7400',
      replacedSubject: '',
      subjectName: 'Database Design & Development',
      credit: 0,
      grade: ''
    },
    {
      no: 14,
      term: 2,
      semesterVi: 'FALL 2023',
      semesterEn: 'FALL 2023',
      subjectCode: '7407',
      replacedSubject: '',
      subjectName: 'Planning a Computing Project',
      credit: 15,
      grade: ''
    },
    {
      no: 15,
      term: 3,
      semesterVi: 'SPRING 2024',
      semesterEn: 'SPRING 2024',
      subjectCode: '7406',
      replacedSubject: '',
      subjectName: 'Security',
      credit: 15,
      grade: ''
    },
    {
      no: 16,
      term: 3,
      semesterVi: 'SPRING 2026',
      semesterEn: 'SPRING 2026',
      subjectCode: '7408',
      replacedSubject: '',
      subjectName: 'Software Development Life Cycle',
      credit: 15,
      grade: ''
    },
    {
      no: 17,
      term: 3,
      semesterVi: 'SPRING 2024',
      semesterEn: 'SPRING 2024',
      subjectCode: '7419',
      replacedSubject: '',
      subjectName: 'Website Design & Development',
      credit: 0,
      grade: ''
    },
    {
      no: 18,
      term: 4,
      semesterVi: 'SUMMER 2024',
      semesterEn: 'SUMMER 2024',
      subjectCode: '7429',
      replacedSubject: '',
      subjectName: 'Discrete Maths',
      credit: 15,
      grade: ''
    },
    {
      no: 19,
      term: 4,
      semesterVi: 'FALL 2025',
      semesterEn: 'FALL 2025',
      subjectCode: '4902',
      replacedSubject: '',
      subjectName: 'Applied Programming and Design Principles',
      credit: 15,
      grade: ''
    },
    {
      no: 20,
      term: 4,
      semesterVi: 'SPRING 2026',
      semesterEn: 'SPRING 2026',
      subjectCode: '7428',
      replacedSubject: '',
      subjectName: 'Business Process Support',
      credit: 15,
      grade: ''
    },
    {
      no: 21,
      term: 5,
      semesterVi: 'FALL 2025',
      semesterEn: 'FALL 2025',
      subjectCode: '7436',
      replacedSubject: '',
      subjectName: 'Application Development',
      credit: 15,
      grade: ''
    },
    {
      no: 22,
      term: 5,
      semesterVi: 'FALL 2025',
      semesterEn: 'FALL 2025',
      subjectCode: '7430',
      replacedSubject: '',
      subjectName: 'Data Structures & Algorithms',
      credit: 15,
      grade: ''
    },
    {
      no: 23,
      term: 5,
      semesterVi: 'FALL 2025',
      semesterEn: 'FALL 2025',
      subjectCode: '7481',
      replacedSubject: '',
      subjectName: 'Internet of Things',
      credit: 15,
      grade: ''
    },
    {
      no: 24,
      term: 6,
      semesterVi: 'SPRING 2026',
      semesterEn: 'SPRING 2026',
      subjectCode: '7425',
      replacedSubject: '',
      subjectName: 'Computer Research Project (Pearson Set)',
      credit: 30,
      grade: ''
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      <main className="dashboard-container">
        
        {/* Page Title */}
        <h2 className="transcript-title">
          {t('GRADE TRANSCRIPT', 'GRADE TRANSCRIPT')}
        </h2>

        {/* Student Information & Export Row */}
        <div className="transcript-info-header">
          <div className="transcript-info-left" style={{ gap: '4px' }}>
            <div className="transcript-info-item" style={{ gap: '6px' }}>
              <GraduationCap size={16} className="text-orange-500" style={{ color: '#f37021' }} />
              <span className="transcript-info-label" style={{ color: '#334155', fontWeight: 'bold' }}>
                STUDENT:{' '}
              </span>
              <span className="transcript-info-val" style={{ color: '#334155', fontWeight: 'bold' }}>Nguyễn Văn Hùng - BS00679</span>
            </div>
            <div className="transcript-info-item" style={{ gap: '6px' }}>
              <BookOpen size={16} className="text-orange-500" style={{ color: '#f37021' }} />
              <span className="transcript-info-label" style={{ color: '#334155', fontWeight: 'bold' }}>Syllabus:BC_V6_01</span>
            </div>
          </div>
          <div className="transcript-info-right">
            <button className="export-excel-btn" style={{ backgroundColor: '#f37021' }}>
              <FileSpreadsheet size={16} />
              <span>{t('Export to Excel', 'Export to Excel')}</span>
            </button>
          </div>
        </div>

        {/* Transcript Data Table */}
        <div className="transcript-table-wrapper" style={{ borderRadius: '0', border: '1px solid #cbd5e1' }}>
          <table className="transcript-table">
            <thead>
              <tr className="transcript-thead-tr" style={{ backgroundColor: '#f37021' }}>
                {headers.map((h, i) => (
                  <th key={i} className="transcript-th" style={{ border: '1px solid #cbd5e1' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transcriptData.map((row) => {
                // Highlight Row 24 (Computer Research Project (Pearson Set)) in light gray to match mockup
                const rowClass = row.no === 24 ? 'tr-highlight-gray' : '';

                return (
                  <tr key={row.no} className={`transcript-tr ${rowClass}`}>
                    {/* STT */}
                    <td className="transcript-td text-center" style={{ border: '1px solid #cbd5e1' }}>
                      {row.no}
                    </td>

                    {/* Kỳ */}
                    <td className="transcript-td text-center" style={{ border: '1px solid #cbd5e1' }}>
                      {row.term}
                    </td>

                    {/* Học kỳ */}
                    <td className="transcript-td text-center font-mono" style={{ border: '1px solid #cbd5e1' }}>
                      {t(row.semesterVi, row.semesterEn)}
                    </td>

                    {/* Mã môn */}
                    <td className="transcript-td text-center font-bold font-mono" style={{ border: '1px solid #cbd5e1', color: '#0066cc', textDecoration: 'underline', cursor: 'pointer' }}>
                      {row.subjectCode}
                    </td>

                    {/* Môn thay thế */}
                    <td className="transcript-td text-center font-mono" style={{ border: '1px solid #cbd5e1' }}>
                      {row.replacedSubject || ''}
                    </td>

                    {/* Tên môn học */}
                    <td className="transcript-td subject-name-col" style={{ border: '1px solid #cbd5e1' }}>
                      {row.subjectName}
                    </td>

                    {/* Tín chỉ */}
                    <td className="transcript-td text-center font-mono" style={{ border: '1px solid #cbd5e1' }}>
                      {row.credit}
                    </td>

                    {/* Điểm (Số) */}
                    <td className="transcript-td text-center font-bold" style={{ border: '1px solid #cbd5e1' }}>
                      {row.grade ? (
                        <span className="grade-link-blue" style={{ color: '#0066cc' }}>{row.grade}</span>
                      ) : (
                        ''
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom Obsolete section */}
        <div className="transcript-obsolete-header" style={{ borderBottom: 'none', marginBottom: '10px' }}>
          <BookOpen size={16} className="text-orange-500" style={{ color: '#f37021' }} />
          <span className="transcript-obsolete-text" style={{ fontWeight: 'bold', color: '#334155' }}>
            {t('ENGLISH PREPARATORY & OBSOLETE COURSES', 'ENGLISH PREPARATORY & OBSOLETE COURSES')}
          </span>
        </div>

      </main>
    </div>
  );
};
