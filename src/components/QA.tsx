import { useState } from 'react';
import { Eye } from 'lucide-react';

interface QAEntry {
  no: number;
  categoryVi: string;
  categoryEn: string;
  questionVi: string;
  questionEn: string;
  answerVi: string;
  answerEn: string;
  issueDate: string;
}

interface QAProps {
  lang: 'vi' | 'en';
}

export const QA = ({ lang }: QAProps) => {
  // Bilingual translator helper
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  // State hooks
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedQuestion, setSelectedQuestion] = useState<QAEntry | null>(null);

  // Search/Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  // Active filters applied on Search button click
  const [appliedCategory, setAppliedCategory] = useState<string>('All');
  const [appliedDate, setAppliedDate] = useState<string>('');
  const [appliedSearch, setAppliedSearch] = useState<string>('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Seed Q&A list with 37 entries to match mockup
  const qaData: QAEntry[] = [
    {
      no: 1,
      categoryVi: 'Dịch vụ sinh viên',
      categoryEn: 'Student services',
      questionVi: 'Sinh viên muốn xin chuyển ngành cần làm gì ?',
      questionEn: 'What should a student do if they want to transfer majors?',
      answerVi: 'Sinh viên có Sinh viên có nguyện vọng chuyển ngành cần làm đơn xin chuyển ngành và nộp lại cho phòng dịch vụ sinh viên (SRO) tại văn phòng trường. Đơn xin chuyển ngành cần có chữ ký đồng ý của phụ huynh.',
      answerEn: 'Students wishing to transfer majors must fill out a major transfer application and submit it to the Student Services Office (SRO) at the school office. The application must include parent consent signature.',
      issueDate: '6/4/2023 11:00:00 AM'
    },
    {
      no: 2,
      categoryVi: 'Dịch vụ sinh viên',
      categoryEn: 'Student services',
      questionVi: 'Sinh viên có nguyện vọng thôi học cần làm gì?',
      questionEn: 'What should a student do if they wish to withdraw from school?',
      answerVi: 'Sinh viên có nguyện vọng thôi học làm đơn Đăng ký thôi học, hoàn thành thủ tục ký nhận từ các phòng ban liên quan (Thư viện, Tài chính, Đào tạo, SRO) và nộp lại cho phòng dịch vụ sinh viên.',
      answerEn: 'Students wishing to withdraw from school must fill out a School Withdrawal Application, complete the sign-off procedures from relevant departments (Library, Finance, Academic, SRO), and submit it to the Student Services Office.',
      issueDate: '6/4/2023 11:00:00 AM'
    },
    {
      no: 3,
      categoryVi: 'Tốt nghiệp',
      categoryEn: 'Graduation',
      questionVi: 'Thủ tục bảo lưu',
      questionEn: 'Suspension / Deferred study procedures',
      answerVi: 'Sinh viên có nguyện vọng Bảo lưu có thể đăng ký đơn xin bảo lưu kết quả học tập tại Cổng thông tin. Thời gian bảo lưu tối đa là 1 năm (2 học kỳ liên tiếp).',
      answerEn: 'Students wishing to suspend their studies can apply for academic suspension on the Portal. The maximum suspension period is 1 year (2 consecutive semesters).',
      issueDate: '6/4/2023 11:00:00 AM'
    },
    {
      no: 4,
      categoryVi: 'Dịch vụ sinh viên',
      categoryEn: 'Student services',
      questionVi: 'Lấy bằng tốt nghiệp cần chuẩn bị những giấy tờ gì ?',
      questionEn: 'What documents are required to pick up the graduation diploma?',
      answerVi: 'Sinh viên trực tiếp nhận bằng mang theo CMT/CCCD/Hộ chiếu bản chính để đối chiếu. Nếu nhận thay phải có giấy ủy quyền công chứng hợp lệ kèm CMT của người được ủy quyền.',
      answerEn: 'Students receiving their diploma in person must bring their original CMT/CCCD/Passport for verification. If received on behalf, a valid notarized authorization letter and the authorized person\'s ID are required.',
      issueDate: '6/4/2023 11:00:00 AM'
    },
    {
      no: 5,
      categoryVi: 'Học thuật',
      categoryEn: 'Academic',
      questionVi: 'Phụ huynh muốn có email để vào xem lịch học và điểm của sinh viên',
      questionEn: 'Parents want an email to access and view student schedule and grades',
      answerVi: 'Cách 1: Phụ huynh gọi đến số Hotline của cơ sở sinh viên đang học tập để được nhân viên hỗ trợ trực tiếp.\nCách 2: Gửi email yêu cầu đến phòng đào tạo kèm thông tin xác nhận nhân thân phụ huynh.',
      answerEn: 'Method 1: Parents call the Hotline of the campus where the student is studying for direct support.\nMethod 2: Send a request email to the academic department with proof of parental identity.',
      issueDate: '6/4/2023 11:00:00 AM'
    },
    {
      no: 6,
      categoryVi: 'Dịch vụ sinh viên',
      categoryEn: 'Student services',
      questionVi: 'Sinh viên bị lỗi điểm danh',
      questionEn: 'Student attendance marking error',
      answerVi: '- Sinh viên có nguyện vọng xin nghỉ buổi học hoặc giải trình điểm danh bù có thể gửi đơn giải trình tại mục Đăng ký nghỉ buổi học trực tuyến trên portal trong vòng 48h kể từ buổi học bị thiếu.',
      answerEn: 'Students requesting leave of absence or attendance recovery can submit a clarification form in the Online Leave of Absence section on the portal within 48 hours of the missed class.',
      issueDate: '6/4/2023 11:00:00 AM'
    },
    {
      no: 7,
      categoryVi: 'Dịch vụ sinh viên',
      categoryEn: 'Student services',
      questionVi: 'Nhận giấy XNSV',
      questionEn: 'Receiving student certification letter (XNSV)',
      answerVi: '* Sinh viên cần xin giấy XNSV có thể đăng ký đơn XNSV trực tuyến tại Cổng dịch vụ trực tuyến. Thời gian xử lý là 1-2 ngày làm việc.',
      answerEn: 'Students needing a student certification letter can apply online at the Online Services Portal. Processing time is 1-2 working days.',
      issueDate: '6/4/2023 11:00:00 AM'
    },
    {
      no: 8,
      categoryVi: 'Học thuật',
      categoryEn: 'Academic',
      questionVi: 'SV mất thẻ SV thì phải làm gì?',
      questionEn: 'What should a student do if they lose their student card?',
      answerVi: '*Nếu SV đang học làm mất thẻ : SV cần đăng ký Làm lại thẻ SV tại Dịch vụ trực tuyến trên Fap.fpi.edu.vn (đóng phí làm lại thẻ 100.000/thẻ).\n-Sinh viên có thể thanh toán phí làm thẻ sinh viên bằng cách thanh toán qua cổng thanh toán DNG hoặc trừ số dư tại Ví (nếu số dư đủ).',
      answerEn: '*If a current student loses their card: The student needs to register for a Student Card Reissue at Online Services on Fap.fpi.edu.vn (fee of 100,000 VND/card).\n-Students can pay the fee via the DNG payment gateway or wallet deduction (if balance is sufficient).',
      issueDate: '6/4/2023 11:00:00 AM'
    },
    {
      no: 9,
      categoryVi: 'Phụ huynh',
      categoryEn: 'For parents',
      questionVi: 'SV đăng ký bảo lưu muốn quay trở lại học cần làm gì?',
      questionEn: 'What should a suspended student do to return to school?',
      answerVi: 'Sinh viên Bảo lưu kỳ trước muốn quay lại học tiếp cần nộp Đơn xin đi học lại ít nhất 2 tuần trước khi học kỳ mới bắt đầu để phòng đào tạo sắp xếp lớp học.',
      answerEn: 'Students returning from suspension must submit a Return to Study Application at least 2 weeks before the new semester begins so the academic office can arrange classes.',
      issueDate: '6/4/2023 11:00:00 AM'
    },
    {
      no: 10,
      categoryVi: 'Khác',
      categoryEn: 'Others',
      questionVi: 'Sinh viên điều trị tại bệnh viện/ cách ly tập trung không tham gia học tập được',
      questionEn: 'Students hospitalized/quarantined and unable to attend classes',
      answerVi: 'Nếu SV phát sinh việc điều trị bệnh/cách ly không thể đi học được, cần chụp ảnh hồ sơ bệnh án/giấy chứng nhận cách ly và nộp Đơn vắng thi/Vắng học có lý do trên cổng thông tin.',
      answerEn: 'If a student is hospitalized or quarantined, they must take a photo of the medical record/quarantine certificate and submit an Excused Absence/Exam Absence Application on the portal.',
      issueDate: '6/4/2023 11:00:00 AM'
    },
    // Seed remaining items up to 37 to allow pagination demonstration
    {
      no: 11,
      categoryVi: 'Học thuật',
      categoryEn: 'Academic',
      questionVi: 'Hạn cuối nộp học phí học kỳ mới là khi nào?',
      questionEn: 'When is the deadline to pay tuition fees for the new semester?',
      answerVi: 'Hạn nộp học phí thường kết thúc trước 1 tuần khi học kỳ bắt đầu. Lịch cụ thể sẽ được gửi qua email sinh viên và mục thông báo trên portal.',
      answerEn: 'The tuition payment deadline usually ends 1 week before the semester starts. The specific schedule will be sent via student email and the portal announcements.',
      issueDate: '10/5/2023 09:30:00 AM'
    },
    {
      no: 12,
      categoryVi: 'Dịch vụ sinh viên',
      categoryEn: 'Student services',
      questionVi: 'Cách đăng ký thẻ bảo hiểm y tế tại trường?',
      questionEn: 'How to register for student health insurance at school?',
      answerVi: 'Sinh viên đăng ký mua BHYT đợt gia hạn thường niên theo hướng dẫn từ phòng SRO vào đầu năm học hoặc các đợt bổ sung giữa năm.',
      answerEn: 'Students register for health insurance renewal following instructions from the SRO office at the beginning of the academic year or supplementary periods.',
      issueDate: '15/5/2023 02:00:00 PM'
    },
    {
      no: 13,
      categoryVi: 'Tốt nghiệp',
      categoryEn: 'Graduation',
      questionVi: 'Điều kiện xét tốt nghiệp ra trường là gì?',
      questionEn: 'What are the graduation requirements?',
      answerVi: 'Sinh viên phải tích lũy đủ số tín chỉ quy định, không bị kỷ luật đình chỉ, hoàn thành nghĩa vụ học phí và có chứng chỉ tiếng Anh theo yêu cầu.',
      answerEn: 'Students must accumulate enough required credits, not be under suspension, fulfill tuition obligations, and hold the required English certificates.',
      issueDate: '20/5/2023 10:00:00 AM'
    },
    {
      no: 14,
      categoryVi: 'Học thuật',
      categoryEn: 'Academic',
      questionVi: 'Làm thế nào để phúc khảo điểm thi?',
      questionEn: 'How to request a exam re-evaluation?',
      answerVi: 'Sinh viên nộp đơn phúc khảo tại Cổng dịch vụ trực tuyến trong vòng 3 ngày làm việc kể từ khi công bố điểm thi môn học.',
      answerEn: 'Students submit a re-evaluation request on the Online Services Portal within 3 working days from the date of grade publication.',
      issueDate: '25/5/2023 04:30:00 PM'
    },
    {
      no: 15,
      categoryVi: 'Dịch vụ sinh viên',
      categoryEn: 'Student services',
      questionVi: 'Mượn sách thư viện quá hạn bị phạt như thế nào?',
      questionEn: 'What is the penalty for overdue library books?',
      answerVi: 'Sách trả quá hạn sẽ bị phạt tiền theo quy định của thư viện (ví dụ 5.000đ/ngày/cuốn). Sinh viên cần liên hệ thủ thư để xử lý.',
      answerEn: 'Overdue books will be fined according to library regulations (e.g., 5,000 VND/day/book). Students should contact the librarian.',
      issueDate: '01/6/2023 09:00:00 AM'
    },
    {
      no: 16,
      categoryVi: 'Khác',
      categoryEn: 'Others',
      questionVi: 'Mất đồ dùng cá nhân trong khuôn viên trường cần báo cho ai?',
      questionEn: 'Who should I report lost personal items to on campus?',
      answerVi: 'Sinh viên liên hệ bàn bảo vệ tại sảnh chính hoặc phòng SRO để kiểm tra camera giám sát và kiểm tra tủ đồ thất lạc đồ rơi.',
      answerEn: 'Students contact the security desk at the main lobby or the SRO office to check security cameras and lost and found cabinets.',
      issueDate: '05/6/2023 11:30:00 AM'
    },
    {
      no: 17,
      categoryVi: 'Phụ huynh',
      categoryEn: 'For parents',
      questionVi: 'Làm sao để phụ huynh cập nhật số điện thoại liên lạc mới?',
      questionEn: 'How do parents update their new contact phone number?',
      answerVi: 'Phụ huynh hoặc sinh viên gửi yêu cầu chỉnh sửa thông tin liên hệ tới phòng SRO qua email kèm thông tin xác minh của sinh viên.',
      answerEn: 'Parents or students send a request to update contact info to the SRO office via email, along with student verification details.',
      issueDate: '10/6/2023 03:00:00 PM'
    },
    {
      no: 18,
      categoryVi: 'Học thuật',
      categoryEn: 'Academic',
      questionVi: 'Sinh viên thi trượt môn học cần đăng ký thi lại khi nào?',
      questionEn: 'When should students who failed a course register to retake the exam?',
      answerVi: 'Đăng ký thi lại hoặc học lại môn học vào kỳ tiếp theo theo thông báo mở cổng đăng ký học vụ trên portal.',
      answerEn: 'Register to retake the exam or retake the course in the next semester based on the academic registration announcements on the portal.',
      issueDate: '15/6/2023 08:30:00 AM'
    },
    {
      no: 20,
      categoryVi: 'Tốt nghiệp',
      categoryEn: 'Graduation',
      questionVi: 'Có được hoãn lễ tốt nghiệp sang đợt tiếp theo không?',
      questionEn: 'Can I postpone the graduation ceremony to the next batch?',
      answerVi: 'Có thể xin hoãn tham gia lễ tốt nghiệp. Sinh viên cần gửi đơn giải trình và đăng ký trước cho phòng SRO.',
      answerEn: 'Yes, you can postpone graduation ceremony attendance. Students must submit an explanation form and register in advance with the SRO.',
      issueDate: '25/6/2023 10:30:00 AM'
    },
    // Seed up to 37 items with standard entries
    ...Array.from({ length: 18 }, (_, i) => ({
      no: 20 + i,
      categoryVi: i % 2 === 0 ? 'Dịch vụ sinh viên' : 'Học thuật',
      categoryEn: i % 2 === 0 ? 'Student services' : 'Academic',
      questionVi: `Câu hỏi hỏi đáp thường gặp số ${20 + i}?`,
      questionEn: `Frequently asked question number ${20 + i}?`,
      answerVi: `Đây là nội dung trả lời chi tiết cho câu hỏi hỏi đáp số ${20 + i} hỗ trợ sinh viên các thắc mắc học đường liên quan.`,
      answerEn: `This is the detailed answer content for question number ${20 + i} supporting students with campus related queries.`,
      issueDate: '6/4/2023 11:00:00 AM'
    }))
  ];

  // Handling filters search trigger
  const handleSearch = () => {
    setAppliedCategory(categoryFilter);
    setAppliedDate(dateFilter);
    setAppliedSearch(searchText);
    setCurrentPage(1); // Reset page to 1
  };

  // Filtered QA list
  const filteredQA = qaData.filter(item => {
    // Category Filter
    if (appliedCategory !== 'All') {
      const matchCat = item.categoryVi === appliedCategory || item.categoryEn === appliedCategory;
      if (!matchCat) return false;
    }

    // Date Filter (simple check)
    if (appliedDate) {
      // Convert appliedDate (yyyy-mm-dd) to match format dd/mm/yyyy in issueDate
      const [year, month, day] = appliedDate.split('-');
      const formattedDatePart = `${parseInt(day)}/${parseInt(month)}/${year}`;
      if (!item.issueDate.startsWith(formattedDatePart) && !item.issueDate.includes(`${day}/${month}/${year}`)) {
        return false;
      }
    }

    // Text Search Filter
    if (appliedSearch) {
      const query = appliedSearch.toLowerCase();
      const matchQuery = 
        item.questionVi.toLowerCase().includes(query) ||
        item.questionEn.toLowerCase().includes(query) ||
        item.answerVi.toLowerCase().includes(query) ||
        item.answerEn.toLowerCase().includes(query);
      if (!matchQuery) return false;
    }

    return true;
  });

  // Pagination calculation
  const totalEntries = filteredQA.length;
  const totalPages = Math.ceil(totalEntries / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalEntries);
  const currentEntries = filteredQA.slice(startIndex, endIndex);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      <main className="dashboard-container">
        
        {view === 'list' ? (
          <>
            {/* Title */}
            <h2 className="services-section-title" style={{ textAlign: 'center', marginBottom: '24px' }}>
              {t('QUESTIONS AND ANSWERS', 'QUESTIONS AND ANSWERS')}
            </h2>

            {/* Filter Bar */}
            <div className="qa-filters-row">
              <div className="qa-filter-group">
                <label className="qa-filter-label">{t('CATEGORY', 'CATEGORY')}</label>
                <select 
                  className="qa-filter-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="All">{t('All', 'All')}</option>
                  <option value="Student services">{t('Dịch vụ sinh viên', 'Student services')}</option>
                  <option value="Graduation">{t('Tốt nghiệp', 'Graduation')}</option>
                  <option value="Academic">{t('Học thuật', 'Academic')}</option>
                  <option value="For parents">{t('Phụ huynh', 'For parents')}</option>
                  <option value="Others">{t('Khác', 'Others')}</option>
                </select>
              </div>

              <div className="qa-filter-group">
                <label className="qa-filter-label">{t('ISSUE DATE', 'ISSUE DATE')}</label>
                <input 
                  type="date"
                  className="qa-filter-input"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  placeholder="dd/mm/yyyy"
                />
              </div>

              <div className="qa-filter-group">
                <label className="qa-filter-label">{t('SEARCH', 'SEARCH')}</label>
                <input 
                  type="text"
                  className="qa-filter-input"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder={t('Tìm kiếm...', 'Search...')}
                />
              </div>

              <button className="qa-search-btn" onClick={handleSearch}>
                {t('Tìm kiếm', 'Search')}
              </button>
            </div>

            {/* Entries control */}
            <div className="qa-entries-wrapper">
              <span>{t('Hiển thị', 'Show')}</span>
              <select 
                className="qa-entries-select"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>{t('mục', 'entries')}</span>
            </div>

            {/* Table */}
            <div className="services-table-wrapper">
              <table className="services-table">
                <thead className="services-thead">
                  <tr>
                    <th className="services-th" style={{ width: '60px', textAlign: 'center' }}>{t('NO', 'NO')}</th>
                    <th className="services-th" style={{ width: '150px' }}>{t('CATEGORY', 'CATEGORY')}</th>
                    <th className="services-th" style={{ width: '280px' }}>{t('QUESTION', 'QUESTION')}</th>
                    <th className="services-th">{t('ANSWER', 'ANSWER')}</th>
                    <th className="services-th" style={{ width: '180px' }}>{t('ISSUE DATE', 'ISSUE DATE')}</th>
                    <th className="services-th center" style={{ width: '100px' }}>{t('HÀNH ĐỘNG', 'ACTION')}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.length > 0 ? (
                    currentEntries.map((item, idx) => (
                      <tr key={item.no} className="services-tr" style={{ backgroundColor: 'var(--bg-sidebar, #FFFFFF)' }}>
                        <td className="services-td center font-mono">{startIndex + idx + 1}</td>
                        <td className="services-td" style={{ fontWeight: '500' }}>
                          {t(item.categoryVi, item.categoryEn)}
                        </td>
                        <td className="services-td" style={{ fontWeight: '600' }}>
                          {t(item.questionVi, item.questionEn)}
                        </td>
                        <td className="services-td" style={{ color: '#475569' }}>
                          {t(
                            item.answerVi.length > 80 ? item.answerVi.substring(0, 80) + '...' : item.answerVi,
                            item.answerEn.length > 80 ? item.answerEn.substring(0, 80) + '...' : item.answerEn
                          )}
                        </td>
                        <td className="services-td font-mono" style={{ fontSize: '11.5px' }}>{item.issueDate}</td>
                        <td className="services-td center">
                          <button 
                            className="qa-action-btn"
                            onClick={() => {
                              setSelectedQuestion(item);
                              setView('detail');
                            }}
                            title={t('Xem chi tiết', 'View Details')}
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="services-td center" style={{ color: '#64748B', padding: '24px' }}>
                        {t('Không có câu hỏi nào khớp với bộ lọc.', 'No questions match the filters.')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination info and buttons */}
              <div className="pagination-container" style={{ marginTop: '20px' }}>
                <div style={{ fontSize: '13px', color: '#64748B' }}>
                  {t(
                    `Hiển thị từ ${totalEntries > 0 ? startIndex + 1 : 0} đến ${endIndex} của ${totalEntries} mục`,
                    `Showing ${totalEntries > 0 ? startIndex + 1 : 0} to ${endIndex} of ${totalEntries} entries`
                  )}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="pagination-btn"
                  >
                    {t('Trước', 'Previous')}
                  </button>
                  <span className="pagination-arrows" style={{ cursor: currentPage > 1 ? 'pointer' : 'default' }} onClick={() => setCurrentPage(1)}>&lt;&lt;</span>
                  
                  {Array.from({ length: totalPages }, (_, pageIdx) => {
                    const pageNum = pageIdx + 1;
                    return (
                      <span 
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`pagination-page ${currentPage === pageNum ? 'active' : ''}`}
                      >
                        {pageNum}
                      </span>
                    );
                  })}
                  
                  <span className="pagination-arrows" style={{ cursor: currentPage < totalPages ? 'pointer' : 'default' }} onClick={() => setCurrentPage(totalPages)}>&gt;&gt;</span>
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="pagination-btn"
                  >
                    {t('Kế tiếp', 'Next')}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          selectedQuestion && (
            <>
              {/* Title */}
              <h2 className="services-section-title" style={{ textAlign: 'center', marginBottom: '24px' }}>
                {t('DETAILED QUESTIONS AND ANSWERS', 'DETAILED QUESTIONS AND ANSWERS')}
              </h2>

              {/* Details View Box */}
              <div className="qa-detail-container">
                <div className="qa-detail-item">
                  <h4 className="qa-detail-title-section">
                    CATEGORY: {t(selectedQuestion.categoryVi, selectedQuestion.categoryEn)}
                  </h4>
                </div>
                
                <div className="qa-detail-item" style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                  <h4 className="qa-detail-question-section">
                    QUESTION: {t(selectedQuestion.questionVi, selectedQuestion.questionEn)}
                  </h4>
                </div>

                <div className="qa-detail-item" style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                  <h4 className="qa-detail-title-section" style={{ marginBottom: '8px' }}>
                    ANSWER:
                  </h4>
                  <p className="qa-detail-answer-section" style={{ fontWeight: '500' }}>
                    {t(selectedQuestion.answerVi, selectedQuestion.answerEn)}
                  </p>
                </div>

                <button 
                  className="qa-detail-back-btn"
                  onClick={() => setView('list')}
                >
                  {t('BACK', 'BACK')}
                </button>
              </div>
            </>
          )
        )}

      </main>
    </div>
  );
};
