import { useState } from 'react';
import { ClipboardList, CheckCircle2, ArrowLeft, Upload, AlertCircle, Plus, X } from 'lucide-react';

interface ServiceItem {
  stt: number;
  task: string;
  desc: string;
}

const TEACHERS: Record<string, string> = {
  'luannt22@fe.edu.vn': 'Nguyễn Thành Luân',
  'dungnq5@fe.edu.vn': 'Nguyễn Quốc Dũng',
  'khanhpg3@fe.edu.vn': 'Phạm Gia Khánh',
  'phuonglh12@fe.edu.vn': 'Lê Hồng Phương'
};

const SUBJECTS = [
  '[10587] SD102 - Web Design',
  '[10588] SD103 - Programming Fundamentals',
  '[10589] SD104 - Database Management Systems',
  '[10590] SD105 - Software Engineering',
  '[10591] SD106 - Mobile Application Development'
];

const RETAKE_SUBJECTS = [
  'SPRING 2026 - 7408 - Software Development Life Cycle',
  'SPRING 2026 - 7409 - Database Design & Development',
  'SPRING 2026 - 7410 - Web Design & Development',
  'SPRING 2026 - 7411 - Object-Oriented Programming',
  'SPRING 2026 - 7412 - Application Development'
];

const CLASSES = ['WD18301', 'WD18302', 'WD18303', 'WD18304'];
const SLOTS = [
  'Slot 1 (07:30 - 09:30)',
  'Slot 2 (09:40 - 11:40)',
  'Slot 3 (12:30 - 14:30)',
  'Slot 4 (14:40 - 16:40)',
  'Slot 5 (17:00 - 19:00)',
  'Slot 6 (19:10 - 21:10)'
];

const RETAKE_SLOTS = [
  'Ca 1 (07:15:00 - 09:15:00)',
  'Ca 2 (09:30:00 - 11:30:00)',
  'Ca 3 (12:30:00 - 14:30:00)',
  'Ca 4 (14:45:00 - 16:45:00)',
  'Ca 5 (17:00:00 - 19:00:00)',
  'Ca 6 (19:15:00 - 21:15:00)'
];

const DATES = ['2026-06-23', '2026-06-22', '2026-06-21', '2026-06-20', '2026-06-19'];

const INFO_CATEGORIES = [
  'Họ tên',
  'Ngày sinh',
  'Số CMND/CCCD',
  'Số điện thoại',
  'Địa chỉ thường trú',
  'Địa chỉ Email cá nhân',
  'Họ tên phụ huynh',
  'Số điện thoại phụ huynh'
];

