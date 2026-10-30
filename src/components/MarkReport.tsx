interface MarkReportProps {
  lang: 'vi' | 'en';
}

interface MarkRow {
  no: number;
  termNo: string;
  subjectCode: string;
  subjectName: string;
  semesterVi: string;
  semesterEn: string;
  group: string;
  startDate: string;
  endDate: string;
  gradeNum: string;
  gradeLetter: string;
  statusVi: string;
  statusEn: string;
  statusType: 'passed' | 'exempt' | 'failed' | 'attendance_fail';
}

export const MarkReport = ({ lang }: MarkReportProps) => {
  // Translation helper
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  const studentProfile = (() => {
    const saved = localStorage.getItem('student_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name && parsed.id) return parsed;
      } catch (e) {}
    }
    return {
      name: 'Nguyễn Công Trứ',
      id: 'N24DTCN088'
    };
  })();

  const headers = [
    t('STT', 'No.'),
    t('Kỳ', 'TermNo'),
    t('Mã môn học', 'Subject Code'),
    t('Tên môn học', 'Subject Name'),
    t('Học kỳ', 'Semester'),
    t('Lớp / Nhóm', 'Group'),
    t('Ngày bắt đầu', 'Start Date'),
    t('Ngày kết thúc', 'End Date'),
    t('Điểm (Số)', 'Grade (Number)'),
    t('Điểm (Chữ)', 'Grade (Letter)'),
    t('Trạng thái', 'Status')
  ];

  // 36 grade list mock rows matching Image 1 exactly
  const grades: MarkRow[] = [
    {
      no: 1,
      termNo: '',
      subjectCode: 'ENT4011',
      subjectName: 'English 5 - Summit 1',
      semesterVi: 'MÙA HÈ 2023',
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
      no: 2,
      termNo: '',
      subjectCode: 'ENT301',
      subjectName: 'English 4 - Topnotch 3',
      semesterVi: 'MÙA HÈ 2023',
      semesterEn: 'SUMMER 2023',
      group: 'ENT301.13',
      startDate: '08/05/2023',
      endDate: '17/06/2023',
      gradeNum: '7.3',
      gradeLetter: '',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      no: 3,
      termNo: '',
      subjectCode: 'ENT100',
      subjectName: 'English 1 - Topnotch Fundamentals',
      semesterVi: 'MÙA THU 2022',
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
      no: 4,
      termNo: '-3',
      subjectCode: 'ENT101.1',
      subjectName: 'English 2 - Topnotch 1',
      semesterVi: 'MÙA XUÂN 2023',
      semesterEn: 'SPRING 2023',
      group: 'ENT101.13',
      startDate: '03/01/2023',
      endDate: '08/03/2023',
      gradeNum: '9.2',
      gradeLetter: '',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      no: 5,
      termNo: '-2',
      subjectCode: 'ENT102.1',
      subjectName: 'English 3 - Topnotch 2',
      semesterVi: 'MÙA XUÂN 2023',
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
      no: 6,
      termNo: '0',
      subjectCode: 'VO100',
      subjectName: 'Vovinam',
      semesterVi: 'MÙA THU 2024',
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
      no: 7,
      termNo: '0',
      subjectCode: 'CF02',
      subjectName: 'Computing Fundamental',
      semesterVi: 'MÙA XUÂN 2023',
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
      no: 8,
      termNo: '0',
      subjectCode: 'PDP101',
      subjectName: 'Personal Development',
      semesterVi: 'MÙA XUÂN 2023',
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
      no: 9,
      termNo: '0',
      subjectCode: 'CF01',
      subjectName: 'Microsoft Offices',
      semesterVi: 'MÙA THU 2022',
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
      no: 10,
      termNo: '1',
      subjectCode: '7388',
      subjectName: 'Programming',
      semesterVi: 'MÙA XUÂN 2024',
      semesterEn: 'SPRING 2024',
      group: 'SE07101',
      startDate: '02/01/2024',
      endDate: '11/04/2024',
      gradeNum: '6.5',
      gradeLetter: 'P',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      no: 11,
      termNo: '1',
      subjectCode: '7393',
      subjectName: 'Networking',
      semesterVi: 'MÙA HÈ 2023',
      semesterEn: 'SUMMER 2023',
      group: 'SE06201',
      startDate: '23/05/2023',
      endDate: '18/08/2023',
      gradeNum: '6.5',
      gradeLetter: 'P',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      no: 12,
      termNo: '1',
      subjectCode: '7388',
      subjectName: 'Programming',
      semesterVi: 'MÙA HÈ 2023',
      semesterEn: 'SUMMER 2023',
      group: 'SE06201',
      startDate: '08/05/2023',
      endDate: '14/08/2023',
      gradeNum: '0.0',
      gradeLetter: 'F',
      statusVi: 'Học lại chuyên cần',
      statusEn: 'Attendance Fail',
      statusType: 'attendance_fail'
    },
    {
      no: 13,
      termNo: '2',
      subjectCode: '7400',
      subjectName: 'Database Design & Development',
      semesterVi: 'MÙA THU 2023',
      semesterEn: 'FALL 2023',
      group: 'SE06201',
      startDate: '11/09/2023',
      endDate: '11/12/2023',
      gradeNum: '6.5',
      gradeLetter: 'P',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      no: 14,
      termNo: '2',
      subjectCode: '7407',
      subjectName: 'Planning a Computing Project',
      semesterVi: 'MÙA THU 2023',
      semesterEn: 'FALL 2023',
      group: 'SE06201',
      startDate: '11/09/2023',
      endDate: '11/12/2023',
      gradeNum: '6.5',
      gradeLetter: 'P',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      no: 15,
      termNo: '2',
      subjectCode: '7398',
      subjectName: 'Professional Practice',
      semesterVi: 'MÙA THU 2023',
      semesterEn: 'FALL 2023',
      group: 'SE06201',
      startDate: '05/06/2023',
      endDate: '11/12/2023',
      gradeNum: '6.5',
      gradeLetter: 'P',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      no: 16,
      termNo: '3',
      subjectCode: '7408',
      subjectName: 'Software Development Life Cycle',
      semesterVi: 'MÙA XUÂN 2026',
      semesterEn: 'SPRING 2026',
      group: 'SE07202',
      startDate: '10/02/2026',
      endDate: '18/04/2026',
      gradeNum: '0.0',
      gradeLetter: 'F',
      statusVi: 'Học lại chuyên cần',
      statusEn: 'Attendance Fail',
      statusType: 'attendance_fail'
    },
    {
      no: 17,
      termNo: '3',
      subjectCode: '7408',
      subjectName: 'Software Development Life Cycle',
      semesterVi: 'MÙA HÈ 2025',
      semesterEn: 'SUMMER 2025',
      group: 'SE07202',
      startDate: '09/06/2025',
      endDate: '15/08/2025',
      gradeNum: '1.0',
      gradeLetter: 'F',
      statusVi: 'Chưa đạt',
      statusEn: 'Not Passed',
      statusType: 'failed'
    },
    {
      no: 18,
      termNo: '3',
      subjectCode: '7408',
      subjectName: 'Software Development Life Cycle',
      semesterVi: 'MÙA THU 2024',
      semesterEn: 'FALL 2024',
      group: '7408.01.CNTT2.LCS',
      startDate: '08/11/2024',
      endDate: '12/12/2024',
      gradeNum: '0.0',
      gradeLetter: 'F',
      statusVi: 'Học lại chuyên cần',
      statusEn: 'Attendance Fail',
      statusType: 'attendance_fail'
    },
    {
      no: 19,
      termNo: '3',
      subjectCode: '7406',
      subjectName: 'Security',
      semesterVi: 'MÙA XUÂN 2024',
      semesterEn: 'SPRING 2024',
      group: 'SE06201',
      startDate: '01/01/2024',
      endDate: '04/12/2024',
      gradeNum: '10.0',
      gradeLetter: 'D',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      no: 20,
      termNo: '3',
      subjectCode: '7408',
      subjectName: 'Software Development Life Cycle',
      semesterVi: 'MÙA XUÂN 2024',
      semesterEn: 'SPRING 2024',
      group: 'SE06201',
      startDate: '01/01/2024',
      endDate: '04/12/2024',
      gradeNum: '0.0',
      gradeLetter: 'F',
      statusVi: 'Học lại chuyên cần',
      statusEn: 'Attendance Fail',
      statusType: 'attendance_fail'
    },
    {
      no: 21,
      termNo: '3',
      subjectCode: '7419',
      subjectName: 'Website Design & Development',
      semesterVi: 'MÙA XUÂN 2024',
      semesterEn: 'SPRING 2024',
      group: 'SE06201',
      startDate: '02/01/2024',
      endDate: '16/04/2024',
      gradeNum: '6.5',
      gradeLetter: 'P',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      no: 22,
      termNo: '4',
      subjectCode: '7428',
      subjectName: 'Business Process Support',
      semesterVi: 'MÙA XUÂN 2026',
      semesterEn: 'SPRING 2026',
      group: 'SE06101',
      startDate: '06/01/2026',
      endDate: '11/04/2026',
      gradeNum: '0.1',
      gradeLetter: 'F',
      statusVi: 'Học lại chuyên cần',
      statusEn: 'Attendance Fail',
      statusType: 'attendance_fail'
    },
    {
      no: 23,
      termNo: '4',
      subjectCode: '4902',
      subjectName: 'Applied Programming and Design Principles',
      semesterVi: 'MÙA THU 2025',
      semesterEn: 'FALL 2025',
      group: 'SE07203',
      startDate: '11/09/2025',
      endDate: '17/12/2025',
      gradeNum: '1.0',
      gradeLetter: 'F',
      statusVi: 'Chưa đạt',
      statusEn: 'Not Passed',
      statusType: 'failed'
    },
    {
      no: 24,
      termNo: '4',
      subjectCode: '7428',
      subjectName: 'Business Process Support',
      semesterVi: 'MÙA HÈ 2025',
      semesterEn: 'SUMMER 2025',
      group: 'SE07202',
      startDate: '10/06/2025',
      endDate: '16/08/2025',
      gradeNum: '1.1',
      gradeLetter: 'F',
      statusVi: 'Chưa đạt',
      statusEn: 'Not Passed',
      statusType: 'failed'
    },
    {
      no: 25,
      termNo: '4',
      subjectCode: '4902',
      subjectName: 'Applied Programming and Design Principles',
      semesterVi: 'MÙA HÈ 2024',
      semesterEn: 'SUMMER 2024',
      group: 'SE06203',
      startDate: '03/05/2024',
      endDate: '22/08/2024',
      gradeNum: '0.0',
      gradeLetter: 'F',
      statusVi: 'Học lại chuyên cần',
      statusEn: 'Attendance Fail',
      statusType: 'attendance_fail'
    },
    {
      no: 26,
      termNo: '4',
      subjectCode: '7428',
      subjectName: 'Business Process Support',
      semesterVi: 'MÙA HÈ 2024',
      semesterEn: 'SUMMER 2024',
      group: 'SE06203',
      startDate: '08/05/2024',
      endDate: '21/08/2024',
      gradeNum: '4.1',
      gradeLetter: 'F',
      statusVi: 'Chưa đạt',
      statusEn: 'Not Passed',
      statusType: 'failed'
    },
    {
      no: 27,
      termNo: '4',
      subjectCode: '7429',
      subjectName: 'Discrete Maths',
      semesterVi: 'MÙA HÈ 2024',
      semesterEn: 'SUMMER 2024',
      group: 'SE06203',
      startDate: '03/05/2024',
      endDate: '15/08/2024',
      gradeNum: '8.5',
      gradeLetter: 'M',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      no: 28,
      termNo: '5',
      subjectCode: '7430',
      subjectName: 'Data Structures & Algorithms',
      semesterVi: 'MÙA THU 2025',
      semesterEn: 'FALL 2025',
      group: '7430.01.CNTT2',
      startDate: '15/10/2025',
      endDate: '17/12/2025',
      gradeNum: '1.0',
      gradeLetter: 'F',
      statusVi: 'Chưa đạt',
      statusEn: 'Not Passed',
      statusType: 'failed'
    },
    {
      no: 29,
      termNo: '5',
      subjectCode: '7436',
      subjectName: 'Application Development',
      semesterVi: 'MÙA THU 2025',
      semesterEn: 'FALL 2025',
      group: 'SE07203',
      startDate: '11/09/2025',
      endDate: '20/12/2025',
      gradeNum: '6.5',
      gradeLetter: 'P',
      statusVi: 'Đạt',
      statusEn: 'Passed',
      statusType: 'passed'
    },
    {
      no: 30,
      termNo: '5',
      subjectCode: '7481',
      subjectName: 'Internet of Things',
      semesterVi: 'MÙA THU 2025',
      semesterEn: 'FALL 2025',
      group: 'SE06101',
      startDate: '11/09/2025',
      endDate: '10/12/2025',
      gradeNum: '0.0',
      gradeLetter: 'F',
      statusVi: 'Học lại chuyên cần',
      statusEn: 'Attendance Fail',
      statusType: 'attendance_fail'
    },
    {
      no: 31,
      termNo: '5',
      subjectCode: '7436',
      subjectName: 'Application Development',
      semesterVi: 'MÙA THU 2024',
      semesterEn: 'FALL 2024',
      group: 'SE06203',
      startDate: '16/09/2024',
      endDate: '14/12/2024',
      gradeNum: '0.0',
      gradeLetter: 'F',
      statusVi: 'Học lại chuyên cần',
      statusEn: 'Attendance Fail',
      statusType: 'attendance_fail'
    },
    {
      no: 32,
      termNo: '5',
      subjectCode: '7481',
      subjectName: 'Internet of Things',
      semesterVi: 'MÙA THU 2024',
      semesterEn: 'FALL 2024',
      group: 'SE06203',
      startDate: '12/09/2024',
      endDate: '19/12/2024',
      gradeNum: '0.0',
      gradeLetter: 'F',
      statusVi: 'Học lại chuyên cần',
      statusEn: 'Attendance Fail',
      statusType: 'attendance_fail'
    },
    {
      no: 33,
      termNo: '5',
      subjectCode: '7430',
      subjectName: 'Data Structures & Algorithms',
      semesterVi: 'MÙA THU 2024',
      semesterEn: 'FALL 2024',
      group: 'SE06203',
      startDate: '09/09/2024',
      endDate: '13/12/2024',
      gradeNum: '0.0',
      gradeLetter: 'F',
      statusVi: 'Học lại chuyên cần',
      statusEn: 'Attendance Fail',
      statusType: 'attendance_fail'
    },
    {
      no: 34,
      termNo: '6',
      subjectCode: '7425',
      subjectName: 'Computer Research Project (Pearson Set)',
      semesterVi: 'MÙA XUÂN 2026',
      semesterEn: 'SPRING 2026',
      group: 'SE07202',
      startDate: '05/01/2026',
      endDate: '17/04/2026',
      gradeNum: '0.0',
      gradeLetter: 'F',
      statusVi: 'Học lại chuyên cần',
      statusEn: 'Attendance Fail',
      statusType: 'attendance_fail'
    },
    {
      no: 35,
      termNo: '6',
      subjectCode: '7425',
      subjectName: 'Computer Research Project (Pearson Set)',
      semesterVi: 'MÙA THU 2025',
      semesterEn: 'FALL 2025',
      group: 'SE07101',
      startDate: '08/09/2025',
      endDate: '19/12/2025',
      gradeNum: '0.0',
      gradeLetter: 'F',
      statusVi: 'Học lại chuyên cần',
      statusEn: 'Attendance Fail',
      statusType: 'attendance_fail'
    },
    {
      no: 36,
      termNo: '6',
      subjectCode: '7425',
      subjectName: 'Computer Research Project (Pearson Set)',
      semesterVi: 'MÙA XUÂN 2025',
      semesterEn: 'SPRING 2025',
      group: 'SE06203',
      startDate: '08/01/2025',
      endDate: '17/04/2025',
      gradeNum: '0.0',
      gradeLetter: 'F',
      statusVi: 'Học lại chuyên cần',
      statusEn: 'Attendance Fail',
      statusType: 'attendance_fail'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      <main className="dashboard-container">
        
        {/* Page Title */}
        <h2 className="mark-report-title">
          {t(`PHIẾU ĐIỂM CỦA ${studentProfile.name.toUpperCase()} (${studentProfile.id})`, `Grade report for ${studentProfile.name} (${studentProfile.id})`)}
        </h2>

        {/* Grade Table */}
        <div className="mark-table-wrapper" style={{ overflowX: 'auto', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
          <table className="mark-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr className="mark-thead-tr" style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #cbd5e1' }}>
                {headers.map((h, i) => (
                  <th key={i} className="mark-th" style={{ padding: '12px 8px', fontSize: '11.5px', color: '#475569', fontWeight: 'bold', borderRight: '1px solid #e2e8f0', textAlign: 'center' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grades.map((row) => {
                // Determine status badge colors
                let badgeStyle = {};
                if (row.statusType === 'passed') {
                  badgeStyle = { backgroundColor: '#D1FAE5', color: '#065F46' };
                } else if (row.statusType === 'exempt') {
                  badgeStyle = { backgroundColor: '#E0F2FE', color: '#0369A1' };
                } else if (row.statusType === 'attendance_fail') {
                  badgeStyle = { backgroundColor: '#FEE2E2', color: '#991B1B' };
                } else {
                  // failed
                  badgeStyle = { backgroundColor: '#FFEDD5', color: '#9A3412' };
                }

                return (
                  <tr key={row.no} className="mark-tr" style={{ borderBottom: '1px solid #e2e8f0' }}>
                    {/* STT */}
                    <td className="mark-td text-center" style={{ padding: '10px 8px', textAlign: 'center', borderRight: '1px solid #e2e8f0', fontSize: '12.5px' }}>
                      {row.no}
                    </td>

                    {/* TermNo */}
                    <td className="mark-td text-center" style={{ padding: '10px 8px', textAlign: 'center', borderRight: '1px solid #e2e8f0', fontSize: '12.5px', fontFamily: 'monospace' }}>
                      {row.termNo || '—'}
                    </td>

                    {/* Subject Code */}
                    <td className="mark-td text-center font-bold font-mono" style={{ padding: '10px 8px', textAlign: 'center', borderRight: '1px solid #e2e8f0', fontSize: '12.5px', color: 'var(--primary-text-theme, #0066cc)', textDecoration: 'underline', cursor: 'pointer' }}>
                      {row.subjectCode}
                    </td>

                    {/* Subject Name */}
                    <td className="mark-td" style={{ padding: '10px 12px', borderRight: '1px solid #e2e8f0', fontSize: '12.5px', fontWeight: '500' }}>
                      {row.subjectName}
                    </td>

                    {/* Semester */}
                    <td className="mark-td text-center" style={{ padding: '10px 8px', textAlign: 'center', borderRight: '1px solid #e2e8f0', fontSize: '12.5px', fontFamily: 'monospace' }}>
                      {t(row.semesterVi, row.semesterEn)}
                    </td>

                    {/* Group */}
                    <td className="mark-td text-center" style={{ padding: '10px 8px', textAlign: 'center', borderRight: '1px solid #e2e8f0', fontSize: '12.5px', fontFamily: 'monospace' }}>
                      {row.group}
                    </td>

                    {/* Start Date */}
                    <td className="mark-td text-center" style={{ padding: '10px 8px', textAlign: 'center', borderRight: '1px solid #e2e8f0', fontSize: '12.5px', fontFamily: 'monospace' }}>
                      {row.startDate}
                    </td>

                    {/* End Date */}
                    <td className="mark-td text-center" style={{ padding: '10px 8px', textAlign: 'center', borderRight: '1px solid #e2e8f0', fontSize: '12.5px', fontFamily: 'monospace' }}>
                      {row.endDate}
                    </td>

                    {/* Grade Num */}
                    <td className="mark-td text-center font-bold" style={{ padding: '10px 8px', textAlign: 'center', borderRight: '1px solid #e2e8f0', fontSize: '12.5px' }}>
                      {row.gradeNum || <span style={{ color: '#cbd5e1' }}>—</span>}
                    </td>

                    {/* Grade Letter */}
                    <td className="mark-td text-center font-bold" style={{ padding: '10px 8px', textAlign: 'center', borderRight: '1px solid #e2e8f0', fontSize: '12.5px', color: row.gradeLetter === 'F' ? '#ef4444' : '#10b981' }}>
                      {row.gradeLetter || <span style={{ color: '#cbd5e1' }}>—</span>}
                    </td>

                    {/* Status */}
                    <td className="mark-td text-center" style={{ padding: '10px 8px', textAlign: 'center', fontSize: '12px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        ...badgeStyle
                      }}>
                        {t(row.statusVi, row.statusEn)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
};
