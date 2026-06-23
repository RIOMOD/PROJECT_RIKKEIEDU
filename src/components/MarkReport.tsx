import { Footer } from './Footer';

interface MarkReportProps {
  lang: 'vi' | 'en';
}

interface MarkRow {
  subject: string;
  semesterVi: string;
  semesterEn: string;
  group: string;
  startDate: string;
  endDate: string;
  gradeNum: string;
  gradeLetter: string;
  statusVi: string;
  statusEn: string;
  statusType: 'passed' | 'exempt' | 'failed';
}

export const MarkReport = ({ lang }: MarkReportProps) => {
  // Translation helper
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  const headers = [
    t('TÊN MÔN HỌC', 'SUBJECT NAME'),
    t('HỌC KỲ', 'SEMESTER'),
    t('NHÓM', 'GROUP'),
    t('NGÀY BẮT ĐẦU', 'START DATE'),
    t('NGÀY KẾT THÚC', 'END DATE'),
    t('ĐIỂM (SỐ)', 'GRADE (NUMBER)'),
    t('ĐIỂM (CHỮ)', 'GRADE (LETTER)'),
    t('TRẠNG THÁI', 'STATUS')
  ];

  // Grade list mock data
  const grades: MarkRow[] = [
    {
      subject: 'English 5 - Summit 1',
      semesterVi: 'HỌC KỲ HÈ 2023',
      semesterEn: 'SUMMER 2023',
      group: 'ENT4011.13',
      startDate: '10/07/2023',
      endDate: '23/08/2023',
      gradeNum: '7.7',
      gradeLetter: '',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      subject: 'English 4 - Top Notch 3',
      semesterVi: 'HỌC KỲ HÈ 2023',
      semesterEn: 'SUMMER 2023',
      group: 'ENT103.13',
      startDate: '08/05/2023',
      endDate: '17/06/2023',
      gradeNum: '7.3',
      gradeLetter: '',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      subject: 'English 1 - Topnotch Fundamentals',
      semesterVi: 'HỌC KỲ THU 2022',
      semesterEn: 'FALL 2022',
      group: 'ENT100.07',
      startDate: '24/10/2022',
      endDate: '28/12/2022',
      gradeNum: '8.2',
      gradeLetter: '',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      subject: 'English 2 - Topnotch 1',
      semesterVi: 'HỌC KỲ XUÂN 2023',
      semesterEn: 'SPRING 2023',
      group: 'ENT101.13',
      startDate: '03/01/2023',
      endDate: '08/03/2023',
      gradeNum: '8.2',
      gradeLetter: '',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      subject: 'English 3 - Topnotch 2',
      semesterVi: 'HỌC KỲ XUÂN 2023',
      semesterEn: 'SPRING 2023',
      group: 'ENT102.14',
      startDate: '20/03/2023',
      endDate: '28/04/2023',
      gradeNum: '7.0',
      gradeLetter: '',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      subject: 'Vovinam',
      semesterVi: 'HỌC KỲ THU 2024',
      semesterEn: 'FALL 2024',
      group: 'Exempt',
      startDate: '12/08/2024',
      endDate: '19/10/2024',
      gradeNum: '',
      gradeLetter: '',
      statusVi: 'Được miễn',
      statusEn: 'Is Exempt',
      statusType: 'exempt'
    },
    {
      subject: 'Computing Fundamental',
      semesterVi: 'HỌC KỲ XUÂN 2023',
      semesterEn: 'SPRING 2023',
      group: 'IT.CF02.064',
      startDate: '16/03/2023',
      endDate: '13/04/2023',
      gradeNum: '5.4',
      gradeLetter: '',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      subject: 'Personal Development',
      semesterVi: 'HỌC KỲ XUÂN 2023',
      semesterEn: 'SPRING 2023',
      group: 'PDP1.0614',
      startDate: '02/02/2023',
      endDate: '09/03/2023',
      gradeNum: '7.9',
      gradeLetter: '',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      subject: 'Microsoft Offices',
      semesterVi: 'HỌC KỲ THU 2022',
      semesterEn: 'FALL 2022',
      group: 'CF01.061',
      startDate: '21/11/2022',
      endDate: '28/11/2022',
      gradeNum: '6.5',
      gradeLetter: '',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      subject: 'Programming',
      semesterVi: 'HỌC KỲ XUÂN 2024',
      semesterEn: 'SPRING 2024',
      group: 'SE07101',
      startDate: '02/01/2024',
      endDate: '11/04/2024',
      gradeNum: '',
      gradeLetter: 'P',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      subject: 'Networking',
      semesterVi: 'HỌC KỲ HÈ 2023',
      semesterEn: 'SUMMER 2023',
      group: 'SE06201',
      startDate: '23/05/2023',
      endDate: '18/08/2023',
      gradeNum: '',
      gradeLetter: 'P',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      subject: 'Programming',
      semesterVi: 'HỌC KỲ HÈ 2023',
      semesterEn: 'SUMMER 2023',
      group: 'SE06201',
      startDate: '08/05/2023',
      endDate: '14/08/2023',
      gradeNum: '',
      gradeLetter: 'F',
      statusVi: 'Hủy chuyên cần',
      statusEn: 'Attendance Fail',
      statusType: 'failed'
    },
    {
      subject: 'Database Design & Development',
      semesterVi: 'HỌC KỲ THU 2023',
      semesterEn: 'FALL 2023',
      group: 'SE06201',
      startDate: '11/09/2023',
      endDate: '11/12/2023',
      gradeNum: '',
      gradeLetter: 'P',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      <main className="dashboard-container">
        
        {/* Page Title */}
        <h2 className="mark-report-title">
          {t('GRADE REPORT FOR NGUYỄN VĂN HÙNG (BS00679)', 'GRADE REPORT FOR NGUYỄN VĂN HÙNG (BS00679)')}
        </h2>

        {/* Grade Table */}
        <div className="mark-table-wrapper">
          <table className="mark-table">
            <thead>
              <tr className="mark-thead-tr">
                {headers.map((h, i) => (
                  <th key={i} className="mark-th">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grades.map((row, index) => (
                <tr key={index} className="mark-tr">
                  {/* Subject Name */}
                  <td className="mark-td subject-name-col">
                    {row.subject}
                  </td>
                  
                  {/* Semester */}
                  <td className="mark-td text-center">
                    {t(row.semesterVi, row.semesterEn)}
                  </td>
                  
                  {/* Group */}
                  <td className="mark-td text-center font-mono">
                    {row.group}
                  </td>
                  
                  {/* Start Date */}
                  <td className="mark-td text-center font-mono">
                    {row.startDate}
                  </td>
                  
                  {/* End Date */}
                  <td className="mark-td text-center font-mono">
                    {row.endDate}
                  </td>
                  
                  {/* Grade Num */}
                  <td className="mark-td text-center font-bold">
                    {row.gradeNum || <span className="text-slate-300">—</span>}
                  </td>
                  
                  {/* Grade Letter */}
                  <td className="mark-td text-center font-bold">
                    {row.gradeLetter ? (
                      <span className="underlined-link">{row.gradeLetter}</span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  
                  {/* Status */}
                  <td className="mark-td text-center font-semibold">
                    <span className={`underlined-link status-link ${row.statusType}`}>
                      {t(row.statusVi, row.statusEn)}
                    </span>
                  </td>
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
