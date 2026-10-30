import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Trash2, Star, CheckCircle2, Check, X } from 'lucide-react';

interface HistoryItem {
  code: string;
  serviceVi: string;
  serviceEn: string;
  regDate: string;
  compDate: string;
  statusVi: string;
  statusEn: string;
  statusType: 'orange' | 'yellow' | 'gray';
  noticeVi: string;
  noticeEn: string;
  hasCancel: boolean;
  hasRate: boolean;
}

interface RegistrationHistoryProps {
  lang: 'vi' | 'en';
}

export const RegistrationHistory = ({ lang }: RegistrationHistoryProps) => {
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
      id: 'N24DTCN088',
      username: 'truncn24dtcn088'
    };
  })();

  // Initialize mock history data exactly matching the screenshot mockup
  const [historyList, setHistoryList] = useState<HistoryItem[]>([
    {
      code: '#7008',
      serviceVi: 'ĐĂNG KÝ HỌC LẠI',
      serviceEn: 'RETAKE REGISTRATION',
      regDate: '2026-05-04 08:42:44',
      compDate: '',
      statusVi: 'Chờ xếp lớp',
      statusEn: 'Pending Allocation',
      statusType: 'orange',
      noticeVi: '',
      noticeEn: '',
      hasCancel: true,
      hasRate: false
    },
    {
      code: '#7007',
      serviceVi: 'ĐĂNG KÝ HỌC LẠI',
      serviceEn: 'RETAKE REGISTRATION',
      regDate: '2026-05-04 08:40:00',
      compDate: '2026-05-04 08:50:25',
      statusVi: 'Close (Đã xếp lớp)',
      statusEn: 'Closed (Assigned)',
      statusType: 'yellow',
      noticeVi: '',
      noticeEn: '',
      hasCancel: false,
      hasRate: true
    },
    {
      code: '#7006',
      serviceVi: 'ĐĂNG KÝ HỌC LẠI',
      serviceEn: 'RETAKE REGISTRATION',
      regDate: '2026-05-04 08:30:27',
      compDate: '2026-05-04 08:51:00',
      statusVi: 'Close (Đã xếp lớp)',
      statusEn: 'Closed (Assigned)',
      statusType: 'yellow',
      noticeVi: '',
      noticeEn: '',
      hasCancel: false,
      hasRate: true
    },
    {
      code: '#6817',
      serviceVi: 'ĐĂNG KÝ HỌC LẠI',
      serviceEn: 'RETAKE REGISTRATION',
      regDate: '2026-03-29 15:17:07',
      compDate: '2026-05-03 19:22:39',
      statusVi: 'Close (Đã xếp lớp)',
      statusEn: 'Closed (Assigned)',
      statusType: 'yellow',
      noticeVi: '',
      noticeEn: '',
      hasCancel: false,
      hasRate: true
    },
    {
      code: '#6816',
      serviceVi: 'ĐĂNG KÝ HỌC LẠI',
      serviceEn: 'RETAKE REGISTRATION',
      regDate: '2026-03-29 15:12:29',
      compDate: '',
      statusVi: 'Chờ xếp lớp',
      statusEn: 'Pending Allocation',
      statusType: 'orange',
      noticeVi: '',
      noticeEn: '',
      hasCancel: true,
      hasRate: false
    },
    {
      code: '#6815',
      serviceVi: 'ĐĂNG KÝ HỌC LẠI',
      serviceEn: 'RETAKE REGISTRATION',
      regDate: '2026-03-29 15:06:21',
      compDate: '',
      statusVi: 'Chờ xếp lớp',
      statusEn: 'Pending Allocation',
      statusType: 'orange',
      noticeVi: '',
      noticeEn: '',
      hasCancel: true,
      hasRate: false
    },
    {
      code: '#6700',
      serviceVi: 'ĐĂNG KÝ NGHỈ BUỔI HỌC',
      serviceEn: 'LEAVE OF ABSENCE REGISTRATION',
      regDate: '2026-03-16 07:59:59',
      compDate: '2026-03-16 08:10:24',
      statusVi: 'Close',
      statusEn: 'Closed',
      statusType: 'yellow',
      noticeVi: 'ĐÃ ĐỒNG Ý YÊU CẦU()',
      noticeEn: 'APPROVED REQUEST()',
      hasCancel: false,
      hasRate: true
    },
    {
      code: '#6663',
      serviceVi: 'ĐĂNG KÝ NGHỈ BUỔI HỌC',
      serviceEn: 'LEAVE OF ABSENCE REGISTRATION',
      regDate: '2026-03-10 10:13:16',
      compDate: '2026-03-10 11:20:41',
      statusVi: 'Close',
      statusEn: 'Closed',
      statusType: 'yellow',
      noticeVi: 'ĐÃ ĐỒNG Ý YÊU CẦU()',
      noticeEn: 'APPROVED REQUEST()',
      hasCancel: false,
      hasRate: true
    },
    {
      code: '#6369',
      serviceVi: 'ĐĂNG KÝ HỌC LẠI',
      serviceEn: 'RETAKE REGISTRATION',
      regDate: '2026-01-05 03:44:46',
      compDate: '2026-01-05 06:01:46',
      statusVi: 'Close (Đã xếp lớp)',
      statusEn: 'Closed (Assigned)',
      statusType: 'yellow',
      noticeVi: '',
      noticeEn: '',
      hasCancel: false,
      hasRate: true
    },
    {
      code: '#6325',
      serviceVi: 'ĐĂNG KÝ NGHỈ BUỔI HỌC',
      serviceEn: 'LEAVE OF ABSENCE REGISTRATION',
      regDate: '2025-12-20 14:33:12',
      compDate: '2025-12-20 14:34:35',
      statusVi: 'Close',
      statusEn: 'Closed',
      statusType: 'yellow',
      noticeVi: 'ĐÃ ĐỒNG Ý YÊU CẦU()',
      noticeEn: 'APPROVED REQUEST()',
      hasCancel: false,
      hasRate: true
    },
    {
      code: '#4670',
      serviceVi: 'ĐĂNG KÝ HỌC LẠI',
      serviceEn: 'RETAKE REGISTRATION',
      regDate: '2025-06-16 16:20:12',
      compDate: '',
      statusVi: 'Đơn đã bị huỷ',
      statusEn: 'Request Cancelled',
      statusType: 'gray',
      noticeVi: '',
      noticeEn: '',
      hasCancel: false,
      hasRate: false
    }
  ]);

  // Modal control states
  const [cancelTarget, setCancelTarget] = useState<HistoryItem | null>(null);
  const [rateTarget, setRateTarget] = useState<HistoryItem | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<HistoryItem | null>(null);
  const [ratingValue, setRatingValue] = useState<number>(5);
  const [ratingComment, setRatingComment] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Active page state for page links
  const [activePage, setActivePage] = useState(1);

  const handleCancelRequest = () => {
    if (!cancelTarget) return;

    // Update the item to cancelled instead of removing it
    setHistoryList(prev => prev.map(item => {
      if (item.code === cancelTarget.code) {
        return {
          ...item,
          statusVi: 'Đơn đã bị huỷ',
          statusEn: 'Request Cancelled',
          statusType: 'gray',
          hasCancel: false
        };
      }
      return item;
    }));
    
    setSuccessMsg(t(`Hủy đơn đăng ký ${cancelTarget.code} thành công.`, `Registration request ${cancelTarget.code} cancelled successfully.`));
    setShowSuccess(true);
    
    setTimeout(() => {
      setCancelTarget(null);
      setShowSuccess(false);
    }, 1800);
  };

  const handleRateSubmit = () => {
    if (!rateTarget) return;

    // Mark as rated (disable action) or show alert
    setSuccessMsg(t(`Cảm ơn bạn đã đánh giá dịch vụ ${rateTarget.code}!`, `Thank you for rating service request ${rateTarget.code}!`));
    setShowSuccess(true);

    setTimeout(() => {
      setRateTarget(null);
      setShowSuccess(false);
      setRatingComment('');
    }, 1800);
  };

  const getServiceDetails = (item: HistoryItem) => {
    const isRetake = item.serviceVi === 'ĐĂNG KÝ HỌC LẠI';
    
    // Default / fallback fields
    let fields: { labelVi: string; labelEn: string; value: string }[] = [];
    let steps: { labelVi: string; labelEn: string; status: 'completed' | 'active' | 'pending' | 'cancelled'; user?: string; time?: string }[] = [];
    let result = '';

    if (isRetake) {
      // Retake fields configuration
      let subjectCode = '7412';
      let subjectName = 'Application Development';
      let fee = '2730000';
      let slot = 'Ca 4 (14:10:00 - 16:10:00)';
      let dayOfWeek = 'Thứ 2';

      if (item.code === '#7008') {
        subjectCode = '7425';
        subjectName = 'Computer Research Project (Pearson Se';
        fee = '5460000';
        slot = 'Ca 1 (07:15:00 - 09:15:00)';
        dayOfWeek = 'Thứ 3,5';
      } else if (item.code === '#7007') {
        subjectCode = '7428';
        subjectName = 'Business Process Support';
        fee = '2730000';
        slot = 'Ca 4 (14:10:00 - 16:10:00)';
        dayOfWeek = 'Thứ 2';
      } else if (item.code === '#7006') {
        subjectCode = '7412';
        subjectName = 'Application Development';
        fee = '2730000';
        slot = 'Ca 2 (09:30:00 - 11:30:00)';
        dayOfWeek = 'Thứ 2,4,6';
      } else if (item.code === '#6817') {
        subjectCode = '7409';
        subjectName = 'Database Design & Development';
        fee = '2730000';
        slot = 'Ca 3 (12:30:00 - 14:30:00)';
        dayOfWeek = 'Thứ 3,5,7';
      } else if (item.code === '#6816') {
        subjectCode = '7408';
        subjectName = 'Software Development Life Cycle';
        fee = '2730000';
        slot = 'Ca 5 (17:00:00 - 19:00:00)';
        dayOfWeek = 'Thứ 7';
      } else if (item.code === '#6815') {
        subjectCode = '7410';
        subjectName = 'Web Design & Development';
        fee = '2730000';
        slot = 'Ca 6 (19:15:00 - 21:15:00)';
        dayOfWeek = 'Thứ 3,5';
      } else if (item.code === '#6369') {
        subjectCode = '7411';
        subjectName = 'Object-Oriented Programming';
        fee = '2730000';
        slot = 'Ca 3 (12:30:00 - 14:30:00)';
        dayOfWeek = 'Thứ 2,4,6';
      } else if (item.code === '#4670') {
        subjectCode = '7412';
        subjectName = 'Application Development';
        fee = '2730000';
        slot = 'Ca 1 (07:15:00 - 09:15:00)';
        dayOfWeek = 'Thứ 2';
      }

      fields = [
        { labelVi: 'Mã môn', labelEn: 'Subject Code', value: subjectCode },
        { labelVi: 'Môn học lại', labelEn: 'Retake Subject', value: subjectName },
        { labelVi: 'Phí học lại', labelEn: 'Retake Fee', value: fee },
        { labelVi: 'Ca sinh viên mong muốn học trong ngày', labelEn: 'Preferred Slot', value: slot },
        { labelVi: 'Ngày sinh viên mong muốn học trong tuần', labelEn: 'Preferred Days', value: dayOfWeek }
      ];

      if (item.statusType === 'gray') {
        steps = [
          { labelVi: 'Chờ xếp lớp', labelEn: 'Pending Allocation', status: 'cancelled' },
          { labelVi: 'Close (Đã xếp lớp)', labelEn: 'Closed (Assigned)', status: 'pending' }
        ];
        result = t('Đơn đã bị huỷ', 'Request Cancelled');
      } else if (item.statusType === 'orange') {
        steps = [
          { labelVi: 'Chờ xếp lớp', labelEn: 'Pending Allocation', status: 'active' },
          { labelVi: 'Close (Đã xếp lớp)', labelEn: 'Closed (Assigned)', status: 'pending' }
        ];
      } else {
        steps = [
          { 
            labelVi: 'Chờ xếp lớp', 
            labelEn: 'Pending Allocation', 
            status: 'completed', 
            user: 'khanhns3', 
            time: item.compDate || '2026-05-04 08:50:25' 
          },
          { 
            labelVi: 'Close (Đã xếp lớp)', 
            labelEn: 'Closed (Assigned)', 
            status: 'completed' 
          }
        ];
      }
    } else {
      // Attendance recovery fields configuration
      let studentId = studentProfile.id;
      let userLogin = studentProfile.username || 'truncn24dtcn088';
      let subject = '7436 - Application Development (20-12';
      let className = 'SE07203';
      let date = '2025-12-20';
      let slot = '3';
      let teacherAccount = 'VuNV35';
      let teacherName = 'Nguyễn Văn Vũ';
      let phone = '0879378668';
      let reason = 'E làm đơn vì lý do e bị hư xe ạ mong thầ';
      let completedTime = '2025-12-20 14:34:35';

      if (item.code === '#6700') {
        subject = '7436 - Application Development (16-03';
        date = '2026-03-16';
        slot = '2';
        teacherAccount = 'luannt22@fe.edu.vn';
        teacherName = 'Nguyễn Thành Luân';
        phone = '0987654321';
        reason = 'Em bị ốm nằm viện có giấy xác nhận ạ.';
        completedTime = '2026-03-16 08:10:24';
      } else if (item.code === '#6663') {
        subject = '7411 - Object-Oriented Programming';
        date = '2026-03-10';
        slot = '4';
        teacherAccount = 'dungnq5@fe.edu.vn';
        teacherName = 'Nguyễn Quốc Dũng';
        phone = '0123456789';
        reason = 'Em đi trễ do kẹt xe nghiêm trọng trên đường Quang Trung.';
        completedTime = '2026-03-10 11:20:41';
      }

      fields = [
        { labelVi: 'Mã số sinh viên', labelEn: 'Student ID', value: studentId },
        { labelVi: 'Student User Login', labelEn: 'Student User Login', value: userLogin },
        { labelVi: 'Môn xin điểm danh', labelEn: 'Subject Name', value: subject },
        { labelVi: 'Lớp xin điểm danh', labelEn: 'Class Name', value: className },
        { labelVi: 'Ngày xin điểm danh', labelEn: 'Date Requested', value: date },
        { labelVi: 'Slot xin điểm danh', labelEn: 'Slot Requested', value: slot },
        { labelVi: 'Account giảng viên', labelEn: 'Teacher Account', value: teacherAccount },
        { labelVi: 'Tên giảng viên', labelEn: 'Teacher Name', value: teacherName },
        { labelVi: 'Số điện thoại', labelEn: 'Phone Number', value: phone },
        { labelVi: 'Lý do', labelEn: 'Reason', value: reason },
        { labelVi: 'File', labelEn: 'Attached File', value: '' }
      ];

      if (item.statusType === 'gray') {
        steps = [
          { labelVi: 'Xác nhận của giảng viên', labelEn: 'Teacher Confirmation', status: 'cancelled' },
          { labelVi: 'Close', labelEn: 'Closed', status: 'pending' }
        ];
        result = t('Đơn đã bị huỷ', 'Request Cancelled');
      } else if (item.statusType === 'orange') {
        steps = [
          { labelVi: 'Xác nhận của giảng viên', labelEn: 'Teacher Confirmation', status: 'active' },
          { labelVi: 'Close', labelEn: 'Closed', status: 'pending' }
        ];
      } else {
        steps = [
          { 
            labelVi: 'Xác nhận của giảng viên', 
            labelEn: 'Teacher Confirmation', 
            status: 'completed', 
            user: teacherAccount.split('@')[0], 
            time: completedTime 
          },
          { 
            labelVi: 'Close', 
            labelEn: 'Closed', 
            status: 'completed' 
          }
        ];
        result = t('Đã đồng ý yêu cầu()', 'Approved Request()');
      }
    }

    return { fields, steps, result };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      <style>{`
        /* --- REGISTRATION HISTORY SERVICE DETAILS MODAL --- */
        .modal-overlay {
          position: fixed !important;
          inset: 0 !important;
          background-color: rgba(0, 0, 0, 0.5) !important;
          backdrop-filter: blur(4px) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          z-index: 9999 !important;
        }

        .details-modal-content {
          max-width: 760px !important;
          width: 95% !important;
          text-align: left !important;
          padding: 28px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 20px !important;
          background-color: #FFFFFF !important;
          border-radius: 16px !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1) !important;
          border: 1px solid #E2E8F0 !important;
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards !important;
          margin: auto !important;
        }

        .details-modal-header {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          border-bottom: 1px solid #E2E8F0 !important;
          padding-bottom: 14px !important;
        }

        .details-modal-title {
          font-size: 15px !important;
          font-weight: 800 !important;
          color: #F37021 !important;
          margin: 0 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
        }

        .details-modal-close-icon {
          background: none !important;
          border: none !important;
          color: #64748B !important;
          cursor: pointer !important;
          padding: 6px !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: all 0.2s !important;
        }

        .details-modal-close-icon:hover {
          background-color: #F8FAFC !important;
          color: #0F172A !important;
        }

        .details-modal-body {
          display: grid !important;
          grid-template-columns: 1.1fr 0.9fr !important;
          gap: 24px !important;
          align-items: start !important;
          width: 100% !important;
          box-sizing: border-box !important;
          max-height: calc(85vh - 140px) !important;
          overflow-y: auto !important;
          padding-right: 8px !important;
        }

        .details-modal-col-left {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 12px !important;
        }

        .details-field-group {
          display: flex !important;
          flex-direction: column !important;
          gap: 6px !important;
        }

        .field-span-2 {
          grid-column: span 2 !important;
        }

        .details-field-label {
          font-size: 11.5px !important;
          font-weight: 700 !important;
          color: #64748B !important;
          text-transform: uppercase !important;
          letter-spacing: 0.3px !important;
          text-align: left !important;
        }

        .details-field-input {
          width: 100% !important;
          padding: 8px 12px !important;
          border: 1px solid #E2E8F0 !important;
          border-radius: 6px !important;
          font-size: 13px !important;
          background-color: #F8FAFC !important;
          color: #1E293B !important;
          font-weight: 600 !important;
          outline: none !important;
          box-sizing: border-box !important;
        }

        .details-modal-col-right {
          display: flex !important;
          flex-direction: column !important;
          gap: 16px !important;
        }

        .details-steps-box {
          background-color: #F8FAFC !important;
          border: 1px solid #E2E8F0 !important;
          border-radius: 8px !important;
          padding: 14px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 10px !important;
        }

        .details-step-row {
          display: flex !important;
          align-items: center !important;
          gap: 10px !important;
          padding: 6px 12px !important;
          border-radius: 6px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          color: #64748B !important;
          background-color: #FFFFFF !important;
          border: 1px solid #E2E8F0 !important;
          flex-wrap: wrap !important;
        }

        .details-step-row.step-completed-green {
          background-color: #ECFDF5 !important;
          border-color: #A7F3D0 !important;
          color: #065F46 !important;
        }

        .details-step-row.step-completed-green .details-step-status-icon {
          color: #10B981 !important;
        }

        .details-step-row.step-active-yellow {
          background-color: #FFFBEB !important;
          border-color: #FDE68A !important;
          color: #92400E !important;
        }

        .details-step-row.step-cancelled-gray {
          background-color: #F3F4F6 !important;
          border-color: #E5E7EB !important;
          color: #9CA3AF !important;
          text-decoration: line-through !important;
        }

        .details-step-num {
          font-size: 10.5px !important;
          font-weight: 800 !important;
          text-transform: uppercase !important;
          background-color: rgba(0, 0, 0, 0.05) !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
        }

        .details-step-status-icon {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .details-step-text {
          flex-grow: 1 !important;
          text-align: left !important;
        }

        .details-step-meta {
          font-size: 10.5px !important;
          color: #64748B !important;
          display: flex !important;
          gap: 8px !important;
          width: 100% !important;
          margin-top: 2px !important;
          font-weight: normal !important;
        }

        .details-results-container {
          display: flex !important;
          flex-direction: column !important;
          gap: 6px !important;
        }

        .details-results-label {
          font-size: 11.5px !important;
          font-weight: 700 !important;
          color: #64748B !important;
          text-transform: uppercase !important;
          letter-spacing: 0.3px !important;
          text-align: left !important;
        }

        .details-results-textarea {
          width: 100% !important;
          padding: 8px 12px !important;
          border: 1px solid #E2E8F0 !important;
          border-radius: 6px !important;
          font-size: 13px !important;
          background-color: #F8FAFC !important;
          color: #1E293B !important;
          font-weight: 500 !important;
          outline: none !important;
          resize: none !important;
          box-sizing: border-box !important;
        }

        .details-modal-footer {
          display: flex !important;
          justify-content: flex-end !important;
          border-top: 1px solid #E2E8F0 !important;
          padding-top: 16px !important;
          margin-top: 8px !important;
        }

        .details-modal-close-btn {
          background-color: #64748B !important;
          color: #FFFFFF !important;
          border: none !important;
          border-radius: 6px !important;
          padding: 8px 20px !important;
          font-size: 13.5px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.2s !important;
        }

        .details-modal-close-btn:hover {
          background-color: #475569 !important;
        }

        /* Dark mode styling overrides */
        html.dark .details-modal-content {
          background-color: #1C2541 !important;
          border-color: #3A506B !important;
        }

        html.dark .details-modal-close-icon:hover {
          background-color: #24305E !important;
        }

        html.dark .details-field-input,
        html.dark .details-results-textarea {
          background-color: #0B132B !important;
          border-color: #3A506B !important;
          color: #F3F4F6 !important;
        }

        html.dark .details-steps-box {
          background-color: #0B132B !important;
          border-color: #3A506B !important;
        }

        html.dark .details-step-row {
          background-color: #1C2541 !important;
          border-color: #3A506B !important;
          color: #9CA3AF !important;
        }

        html.dark .details-step-row.step-completed-green {
          background-color: #064E3B !important;
          border-color: #065F46 !important;
          color: #A7F3D0 !important;
        }

        html.dark .details-step-row.step-active-yellow {
          background-color: #78350F !important;
          border-color: #92400E !important;
          color: #FDE68A !important;
        }

        html.dark .details-step-row.step-cancelled-gray {
          background-color: #1F2937 !important;
          border-color: #374151 !important;
          color: #6B7280 !important;
        }

        @media (max-width: 768px) {
          .details-modal-body {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
      
      {/* Main Container */}
      <main className="dashboard-container">
        
        {/* Title */}
        <h2 className="services-section-title">{t('Dịch vụ đã đăng ký', 'Registered Services')}</h2>

        {/* Warning Debt notice */}
        <div className="warning-banner">
          {t('Sinh viên vui lòng truy cập Debtlist để kiểm tra và thanh toán các công nợ dịch vụ trực tuyến ở trạng thái (Chờ thanh toán)', 'Please access the Debtlist to check and pay any online service debts in (Pending Payment) status')}
        </div>

        {/* History Table */}
        <div className="services-table-wrapper">
          <table className="services-table">
            <thead className="services-thead">
              <tr>
                <th className="services-th">{t('MÃ ĐƠN', 'REQ CODE')}</th>
                <th className="services-th">{t('LOẠI DỊCH VỤ', 'SERVICE TYPE')}</th>
                <th className="services-th">{t('THỜI GIAN ĐĂNG KÝ', 'REGISTRATION TIME')}</th>
                <th className="services-th">{t('THỜI GIAN HOÀN THÀNH', 'COMPLETION TIME')}</th>
                <th className="services-th">{t('TRẠNG THÁI VÀ THÔNG TIN', 'STATUS & INFO')}</th>
                <th className="services-th">{t('THÔNG BÁO', 'NOTICE')}</th>
                <th className="services-th center">{t('HÀNH ĐỘNG', 'ACTION')}</th>
                <th className="services-th center">{t('ĐÁNH GIÁ', 'RATING')}</th>
              </tr>
            </thead>
            <tbody>
              {historyList.map((item) => {
                // Determine row class based on status type
                const rowClass = 
                  item.statusType === 'orange' ? 'tr-red' : 
                  item.statusType === 'gray' ? 'tr-gray' : 'tr-green';
                
                return (
                  <tr key={item.code} className={`services-tr ${rowClass}`}>
                    {/* Mã đơn */}
                    <td className="services-td" style={{ fontWeight: '700' }}>
                      {item.code}
                    </td>
                    
                    {/* Bày dịch vụ */}
                    <td className="services-td" style={{ fontWeight: '600' }}>
                      {t(item.serviceVi, item.serviceEn)}
                    </td>
                    
                    {/* Thời gian đăng ký */}
                    <td className="services-td font-mono" style={{ fontSize: '11.5px' }}>
                      {item.regDate}
                    </td>
                    
                    {/* Thời gian hoàn thành */}
                    <td className="services-td font-mono" style={{ fontSize: '11.5px' }}>
                      {item.compDate || <span style={{ color: '#CBD5E1' }}>—</span>}
                    </td>
                    
                    {/* Thái và thông tin */}
                    <td className="services-td">
                      <button 
                        onClick={() => setSelectedDetail(item)}
                        className={`status-badge ${
                          item.statusType === 'orange' ? 'orange-badge' : 
                          item.statusType === 'gray' ? 'gray-badge' : 'yellow-badge'
                        }`}
                        title={t('Xem chi tiết dịch vụ', 'View service details')}
                      >
                        {t(item.statusVi, item.statusEn)}
                      </button>
                    </td>
                    
                    {/* Thông báo */}
                    <td className="services-td" style={{ fontWeight: '600', fontSize: '11px', color: 'var(--rikkei-blue)' }}>
                      {t(item.noticeVi, item.noticeEn) || <span style={{ color: '#CBD5E1' }}>—</span>}
                    </td>
                    
                    {/* Hành động */}
                    <td className="services-td center">
                      {item.hasCancel ? (
                        <button 
                          onClick={() => setCancelTarget(item)}
                          className="cancel-btn"
                        >
                          {t('Hủy', 'Cancel')}
                        </button>
                      ) : (
                        <span style={{ color: '#E2E8F0' }}>—</span>
                      )}
                    </td>
                    
                    {/* Đánh giá */}
                    <td className="services-td center">
                      {item.hasRate ? (
                        <button 
                          onClick={() => {
                            setRateTarget(item);
                            setRatingValue(5);
                          }}
                          className="rating-btn"
                        >
                          {t('Đánh giá', 'Rate')}
                        </button>
                      ) : (
                        <span style={{ color: '#E2E8F0' }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination-container">
            <button className="pagination-btn">{t('Trước', 'Previous')}</button>
            <span className="pagination-arrows">&lt;&lt;</span>
            <span 
              onClick={() => setActivePage(1)} 
              className={`pagination-page ${activePage === 1 ? 'active' : ''}`}
            >
              1
            </span>
            <span 
              onClick={() => setActivePage(2)} 
              className={`pagination-page ${activePage === 2 ? 'active' : ''}`}
            >
              2
            </span>
            <span 
              onClick={() => setActivePage(3)} 
              className={`pagination-page ${activePage === 3 ? 'active' : ''}`}
            >
              3
            </span>
            <span 
              onClick={() => setActivePage(4)} 
              className={`pagination-page ${activePage === 4 ? 'active' : ''}`}
            >
              4
            </span>
            <span className="pagination-arrows">&gt;&gt;</span>
            <button className="pagination-btn">{t('Kế tiếp', 'Next')}</button>
          </div>
        </div>

      </main>

      {/* Cancellation Confirmation Modal */}
      {cancelTarget && createPortal(
        <div className="modal-overlay" onClick={() => setCancelTarget(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {!showSuccess ? (
              <>
                <div className="modal-icon" style={{ backgroundColor: '#FEF2F2', color: '#EF4444' }}>
                  <Trash2 size={26} />
                </div>
                <h3 className="modal-title">{t('Hủy đơn đăng ký', 'Cancel Registration')}</h3>
                <p className="modal-desc">
                  {t('Bạn có chắc chắn muốn hủy bỏ đơn đăng ký', 'Are you sure you want to cancel the registration request')} <strong>{cancelTarget.code} ({t(cancelTarget.serviceVi, cancelTarget.serviceEn)})</strong> {t('không? Thao tác này không thể hoàn tác.', ' ? This action cannot be undone.')}
                </p>
                <div className="modal-actions">
                  <button onClick={handleCancelRequest} className="modal-btn-confirm" style={{ backgroundColor: '#E11D48' }}>
                    {t('Đồng ý hủy', 'Confirm Cancel')}
                  </button>
                  <button onClick={() => setCancelTarget(null)} className="modal-btn-cancel">
                    {t('Đóng lại', 'Close')}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="modal-icon" style={{ backgroundColor: '#ECFDF5', color: '#10B981' }}>
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="modal-title" style={{ color: '#065F46' }}>{t('Đã hủy đơn!', 'Cancelled!')}</h3>
                <p className="modal-desc" style={{ marginBottom: 0 }}>
                  {successMsg}
                </p>
              </>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* Evaluation Rating Modal */}
      {rateTarget && createPortal(
        <div className="modal-overlay" onClick={() => setRateTarget(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {!showSuccess ? (
              <>
                <div className="modal-icon" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>
                  <Star size={26} fill="currentColor" />
                </div>
                <h3 className="modal-title">{t('Đánh giá chất lượng dịch vụ', 'Rate Service Quality')}</h3>
                <p className="modal-desc">
                  {t('Vui lòng đánh giá mức độ hài lòng về dịch vụ', 'Please rate your satisfaction for service')} <strong>{t(rateTarget.serviceVi, rateTarget.serviceEn)} ({t('Đơn', 'Req')} {rateTarget.code})</strong>.
                </p>
                
                {/* 5-Star Row */}
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={28}
                      onClick={() => setRatingValue(star)}
                      className={`star-icon ${star <= ratingValue ? 'filled' : ''}`}
                      fill={star <= ratingValue ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>

                <div style={{ margin: '16px 0' }}>
                  <textarea
                    rows={3}
                    value={ratingComment}
                    onChange={(e) => setRatingComment(e.target.value)}
                    placeholder={t('Nhập ý kiến đóng góp của bạn tại đây...', 'Enter your feedback here...')}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontSize: '12.5px',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                </div>

                <div className="modal-actions">
                  <button onClick={handleRateSubmit} className="modal-btn-confirm">
                    {t('Gửi đánh giá', 'Submit Rating')}
                  </button>
                  <button onClick={() => setRateTarget(null)} className="modal-btn-cancel">
                    {t('Hủy bỏ', 'Cancel')}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="modal-icon" style={{ backgroundColor: '#ECFDF5', color: '#10B981' }}>
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="modal-title" style={{ color: '#065F46' }}>{t('Gửi thành công!', 'Submitted!')}</h3>
                <p className="modal-desc" style={{ marginBottom: 0 }}>
                  {successMsg}
                </p>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
      {/* Details Modal */}
      {selectedDetail && createPortal(
        (() => {
          const details = getServiceDetails(selectedDetail);
          return (
            <div className="modal-overlay" onClick={() => setSelectedDetail(null)}>
              <div className="modal-content details-modal-content" onClick={(e) => e.stopPropagation()}>
                
                {/* Header */}
                <div className="details-modal-header">
                  <h3 className="details-modal-title">
                    {t('CHI TIẾT DỊCH VỤ', 'SERVICE DETAILS')}
                  </h3>
                  <button className="details-modal-close-icon" onClick={() => setSelectedDetail(null)}>
                    <X size={20} />
                  </button>
                </div>

                {/* Body */}
                <div className="details-modal-body">
                  
                  {/* Left Column - Form Fields */}
                  <div className="details-modal-col-left">
                    {details.fields.map((field, idx) => {
                      const isFullWidth = 
                        field.labelVi === 'Môn xin điểm danh' || 
                        field.labelVi === 'Môn học lại' || 
                        field.labelVi === 'Lý do' || 
                        field.labelVi === 'Account giảng viên' || 
                        field.labelVi === 'File';

                      return (
                        <div key={idx} className={`details-field-group ${isFullWidth ? 'field-span-2' : ''}`}>
                          <label className="details-field-label">
                            {t(field.labelVi, field.labelEn)}
                          </label>
                          <input 
                            type="text" 
                            value={field.value} 
                            readOnly 
                            className="details-field-input" 
                            placeholder="—"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column - Steps workflow tracker */}
                  <div className="details-modal-col-right">
                    <div className="details-steps-box">
                      {details.steps.map((step, idx) => {
                        let stepClass = '';
                        if (step.status === 'active') stepClass = 'step-active-yellow';
                        else if (step.status === 'completed') stepClass = 'step-completed-green';
                        else if (step.status === 'cancelled') stepClass = 'step-cancelled-gray';

                        return (
                          <div key={idx} className={`details-step-row ${stepClass}`}>
                            {/* Step number label */}
                            <span className="details-step-num">Step {idx + 1}</span>
                            
                            {/* Status Icon */}
                            {step.status === 'completed' && (
                              <span className="details-step-status-icon">
                                <Check size={16} strokeWidth={3} />
                              </span>
                            )}
                            {step.status === 'cancelled' && (
                              <span className="details-step-status-icon" style={{ color: '#EF4444' }}>
                                <X size={16} strokeWidth={3} />
                              </span>
                            )}
                            
                            {/* Step Name */}
                            <span className="details-step-text">
                              {t(step.labelVi, step.labelEn)}
                            </span>

                            {/* Metadata (Processor, Time) */}
                            {(step.user || step.time) && (
                              <div className="details-step-meta">
                                {step.user && <span className="details-step-meta-user">{step.user}</span>}
                                {step.time && <span className="details-step-meta-time">{step.time}</span>}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Results Textarea */}
                    <div className="details-results-container">
                      <span className="details-results-label">
                        {t('Kết quả', 'Result')}
                      </span>
                      <textarea
                        readOnly
                        value={details.result}
                        className="details-results-textarea"
                        rows={4}
                        placeholder=""
                      />
                    </div>
                  </div>

                </div>

                {/* Footer close button */}
                <div className="details-modal-footer">
                  <button className="details-modal-close-btn" onClick={() => setSelectedDetail(null)}>
                    {t('Close', 'Close')}
                  </button>
                </div>

              </div>
            </div>
          );
        })(),
        document.body
      )}

    </div>
  );
};
