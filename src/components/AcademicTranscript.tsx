import { FileSpreadsheet } from 'lucide-react';

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
    t('STT', 'No'),
    t('KỲ', 'Term'),
    t('HỌC KỲ', 'Semester'),
    t('MÃ MÔN HỌC', 'Subject Code'),
    t('MÔN THAY THẾ', 'Replaced Subject'),
    t('TÊN MÔN HỌC', 'Subject Name'),
    t('SỐ TÍN CHỈ', 'Credit'),
    t('ĐIỂM (SỐ)', 'Grade (Number)')
  ];

  // 24 transcript rows matching mockup
  const transcriptData: TranscriptRow[] = [
    {
      no: 1,
      term: -4,
      semesterVi: 'HỌC KỲ THU 2022',
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
      semesterVi: 'HỌC KỲ XUÂN 2023',
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
      semesterVi: 'HỌC KỲ XUÂN 2023',
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
      semesterVi: 'HỌC KỲ HÈ 2023',
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
      semesterVi: 'HỌC KỲ HÈ 2023',
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
      semesterVi: 'HỌC KỲ XUÂN 2023',
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
      semesterVi: 'HỌC KỲ THU 2024',
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
      semesterVi: 'HỌC KỲ THU 2022',
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
      semesterVi: 'HỌC KỲ XUÂN 2023',
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
      semesterVi: 'HỌC KỲ HÈ 2023',
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
      semesterVi: 'HỌC KỲ XUÂN 2024',
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
      semesterVi: 'HỌC KỲ THU 2023',
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
      semesterVi: 'HỌC KỲ THU 2023',
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
      semesterVi: 'HỌC KỲ THU 2023',
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
      semesterVi: 'HỌC KỲ XUÂN 2024',
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
      semesterVi: 'HỌC KỲ XUÂN 2026',
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
      semesterVi: 'HỌC KỲ XUÂN 2024',
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
      semesterVi: 'HỌC KỲ HÈ 2024',
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
      semesterVi: 'HỌC KỲ THU 2025',
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
      semesterVi: 'HỌC KỲ XUÂN 2026',
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
      semesterVi: 'HỌC KỲ THU 2025',
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
      semesterVi: 'HỌC KỲ THU 2025',
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
      semesterVi: 'HỌC KỲ THU 2025',
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
      semesterVi: 'HỌC KỲ XUÂN 2026',
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
          <div className="transcript-info-left">
            <div className="transcript-info-item">
              <span className="transcript-info-icon">🎓</span>
              <span className="transcript-info-label">
                {t('SINH VIÊN: ', 'STUDENT: ')}
              </span>
              <span className="transcript-info-val">Nguyễn Văn Hùng - BS00679</span>
            </div>
            <div className="transcript-info-item" style={{ marginTop: '4px' }}>
              <span className="transcript-info-icon">📋</span>
              <span className="transcript-info-label">Syllabus:</span>
              <span className="transcript-info-val">BC_V6_01</span>
            </div>
          </div>
          <div className="transcript-info-right">
            <button className="export-excel-btn">
              <FileSpreadsheet size={16} />
              <span>{t('Xuất Excel', 'Export to Excel')}</span>
            </button>
          </div>
        </div>

        {/* Transcript Data Table */}
        <div className="transcript-table-wrapper">
          <table className="transcript-table">
            <thead>
              <tr className="transcript-thead-tr">
                {headers.map((h, i) => (
                  <th key={i} className="transcript-th">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transcriptData.map((row) => {
                // Highlight Row 22 (Data Structures & Algorithms) in light gray
                const rowClass = row.no === 22 ? 'tr-highlight-gray' : '';

                return (
                  <tr key={row.no} className={`transcript-tr ${rowClass}`}>
                    {/* STT */}
                    <td className="transcript-td text-center font-bold text-slate-500">
                      {row.no}
                    </td>

                    {/* Kỳ */}
                    <td className="transcript-td text-center">
                      {row.term}
                    </td>

                    {/* Học kỳ */}
                    <td className="transcript-td text-center font-mono">
                      {t(row.semesterVi, row.semesterEn)}
                    </td>

                    {/* Mã môn */}
                    <td className="transcript-td text-center font-bold font-mono">
                      {row.subjectCode}
                    </td>

                    {/* Môn thay thế */}
                    <td className="transcript-td text-center font-mono">
                      {row.replacedSubject || <span className="text-slate-300">—</span>}
                    </td>

                    {/* Tên môn học */}
                    <td className="transcript-td subject-name-col">
                      {row.subjectName}
                    </td>

                    {/* Tín chỉ */}
                    <td className="transcript-td text-center font-mono">
                      {row.credit}
                    </td>

                    {/* Điểm (Số) */}
                    <td className="transcript-td text-center font-bold">
                      {row.grade ? (
                        <span className="grade-link-blue">{row.grade}</span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom Obsolete section */}
        <div className="transcript-obsolete-header">
          <span className="transcript-info-icon">📋</span>
          <span className="transcript-obsolete-text">
            {t('CÁC KHÓA HỌC TIẾNG ANH DỰ BỊ & MÔN HỌC CŨ', 'ENGLISH PREPARATORY & OBSOLETE COURSES')}
          </span>
        </div>

      </main>
    </div>
  );
};
