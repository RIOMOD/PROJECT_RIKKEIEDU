interface MarkReportProps {
  lang: 'vi' | 'en';
}

interface MarkRow {
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
    t('HỌC KỲ', 'SEMESTER'),
    t('NHÓM', 'GROUP'),
    t('NGÀY BẮT ĐẦU', 'START DATE'),
    t('NGÀY KẾT THÚC', 'END DATE'),
    t('ĐIỂM (SỐ)', 'GRADE (NUMBER)'),
    t('ĐIỂM (CHỮ)', 'GRADE (LETTER)'),
    t('TRẠNG THÁI', 'STATUS')
  ];

  // Grade list mock data exactly matching the screenshot mockup
  const grades: MarkRow[] = [
    {
      semesterVi: 'MÙA HÈ 2023',
      semesterEn: 'SUMMER 2023',
      group: 'ENT4011.13',
      startDate: '10/07/2023',
      endDate: '23/08/2023',
      gradeNum: '7.7',
      gradeLetter: '',
      statusVi: 'Đi qua',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      semesterVi: 'MÙA HÈ 2023',
      semesterEn: 'SUMMER 2023',
      group: 'ENT103.13',
      startDate: '08/05/2023',
      endDate: '17/06/2023',
      gradeNum: '7.3',
      gradeLetter: '',
      statusVi: 'Đi qua',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      semesterVi: 'MÙA THU 2022',
      semesterEn: 'FALL 2022',
      group: 'ENT100.07',
      startDate: '24/10/2022',
      endDate: '28/12/2022',
      gradeNum: '8.2',
      gradeLetter: '',
      statusVi: 'Đi qua',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      semesterVi: 'MÙA XUÂN 2023',
      semesterEn: 'SPRING 2023',
      group: 'ENT101.13',
      startDate: '03/01/2023',
      endDate: '08/03/2023',
      gradeNum: '8.2',
      gradeLetter: '',
      statusVi: 'Đi qua',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      semesterVi: 'MÙA XUÂN 2023',
      semesterEn: 'SPRING 2023',
      group: 'ENT102.14',
      startDate: '20/03/2023',
      endDate: '28/04/2023',
      gradeNum: '7.0',
      gradeLetter: '',
      statusVi: 'Đi qua',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      semesterVi: 'MÙA THU NĂM 2024',
      semesterEn: 'FALL 2024',
      group: 'Miễn trừ',
      startDate: '12/08/2024',
      endDate: '19/10/2024',
      gradeNum: '',
      gradeLetter: '',
      statusVi: 'Được miễn trừ',
      statusEn: 'Exempted',
      statusType: 'exempt'
    },
    {
      semesterVi: 'MÙA XUÂN 2023',
      semesterEn: 'SPRING 2023',
      group: 'IT.CF02.064',
      startDate: '16/03/2023',
      endDate: '13/04/2023',
      gradeNum: '5.4',
      gradeLetter: '',
      statusVi: 'Đi qua',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      semesterVi: 'MÙA XUÂN 2023',
      semesterEn: 'SPRING 2023',
      group: 'PDP1.0614',
      startDate: '02/02/2023',
      endDate: '09/03/2023',
      gradeNum: '7.9',
      gradeLetter: '',
      statusVi: 'Đi qua',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      semesterVi: 'MÙA THU 2022',
      semesterEn: 'FALL 2022',
      group: 'CF01.061',
      startDate: '21/11/2022',
      endDate: '28/11/2022',
      gradeNum: '6.5',
      gradeLetter: '',
      statusVi: 'Đi qua',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      semesterVi: 'MÙA XUÂN 2024',
      semesterEn: 'SPRING 2024',
      group: 'SE07101',
      startDate: '02/01/2024',
      endDate: '11/04/2024',
      gradeNum: '',
      gradeLetter: 'P',
      statusVi: 'Đi qua',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      semesterVi: 'MÙA HÈ 2023',
      semesterEn: 'SUMMER 2023',
      group: 'SE06201',
      startDate: '23/05/2023',
      endDate: '18/08/2023',
      gradeNum: '',
      gradeLetter: 'P',
      statusVi: 'Đi qua',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      semesterVi: 'MÙA HÈ 2023',
      semesterEn: 'SUMMER 2023',
      group: 'SE06201',
      startDate: '08/05/2023',
      endDate: '14/08/2023',
      gradeNum: '',
      gradeLetter: 'E',
      statusVi: 'Không đạt yêu cầu chuyên cần',
      statusEn: 'Failed attendance requirement',
      statusType: 'failed'
    },
    {
      semesterVi: 'MÙA THU 2023',
      semesterEn: 'FALL 2023',
      group: 'SE06201',
      startDate: '11/09/2023',
      endDate: '11/12/2023',
      gradeNum: '',
      gradeLetter: 'P',
      statusVi: 'Đi qua',
      statusEn: 'Passed',
      statusType: 'passed'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      <main className="dashboard-container">
        
        {/* Page Title */}
        <h2 className="mark-report-title">
          {t('PHIẾU ĐIỂM CỦA NGUYỄN VĂN HÙNG (BS00679)', 'GRADE REPORT FOR NGUYỄN VĂN HÙNG (BS00679)')}
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
                  {/* Semester */}
                  <td className="mark-td">
                    {t(row.semesterVi, row.semesterEn)}
                  </td>
                  
                  {/* Group */}
                  <td className="mark-td font-mono">
                    {row.group}
                  </td>
                  
                  {/* Start Date */}
                  <td className="mark-td font-mono">
                    {row.startDate}
                  </td>
                  
                  {/* End Date */}
                  <td className="mark-td font-mono">
                    {row.endDate}
                  </td>
                  
                  {/* Grade Num */}
                  <td className="mark-td font-bold">
                    {row.gradeNum || <span style={{ color: '#cbd5e1' }}>—</span>}
                  </td>
                  
                  {/* Grade Letter */}
                  <td className="mark-td font-bold">
                    {row.gradeLetter ? (
                      row.gradeLetter === 'E' ? (
                        row.gradeLetter
                      ) : (
                        <span className="mark-link">{row.gradeLetter}</span>
                      )
                    ) : (
                      <span style={{ color: '#cbd5e1' }}>—</span>
                    )}
                  </td>
                  
                  {/* Status */}
                  <td className="mark-td font-semibold">
                    {row.statusType === 'failed' ? (
                      row.statusVi
                    ) : (
                      <span className="mark-link">
                        {t(row.statusVi, row.statusEn)}
                      </span>
                    )}
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
