import { useState, useEffect } from 'react';
import { ClipboardList, CheckCircle2, ArrowLeft, Upload, AlertCircle, Plus, X, FileText } from 'lucide-react';

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

interface OnlineServicesProps {
  lang: 'vi' | 'en';
  activeItem?: string;
  setActiveItem?: (item: string) => void;
}

export const OnlineServices = ({ lang, activeItem, setActiveItem }: OnlineServicesProps) => {
  // Translation helper
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };
  const [view, setView] = useState<'list' | 'attendance-recovery' | 'student-card-reissue' | 'change-info' | 'withdraw' | 'retake' | 'defer' | 'dk-vang-thi' | 'phuc-khao' | 'dk-thi-lai' | 'bao-luu-kqht' | 'other-services'>('list');
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
  const [deferFileName, setDeferFileName] = useState('');
  const [deferSendMethod, setDeferSendMethod] = useState('Nhận trực tiếp tại phòng ĐVSV');
  const [deferFee] = useState('0');

  // Validation & Submit State
  const [validationError, setValidationError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // --- Đăng ký vắng thi States ---
  const [vtSubject, setVtSubject] = useState('[10587] SD102 - Web Design');
  const [vtDate, setVtDate] = useState('2025-06-25');
  const [vtSlot, setVtSlot] = useState('Ca 1 (07:30 - 09:30)');
  const [vtReason, setVtReason] = useState('Do bị ốm, có xác nhận của cơ sở y tế.');
  const [vtFileAttached, setVtFileAttached] = useState<boolean>(true);
  const vtFileName = 'Giấy xác nhận bệnh.pdf';
  const vtFileSize = '1.2 MB';

  // --- Đăng ký phúc khảo States ---
  const [pkSemester, setPkSemester] = useState('Học kỳ 2 - Năm học 2024 - 2025');
  const [pkSubject, setPkSubject] = useState('CT313 - Cấu trúc dữ liệu và giải thuật');
  const [pkScore, setPkScore] = useState('6.5');
  const [pkContent, setPkContent] = useState('Em đề nghị Nhà trường phúc khảo lại bài thi vì em cho rằng kết quả chưa phản ánh đúng bài làm của em.');
  const [pkNote, setPkNote] = useState('');
  const [pkFileAttached, setPkFileAttached] = useState<boolean>(false);
  const pkFileName = 'HoaDonPhucKhao.pdf';
  const pkFileSize = '850 KB';

  // --- Đăng ký thi lại / Thi bổ sung States ---
  const [tlSemester, setTlSemester] = useState('Học kỳ 2 - Năm học 2024 - 2025');
  const [tlSubject, setTlSubject] = useState('CT313 - Cấu trúc dữ liệu và giải thuật');
  const [tlType, setTlType] = useState<'thi-lai' | 'thi-bo-sung'>('thi-lai');
  const [tlReason, setTlReason] = useState('');
  const [tlNote, setTlNote] = useState('');
  const [tlFileAttached, setTlFileAttached] = useState<boolean>(false);
  const tlFileName = 'HoaDonThiLai.pdf';
  const tlFileSize = '920 KB';

  // --- Bảo lưu kết quả học tập States ---
  const [blSemester, setBlSemester] = useState('');
  const [blReason, setBlReason] = useState('');
  const [blDuration, setBlDuration] = useState('');
  const [blNote, setBlNote] = useState('');
  const [blFileAttached, setBlFileAttached] = useState<boolean>(false);
  const [blShowWarningModal, setBlShowWarningModal] = useState<boolean>(true);

  // --- Đăng ký dịch vụ khác States ---
  const [otherContent, setOtherContent] = useState('');
  const [otherDept, setOtherDept] = useState('TC&QLĐT');
  const [otherPhone, setOtherPhone] = useState('');
  const [otherFileName, setOtherFileName] = useState('');

  const resetOtherForm = () => {
    setOtherContent('');
    setOtherDept('TC&QLĐT');
    setOtherPhone('');
    setOtherFileName('');
  };

  const handleOtherFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setOtherFileName(e.target.files[0].name);
    }
  };

  const handleOtherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otherContent || !otherPhone) {
      setValidationError(t('Vui lòng điền đầy đủ các thông tin bắt buộc (*)', 'Please fill in all required fields (*)'));
      return;
    }
    setValidationError('');
    setSubmitSuccess(true);
  };


  useEffect(() => {
    if (activeItem === 'dk-vang-thi') {
      setView('dk-vang-thi');
      resetVangThiForm();
      setSubmitSuccess(false);
      setValidationError('');
    } else if (activeItem === 'phuc-khao') {
      setView('phuc-khao');
      resetPhucKhaoForm();
      setSubmitSuccess(false);
      setValidationError('');
    } else if (activeItem === 'dk-thi-lai') {
      setView('dk-thi-lai');
      resetThiLaiForm();
      setSubmitSuccess(false);
      setValidationError('');
    } else if (activeItem === 'bao-luu-kqht') {
      setView('bao-luu-kqht');
      resetBaoLuuForm();
      setSubmitSuccess(false);
      setValidationError('');
    } else {
      setView('list');
    }
  }, [activeItem]);

  const resetBaoLuuForm = () => {
    setBlSemester('');
    setBlReason('');
    setBlDuration('');
    setBlNote('');
    setBlFileAttached(false);
    setBlShowWarningModal(true);
  };

  const resetVangThiForm = () => {
    setVtSubject('[10587] SD102 - Web Design');
    setVtDate('2025-06-25');
    setVtSlot('Ca 1 (07:30 - 09:30)');
    setVtReason('Do bị ốm, có xác nhận của cơ sở y tế.');
    setVtFileAttached(true);
  };

  const resetPhucKhaoForm = () => {
    setPkSemester('Học kỳ 2 - Năm học 2024 - 2025');
    setPkSubject('CT313 - Cấu trúc dữ liệu và giải thuật');
    setPkScore('6.5');
    setPkContent('Em đề nghị Nhà trường phúc khảo lại bài thi vì em cho rằng kết quả chưa phản ánh đúng bài làm của em.');
    setPkNote('');
    setPkFileAttached(false);
  };

  const resetThiLaiForm = () => {
    setTlSemester('Học kỳ 2 - Năm học 2024 - 2025');
    setTlSubject('CT313 - Cấu trúc dữ liệu và giải thuật');
    setTlType('thi-lai');
    setTlReason('');
    setTlNote('');
    setTlFileAttached(false);
  };

  const handleVangThiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vtSubject || !vtDate || !vtReason) {
      setValidationError('Vui lòng nhập đầy đủ các trường thông tin bắt buộc (*).');
      return;
    }
    setValidationError('');
    setSubmitSuccess(true);
  };

  const handlePhucKhaoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkSemester || !pkSubject || !pkScore || !pkContent || !pkFileAttached) {
      setValidationError('Vui lòng nhập đầy đủ các trường thông tin bắt buộc (*).');
      return;
    }
    setValidationError('');
    setSubmitSuccess(true);
  };

  const handleThiLaiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tlSemester || !tlSubject || !tlType || !tlFileAttached) {
      setValidationError('Vui lòng nhập đầy đủ các trường thông tin bắt buộc (*).');
      return;
    }
    setValidationError('');
    setSubmitSuccess(true);
  };

  // Mock list of services
  const services: ServiceItem[] = [
    {
      stt: 1,
      task: t('ĐĂNG KÝ NGHỈ BUỔI HỌC', 'LEAVE OF ABSENCE REGISTRATION'),
      desc: ''
    },
    {
      stt: 2,
      task: t('ĐĂNG KÝ CẤP LẠI THẺ SINH VIÊN', 'STUDENT CARD RE-ISSUANCE REGISTRATION'),
      desc: t('ĐĂNG KÝ CẤP LẠI THẺ SINH VIÊN BỊ MẤT HOẶC HỎNG', 'REGISTER TO REISSUE A LOST OR DAMAGED STUDENT CARD')
    },
    {
      stt: 3,
      task: t('ĐĂNG KÝ THAY ĐỔI THÔNG TIN', 'INFORMATION CHANGE REGISTRATION'),
      desc: ''
    },
    {
      stt: 4,
      task: t('ĐĂNG KÝ THÔI HỌC', 'WITHDRAWAL REGISTRATION'),
      desc: ''
    },
    {
      stt: 5,
      task: t('ĐĂNG KÝ HỌC LẠI', 'RETAKE REGISTRATION'),
      desc: t('ĐĂNG KÝ HỌC LẠI CHO SINH VIÊN TRƯỢT MÔN HỌC', 'RETAKE REGISTRATION FOR STUDENTS WHO FAILED A COURSE')
    },
    {
      stt: 6,
      task: t('ĐĂNG KÝ TẠM THỜI NGHỈ HỌC DÀI HẠN', 'TEMPORARY LONG-TERM LEAVE REGISTRATION'),
      desc: t('DỊCH VỤ ÁP DỤNG CHO TRƯỜNG HỢP SV CẦN TẠM DỪNG HỌC KHI LỚP HỌC CHƯA KẾT THÚC', 'SERVICE FOR STUDENTS WHO NEED TO SUSPEND THEIR STUDIES TEMPORARILY')
    },
    {
      stt: 7,
      task: t('ĐĂNG KÝ VẮNG THI', 'EXAM ABSENCE REGISTRATION'),
      desc: t('DÀNH CHO SINH VIÊN KHÔNG THỂ THAM DỰ KỲ THI THEO LỊCH DO LÝ DO CHÍNH ĐÁNG', 'FOR STUDENTS WHO CANNOT ATTEND EXAMS FOR VALID REASONS')
    },
    {
      stt: 8,
      task: t('ĐĂNG KÝ PHÚC KHẢO', 'EXAM RE-EVALUATION REGISTRATION'),
      desc: t('DÀNH CHO SINH VIÊN CÓ NHU CẦU PHÚC KHẢO ĐIỂM THI', 'FOR STUDENTS WHO WANT TO APPEAL THEIR EXAM GRADES')
    },
    {
      stt: 9,
      task: t('ĐĂNG KÝ THI LẠI / THI BỔ SUNG', 'RE-TAKING / SUPPLEMENTARY EXAM REGISTRATION'),
      desc: t('DÀNH CHO SINH VIÊN ĐĂNG KÝ THI LẠI HOẶC THI BỔ SUNG', 'FOR STUDENTS REGISTERING FOR RE-EXAMS OR SUPPLEMENTARY EXAMS')
    },
    {
      stt: 10,
      task: t('ĐĂNG KÝ BẢO LƯU KẾT QUẢ HỌC TẬP', 'ACADEMIC SUSPENSION REGISTRATION'),
      desc: t('DÀNH CHO SINH VIÊN CÓ NHU CẦU BẢO LƯU KẾT QUẢ HỌC TẬP', 'FOR STUDENTS WHO WANT TO SUSPEND THEIR STUDIES')
    },
    {
      stt: 11,
      task: t('ĐĂNG KÝ DỊCH VỤ KHÁC', 'OTHER REGISTRATION & SERVICES'),
      desc: t('SỬ DỤNG CHUNG CHO CÁC DỊCH VỤ KHÔNG BỊ MẤT PHÍ NHƯ: THẮC MẮC, KHIẾU NẠI,...', 'FOR COMPLAINTS, INQUIRIES, AND FREE GENERAL SERVICES')
    }
  ];

  const getSectionTitle = () => {
    if (activeItem === 'dv-hoc-vu') {
      return t('Danh sách dịch vụ học vụ', 'Academic Services List');
    }
    if (activeItem === 'dv-khao-thi') {
      return t('Danh sách dịch vụ khảo thí', 'Examination Services List');
    }
    if (activeItem === 'dv-thong-tin') {
      return t('Danh sách dịch vụ thông tin', 'Information Services List');
    }
    return t('Danh sách các dịch vụ trực tuyến', 'Online Service Registration List');
  };

  const getFilteredServices = () => {
    if (activeItem === 'dv-hoc-vu') {
      return services.filter(item => [1, 4, 5, 6, 10].includes(item.stt));
    }
    if (activeItem === 'dv-khao-thi') {
      return services.filter(item => [7, 8, 9].includes(item.stt));
    }
    if (activeItem === 'dv-thong-tin') {
      return services.filter(item => [2, 3, 11].includes(item.stt));
    }
    return services;
  };

  const displayServices = getFilteredServices();

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
    } else if (service.stt === 7) {
      setActiveItem?.('dk-vang-thi');
    } else if (service.stt === 8) {
      setActiveItem?.('phuc-khao');
    } else if (service.stt === 9) {
      setActiveItem?.('dk-thi-lai');
    } else if (service.stt === 10) {
      setActiveItem?.('bao-luu-kqht');
    } else if (service.stt === 11) {
      setView('other-services');
      resetOtherForm();
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
    setDeferFileName('');
    setDeferSendMethod('Nhận trực tiếp tại phòng ĐVSV');
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
      setValidationError(t('Vui lòng điền đầy đủ các thông tin bắt buộc (*)', 'Please fill in all required fields (*)'));
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
      setValidationError(t('Vui lòng điền đầy đủ các thông tin bắt buộc (*)', 'Please fill in all required fields (*)'));
      return;
    }
    setValidationError('');
    setSubmitSuccess(true);
  };

  const handleRetakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!retakeSubject || !retakeSlot || !retakeFallbackOption) {
      setValidationError(t('Vui lòng điền đầy đủ các thông tin bắt buộc (*)', 'Please fill in all required fields (*)'));
      return;
    }
    setValidationError('');
    setSubmitSuccess(true);
  };

  const handleDeferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deferReturnDate || !deferReason || !deferProposal || !deferPhone || !deferFileName) {
      setValidationError(t('Vui lòng điền đầy đủ các thông tin bắt buộc (*)', 'Please fill in all required fields (*)'));
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
            <h2 className="services-section-title">{getSectionTitle()}</h2>

            {/* Table Container */}
            <div className="services-table-wrapper">
              <table className="services-table">
                <thead className="services-thead">
                  <tr>
                    <th className="services-th center">STT</th>
                    <th className="services-th">{t('Nhiệm vụ', 'Task')}</th>
                    <th className="services-th">{t('Mô tả', 'Description')}</th>
                    <th className="services-th center">{t('Đăng ký', 'Register')}</th>
                  </tr>
                </thead>
                <tbody>
                  {displayServices.map((item, idx) => (
                    <tr key={item.stt} className="services-tr">
                      <td className="services-td center services-td stt">{idx + 1}</td>
                      <td className="services-td services-td task-name">{item.task}</td>
                      <td className="services-td services-td desc">
                        {item.desc || <span style={{ color: '#E2E8F0', fontStyle: 'italic' }}>—</span>}
                      </td>
                      <td className="services-td center">
                        <button 
                          onClick={() => handleRegisterClick(item)}
                          className="register-btn"
                        >
                          {t('Đăng ký', 'Register')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="pagination-container">
                <button className="pagination-btn">{t('Trước', 'Previous')}</button>
                <span className="pagination-arrows">&lt;&lt;</span>
                <span className="pagination-arrows">&gt;&gt;</span>
                <button className="pagination-btn">{t('Kế tiếp', 'Next')}</button>
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
              <span>{t('Quay lại danh sách', 'Back to list')}</span>
            </button>

            {/* Title Section */}
            <div className="recovery-title-section">
              <h2 className="recovery-form-title">ĐĂNG KÝ NGHỈ BUỔI HỌC</h2>
              <p className="recovery-form-subtitle">
                YOU ARE REQUIRED TO FULFILL BLANK BOXES BELOW TO FINISH YOUR REQUEST AND ATTACH SUPPORTING DOCUMENTS (IF ANY) BEFORE SUBMITTING THIS FORM
              </p>
            </div>

            {submitSuccess ? (
              <div className="recovery-success-box">
                <div className="recovery-success-icon-wrapper">
                  <CheckCircle2 size={48} className="text-emerald-500" />
                </div>
                <h3 className="recovery-success-title">{t('Đăng ký dịch vụ thành công!', 'Service Registration Successful!')}</h3>
                <p className="recovery-success-desc">
                  Yêu cầu nghỉ buổi học môn <strong>{subject}</strong> lớp <strong>{classCode}</strong> của bạn đã được ghi nhận thành công và gửi tới Ban Đào Tạo.
                </p>
                <p className="recovery-success-notice">
                  ⚠️ Lưu ý: Vui lòng nhắc giảng viên <strong>{teacherName}</strong> xác nhận yêu cầu này để phòng đào tạo xử lý tiếp.
                </p>
                <button onClick={() => setView('list')} className="recovery-success-back-btn">
                  {t('Trở lại Dịch vụ trực tuyến', 'Back to Online Services')}
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
                    <div className="recovery-summary-label">{t('DỊCH VỤ', 'SERVICE')}</div>
                    <div className="recovery-summary-badge">Đăng ký nghỉ buổi học</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('KỲ ĐỢT DỊCH VỤ:', 'SERVICE PERIOD:')}</div>
                    <div className="recovery-summary-value-box">FALL 2023</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('TRẠNG THÁI SINH VIÊN', 'STUDENT STATUS')}</div>
                    <div className="recovery-summary-value-box">CNTT2</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('SỐ DƯ', 'BALANCE')}</div>
                    <div className="recovery-summary-value-box">{t('VND 0 đ', 'VND 0')}</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('NGÀNH HỌC', 'MAJOR')}</div>
                    <div className="recovery-summary-value-box">{t('Lập trình máy tính', 'Computer Programming')}</div>
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
                      <span className="bullet-circle">o</span> {t('Số điện thoại (*)', 'Phone Number (*)')}
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <input 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder={t('Nhập số điện thoại của bạn', 'Enter your phone number')}
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
                        placeholder={t('Vui lòng ghi rõ yêu cầu cần xử lý', 'Please specify your request details')}
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
                      <span className="bullet-circle">o</span> {t('Phí dịch vụ', 'Service Fee')}
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
                      <span className="bullet-circle">o</span> {t('Tài liệu đính kèm', 'Attachments')}
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
                  <div style={{ minHeight: '24px' }}></div>
                </div>

                {/* Action Buttons */}
                <div className="recovery-form-actions">
                  <button type="submit" className="recovery-btn-submit">
                    {t('SUBMIT', 'SUBMIT')}
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
              <span>{t('Quay lại danh sách', 'Back to list')}</span>
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
                  {t('Trở lại Dịch vụ trực tuyến', 'Back to Online Services')}
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
                    <div className="recovery-summary-value-box">CNTT2</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('SỐ DƯ', 'BALANCE')}</div>
                    <div className="recovery-summary-value-box">{t('VND 0 đ', 'VND 0')}</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('NGÀNH HỌC', 'MAJOR')}</div>
                    <div className="recovery-summary-value-box">{t('Lập trình máy tính', 'Computer Programming')}</div>
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
              <span>{t('Quay lại danh sách', 'Back to list')}</span>
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
                  {t('Trở lại Dịch vụ trực tuyến', 'Back to Online Services')}
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
                    <div className="recovery-summary-label">{t('DỊCH VỤ', 'SERVICE')}</div>
                    <div className="recovery-summary-badge">Đăng ký thay đổi thông tin</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('KỲ ĐỢT DỊCH VỤ:', 'SERVICE PERIOD:')}</div>
                    <div className="recovery-summary-value-box">FALL 2023</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('TRẠNG THÁI SINH VIÊN', 'STUDENT STATUS')}</div>
                    <div className="recovery-summary-value-box">CNTT2</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('SỐ DƯ', 'BALANCE')}</div>
                    <div className="recovery-summary-value-box">{t('VND 0 đ', 'VND 0')}</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('NGÀNH HỌC', 'MAJOR')}</div>
                    <div className="recovery-summary-value-box">{t('Lập trình máy tính', 'Computer Programming')}</div>
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
                        placeholder={t('Vui lòng ghi rõ yêu cầu cần xử lý', 'Please specify your request details')}
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
                      <span className="bullet-circle">o</span> {t('Phí dịch vụ', 'Service Fee')}
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
                      <span className="bullet-circle">o</span> {t('Tài liệu đính kèm', 'Attachments')}
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
                    {t('SUBMIT', 'SUBMIT')}
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
              <span>{t('Quay lại danh sách', 'Back to list')}</span>
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
                  {t('Trở lại Dịch vụ trực tuyến', 'Back to Online Services')}
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
                    <div className="recovery-summary-label">{t('DỊCH VỤ', 'SERVICE')}</div>
                    <div className="recovery-summary-badge">Đăng ký thôi học</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('KỲ ĐỢT DỊCH VỤ:', 'SERVICE PERIOD:')}</div>
                    <div className="recovery-summary-value-box">FALL 2023</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('TRẠNG THÁI SINH VIÊN', 'STUDENT STATUS')}</div>
                    <div className="recovery-summary-value-box">CNTT2</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('SỐ DƯ', 'BALANCE')}</div>
                    <div className="recovery-summary-value-box">{t('VND 0 đ', 'VND 0')}</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('NGÀNH HỌC', 'MAJOR')}</div>
                    <div className="recovery-summary-value-box">{t('Lập trình máy tính', 'Computer Programming')}</div>
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
                      <span className="bullet-circle">o</span> {t('Số điện thoại (*)', 'Phone Number (*)')}
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
                      <span className="bullet-circle">o</span> {t('Phí dịch vụ', 'Service Fee')}
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
                      <span className="bullet-circle">o</span> {t('Tài liệu đính kèm', 'Attachments')}
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
                    {t('SUBMIT', 'SUBMIT')}
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
              <span>{t('Quay lại danh sách', 'Back to list')}</span>
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
                  {t('Trở lại Dịch vụ trực tuyến', 'Back to Online Services')}
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
                    <div className="recovery-summary-label">{t('DỊCH VỤ', 'SERVICE')}</div>
                    <div className="recovery-summary-badge">Đăng ký học lại</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('KỲ ĐỢT DỊCH VỤ:', 'SERVICE PERIOD:')}</div>
                    <div className="recovery-summary-value-box">SUMMER 2026</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('TRẠNG THÁI SINH VIÊN', 'STUDENT STATUS')}</div>
                    <div className="recovery-summary-value-box">CNTT2</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('SỐ DƯ', 'BALANCE')}</div>
                    <div className="recovery-summary-value-box">{t('VND 0 đ', 'VND 0')}</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('NGÀNH HỌC', 'MAJOR')}</div>
                    <div className="recovery-summary-value-box">{t('Lập trình máy tính', 'Computer Programming')}</div>
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
              <span>{t('Quay lại danh sách', 'Back to list')}</span>
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
                  {t('Trở lại Dịch vụ trực tuyến', 'Back to Online Services')}
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
                    <div className="recovery-summary-label">{t('DỊCH VỤ', 'SERVICE')}</div>
                    <div className="recovery-summary-badge">Đăng ký tạm thời nghỉ học dài hạn</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('KỲ ĐỢT DỊCH VỤ:', 'SERVICE PERIOD:')}</div>
                    <div className="recovery-summary-value-box">FALL 2025</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('TRẠNG THÁI SINH VIÊN', 'STUDENT STATUS')}</div>
                    <div className="recovery-summary-value-box">CNTT2</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('SỐ DƯ', 'BALANCE')}</div>
                    <div className="recovery-summary-value-box">{t('VND 0 đ', 'VND 0')}</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('NGÀNH HỌC', 'MAJOR')}</div>
                    <div className="recovery-summary-value-box">{t('Lập trình máy tính', 'Computer Programming')}</div>
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

                  {/* Row 2: Thời gian mong muốn quay lại */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> Thời gian mong muốn quay lại (*)
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
                        placeholder={t('Vui lòng ghi rõ yêu cầu cần xử lý', 'Please specify your request details')}
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
                        placeholder={t('Vui lòng ghi rõ yêu cầu cần xử lý', 'Please specify your request details')}
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
                      <span className="bullet-circle">o</span> {t('Số điện thoại (*)', 'Phone Number (*)')}
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



                  {/* Row 11: Phí dịch vụ */}
                  <div className="recovery-field-row" style={{ borderBottom: 'none' }}>
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> {t('Phí dịch vụ', 'Service Fee')}
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
                    {t('SUBMIT', 'SUBMIT')}
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

        {/* Form 1: Đăng ký vắng thi */}
        {view === 'dk-vang-thi' && (
          <div className="recovery-form-wrapper" style={{ animation: 'fadeIn 0.5s ease' }}>
            <button onClick={() => setActiveItem?.('dv-khao-thi')} className="recovery-back-btn">
              <ArrowLeft size={16} />
              <span>{t('Quay lại danh sách', 'Back to list')}</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', textAlign: 'left' }}>
              <div style={{
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
              }}>
                <ClipboardList size={22} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1E293B', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Đăng ký vắng thi
              </h2>
            </div>

            {submitSuccess ? (
              <div className="recovery-success-box" style={{ textAlign: 'center', padding: '32px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                <div className="recovery-success-icon-wrapper" style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <CheckCircle2 size={56} className="text-emerald-500" />
                </div>
                <h3 className="recovery-success-title" style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                  Đăng ký vắng thi thành công!
                </h3>
                <p className="recovery-success-desc" style={{ color: '#475569', fontSize: '14.5px', marginBottom: '20px' }}>
                  Đơn xin vắng thi môn <strong>{vtSubject}</strong> ngày <strong>{vtDate}</strong> của bạn đã được gửi đến Nhà trường xem xét xử lý.
                </p>
                <button onClick={() => { setSubmitSuccess(false); setActiveItem?.('dv-khao-thi'); }} className="recovery-success-back-btn" style={{ backgroundColor: '#2563EB', color: '#FFFFFF', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {t('Trở lại Dịch vụ trực tuyến', 'Back to Online Services')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleVangThiSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {validationError && (
                  <div className="recovery-validation-banner" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', backgroundColor: '#FEF2F2', borderLeft: '4px solid #EF4444', borderRadius: '4px', color: '#991B1B', fontSize: '13.5px' }}>
                    <AlertCircle size={18} />
                    <span>{validationError}</span>
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '16px 20px',
                  backgroundColor: '#F0F7FF',
                  border: '1px solid #D0E7FF',
                  borderRadius: '8px',
                  color: '#1E3A8A',
                  textAlign: 'left'
                }}>
                  <div style={{ color: '#2563EB', flexShrink: 0, marginTop: '2px' }}>
                    <AlertCircle size={18} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>Thông tin</h4>
                    <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, color: '#1E3A8A' }}>
                      Dành cho sinh viên không thể tham dự kỳ thi theo lịch do lý do chính đáng.<br />
                      Sinh viên cần cung cấp lý do và minh chứng (nếu có) để Nhà trường xem xét xử lý theo quy định.
                    </p>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  textAlign: 'left'
                }}>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                      1. Chọn môn học <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <select 
                        value={vtSubject}
                        onChange={(e) => setVtSubject(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#1E293B', outline: 'none' }}
                      >
                        <option value="CT313 - Cấu trúc dữ liệu và giải thuật">CT313 - Cấu trúc dữ liệu và giải thuật</option>
                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                      2. Ngày thi <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <input 
                        type="date"
                        value={vtDate}
                        onChange={(e) => setVtDate(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#1E293B', outline: 'none', fontFamily: 'inherit' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                      3. Ca thi
                    </label>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <select 
                        value={vtSlot}
                        onChange={(e) => setVtSlot(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#1E293B', outline: 'none' }}
                      >
                        <option value="Ca 1 (07:30 - 09:30)">Ca 1 (07:30 - 09:30)</option>
                        <option value="Ca 2 (09:40 - 11:40)">Ca 2 (09:40 - 11:40)</option>
                        <option value="Ca 3 (12:30 - 14:30)">Ca 3 (12:30 - 14:30)</option>
                        <option value="Ca 4 (14:40 - 16:40)">Ca 4 (14:40 - 16:40)</option>
                        <option value="Ca 5 (17:00 - 19:00)">Ca 5 (17:00 - 19:00)</option>
                        <option value="Ca 6 (19:10 - 21:10)">Ca 6 (19:10 - 21:10)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                      4. Lý do vắng thi <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <textarea 
                        value={vtReason}
                        onChange={(e) => setVtReason(e.target.value.slice(0, 500))}
                        maxLength={500}
                        style={{ width: '100%', minHeight: '100px', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#1E293B', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
                      />
                      <span style={{ alignSelf: 'flex-end', fontSize: '11px', color: '#64748B' }}>
                        {vtReason.length}/500
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                      5. Tài liệu đính kèm (nếu có)
                    </label>
                    <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      
                      {!vtFileAttached ? (
                        <div 
                          onClick={() => setVtFileAttached(true)}
                          style={{
                            border: '2px dashed #E2E8F0',
                            borderRadius: '8px',
                            padding: '24px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: '#FAFAFA',
                            transition: 'border-color 0.2s',
                          }}
                          onMouseOver={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                          onMouseOut={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
                        >
                          <Upload size={24} style={{ color: '#64748B', marginBottom: '8px', margin: '0 auto' }} />
                          <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#475569' }}>
                            Kéo thả file vào đây hoặc <span style={{ color: '#2563EB', fontWeight: '600' }}>chọn file</span>
                          </p>
                          <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                            Định dạng: PDF, JPG, PNG (Tối đa 5MB)
                          </span>
                        </div>
                      ) : (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px',
                          backgroundColor: '#F8FAFC'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ color: '#64748B' }}>
                              <FileText size={20} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <span style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B' }}>{vtFileName}</span>
                              <span style={{ fontSize: '11px', color: '#64748B' }}>{vtFileSize}</span>
                            </div>
                          </div>
                          <button 
                            type="button"
                            onClick={() => setVtFileAttached(false)}
                            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '4px' }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}

                    </div>
                  </div>

                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px' }}>
                  <button 
                    type="button" 
                    onClick={() => { resetVangThiForm(); setActiveItem?.('dv-khao-thi'); }}
                    style={{
                      padding: '10px 32px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    Hủy bỏ
                  </button>
                  <button 
                    type="submit"
                    style={{
                      padding: '10px 32px',
                      backgroundColor: '#2563EB',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
                    }}
                  >
                    Gửi đăng ký
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Form 2: Đăng ký phúc khảo */}
        {view === 'phuc-khao' && (
          <div className="recovery-form-wrapper" style={{ animation: 'fadeIn 0.5s ease' }}>
            <button onClick={() => setActiveItem?.('dv-khao-thi')} className="recovery-back-btn">
              <ArrowLeft size={16} />
              <span>{t('Quay lại danh sách', 'Back to list')}</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', textAlign: 'left' }}>
              <div style={{
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
              }}>
                <ClipboardList size={22} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1E293B', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Đăng ký phúc khảo
              </h2>
            </div>

            {submitSuccess ? (
              <div className="recovery-success-box" style={{ textAlign: 'center', padding: '32px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                <div className="recovery-success-icon-wrapper" style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <CheckCircle2 size={56} className="text-emerald-500" />
                </div>
                <h3 className="recovery-success-title" style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                  Đăng ký phúc khảo thành công!
                </h3>
                <p className="recovery-success-desc" style={{ color: '#475569', fontSize: '14.5px', marginBottom: '20px' }}>
                  Yêu cầu phúc khảo môn <strong>{pkSubject}</strong> ({pkSemester}) điểm hiện tại: <strong>{pkScore}</strong> của bạn đã được ghi nhận.
                </p>
                <button onClick={() => { setSubmitSuccess(false); setActiveItem?.('dv-khao-thi'); }} className="recovery-success-back-btn" style={{ backgroundColor: '#2563EB', color: '#FFFFFF', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {t('Trở lại Dịch vụ trực tuyến', 'Back to Online Services')}
                </button>
              </div>
            ) : (
              <form onSubmit={handlePhucKhaoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {validationError && (
                  <div className="recovery-validation-banner" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', backgroundColor: '#FEF2F2', borderLeft: '4px solid #EF4444', borderRadius: '4px', color: '#991B1B', fontSize: '13.5px' }}>
                    <AlertCircle size={18} />
                    <span>{validationError}</span>
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '16px 20px',
                  backgroundColor: '#F0F7FF',
                  border: '1px solid #D0E7FF',
                  borderRadius: '8px',
                  color: '#1E3A8A',
                  textAlign: 'left'
                }}>
                  <div style={{ color: '#2563EB', flexShrink: 0, marginTop: '2px' }}>
                    <AlertCircle size={18} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>Thông tin</h4>
                    <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, color: '#1E3A8A' }}>
                      Dành cho sinh viên có nhu cầu đề nghị Nhà trường kiểm tra, rà soát lại kết quả điểm thi đã công bố.<br />
                      Sinh viên vui lòng thanh toán <strong>50.000đ</strong> phí phúc khảo. Nhà trường sẽ chỉ tiếp nhận và xử lý hồ sơ sau khi xác nhận thanh toán.
                    </p>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  textAlign: 'left'
                }}>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                      1. Chọn học kỳ <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <select 
                        value={pkSemester}
                        onChange={(e) => setPkSemester(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#1E293B', outline: 'none' }}
                      >
                        <option value="Học kỳ 2 - Năm học 2024 - 2025">Học kỳ 2 - Năm học 2024 - 2025</option>
                        <option value="Học kỳ 1 - Năm học 2024 - 2025">Học kỳ 1 - Năm học 2024 - 2025</option>
                        <option value="Học kỳ 3 - Năm học 2023 - 2024">Học kỳ 3 - Năm học 2023 - 2024</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                      2. Chọn môn học <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <select 
                        value={pkSubject}
                        onChange={(e) => setPkSubject(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#1E293B', outline: 'none' }}
                      >
                        <option value="CT313 - Cấu trúc dữ liệu và giải thuật">CT313 - Cấu trúc dữ liệu và giải thuật</option>
                        {SUBJECTS.filter(s => !s.includes('CT313')).map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                      3. Điểm hiện tại <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <input 
                        type="text"
                        value={pkScore}
                        onChange={(e) => setPkScore(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#1E293B', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                      4. Nội dung đề nghị phúc khảo <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <textarea 
                        value={pkContent}
                        onChange={(e) => setPkContent(e.target.value.slice(0, 500))}
                        maxLength={500}
                        style={{ width: '100%', minHeight: '100px', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#1E293B', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
                      />
                      <span style={{ alignSelf: 'flex-end', fontSize: '11px', color: '#64748B' }}>
                        {pkContent.length}/500
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                      5. Ghi chú bổ sung
                    </label>
                    <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <textarea 
                        value={pkNote}
                        onChange={(e) => setPkNote(e.target.value.slice(0, 300))}
                        maxLength={300}
                        placeholder="Nhập thông tin bổ sung (nếu có)"
                        style={{ width: '100%', minHeight: '80px', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#1E293B', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
                      />
                      <span style={{ alignSelf: 'flex-end', fontSize: '11px', color: '#64748B' }}>
                        {pkNote.length}/300
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                      6. Đính kèm tệp (Hóa đơn thanh toán) <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {!pkFileAttached ? (
                        <div 
                          onClick={() => setPkFileAttached(true)}
                          style={{
                            border: '2px dashed #E2E8F0',
                            borderRadius: '8px',
                            padding: '24px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: '#FAFAFA',
                            transition: 'border-color 0.2s',
                          }}
                          onMouseOver={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                          onMouseOut={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
                        >
                          <Upload size={24} style={{ color: '#64748B', marginBottom: '8px', margin: '0 auto' }} />
                          <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#475569' }}>
                            Kéo thả file vào đây hoặc <span style={{ color: '#2563EB', fontWeight: '600' }}>chọn file</span>
                          </p>
                          <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                            Định dạng: PDF, JPG, PNG (Tối đa 5MB)
                          </span>
                        </div>
                      ) : (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px',
                          backgroundColor: '#F8FAFC'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ color: '#64748B' }}>
                              <FileText size={20} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <span style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B' }}>{pkFileName}</span>
                              <span style={{ fontSize: '11px', color: '#64748B' }}>{pkFileSize}</span>
                            </div>
                          </div>
                          <button 
                            type="button"
                            onClick={() => setPkFileAttached(false)}
                            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '4px' }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 18px',
                  backgroundColor: '#F0F9FF',
                  border: '1px solid #BAE6FD',
                  borderRadius: '6px',
                  color: '#0369A1',
                  fontSize: '13px',
                  textAlign: 'left'
                }}>
                  <div style={{ color: '#0284C7', flexShrink: 0 }}>
                    <CheckCircle2 size={16} />
                  </div>
                  <span>
                    <strong>Lưu ý:</strong> Nhà trường sẽ phản hồi kết quả phúc khảo theo quy định. Sinh viên vui lòng theo dõi thông báo trên hệ thống.
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px' }}>
                  <button 
                    type="button" 
                    onClick={() => { resetPhucKhaoForm(); setActiveItem?.('dv-khao-thi'); }}
                    style={{
                      padding: '10px 32px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    Hủy bỏ
                  </button>
                  <button 
                    type="submit"
                    style={{
                      padding: '10px 32px',
                      backgroundColor: '#2563EB',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
                    }}
                  >
                    Gửi đăng ký
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Form 3: Đăng ký thi lại / Thi bổ sung */}
        {view === 'dk-thi-lai' && (
          <div className="recovery-form-wrapper" style={{ animation: 'fadeIn 0.5s ease' }}>
            <button onClick={() => setActiveItem?.('dv-khao-thi')} className="recovery-back-btn">
              <ArrowLeft size={16} />
              <span>{t('Quay lại danh sách', 'Back to list')}</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', textAlign: 'left' }}>
              <div style={{
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
              }}>
                <ClipboardList size={22} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1E293B', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Đăng ký thi lại / Thi bổ sung
              </h2>
            </div>

            {submitSuccess ? (
              <div className="recovery-success-box" style={{ textAlign: 'center', padding: '32px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                <div className="recovery-success-icon-wrapper" style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <CheckCircle2 size={56} className="text-emerald-500" />
                </div>
                <h3 className="recovery-success-title" style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                  Đăng ký thi lại thành công!
                </h3>
                <p className="recovery-success-desc" style={{ color: '#475569', fontSize: '14.5px', marginBottom: '20px' }}>
                  Yêu cầu <strong>{tlType === 'thi-lai' ? 'Thi lại' : 'Thi bổ sung'}</strong> môn <strong>{tlSubject}</strong> ({tlSemester}) đã được gửi đi.
                </p>
                <button onClick={() => { setSubmitSuccess(false); setActiveItem?.('dv-khao-thi'); }} className="recovery-success-back-btn" style={{ backgroundColor: '#2563EB', color: '#FFFFFF', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {t('Trở lại Dịch vụ trực tuyến', 'Back to Online Services')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleThiLaiSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {validationError && (
                  <div className="recovery-validation-banner" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', backgroundColor: '#FEF2F2', borderLeft: '4px solid #EF4444', borderRadius: '4px', color: '#991B1B', fontSize: '13.5px' }}>
                    <AlertCircle size={18} />
                    <span>{validationError}</span>
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '16px 20px',
                  backgroundColor: '#F0F7FF',
                  border: '1px solid #D0E7FF',
                  borderRadius: '8px',
                  color: '#1E3A8A',
                  textAlign: 'left'
                }}>
                  <div style={{ color: '#2563EB', flexShrink: 0, marginTop: '2px' }}>
                    <AlertCircle size={18} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>Thông tin</h4>
                    <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, color: '#1E3A8A' }}>
                      Dành cho sinh viên đăng ký tham gia kỳ thi lại hoặc kỳ thi bổ sung theo quy định đào tạo của Nhà trường.<br />
                      Sinh viên vui lòng thanh toán lệ phí <strong>300.000đ</strong> cho mỗi lần thi lại/thi bổ sung và đính kèm hóa đơn thanh toán để hoàn tất hồ sơ. Nhà trường sẽ chỉ tiếp nhận và xử lý hồ sơ sau khi xác nhận thanh toán.
                    </p>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  textAlign: 'left'
                }}>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                      1. Chọn học kỳ <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <select 
                        value={tlSemester}
                        onChange={(e) => setTlSemester(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#1E293B', outline: 'none' }}
                      >
                        <option value="Học kỳ 2 - Năm học 2024 - 2025">Học kỳ 2 - Năm học 2024 - 2025</option>
                        <option value="Học kỳ 1 - Năm học 2024 - 2025">Học kỳ 1 - Năm học 2024 - 2025</option>
                        <option value="Học kỳ 3 - Năm học 2023 - 2024">Học kỳ 3 - Năm học 2023 - 2024</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                      2. Chọn môn học <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <select 
                        value={tlSubject}
                        onChange={(e) => setTlSubject(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#1E293B', outline: 'none' }}
                      >
                        <option value="CT313 - Cấu trúc dữ liệu và giải thuật">CT313 - Cấu trúc dữ liệu và giải thuật</option>
                        {SUBJECTS.filter(s => !s.includes('CT313')).map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '2px' }}>
                      3. Hình thức đăng ký <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#1E293B', cursor: 'pointer' }}>
                          <input 
                            type="radio"
                            name="tlType"
                            checked={tlType === 'thi-lai'}
                            onChange={() => setTlType('thi-lai')}
                            style={{ width: '16px', height: '16px', accentColor: '#2563EB' }}
                          />
                          Thi lại
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#1E293B', cursor: 'pointer' }}>
                          <input 
                            type="radio"
                            name="tlType"
                            checked={tlType === 'thi-bo-sung'}
                            onChange={() => setTlType('thi-bo-sung')}
                            style={{ width: '16px', height: '16px', accentColor: '#2563EB' }}
                          />
                          Thi bổ sung
                        </label>
                      </div>

                      <div style={{
                        padding: '12px 16px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#475569',
                        lineHeight: 1.6
                      }}>
                        <div style={{ marginBottom: '4px' }}>• <strong>Thi lại:</strong> Dành cho sinh viên đã thi nhưng không đạt.</div>
                        <div>• <strong>Thi bổ sung:</strong> Dành cho sinh viên chưa thi do được phép dự thi bổ sung theo quy định.</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                      4. Lý do đăng ký
                    </label>
                    <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <textarea 
                        value={tlReason}
                        onChange={(e) => setTlReason(e.target.value.slice(0, 300))}
                        maxLength={300}
                        placeholder="Nhập lý do đăng ký (nếu có)"
                        style={{ width: '100%', minHeight: '80px', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#1E293B', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
                      />
                      <span style={{ alignSelf: 'flex-end', fontSize: '11px', color: '#64748B' }}>
                        {tlReason.length}/300
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                      5. Ghi chú bổ sung
                    </label>
                    <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <textarea 
                        value={tlNote}
                        onChange={(e) => setTlNote(e.target.value.slice(0, 300))}
                        maxLength={300}
                        placeholder="Nhập thông tin bổ sung (nếu có)"
                        style={{ width: '100%', minHeight: '80px', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#1E293B', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
                      />
                      <span style={{ alignSelf: 'flex-end', fontSize: '11px', color: '#64748B' }}>
                        {tlNote.length}/300
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                      6. Đính kèm tệp (Hóa đơn thanh toán) <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {!tlFileAttached ? (
                        <div 
                          onClick={() => setTlFileAttached(true)}
                          style={{
                            border: '2px dashed #E2E8F0',
                            borderRadius: '8px',
                            padding: '24px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: '#FAFAFA',
                            transition: 'border-color 0.2s',
                          }}
                          onMouseOver={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                          onMouseOut={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
                        >
                          <Upload size={24} style={{ color: '#64748B', marginBottom: '8px', margin: '0 auto' }} />
                          <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#475569' }}>
                            Kéo thả file vào đây hoặc <span style={{ color: '#2563EB', fontWeight: '600' }}>chọn file</span>
                          </p>
                          <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                            Định dạng: PDF, JPG, PNG (Tối đa 5MB)
                          </span>
                        </div>
                      ) : (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px',
                          backgroundColor: '#F8FAFC'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ color: '#64748B' }}>
                              <FileText size={20} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <span style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B' }}>{tlFileName}</span>
                              <span style={{ fontSize: '11px', color: '#64748B' }}>{tlFileSize}</span>
                            </div>
                          </div>
                          <button 
                            type="button"
                            onClick={() => setTlFileAttached(false)}
                            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '4px' }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 18px',
                  backgroundColor: '#FFFBEB',
                  border: '1px solid #FDE68A',
                  borderRadius: '6px',
                  color: '#B45309',
                  fontSize: '13px',
                  textAlign: 'left'
                }}>
                  <div style={{ color: '#D97706', flexShrink: 0 }}>
                    <AlertCircle size={16} />
                  </div>
                  <span>
                    <strong>Lưu ý:</strong> Sinh viên cần theo dõi thông báo lịch thi được phòng Đào tạo công bố. Việc đăng ký không đảm bảo được xếp lịch thi.
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px' }}>
                  <button 
                    type="button" 
                    onClick={() => { resetThiLaiForm(); setActiveItem?.('dv-khao-thi'); }}
                    style={{
                      padding: '10px 32px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    Hủy bỏ
                  </button>
                  <button 
                    type="submit"
                    style={{
                      padding: '10px 32px',
                      backgroundColor: '#2563EB',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
                    }}
                  >
                    Gửi đăng ký
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Form 4: Đăng ký bảo lưu kết quả học tập */}
        {view === 'bao-luu-kqht' && (
          <div className="recovery-form-wrapper" style={{ animation: 'fadeIn 0.5s ease', position: 'relative' }}>
            <button onClick={() => setActiveItem?.('dv-khao-thi')} className="recovery-back-btn">
              <ArrowLeft size={16} />
              <span>{t('Quay lại danh sách', 'Back to list')}</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', textAlign: 'left' }}>
              <div style={{
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
              }}>
                <FileText size={22} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1E293B', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Đăng ký bảo lưu kết quả học tập
              </h2>
            </div>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Top Warning/Info Box */}
              <div style={{
                display: 'flex',
                gap: '12px',
                padding: '16px 20px',
                backgroundColor: '#E9EDF7',
                border: '1px solid #D1D9EB',
                borderRadius: '8px',
                color: '#1E3A8A',
                textAlign: 'left'
              }}>
                <div style={{ color: '#2563EB', flexShrink: 0, marginTop: '2px' }}>
                  <AlertCircle size={18} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold', color: '#1E293B' }}>Thông tin</h4>
                  <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, color: '#334155' }}>
                    Dành cho sinh viên có nhu cầu bảo lưu kết quả học tập.<br />
                    Sinh viên chỉ được đăng ký sau khi đã hoàn thành <strong style={{ color: '#0056B3' }}>tối thiểu 1 học kỳ</strong>.
                  </p>
                </div>
              </div>

              {/* Form inputs panel */}
              <div style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                textAlign: 'left',
                opacity: blShowWarningModal ? 0.6 : 1,
                filter: blShowWarningModal ? 'blur(1px)' : 'none',
                transition: 'opacity 0.3s, filter 0.3s'
              }}>
                
                {/* 1. Học kỳ đăng ký */}
                <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                    1. Học kỳ đăng ký <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <select 
                      disabled
                      value={blSemester}
                      onChange={(e) => setBlSemester(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#64748B', backgroundColor: '#F8FAFC', outline: 'none', cursor: 'not-allowed' }}
                    >
                      <option value="">Chọn học kỳ đăng ký</option>
                      <option value="Học kỳ 1">Học kỳ 1</option>
                      <option value="Học kỳ 2">Học kỳ 2</option>
                    </select>
                  </div>
                </div>

                {/* 2. Lý do bảo lưu */}
                <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                    2. Lý do bảo lưu <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <select 
                      disabled
                      value={blReason}
                      onChange={(e) => setBlReason(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#64748B', backgroundColor: '#F8FAFC', outline: 'none', cursor: 'not-allowed' }}
                    >
                      <option value="">Chọn lý do bảo lưu</option>
                      <option value="Sức khỏe">Sức khỏe</option>
                      <option value="Tài chính">Tài chính</option>
                      <option value="Cá nhân">Cá nhân</option>
                    </select>
                  </div>
                </div>

                {/* 3. Thời gian bảo lưu dự kiến */}
                <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                    3. Thời gian bảo lưu dự kiến <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ position: 'relative', width: '100%' }}>
                      <input 
                        type="text"
                        placeholder="Chọn thời gian bảo lưu"
                        disabled
                        value={blDuration}
                        onChange={(e) => setBlDuration(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', paddingRight: '40px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#64748B', backgroundColor: '#F8FAFC', outline: 'none', cursor: 'not-allowed' }}
                      />
                      <div style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#64748B',
                        pointerEvents: 'none'
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Thông tin bổ sung */}
                <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                    4. Thông tin bổ sung
                  </label>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ position: 'relative', width: '100%' }}>
                      <textarea 
                        placeholder=""
                        disabled
                        value={blNote}
                        onChange={(e) => setBlNote(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', color: '#64748B', backgroundColor: '#F8FAFC', height: '100px', resize: 'none', outline: 'none', cursor: 'not-allowed' }}
                      />
                      <div style={{
                        position: 'absolute',
                        right: '12px',
                        bottom: '8px',
                        fontSize: '12px',
                        color: '#94A3B8'
                      }}>
                        0/300
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Đính kèm minh chứng */}
                <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <label style={{ width: '220px', flexShrink: 0, fontSize: '14px', fontWeight: '600', color: '#1E293B', marginTop: '10px' }}>
                    5. Đính kèm minh chứng (nếu có)
                  </label>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    {!blFileAttached ? (
                      <div style={{
                        width: '100%',
                        padding: '24px',
                        border: '1px dashed #CBD5E1',
                        borderRadius: '8px',
                        backgroundColor: '#F8FAFC',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        color: '#94A3B8',
                        cursor: 'not-allowed'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload-cloud"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
                          <span style={{ fontSize: '14px' }}>
                            Kéo thả file vào đây hoặc <span style={{ color: '#0056B3', textDecoration: 'underline', cursor: 'not-allowed' }}>chọn file</span>
                          </span>
                        </div>
                        <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                          Định dạng: PDF, JPG, PNG (Tối đa 5MB)
                        </span>
                      </div>
                    ) : (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        backgroundColor: '#F8FAFC',
                        color: '#64748B',
                        cursor: 'not-allowed'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <FileText size={20} />
                          <span>minh-chung.pdf</span>
                        </div>
                        <button type="button" onClick={() => setBlFileAttached(false)} disabled style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'not-allowed' }}>
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Bottom Warning/Note */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 18px',
                backgroundColor: '#FFFBEB',
                border: '1px solid #FDE68A',
                borderRadius: '6px',
                color: '#B45309',
                fontSize: '13px',
                textAlign: 'left',
                opacity: blShowWarningModal ? 0.6 : 1,
                filter: blShowWarningModal ? 'blur(1px)' : 'none',
                transition: 'opacity 0.3s, filter 0.3s'
              }}>
                <div style={{ color: '#D97706', flexShrink: 0 }}>
                  <AlertCircle size={16} />
                </div>
                <span>
                  <strong>Lưu ý:</strong> Nhà trường sẽ xem xét và phản hồi yêu cầu bảo lưu theo quy định.
                </span>
              </div>

              {/* Bottom Buttons */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginTop: '12px',
                opacity: blShowWarningModal ? 0.6 : 1,
                filter: blShowWarningModal ? 'blur(1px)' : 'none',
                transition: 'opacity 0.3s, filter 0.3s'
              }}>
                <button 
                  type="button" 
                  onClick={() => { resetBaoLuuForm(); setActiveItem?.('dv-hoc-vu'); }}
                  style={{
                    padding: '10px 32px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#475569',
                    cursor: 'pointer'
                  }}
                >
                  Hủy bỏ
                </button>
                <button 
                  type="button"
                  disabled
                  style={{
                    padding: '10px 32px',
                    backgroundColor: '#CBD5E1',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#94A3B8',
                    cursor: 'not-allowed'
                  }}
                >
                  Gửi đăng ký
                </button>
              </div>
            </form>

            {/* In-page Warning Modal Overlay */}
            {blShowWarningModal && (
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                animation: 'fadeIn 0.2s ease forwards',
                borderRadius: '8px'
              }}>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '36px 32px 32px 32px',
                  maxWidth: '480px',
                  width: '90%',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  border: '1px solid #E2E8F0',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                  animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                }}>
                  {/* Orange circle with exclamation mark */}
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    border: '3px solid #F97316',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F97316',
                    marginBottom: '4px'
                  }}>
                    <span style={{ fontSize: '32px', fontWeight: 'bold', fontFamily: 'serif', lineHeight: 1 }}>!</span>
                  </div>

                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1E293B',
                    margin: 0,
                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                  }}>
                    Không thể đăng ký
                  </h3>

                  <p style={{
                    fontSize: '14.5px',
                    color: '#475569',
                    lineHeight: 1.6,
                    margin: 0,
                    textAlign: 'center'
                  }}>
                    Bạn chỉ được phép đăng ký bảo lưu kết quả học tập<br />
                    sau khi đã hoàn thành <strong style={{ color: '#0056B3' }}>tối thiểu 1 học kỳ</strong>.<br />
                    Vui lòng kiểm tra lại thông tin học tập của mình.
                  </p>

                  <button
                    onClick={() => setBlShowWarningModal(false)}
                    style={{
                      marginTop: '8px',
                      padding: '10px 48px',
                      backgroundColor: '#0056B3',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      outline: 'none'
                    }}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'other-services' && (
          <div className="recovery-form-wrapper" style={{ animation: 'fadeIn 0.5s ease' }}>
            
            {/* Navigation back */}
            <button onClick={() => setView('list')} className="recovery-back-btn">
              <ArrowLeft size={16} />
              <span>{t('Quay lại danh sách', 'Back to list')}</span>
            </button>

            {/* Title Section */}
            <div className="recovery-title-section">
              <h2 className="recovery-form-title">{t('ĐĂNG KÝ DỊCH VỤ KHÁC', 'OTHER REGISTRATION & SERVICES')}</h2>
              <p className="recovery-form-subtitle">
                YOU ARE REQUIRED TO FULFILL BLANK BOXES BELOW TO FINISH YOUR REQUEST AND ATTACH SUPPORTING DOCUMENTS (IF ANY) BEFORE SUBMITTING THIS FORM
              </p>
            </div>

            {submitSuccess ? (
              <div className="recovery-success-box">
                <div className="recovery-success-icon-wrapper">
                  <CheckCircle2 size={48} className="text-emerald-500" />
                </div>
                <h3 className="recovery-success-title">{t('Đăng ký dịch vụ thành công!', 'Service Registration Successful!')}</h3>
                <p className="recovery-success-desc">
                  {t('Yêu cầu đăng ký dịch vụ khác của bạn đã được gửi thành công tới Ban Đào Tạo.', 'Your request for other service has been successfully submitted to the Academic Affairs Department.')}
                </p>
                <button onClick={() => setView('list')} className="recovery-success-back-btn">
                  {t('Trở lại Dịch vụ trực tuyến', 'Back to Online Services')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleOtherSubmit} className="recovery-form-element">
                
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
                    <div className="recovery-summary-label">{t('DỊCH VỤ', 'SERVICE')}</div>
                    <div className="recovery-summary-badge">{t('Đăng ký dịch vụ khác', 'Other registration & services')}</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('KỲ ĐỢT DỊCH VỤ:', 'SERVICE PERIOD:')}</div>
                    <div className="recovery-summary-value-box">FALL 2023</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('TRẠNG THÁI SINH VIÊN', 'STUDENT STATUS')}</div>
                    <div className="recovery-summary-value-box">CNTT2</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('SỐ DƯ', 'BALANCE')}</div>
                    <div className="recovery-summary-value-box">{t('VND 0 đ', 'VND 0')}</div>
                  </div>
                  <div className="recovery-summary-item">
                    <div className="recovery-summary-label">{t('NGÀNH HỌC', 'MAJOR')}</div>
                    <div className="recovery-summary-value-box">{t('Lập trình máy tính', 'Computer Programming')}</div>
                  </div>
                </div>

                {/* Main Form Fields Layout */}
                <div className="recovery-fields-card">
                  
                  {/* Row 1: Nội dung yêu cầu xử lý */}
                  <div className="recovery-field-row" style={{ minHeight: '140px', alignItems: 'stretch' }}>
                    <div className="recovery-field-label" style={{ alignSelf: 'flex-start', paddingTop: '16px' }}>
                      <span className="bullet-circle">o</span> {t('Nội dung yêu cầu xử lý (*)', 'Request Details (*)')}
                    </div>
                    <div className="recovery-field-input-wrapper" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <textarea 
                        value={otherContent} 
                        onChange={(e) => setOtherContent(e.target.value.slice(0, 500))} 
                        placeholder={t('Vui lòng ghi rõ yêu cầu cần xử lý', 'Please specify your request details')}
                        className="recovery-textarea-element"
                        style={{ minHeight: '100px', resize: 'vertical' }}
                      />
                      <div className="recovery-char-counter">
                        {otherContent.length} / 500 {t('ký tự', 'characters')}
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Phòng ban xử lý */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> {t('Phòng ban xử lý', 'Processing Department')}
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <select 
                        value={otherDept} 
                        onChange={(e) => setOtherDept(e.target.value)} 
                        className="recovery-select-element"
                      >
                        <option value="TC&QLĐT">TC&QLĐT</option>
                        <option value="ĐVSV">ĐVSV</option>
                        <option value="KT">KT</option>
                        <option value="CTSV">CTSV</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Số điện thoại */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> {t('Số điện thoại (*)', 'Phone Number (*)')}
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <input 
                        type="tel" 
                        value={otherPhone} 
                        onChange={(e) => setOtherPhone(e.target.value)} 
                        placeholder={t('Nhập số điện thoại của bạn', 'Enter your phone number')}
                        className="recovery-input-element"
                      />
                    </div>
                  </div>

                  {/* Row 4: Phí dịch vụ */}
                  <div className="recovery-field-row">
                    <div className="recovery-field-label">
                      <span className="bullet-circle">o</span> {t('Phí dịch vụ', 'Service Fee')}
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
                      <span className="bullet-circle">o</span> {t('Tài liệu đính kèm', 'Attachments')}
                    </div>
                    <div className="recovery-field-input-wrapper">
                      <div className="recovery-file-upload-container">
                        <input 
                          type="file" 
                          id="other-file-attachment" 
                          onChange={handleOtherFileChange}
                          style={{ display: 'none' }}
                        />
                        <div className="recovery-file-info-row">
                          <span className="recovery-file-path-input">
                            {otherFileName || t('Choose file', 'Choose file')}
                          </span>
                          <label htmlFor="other-file-attachment" className="recovery-file-browse-btn">
                            {t('Browse', 'Browse')}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="recovery-form-actions">
                  <button type="submit" className="recovery-btn-submit">
                    {t('SUBMIT', 'SUBMIT')}
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