export const OnlineServices = () => {
  const [view, setView] = useState<'list' | 'attendance-recovery' | 'student-card-reissue' | 'change-info' | 'withdraw' | 'retake' | 'defer'>('list');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // --- Attendance Recovery Form States ---
  const [subject, setSubject] = useState('');
  const [classCode, setClassCode] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [teacherAccount, setTeacherAccount] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [fileName, setFileName] = useState('');
  
  // --- Student Card Reissue Form States ---
  const [cardReason, setCardReason] = useState('');
  const [cardPhone, setCardPhone] = useState('');
  const [cardUnit, setCardUnit] = useState('đồng');
  const [cardResult, setCardResult] = useState('Nhận trực tiếp tại ĐVSV phòng');
  const [cardFee] = useState('100000');
  const [cardPhotoName, setCardPhotoName] = useState('');

  // --- Change Info Form States ---
  const [infoCategory, setInfoCategory] = useState('Họ tên');
  const [addedCategories, setAddedCategories] = useState<string[]>(['Họ tên']);
  const [changeNotes, setChangeNotes] = useState('');
  const [changeFileName, setChangeFileName] = useState('');

  // --- Withdraw Form States ---
  const [withdrawReason, setWithdrawReason] = useState('');
  const [withdrawStatus, setWithdrawStatus] = useState('Hoàn thành');
  const [withdrawPhone, setWithdrawPhone] = useState('');
  const [withdrawFileName, setWithdrawFileName] = useState('');

  // --- Retake Form States ---
  const [retakeSubject, setRetakeSubject] = useState('SPRING 2026 - 7408 - Software Development Life Cycle');
  const [retakeSlot, setRetakeSlot] = useState('Ca 1 (07:15:00 - 09:15:00)');
  const [retakeDays, setRetakeDays] = useState<Record<string, boolean>>({
    'Thứ 2': false,
    'Thứ 3': false,
    'Thứ 4': false,
    'Thứ 5': false,
    'Thứ 6': false,
    'Thứ 7': false
  });
  const [retakeFallbackOption, setRetakeFallbackOption] = useState('');
  const [retakeFee] = useState('2.730.000 đ');

  // --- Defer Form States ---
  const [deferSubject, setDeferSubject] = useState('');
  const [deferReturnDate, setDeferReturnDate] = useState('');
  const [deferReason, setDeferReason] = useState('');
  const [deferProposal, setDeferProposal] = useState('');
  const [deferPhone, setDeferPhone] = useState('');
  const [deferDocName, setDeferDocName] = useState('');
  const [deferFileName, setDeferFileName] = useState('');
  const [deferSendMethod, setDeferSendMethod] = useState('Nhận trực tiếp tại phòng ĐVSV');
  const [deferReceiveMethod, setDeferReceiveMethod] = useState('Nhận trực tiếp tại phòng ĐVSV');
  const [deferAddress, setDeferAddress] = useState('');
  const [deferFee] = useState('0');

  // Validation & Submit State
  const [validationError, setValidationError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Mock list of services
  const services: ServiceItem[] = [
    {
      stt: 1,
      task: 'ĐĂNG KÝ KHÔI PHỤC ĐIỂM DANH',
      desc: ''
    },
    {
      stt: 2,
      task: 'ĐĂNG KÝ CẤP LẠI THẺ SINH VIÊN',
      desc: 'ĐĂNG KÝ CẤP LẠI THẺ SINH VIÊN BỊ MẤT HOẶC HỎNG'
    },
    {
      stt: 3,
      task: 'ĐĂNG KÝ THAY ĐỔI THÔNG TIN',
      desc: ''
    },
    {
      stt: 4,
      task: 'ĐĂNG KÝ THÔI HỌC',
      desc: ''
    },
    {
      stt: 5,
      task: 'ĐĂNG KÝ HỌC LẠI',
      desc: 'ĐĂNG KÝ HỌC LẠI CHO SINH VIÊN TRƯỢT MÔN HỌC'
    },
    {
      stt: 6,
      task: 'ĐĂNG KÝ TẠM THỜI NGHỈ HỌC DÀI HẠN',
      desc: 'DỊCH VỤ ÁP DỤNG CHO TRƯỜP HỢP SV CẦN TẠM DỪNG HỌC KHI LỚP HỌC CHƯA KẾT THÚC'
    },
    {
      stt: 7,
      task: 'ĐĂNG KÝ VÀ DỊCH VỤ KHÁC',
      desc: 'SỬ DỤNG CHUNG CHO CÁC DỊCH VỤ KHÔNG BỊ MẤT PHÍ NHƯ: THẮC MẮC, KHIẾU NẠI,...'
    }
  ];

  const handleRegisterClick = (service: ServiceItem) => {
    setValidationError('');
    setSubmitSuccess(false);
    
    if (service.stt === 1) {
      setView('attendance-recovery');
      resetAttendanceForm();
    } else if (service.stt === 2) {
      setView('student-card-reissue');
      resetCardForm();
    } else if (service.stt === 3) {
      setView('change-info');
      resetChangeInfoForm();
    } else if (service.stt === 4) {
      setView('withdraw');
      resetWithdrawForm();
    } else if (service.stt === 5) {
      setView('retake');
      resetRetakeForm();
    } else if (service.stt === 6) {
      setView('defer');
      resetDeferForm();
    } else {
      setSelectedService(service);
      setShowSuccessModal(false);
    }
  };

  const resetAttendanceForm = () => {
    setSubject('');
    setClassCode('');
    setDate('');
    setSlot('');
    setTeacherAccount('');
    setTeacherName('');
    setPhone('');
    setReason('');
    setFileName('');
  };

  const resetCardForm = () => {
    setCardReason('');
    setCardPhone('');
    setCardUnit('đồng');
    setCardResult('Nhận trực tiếp tại ĐVSV phòng');
    setCardPhotoName('');
  };

  const resetChangeInfoForm = () => {
    setInfoCategory('Họ tên');
    setAddedCategories(['Họ tên']);
    setChangeNotes('');
    setChangeFileName('');
  };

  const resetWithdrawForm = () => {
    setWithdrawReason('');
    setWithdrawStatus('Hoàn thành');
    setWithdrawPhone('');
    setWithdrawFileName('');
  };

  const resetRetakeForm = () => {
    setRetakeSubject('SPRING 2026 - 7408 - Software Development Life Cycle');
    setRetakeSlot('Ca 1 (07:15:00 - 09:15:00)');
    setRetakeDays({
      'Thứ 2': false,
      'Thứ 3': false,
      'Thứ 4': false,
      'Thứ 5': false,
      'Thứ 6': false,
      'Thứ 7': false
    });
    setRetakeFallbackOption('');
  };

  const resetDeferForm = () => {
    setDeferSubject('');
    setDeferReturnDate('');
    setDeferReason('');
    setDeferProposal('');
    setDeferPhone('');
    setDeferDocName('');
    setDeferFileName('');
    setDeferSendMethod('Nhận trực tiếp tại phòng ĐVSV');
    setDeferReceiveMethod('Nhận trực tiếp tại phòng ĐVSV');
    setDeferAddress('');
  };

  const handleTeacherChange = (email: string) => {
    setTeacherAccount(email);
    setTeacherName(TEACHERS[email] || '');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleCardFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCardPhotoName(e.target.files[0].name);
    }
  };

  const handleInfoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setChangeFileName(e.target.files[0].name);
    }
  };

  const handleWithdrawFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setWithdrawFileName(e.target.files[0].name);
    }
  };

  const handleDeferFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDeferFileName(e.target.files[0].name);
    }
  };

  const handleAddCategory = () => {
    if (infoCategory && !addedCategories.includes(infoCategory)) {
      setAddedCategories([...addedCategories, infoCategory]);
    }
  };

  const handleRemoveCategory = (catToRemove: string) => {
    setAddedCategories(addedCategories.filter(cat => cat !== catToRemove));
  };

  const handleDayCheckboxChange = (day: string) => {
    setRetakeDays({
      ...retakeDays,
      [day]: !retakeDays[day]
    });
  };

  const handleAttendanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !classCode || !date || !slot || !teacherAccount || !phone || !reason) {
      setValidationError('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
      return;
    }
    setValidationError('');
    setSubmitSuccess(true);
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardReason || !cardPhone || !cardUnit || !cardResult || !cardPhotoName) {
      setValidationError('Vui lòng điền đầy đủ thông tin vào các ô trống bắt buộc (*)');
      return;
    }
    setValidationError('');
    setSubmitSuccess(true);
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addedCategories.length === 0) {
      setValidationError('Vui lòng lựa chọn ít nhất một thông tin cần thay đổi');
      return;
    }
    if (!changeNotes) {
      setValidationError('Vui lòng điền đầy đủ thông tin vào các ô trống bắt buộc (*)');
      return;
    }
    setValidationError('');
    setSubmitSuccess(true);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawReason || !withdrawPhone) {
      setValidationError('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
      return;
    }
    setValidationError('');
    setSubmitSuccess(true);
  };

  const handleRetakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!retakeSubject || !retakeSlot || !retakeFallbackOption) {
      setValidationError('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
      return;
    }
    setValidationError('');
    setSubmitSuccess(true);
  };

  const handleDeferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deferReturnDate || !deferReason || !deferProposal || !deferPhone || !deferDocName || !deferFileName) {
      setValidationError('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
      return;
    }
    if (deferReceiveMethod === 'Gửi chuyển phát nhanh về địa chỉ nhà' && !deferAddress) {
      setValidationError('Vui lòng nhập địa chỉ nhận hồ sơ');
      return;
    }
    setValidationError('');
    setSubmitSuccess(true);
  };

  const handleConfirmModalRegistration = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setSelectedService(null);
      setShowSuccessModal(false);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      
      {/* Main Content Area */}
      <main className="dashboard-container">
        
        {view === 'list' && (
          <>
            {/* Page Title */}
            <h2 className="services-section-title">Danh sách các dịch vụ trực tuyến</h2>

            {/* Table Container */}
            <div className="services-table-wrapper">
              <table className="services-table">
                <thead className="services-thead">
                  <tr>
                    <th className="services-th center">STT</th>
                    <th className="services-th">Nhiệm vụ</th>
                    <th className="services-th">Mô tả</th>
                    <th className="services-th center">Đăng ký</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((item) => (
                    <tr key={item.stt} className="services-tr">
                      <td className="services-td center services-td stt">{item.stt}</td>
                      <td className="services-td services-td task-name">{item.task}</td>
                      <td className="services-td services-td desc">
                        {item.desc || <span style={{ color: '#E2E8F0', fontStyle: 'italic' }}>—</span>}
                      </td>
                      <td className="services-td center">
                        <button 
                          onClick={() => handleRegisterClick(item)}
                          className="register-btn"
                        >
                          Đăng ký
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="pagination-container">
                <button className="pagination-btn">Trước</button>
                <span className="pagination-arrows">&lt;&lt;</span>
                <span className="pagination-arrows">&gt;&gt;</span>
                <button className="pagination-btn">Kế tiếp</button>
              </div>
            </div>
          </>
        )}

        {view === 'attendance-recovery' && (
          /* Attendance Recovery Form View */
          <div className="recovery-form-wrapper">
            
            {/* Navigation back */}
            <button onClick={() => setView('list')} className="recovery-back-btn">
              <ArrowLeft size={16} />
              <span>Quay lại danh sách</span>
            </button>

            {/* Title Section */}
            <div className="recovery-title-section">
              <h2 className="recovery-form-title">ĐĂNG KÝ KHÔI PHỤC ĐIỂM DANH</h2>
              <p className="recovery-form-subtitle">
                YOU ARE REQUIRED TO FULFILL BLANK BOXES BELOW TO FINISH YOUR REQUEST AND ATTACH SUPPORTING DOCUMENTS (IF ANY) BEFORE SUBMITTING THIS FORM
              </p>
            </div>

            {submitSuccess ? (
              <div className="recovery-success-box">
                <div className="recovery-success-icon-wrapper">
                  <CheckCircle2 size={48} className="text-emerald-500" />
                </div>
                <h3 className="recovery-success-title">Đăng ký dịch vụ thành công!</h3>
                <p className="recovery-success-desc">
                  Yêu cầu khôi phục điểm danh môn <strong>{subject}</strong> lớp <strong>{classCode}</strong> của bạn đã được ghi nhận thành công và gửi tới Ban Đào Tạo.
                </p>
                <p className="recovery-success-notice">
                  ⚠️ Lưu ý: Vui lòng nhắc giảng viên <strong>{teacherName}</strong> xác nhận yêu cầu này để phòng đào tạo xử lý tiếp.
                </p>
                <button onClick={() => setView('list')} className="recovery-success-back-btn">
                  Trở lại Dịch vụ trực tuyến
                </button>
              </div>
            ) : (
              <form onSubmit={handleAttendanceSubmit} className="recovery-form-element">
                
                {/* Error Banner */}
                {validationError && (
                  <div className="recovery-validation-banner">
                    <AlertCircle size={18} />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Top Info Grid */}
                <div className="recovery-summary-grid">
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">DỊCH VỤ</div>
                    <div className="recovery-summary-badge">Đăng ký khôi phục điểm danh</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">KỲ ĐỢT DỊCH VỤ:</div>
                    <div className="recovery-summary-value-box">FALL 2023</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">TRẠNG THÁI SINH VIÊN</div>
                    <div className="recovery-summary-value-box">HL</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">SỐ DƯ</div>
                    <div className="recovery-summary-value-box">VND 0 đ</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">NGÀNH HỌC</div>
                    <div className="recovery-summary-value-box">Lập trình máy tính</div>
                  </div>
                </div>

                {/* Main Form Fields Layout */}
                <div className="recovery-fields-card">
                  
                  {/* Row 1: Môn xin điểm danh */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Môn xin điểm danh (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <select 
                        value={subject} 
                        onChange={(e) => setSubject(e.target.value)} 
                        className="recovery-select-element"
                      >
                        <option value="">-- Chọn môn học --</option>
                        {SUBJECTS.map(subj => (
                          <option key={subj} value={subj}>{subj}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Lớp xin điểm danh */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Lớp xin điểm danh (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <select 
                        value={classCode} 
                        onChange={(e) => setClassCode(e.target.value)} 
                        className="recovery-select-element"
                      >
                        <option value="">-- Chọn lớp học --</option>
                        {CLASSES.map(cls => (
                          <option key={cls} value={cls}>{cls}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Ngày xin điểm danh */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Ngày xin điểm danh (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <select 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        className="recovery-select-element"
                      >
                        <option value="">-- Chọn ngày --</option>
                        {DATES.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Slot xin điểm danh */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Slot xin điểm danh (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <select 
                        value={slot} 
                        onChange={(e) => setSlot(e.target.value)} 
                        className="recovery-select-element"
                      >
                        <option value="">-- Chọn ca học --</option>
                        {SLOTS.map(sl => (
                          <option key={sl} value={sl}>{sl}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Account Giảng viên */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Account Giảng viên (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <select 
                        value={teacherAccount} 
                        onChange={(e) => handleTeacherChange(e.target.value)} 
                        className="recovery-select-element"
                      >
                        <option value="">-- Chọn tài khoản giảng viên --</option>
                        {Object.keys(TEACHERS).map(email => (
                          <option key={email} value={email}>{email}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 6: Tên Giảng viên */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Tên Giảng viên (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <input 
                        type="text" 
                        value={teacherName} 
                        readOnly 
                        placeholder="Tự động hiển thị khi chọn Account"
                        className="recovery-input-element disabled-bg"
                      />
                    </div>
                  </div>

                  {/* Row 7: Số điện thoại */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Số điện thoại (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <input 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="Nhập số điện thoại của bạn"
                        className="recovery-input-element"
                      />
                    </div>
                  </div>

                  {/* Row 8: Lý do */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Lý do (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <textarea 
                        value={reason} 
                        onChange={(e) => setReason(e.target.value.slice(0, 500))} 
                        placeholder="Vui lòng ghi rõ yêu cầu cần xử lý"
                        className="recovery-textarea-element"
                      />
                      <div className="recovery-char-counter">
                        {reason.length} / 500 ký tự
                      </div>
                    </div>
                  </div>

                  {/* Row 9: Phí dịch vụ */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Phí dịch vụ
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <input 
                        type="text" 
                        value="VND 0 đ" 
                        readOnly 
                        className="recovery-input-element disabled-bg"
                      />
                    </div>
                  </div>

                  {/* Row 10: Tài liệu đính kèm */}
                  <div className="recovery-field-row" style={{ borderBottom: 'none' }}>
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Tài liệu đính kèm
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <div className="recovery-file-upload-container">
                        <input 
                          type="file" 
                          id="file-attachment" 
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                        <div className="recovery-file-info-row">
                          <span className="recovery-file-path-input">
                            {fileName || 'Chưa có tệp nào được chọn'}
                          </span>
                          <label htmlFor="file-attachment" className="recovery-file-browse-btn">
                            <Upload size={14} style={{ marginRight: 6 }} />
                            Browse
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Important Notes */}
                <div className="recovery-notes-box">
                  <div className="recovery-notes-title">Lưu ý:</div>
                  <ul className="recovery-notes-list">
                    <li>1. Sinh viên chỉ được đăng ký 1 lần/ môn/ kỳ trong vòng 2 ngày kể từ khi không được điểm danh.</li>
                    <li>2. Khi đăng ký dịch vụ thành công, bạn vui lòng nhắc giảng viên xác nhận để phòng đào tạo xử lý tiếp.</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="recovery-form-actions">
                  <button type="submit" className="recovery-btn-submit">
                    SUBMIT
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

        {view === 'student-card-reissue' && (
          /* Student Card Reissue Form View */
          <div className="recovery-form-wrapper">
            
            {/* Navigation back */}
            <button onClick={() => setView('list')} className="recovery-back-btn">
              <ArrowLeft size={16} />
              <span>Quay lại danh sách</span>
            </button>

            {/* Title Section */}
            <div className="recovery-title-section">
              <h2 className="recovery-form-title">HỌC KỲ XUÂN 2026 (1/2026 - 6/2026)</h2>
              <p className="recovery-form-subtitle">
                BẠN CẦN ĐIỀN ĐẦY ĐỦ THÔNG TIN VÀO CÁC Ô TRỐNG BÊN DƯỚI ĐỂ HOÀN TẤT YÊU CẦU VÀ ĐÍNH KÈM CÁC TÀI LIỆU HỖ TRỢ (NẾU CÓ) TRƯỚC KHI GỬI BIỂU MẪU NÀY.
              </p>
            </div>

            {submitSuccess ? (
              <div className="recovery-success-box">
                <div className="recovery-success-icon-wrapper">
                  <CheckCircle2 size={48} className="text-emerald-500" />
                </div>
                <h3 className="recovery-success-title">Nộp yêu cầu thành công!</h3>
                <p className="recovery-success-desc">
                  Yêu cầu cấp lại thẻ Sinh viên của bạn đã được tiếp nhận. Phí dịch vụ: <strong>{Number(cardFee).toLocaleString()} đ</strong>.
                </p>
                <p className="recovery-success-notice">
                  ⚠️ Lưu ý: Kết quả xử lý thẻ sinh viên sẽ được phòng ĐVSV cập nhật. Vui lòng chuẩn bị lệ phí khi nhận thẻ.
                </p>
                <button onClick={() => setView('list')} className="recovery-success-back-btn">
                  Trở lại Dịch vụ trực tuyến
                </button>
              </div>
            ) : (
              <form onSubmit={handleCardSubmit} className="recovery-form-element">
                
                {/* Error Banner */}
                {validationError && (
                  <div className="recovery-validation-banner">
                    <AlertCircle size={18} />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Top Info Grid */}
                <div className="recovery-summary-grid">
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">NHIỆM VỤ</div>
                    <div className="recovery-summary-badge">Học kỳ Spring 2026 (1/2026 - 6</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">KỲ BẢO VỆ:</div>
                    <div className="recovery-summary-value-box">SPRING 2026</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">TÌNH THÁI SINH VIÊN</div>
                    <div className="recovery-summary-value-box">HL</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">SỐ DƯ</div>
                    <div className="recovery-summary-value-box">VND 0 đ</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">NGÀNH HỌC</div>
                    <div className="recovery-summary-value-box">Lập trình máy tính</div>
                  </div>
                </div>

                {/* Main Form Fields Layout */}
                <div className="recovery-fields-card">
                  
                  {/* Row 1: Lý do */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Lý do (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <textarea 
                        value={cardReason} 
                        onChange={(e) => setCardReason(e.target.value.slice(0, 500))} 
                        placeholder="Vui lòng xác định yêu cầu cần xử lý"
                        className="recovery-textarea-element"
                      />
                      <div className="recovery-char-counter">
                        {cardReason.length} / 500 ký tự
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Số điện thoại Sinh viên */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Số điện thoại Sinh viên(*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <input 
                        type="tel" 
                        value={cardPhone} 
                        onChange={(e) => setCardPhone(e.target.value)} 
                        placeholder="Nhập số điện thoại sinh viên"
                        className="recovery-input-element"
                      />
                    </div>
                  </div>

                  {/* Row 3: o (*) */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <select 
                        value={cardUnit} 
                        onChange={(e) => setCardUnit(e.target.value)} 
                        className="recovery-select-element"
                      >
                        <option value="đồng">đồng</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Kết quả nhận được biểu thức */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Kết quả nhận được biểu thức (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <select 
                        value={cardResult} 
                        onChange={(e) => setCardResult(e.target.value)} 
                        className="recovery-select-element"
                      >
                        <option value="Nhận trực tiếp tại ĐVSV phòng">Nhận trực tiếp tại ĐVSV phòng</option>
                        <option value="Gửi bưu điện về địa chỉ nhà">Gửi bưu điện về địa chỉ nhà</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Phí dịch vụ */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> phí dịch vụ
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <input 
                        type="text" 
                        value={cardFee} 
                        readOnly 
                        className="recovery-input-element disabled-bg"
                      />
                    </div>
                  </div>

                  {/* Row 6: Ảnh hướng kèm */}
                  <div className="recovery-field-row" style={{ borderBottom: 'none' }}>
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Ảnh hướng kèm (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <div className="recovery-file-upload-container">
                        <input 
                          type="file" 
                          id="card-photo-attachment" 
                          onChange={handleCardFileChange}
                          accept="image/*"
                          style={{ display: 'none' }}
                        />
                        <div className="recovery-file-info-row">
                          <span className="recovery-file-path-input">
                            {cardPhotoName || 'Chọn tệp'}
                          </span>
                          <label htmlFor="card-photo-attachment" className="recovery-file-browse-btn">
                            <Upload size={14} style={{ marginRight: 6 }} />
                            Browse
                          </label>
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748B', marginTop: '6px', fontStyle: 'italic' }}>
                          Sinh viên sử dụng thẻ ảnh 3x4, chụp trong 6 tháng gần nhất
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="recovery-form-actions">
                  <button type="submit" className="recovery-btn-submit" style={{ padding: '10px 50px' }}>
                    NỘP
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

        {view === 'change-info' && (
          /* Change Info Form View */
          <div className="recovery-form-wrapper">
            
            {/* Navigation back */}
            <button onClick={() => setView('list')} className="recovery-back-btn">
              <ArrowLeft size={16} />
              <span>Quay lại danh sách</span>
            </button>

            {/* Title Section */}
            <div className="recovery-title-section">
              <h2 className="recovery-form-title">ĐĂNG KÝ THAY ĐỔI THÔNG TIN</h2>
              <p className="recovery-form-subtitle">
                YOU ARE REQUIRED TO FULFILL BLANK BOXES BELOW TO FINISH YOUR REQUEST AND ATTACH SUPPORTING DOCUMENTS (IF ANY) BEFORE SUBMITTING THIS FORM
              </p>
            </div>

            {submitSuccess ? (
              <div className="recovery-success-box">
                <div className="recovery-success-icon-wrapper">
                  <CheckCircle2 size={48} className="text-emerald-500" />
                </div>
                <h3 className="recovery-success-title">Nộp đơn thành công!</h3>
                <p className="recovery-success-desc">
                  Yêu cầu thay đổi thông tin: <strong>{addedCategories.join(', ')}</strong> của bạn đã được ghi nhận thành công và chuyển đến phòng đào tạo.
                </p>
                <p className="recovery-success-notice">
                  ⚠️ Lưu ý: Ban đào tạo sẽ liên hệ với bạn qua email/điện thoại nếu cần đối chiếu tài liệu gốc.
                </p>
                <button onClick={() => setView('list')} className="recovery-success-back-btn">
                  Trở lại Dịch vụ trực tuyến
                </button>
              </div>
            ) : (
              <form onSubmit={handleInfoSubmit} className="recovery-form-element">
                
                {/* Error Banner */}
                {validationError && (
                  <div className="recovery-validation-banner">
                    <AlertCircle size={18} />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Top Info Grid */}
                <div className="recovery-summary-grid">
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">DỊCH VỤ</div>
                    <div className="recovery-summary-badge">Đăng ký thay đổi thông tin</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">KỲ ĐỢT DỊCH VỤ:</div>
                    <div className="recovery-summary-value-box">FALL 2023</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">TRẠNG THÁI SINH VIÊN</div>
                    <div className="recovery-summary-value-box">HL</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">SỐ DƯ</div>
                    <div className="recovery-summary-value-box">VND 0 đ</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">NGÀNH HỌC</div>
                    <div className="recovery-summary-value-box">Lập trình máy tính</div>
                  </div>
                </div>

                {/* Categories Selector */}
                <div style={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '10px', 
                  padding: '20px', 
                  marginBottom: '20px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '12px' }}>
                    Lựa chọn thông tin cần thay đổi:
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <select 
                      value={infoCategory} 
                      onChange={(e) => setInfoCategory(e.target.value)} 
                      style={{ 
                        padding: '8px 12px', 
                        fontSize: '13px', 
                        border: '1px solid #CBD5E1', 
                        borderRadius: '4px',
                        minWidth: '240px'
                      }}
                    >
                      {INFO_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <button 
                      type="button" 
                      onClick={handleAddCategory} 
                      style={{ 
                        backgroundColor: 'var(--primary)', 
                        color: '#FFFFFF', 
                        border: 'none', 
                        padding: '8px 24px', 
                        borderRadius: '4px', 
                        fontWeight: 700, 
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'var(--transition-smooth)'
                      }}
                      className="register-btn"
                    >
                      <Plus size={14} />
                      ADD
                    </button>
                  </div>

                  {/* Active Tags */}
                  {addedCategories.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                      {addedCategories.map(cat => (
                        <span 
                          key={cat} 
                          style={{ 
                            backgroundColor: '#EFF6FF', 
                            color: '#1E40AF', 
                            border: '1px solid #BFDBFE', 
                            borderRadius: '20px', 
                            padding: '4px 12px', 
                            fontSize: '12px', 
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          {cat}
                          <button 
                            type="button" 
                            onClick={() => handleRemoveCategory(cat)}
                            style={{ 
                              background: 'none', 
                              border: 'none', 
                              color: '#1E40AF', 
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              padding: 0
                            }}
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Main Form Fields Layout */}
                <div className="recovery-fields-card">
                  
                  {/* Row 1: Ghi chú */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Ghi chú (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <textarea 
                        value={changeNotes} 
                        onChange={(e) => setChangeNotes(e.target.value.slice(0, 500))} 
                        placeholder="Vui lòng ghi rõ yêu cầu cần xử lý"
                        className="recovery-textarea-element"
                      />
                      <div className="recovery-char-counter">
                        {changeNotes.length} / 500 ký tự
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Phí dịch vụ */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Phí dịch vụ
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <input 
                        type="text" 
                        value="0" 
                        readOnly 
                        className="recovery-input-element disabled-bg"
                      />
                    </div>
                  </div>

                  {/* Row 3: Tài liệu đính kèm */}
                  <div className="recovery-field-row" style={{ borderBottom: 'none' }}>
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Tài liệu đính kèm
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <div className="recovery-file-upload-container">
                        <input 
                          type="file" 
                          id="change-info-file" 
                          onChange={handleInfoFileChange}
                          style={{ display: 'none' }}
                        />
                        <div className="recovery-file-info-row">
                          <span className="recovery-file-path-input">
                            {changeFileName || 'Choose file'}
                          </span>
                          <label htmlFor="change-info-file" className="recovery-file-browse-btn">
                            <Upload size={14} style={{ marginRight: 6 }} />
                            Browse
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="recovery-form-actions">
                  <button type="submit" className="recovery-btn-submit">
                    SUBMIT
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

        {view === 'withdraw' && (
          /* Withdraw Form View */
          <div className="recovery-form-wrapper">
            
            {/* Navigation back */}
            <button onClick={() => setView('list')} className="recovery-back-btn">
              <ArrowLeft size={16} />
              <span>Quay lại danh sách</span>
            </button>

            {/* Title Section */}
            <div className="recovery-title-section">
              <h2 className="recovery-form-title">ĐĂNG KÝ THÔI HỌC</h2>
              <p className="recovery-form-subtitle">
                YOU ARE REQUIRED TO FULFILL BLANK BOXES BELOW TO FINISH YOUR REQUEST AND ATTACH SUPPORTING DOCUMENTS (IF ANY) BEFORE SUBMITTING THIS FORM
              </p>
            </div>

            {submitSuccess ? (
              <div className="recovery-success-box">
                <div className="recovery-success-icon-wrapper">
                  <CheckCircle2 size={48} className="text-emerald-500" />
                </div>
                <h3 className="recovery-success-title">Nộp đơn thôi học thành công!</h3>
                <p className="recovery-success-desc">
                  Yêu cầu thôi học của bạn đã được ghi nhận thành công và gửi tới Ban Đào Tạo/Phòng ĐVSV để phê duyệt chính thức.
                </p>
                <p className="recovery-success-notice">
                  ⚠️ Lưu ý: Quá trình rút hồ sơ và thôi học có thể mất vài ngày làm việc. Phòng ĐVSV sẽ liên hệ trực tiếp với bạn và phụ huynh để xác nhận thông tin.
                </p>
                <button onClick={() => setView('list')} className="recovery-success-back-btn">
                  Trở lại Dịch vụ trực tuyến
                </button>
              </div>
            ) : (
              <form onSubmit={handleWithdrawSubmit} className="recovery-form-element">
                
                {/* Error Banner */}
                {validationError && (
                  <div className="recovery-validation-banner">
                    <AlertCircle size={18} />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Top Info Grid */}
                <div className="recovery-summary-grid">
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">DỊCH VỤ</div>
                    <div className="recovery-summary-badge">Đăng ký thôi học</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">KỲ ĐỢT DỊCH VỤ:</div>
                    <div className="recovery-summary-value-box">FALL 2023</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">TRẠNG THÁI SINH VIÊN</div>
                    <div className="recovery-summary-value-box">HL</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">SỐ DƯ</div>
                    <div className="recovery-summary-value-box">VND 0 đ</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">NGÀNH HỌC</div>
                    <div className="recovery-summary-value-box">Lập trình máy tính</div>
                  </div>
                </div>

                {/* Main Form Fields Layout */}
                <div className="recovery-fields-card">
                  
                  {/* Row 1: Lý do */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Lý do (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <textarea 
                        value={withdrawReason} 
                        onChange={(e) => setWithdrawReason(e.target.value.slice(0, 500))} 
                        placeholder="Lý do thôi học"
                        className="recovery-textarea-element"
                      />
                      <div className="recovery-char-counter">
                        {withdrawReason.length} / 500 ký tự
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Trạng thái học phí kỳ tiếp theo */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Trạng thái học phí kỳ tiếp theo
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <select 
                        value={withdrawStatus} 
                        onChange={(e) => setWithdrawStatus(e.target.value)} 
                        className="recovery-select-element"
                      >
                        <option value="Hoàn thành">Hoàn thành</option>
                        <option value="Chưa hoàn thành">Chưa hoàn thành</option>
                        <option value="Được miễn giảm">Được miễn giảm</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Số điện thoại */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Số điện thoại (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <input 
                        type="tel" 
                        value={withdrawPhone} 
                        onChange={(e) => setWithdrawPhone(e.target.value)} 
                        placeholder="Nhập số điện thoại"
                        className="recovery-input-element"
                      />
                    </div>
                  </div>

                  {/* Row 4: Phí dịch vụ */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Phí dịch vụ
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <input 
                        type="text" 
                        value="0" 
                        readOnly 
                        className="recovery-input-element disabled-bg"
                      />
                    </div>
                  </div>

                  {/* Row 5: Tài liệu đính kèm */}
                  <div className="recovery-field-row" style={{ borderBottom: 'none' }}>
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Tài liệu đính kèm
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <div className="recovery-file-upload-container">
                        <input 
                          type="file" 
                          id="withdraw-file" 
                          onChange={handleWithdrawFileChange}
                          style={{ display: 'none' }}
                        />
                        <div className="recovery-file-info-row">
                          <span className="recovery-file-path-input">
                            {withdrawFileName || 'Choose file'}
                          </span>
                          <label htmlFor="withdraw-file" className="recovery-file-browse-btn">
                            <Upload size={14} style={{ marginRight: 6 }} />
                            Browse
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="recovery-form-actions">
                  <button type="submit" className="recovery-btn-submit">
                    SUBMIT
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

        {view === 'retake' && (
          /* Retake Form View */
          <div className="recovery-form-wrapper">
            
            {/* Navigation back */}
            <button onClick={() => setView('list')} className="recovery-back-btn">
              <ArrowLeft size={16} />
              <span>Quay lại danh sách</span>
            </button>

            {/* Title Section */}
            <div className="recovery-title-section">
              <h2 className="recovery-form-title">ĐĂNG KÝ HỌC LẠI</h2>
              <p className="recovery-form-subtitle">
                YOU ARE REQUIRED TO FULFILL BLANK BOXES BELOW TO FINISH YOUR REQUEST AND ATTACH SUPPORTING DOCUMENTS (IF ANY) BEFORE SUBMITTING THIS FORM
              </p>
            </div>

            {submitSuccess ? (
              <div className="recovery-success-box">
                <div className="recovery-success-icon-wrapper">
                  <CheckCircle2 size={48} className="text-emerald-500" />
                </div>
                <h3 className="recovery-success-title">Đăng ký thành công!</h3>
                <p className="recovery-success-desc">
                  Yêu cầu đăng ký học lại môn <strong>{retakeSubject}</strong> đã được ghi nhận. Số tiền: <strong>{retakeFee}</strong>.
                </p>
                <p className="recovery-success-notice">
                  ⚠️ Lưu ý: Trong trường hợp bạn đã thanh toán nhưng trạng thái đơn chưa đổi sang "Đã thanh toán", vui lòng nhấn nút "Kiểm tra thanh toán" tại trang Dịch vụ đã đăng ký.
                </p>
                <button onClick={() => setView('list')} className="recovery-success-back-btn">
                  Trở lại Dịch vụ trực tuyến
                </button>
              </div>
            ) : (
              <form onSubmit={handleRetakeSubmit} className="recovery-form-element">
                
                {/* Error Banner */}
                {validationError && (
                  <div className="recovery-validation-banner">
                    <AlertCircle size={18} />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Top Info Grid */}
                <div className="recovery-summary-grid">
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">DỊCH VỤ</div>
                    <div className="recovery-summary-badge">Đăng ký học lại</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">KỲ ĐỢT DỊCH VỤ:</div>
                    <div className="recovery-summary-value-box">SUMMER 2026</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">TRẠNG THÁI SINH VIÊN</div>
                    <div className="recovery-summary-value-box">HL</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">SỐ DƯ</div>
                    <div className="recovery-summary-value-box">VND 0 đ</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">NGÀNH HỌC</div>
                    <div className="recovery-summary-value-box">Lập trình máy tính</div>
                  </div>
                </div>

                {/* Main Form Fields Layout */}
                <div className="recovery-fields-card">
                  
                  {/* Row 1: Loại dịch vụ */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      Loại dịch vụ
                    </div>
                    <div className="recovery-field-input-wrapper" style={{ fontSize: '13.5px', fontWeight: 600, color: '#334155' }}>
                      Đăng ký học lại
                    </div>
                  </div>

                  {/* Row 2: Chọn môn */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      Chọn môn
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <select 
                        value={retakeSubject} 
                        onChange={(e) => setRetakeSubject(e.target.value)} 
                        className="recovery-select-element"
                      >
                        {RETAKE_SUBJECTS.map(subj => (
                          <option key={subj} value={subj}>{subj}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Chọn ca dự kiến */}
                  <div className="recovery-field-row" style={{ alignItems: 'flex-start' }}>
                    <div className="recovery-field-label" style={{ paddingTop: '16px' }}>
                      Chọn ca dự kiến ❓
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <select 
                        value={retakeSlot} 
                        onChange={(e) => setRetakeSlot(e.target.value)} 
                        className="recovery-select-element"
                        style={{ marginBottom: '14px' }}
                      >
                        {RETAKE_SLOTS.map(sl => (
                          <option key={sl} value={sl}>{sl}</option>
                        ))}
                      </select>
                      
                      {/* Checkbox grid */}
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(3, 1fr)', 
                        gap: '12px',
                        backgroundColor: '#F8FAFC',
                        padding: '12px 16px',
                        borderRadius: '6px',
                        border: '1px solid #E2E8F0'
                      }}>
                        {Object.keys(retakeDays).map(day => (
                          <label key={day} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#475569',
                            cursor: 'pointer'
                          }}>
                            <input 
                              type="checkbox" 
                              checked={retakeDays[day]} 
                              onChange={() => handleDayCheckboxChange(day)}
                              style={{ 
                                cursor: 'pointer',
                                accentColor: 'var(--primary)'
                              }}
                            />
                            {day}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Số tiền */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      Số tiền
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <input 
                        type="text" 
                        value={retakeFee} 
                        readOnly 
                        className="recovery-input-element disabled-bg"
                        style={{ fontWeight: 700, color: '#1E293B' }}
                      />
                    </div>
                  </div>

                  {/* Row 5: Trong trường hợp không xếp được lớp */}
                  <div className="recovery-field-row" style={{ alignItems: 'flex-start', borderBottom: 'none' }}>
                    <div className="recovery-field-label" style={{ paddingTop: '16px', lineHeight: 1.4 }}>
                      Trong trường hợp không xếp được lớp (*)
                    </div>
                    <div className="recovery-field-input-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '10px', 
                        fontSize: '13px', 
                        color: '#334155',
                        cursor: 'pointer',
                        fontWeight: 500,
                        lineHeight: 1.4
                      }}>
                        <input 
                          type="radio" 
                          name="fallback-option" 
                          value="cancel"
                          checked={retakeFallbackOption === 'cancel'}
                          onChange={() => setRetakeFallbackOption('cancel')}
                          style={{ marginTop: '3px', cursor: 'pointer', accentColor: 'var(--primary)' }}
                        />
                        <span>Hủy đăng ký và hoàn lại 100% học phí học lại của đăng ký</span>
                      </label>
                      <label style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '10px', 
                        fontSize: '13px', 
                        color: '#334155',
                        cursor: 'pointer',
                        fontWeight: 500,
                        lineHeight: 1.4
                      }}>
                        <input 
                          type="radio" 
                          name="fallback-option" 
                          value="reserve"
                          checked={retakeFallbackOption === 'reserve'}
                          onChange={() => setRetakeFallbackOption('reserve')}
                          style={{ marginTop: '3px', cursor: 'pointer', accentColor: 'var(--primary)' }}
                        />
                        <span>Bảo lưu đăng ký, đợi xếp lớp trong các kỳ tiếp theo</span>
                      </label>

                      <div style={{ fontSize: '12px', color: '#DC2626', marginTop: '6px', fontWeight: 600, fontStyle: 'italic' }}>
                        Lưu ý: Sinh viên hủy đăng ký sẽ không được bảo lưu ưu đãi Đăng ký học lại sớm
                      </div>
                    </div>
                  </div>

                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
                  <button 
                    type="submit" 
                    style={{ 
                      backgroundColor: '#10B981', 
                      color: '#FFFFFF', 
                      border: 'none', 
                      padding: '12px 60px', 
                      borderRadius: '6px', 
                      fontSize: '14px', 
                      fontWeight: 700, 
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10B981'}
                  >
                    Hoàn tất đăng ký
                  </button>

                  <div style={{ 
                    fontSize: '12px', 
                    color: '#D97706', 
                    maxWidth: '800px', 
                    textAlign: 'center', 
                    lineHeight: 1.5,
                    fontWeight: 600
                  }}>
                    Trong trường hợp sinh viên đã thanh toán nhưng trạng thái đơn chưa đổi sang <span style={{ color: '#059669' }}>Đã thanh toán</span> sinh viên phải chủ động nhấn nút <span style={{ color: '#D97706', textDecoration: 'underline', cursor: 'pointer' }}>Kiểm tra thanh toán</span> tại trang Dịch vụ đã đăng ký để cập nhật trạng thái đơn
                  </div>
                </div>

              </form>
            )}

          </div>
        )}

        {view === 'defer' && (
          /* Defer Form View */
          <div className="recovery-form-wrapper">
            
            {/* Navigation back */}
            <button onClick={() => setView('list')} className="recovery-back-btn">
              <ArrowLeft size={16} />
              <span>Quay lại danh sách</span>
            </button>

            {/* Title Section */}
            <div className="recovery-title-section">
              <h2 className="recovery-form-title">ĐĂNG KÝ TẠM THỜI NGHỈ HỌC DÀI HẠN</h2>
              <p className="recovery-form-subtitle">
                YOU ARE REQUIRED TO FULFILL BLANK BOXES BELOW TO FINISH YOUR REQUEST AND ATTACH SUPPORTING DOCUMENTS (IF ANY) BEFORE SUBMITTING THIS FORM
              </p>
            </div>

            {submitSuccess ? (
              <div className="recovery-success-box">
                <div className="recovery-success-icon-wrapper">
                  <CheckCircle2 size={48} className="text-emerald-500" />
                </div>
                <h3 className="recovery-success-title">Nộp đơn thành công!</h3>
                <p className="recovery-success-desc">
                  Yêu cầu tạm thời nghỉ học dài hạn của bạn đã được tiếp nhận. Kỳ đợt xin nghỉ: <strong>FALL 2025</strong>.
                </p>
                <p className="recovery-success-notice">
                  ⚠️ Lưu ý: Hồ sơ bản cứng (sao y công chứng) cần phải nộp trực tiếp hoặc gửi qua bưu điện cho phòng ĐVSV trong vòng 72 giờ để hoàn tất yêu cầu.
                </p>
                <button onClick={() => setView('list')} className="recovery-success-back-btn">
                  Trở lại Dịch vụ trực tuyến
                </button>
              </div>
            ) : (
              <form onSubmit={handleDeferSubmit} className="recovery-form-element">
                
                {/* Error Banner */}
                {validationError && (
                  <div className="recovery-validation-banner">
                    <AlertCircle size={18} />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Top Info Grid */}
                <div className="recovery-summary-grid">
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">DỊCH VỤ</div>
                    <div className="recovery-summary-badge">Đăng ký tạm thời nghỉ học dài hạn</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">KỲ ĐỢT DỊCH VỤ:</div>
                    <div className="recovery-summary-value-box">FALL 2025</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">TRẠNG THÁI SINH VIÊN</div>
                    <div className="recovery-summary-value-box">HL</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">SỐ DƯ</div>
                    <div className="recovery-summary-value-box">VND 0 đ</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">NGÀNH HỌC</div>
                    <div className="recovery-summary-value-box">Lập trình máy tính</div>
                  </div>
                </div>

                {/* Main Form Fields Layout */}
                <div className="recovery-fields-card">
                  
                  {/* Row 1: Môn xin học lại */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Môn xin học lại
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <select 
                        value={deferSubject} 
                        onChange={(e) => setDeferSubject(e.target.value)} 
                        className="recovery-select-element"
                      >
                        <option value="">Vui lòng chọn mã môn</option>
                        {SUBJECTS.map(subj => (
                          <option key={subj} value={subj}>{subj}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Thời gian mong muốn quay lại hoàn thành môn */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Thời gian mong muốn quay lại hoàn thành môn (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <input 
                        type="text" 
                        value={deferReturnDate} 
                        onChange={(e) => setDeferReturnDate(e.target.value)} 
                        placeholder="Ví dụ: Kỳ Spring 2026..."
                        className="recovery-input-element"
                      />
                    </div>
                  </div>

                  {/* Row 3: Lý do */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Lý do (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <textarea 
                        value={deferReason} 
                        onChange={(e) => setDeferReason(e.target.value.slice(0, 500))} 
                        placeholder="Vui lòng ghi rõ yêu cầu cần xử lý"
                        className="recovery-textarea-element"
                      />
                      <div className="recovery-char-counter">
                        Tối đa 500 ký tự (Hiện tại: {deferReason.length})
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Đề nghị */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Đề nghị (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <textarea 
                        value={deferProposal} 
                        onChange={(e) => setDeferProposal(e.target.value.slice(0, 500))} 
                        placeholder="Vui lòng ghi rõ yêu cầu cần xử lý"
                        className="recovery-textarea-element"
                      />
                      <div className="recovery-char-counter">
                        Tối đa 500 ký tự (Hiện tại: {deferProposal.length})
                      </div>
                    </div>
                  </div>

                  {/* Row 5: Số điện thoại */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Số điện thoại (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <input 
                        type="tel" 
                        value={deferPhone} 
                        onChange={(e) => setDeferPhone(e.target.value)} 
                        placeholder="Nhập số điện thoại"
                        className="recovery-input-element"
                      />
                    </div>
                  </div>

                  {/* Row 6: Tên hồ sơ */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Tên hồ sơ (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <textarea 
                        value={deferDocName} 
                        onChange={(e) => setDeferDocName(e.target.value)} 
                        placeholder="(Ví dụ: Hồ sơ bệnh án...)"
                        className="recovery-textarea-element"
                        style={{ minHeight: '60px' }}
                      />
                    </div>
                  </div>

                  {/* Row 7: File đính kèm */}
                  <div className="recovery-field-row" style={{ alignItems: 'flex-start' }}>
                    <div className="recovery-field-label" style={{ paddingTop: '16px' }}>
                      <span className="bullet-circle">o</span> File đính kèm (*định dạng PDF)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <div className="recovery-file-upload-container">
                        <input 
                          type="file" 
                          id="defer-file" 
                          accept=".pdf"
                          onChange={handleDeferFileChange}
                          style={{ display: 'none' }}
                        />
                        <div className="recovery-file-info-row">
                          <span className="recovery-file-path-input">
                            {deferFileName || 'Choose file'}
                          </span>
                          <label htmlFor="defer-file" className="recovery-file-browse-btn">
                            <Upload size={14} style={{ marginRight: 6 }} />
                            Browse
                          </label>
                        </div>
                        <div style={{ 
                          fontSize: '11.5px', 
                          color: '#4B5563', 
                          marginTop: '8px', 
                          lineHeight: 1.4,
                          backgroundColor: '#F8FAFC',
                          padding: '10px 14px',
                          border: '1px solid #E2E8F0',
                          borderRadius: '6px'
                        }}>
                          <strong>Lưu ý:</strong><br />
                          1. SV cần nộp 01 bản sao y công chứng hồ sơ cho phòng ĐVSV trong vòng 72 giờ (CPN sẽ tính thời gian theo dấu bưu điện).<br />
                          2. Sinh viên nên nộp/nhận hồ sơ trực tiếp tại phòng ĐVSV, nếu SV chọn hình thức chuyển phát nhanh thì Phí CPN do sinh viên thanh toán.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 8: Hình thức gửi hồ sơ */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Hình thức gửi hồ sơ (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <select 
                        value={deferSendMethod} 
                        onChange={(e) => setDeferSendMethod(e.target.value)} 
                        className="recovery-select-element"
                      >
                        <option value="Nhận trực tiếp tại phòng ĐVSV">Nhận trực tiếp tại phòng ĐVSV</option>
                        <option value="Gửi chuyển phát nhanh">Gửi chuyển phát nhanh</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 9: Hình thức nhận kết quả */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Hình thức nhận kết quả (*)
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <select 
                        value={deferReceiveMethod} 
                        onChange={(e) => setDeferReceiveMethod(e.target.value)} 
                        className="recovery-select-element"
                      >
                        <option value="Nhận trực tiếp tại phòng ĐVSV">Nhận trực tiếp tại phòng ĐVSV</option>
                        <option value="Gửi chuyển phát nhanh về địa chỉ nhà">Gửi chuyển phát nhanh về địa chỉ nhà</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 10: Địa chỉ nhận */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Địa chỉ nhận
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <textarea 
                        value={deferAddress} 
                        onChange={(e) => setDeferAddress(e.target.value)} 
                        placeholder="Nhập địa chỉ nhận kết quả (Chỉ áp dụng nếu nhận qua Chuyển phát nhanh)"
                        disabled={deferReceiveMethod === 'Nhận trực tiếp tại phòng ĐVSV'}
                        className={`recovery-textarea-element ${deferReceiveMethod === 'Nhận trực tiếp tại phòng ĐVSV' ? 'disabled-bg' : ''}`}
                        style={{ minHeight: '60px' }}
                      />
                    </div>
                  </div>

                  {/* Row 11: Phí dịch vụ */}
                  <div className="recovery-field-row" style={{ borderBottom: 'none' }}>
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Phí dịch vụ
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <input 
                        type="text" 
                        value={deferFee} 
                        readOnly 
                        className="recovery-input-element disabled-bg"
                      />
                    </div>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="recovery-form-actions">
                  <button type="submit" className="recovery-btn-submit">
                    SUBMIT
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

      </main>

      {/* Confirmation Modal for other services */}
      {selectedService && (
        <div className="modal-overlay">
          <div className="modal-content">
            {!showSuccessModal ? (
              <>
                <div className="modal-icon">
                  <ClipboardList size={28} />
                </div>
                <h3 className="modal-title">Xác nhận đăng ký</h3>
                <p className="modal-desc">
                  Bạn có chắc chắn muốn đăng ký dịch vụ <strong>{selectedService.task}</strong> không? Đơn đăng ký của bạn sẽ được gửi tới Ban Đào Tạo RK để phê duyệt.
                </p>
                <div className="modal-actions">
                  <button onClick={handleConfirmModalRegistration} className="modal-btn-confirm">
                    Đồng ý đăng ký
                  </button>
                  <button onClick={() => setSelectedService(null)} className="modal-btn-cancel">
                    Hủy bỏ
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="modal-icon" style={{ backgroundColor: '#ECFDF5', color: '#10B981' }}>
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="modal-title" style={{ color: '#065F46' }}>Đăng ký thành công!</h3>
                <p className="modal-desc" style={{ marginBottom: 0 }}>
                  Đơn đăng ký dịch vụ của bạn đã được tiếp nhận và xử lý.
                </p>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
