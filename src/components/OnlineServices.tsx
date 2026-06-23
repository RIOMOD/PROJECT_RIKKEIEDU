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

const CLASSES = ['WD18301', 'WD18302', 'WD18303', 'WD18304'];
const SLOTS = [
  'Slot 1 (07:30 - 09:30)',
  'Slot 2 (09:40 - 11:40)',
  'Slot 3 (12:30 - 14:30)',
  'Slot 4 (14:40 - 16:40)',
  'Slot 5 (17:00 - 19:00)',
  'Slot 6 (19:10 - 21:10)'
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
  const [view, setView] = useState<'list' | 'attendance-recovery' | 'student-card-reissue' | 'change-info'>('list');
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
      task: 'ĐĂNG KÝ HỌC LẠI MIỄN PHÍ-V2',
      desc: 'ĐĂNG KÝ HỌC LẠI MIỄN PHÍ CHO SINH VIÊN'
    },
    {
      stt: 3,
      task: 'ĐĂNG KÝ CẤP LẠI THẺ SINH VIÊN',
      desc: 'ĐĂNG KÝ CẤP LẠI THẺ SINH VIÊN BỊ MẤT HOẶC HỎNG'
    },
    {
      stt: 4,
      task: 'ĐĂNG KÝ KÝ TÊN LẠI',
      desc: 'ÁP DỤNG CHO TRƯỜNG THỂ SV BỊ MẤT/HỎNG. BÀI HỌC MỚI SV KHÔNG ĐĂNG NHẬP ĐƯỢC DỊCH VỤ NÀY'
    },
    {
      stt: 5,
      task: 'ĐĂNG KÝ PHẦN GIẢM HỌC',
      desc: ''
    },
    {
      stt: 6,
      task: 'ĐĂNG KÝ THAY ĐỔI THÔNG TIN',
      desc: ''
    },
    {
      stt: 7,
      task: 'ĐĂNG KÝ THÔI HỌC',
      desc: ''
    },
    {
      stt: 8,
      task: 'ĐĂNG KÝ NGƯỜI NHẬN XÁC THỰC',
      desc: 'SINH VIÊN DOWNLOAD MẪU XÁC NHẬN, ĐIỀN ĐẦY ĐỦ THÔNG TIN VÀ UPLOAD LÊN ĐĂNG KÝ'
    },
    {
      stt: 9,
      task: 'ĐĂNG KÝ HỌC LẠI',
      desc: 'ĐĂNG KÝ HỌC LẠI CHO SINH VIÊN TRƯỢT MÔN HỌC'
    },
    {
      stt: 10,
      task: 'ĐĂNG KÝ TẠM THỜI HỌC',
      desc: 'DỊCH VỤ ÁP DỤNG CHO TRƯỜP HỢP SV CẦN TẠM DỪNG HỌC KHI LỚP HỌC CHƯA KẾT THÚC'
    },
    {
      stt: 11,
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
    } else if (service.stt === 3) {
      setView('student-card-reissue');
      resetCardForm();
    } else if (service.stt === 6) {
      setView('change-info');
      resetChangeInfoForm();
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

  const handleAddCategory = () => {
    if (infoCategory && !addedCategories.includes(infoCategory)) {
      setAddedCategories([...addedCategories, infoCategory]);
    }
  };

  const handleRemoveCategory = (catToRemove: string) => {
    setAddedCategories(addedCategories.filter(cat => cat !== catToRemove));
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
                  Bạn có chắc chắn muốn đăng ký dịch vụ <strong>{selectedService.task}</strong> không? Đơn đăng ký của bạn sẽ được gửi tới Ban Đào Tạo BTEC để phê duyệt.
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
