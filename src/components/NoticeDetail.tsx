import { useState, useEffect } from 'react';
import { FileText, Printer, X, Calendar, Clock, GraduationCap, ZoomIn, ZoomOut, RotateCcw, Sun, Moon } from 'lucide-react';
import { BtecLogo } from './BtecLogo';

interface NoticeDetailProps {
  id: number;
}

export const NoticeDetail = ({ id }: NoticeDetailProps) => {
  const [zoom, setZoom] = useState(1.0);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Save original styles
    const origHtmlOverflow = document.documentElement.style.overflow;
    const origHtmlHeight = document.documentElement.style.height;
    const origBodyOverflow = document.body.style.overflow;
    const origBodyHeight = document.body.style.height;

    // Apply scrollable styles to allow scrolling the notice detail page
    document.documentElement.style.setProperty('overflow', 'auto', 'important');
    document.documentElement.style.setProperty('height', 'auto', 'important');
    document.body.style.setProperty('overflow', 'auto', 'important');
    document.body.style.setProperty('height', 'auto', 'important');

    return () => {
      // Restore original styles
      document.documentElement.style.overflow = origHtmlOverflow;
      document.documentElement.style.height = origHtmlHeight;
      document.body.style.overflow = origBodyOverflow;
      document.body.style.height = origBodyHeight;
    };
  }, []);

  // Detailed notification mock database
  const noticeData: Record<number, {
    title: string;
    date: string;
    time: string;
    type: string;
    content: string;
    details: string[];
    author: string;
    code: string;
  }> = {
    1: {
      title: 'MỞ ĐĂNG KÝ BHYT 6 THÁNG CUỐI NĂM 2026',
      date: '05/06/2026',
      time: '14:13',
      type: 'THÔNG BÀO',
      author: 'Phòng Dịch vụ Sinh viên (ĐVSV)',
      code: 'TB-BHYT-2026-02',
      content: 'Thông báo mở đợt đăng ký Bảo hiểm Y tế bắt buộc đối với toàn bộ sinh viên RIKKEI.',
      details: [
        'Nhằm đảm bảo quyền lợi về y tế và tuân thủ các quy định hiện hành, Phòng Dịch vụ Sinh viên thông báo mở đợt đăng ký Bảo hiểm Y tế (BHYT) bắt buộc 6 tháng cuối năm 2026.',
        '1. Đối tượng áp dụng: Toàn bộ sinh viên chưa tham gia BHYT đợt 1 hoặc thẻ BHYT cũ hết hạn trước ngày 30/06/2026.',
        '2. Thời gian đăng ký và nộp phí: Từ ngày 05/06/2026 đến hết ngày 20/06/2026.',
        '3. Mức phí đóng: 450.000 đ / 6 tháng.',
        '4. Phương thức nộp: Thực hiện đóng lệ phí trực tuyến tại mục thanh toán học phí dịch vụ trên portal hoặc chuyển khoản ngân hàng nhà trường kèm cú pháp [MSSV] - BHYT 6T.',
        'Lưu ý: BHYT là bắt buộc theo quy định pháp luật. Sinh viên không tham gia đúng hạn sẽ bị xử lý kỷ luật hành chính và không được xét học bổng cũng như các danh hiệu rèn luyện.'
      ]
    },
    2: {
      title: 'QUYẾT ĐỊNH CÔNG NHẬN KẾT QUẢ RÈN LUYỆN MÙA XUÂN 2026',
      date: '29/05/2026',
      time: '11:11',
      type: 'QUYẾT ĐỊNH',
      author: 'Ban Giám Hiệu RIKKEIEDU',
      code: 'QĐ-KQR-2026-14',
      content: 'Quyết định công nhận kết quả rèn luyện học kỳ Mùa xuân năm 2026 cho sinh viên Chương trình liên kết nước ngoài.',
      details: [
        'Căn cứ Quy chế đào tạo và đánh giá kết quả rèn luyện sinh viên tại Tổ chức Giáo dục RIKKEIEDU, Ban Giám hiệu quyết định công nhận điểm rèn luyện học kỳ Mùa xuân năm 2026.',
        'Thống kê xếp loại rèn luyện học kỳ:',
        '- Xếp loại Xuất sắc: 12.4% số lượng sinh viên đạt được.',
        '- Xếp loại Tốt: 58.2% số lượng sinh viên đạt được.',
        '- Xếp loại Khá: 25.1% số lượng sinh viên đạt được.',
        '- Xếp loại Trung bình / Yếu: 4.3% số lượng sinh viên cần cải thiện.',
        'Sinh viên có thể tra cứu chi tiết bảng điểm rèn luyện cá nhân tại phần Học tập trên Cổng thông tin học thuật. Mọi khiếu nại về kết quả vui lòng gửi phản hồi về Phòng Đào tạo/ĐVSV trước ngày 10/06/2026.'
      ]
    },
    3: {
      title: 'THAY ĐỔI ĐỊA ĐIỂM HỌC TẬP KHỐI CÔNG NGHỆ THÔNG TIN',
      date: '28/05/2026',
      time: '14:07',
      type: 'THÔNG BÀO',
      author: 'Phòng Hành chính - Quản trị',
      code: 'TB-ĐĐH-2026-08',
      content: 'Chuyển địa điểm học tập các lớp thuộc khối ngành Công nghệ thông tin sang cơ sở mới khang trang hơn.',
      details: [
        'Nhằm nâng cao chất lượng cơ sở vật chất và tạo không gian học tập tiện nghi, hiện đại cho sinh viên, kể từ ngày 01/06/2026, toàn bộ các lớp thuộc khối ngành Công nghệ thông tin sẽ chuyển địa điểm học tập sang cơ sở mới.',
        '- Địa điểm cũ: Tòa nhà Rikkeisoft, đường Duy Tân, Cầu Giấy, Hà Nội.',
        '- Địa điểm mới: Tòa nhà RIKKEI ACADEMY, Số 12 Huỳnh Thúc Kháng kéo dài, Đống Đa, Hà Nội.',
        '- Hướng dẫn di chuyển & gửi xe: Sinh viên gửi xe máy dưới hầm B1/B2 của tòa nhà. Các tuyến xe buýt thuận tiện di chuyển qua đây gồm: 09B, 18, 22A, 35A, 49.',
        'Nhà trường yêu cầu sinh viên chú ý cập nhật lịch học tập và thời khóa biểu tại địa điểm mới để tránh nhầm lẫn cơ sở học.'
      ]
    },
    4: {
      title: 'DANH SÁCH SINH VIÊN KHÔNG ĐỦ ĐIỀU KIỆN THI CUỐI KỲ TIẾNG ANH BLOCK 2_SP26',
      date: '23/04/2026',
      time: '08:36',
      type: 'KHẢO THÍ',
      author: 'Phòng Khảo thí & Đảm bảo chất lượng',
      code: 'TB-KT-2026-03',
      content: 'Công bố danh sách sinh viên bị đình chỉ thi cuối kỳ môn Tiếng Anh Block 2 do vắng quá số buổi quy định.',
      details: [
        'Phòng Khảo thí thông báo danh sách sinh viên không đủ điều kiện tham dự kỳ thi cuối kỳ môn Tiếng Anh Block 2 - Học kỳ Mùa xuân năm 2026 do vi phạm quy chế chuyên cần (vắng quá 20% tổng số buổi học học phần).',
        'Danh sách mã sinh viên không đủ điều kiện dự thi bao gồm: BS00612, BS00645, BS00711, BS00789, BS00810, BS00912.',
        'Các trường hợp vắng thi do không đủ điều kiện chuyên cần sẽ nhận điểm 0 và buộc phải đăng ký học lại học phần này ở các học kỳ tiếp theo.',
        'Mọi thắc mắc hoặc đơn giải trình khẩn cấp kèm minh chứng y tế/hoàn cảnh gia đình chính đáng phải được gửi tới văn phòng Đào tạo trước 17h00 ngày 28/04/2026 để xem xét giải quyết.'
      ]
    },
    101: {
      title: 'CẢNH BÁO HỌC VỤ: SỐ BUỔI VẮNG CHẠM MỨC TỐI ĐA (0 BUỔI CÒN LẠI)',
      date: '10/06/2026',
      time: '09:00',
      type: 'CẢNH BÁO',
      author: 'Phòng Khảo thí & Đào tạo RIKKEI',
      code: 'CB-ATT-2026-00',
      content: 'Cảnh báo hệ thống chuyên cần: Sinh viên đã chạm hạn mức nghỉ phép tối đa (còn lại 0 buổi được phép vắng).',
      details: [
        'Hệ thống quản lý học tập ghi nhận sinh viên Nguyễn Công Trứ (Mã SV: N24DTCN088) đã vắng đạt mức tối đa cho phép đối với các môn học trong học kỳ hiện tại.',
        '1. Tình trạng chuyên cần: Sinh viên đã sử dụng hết số buổi nghỉ phép và nghỉ không phép tối đa theo quy định đào tạo.',
        '2. Hệ quả: Bất kỳ buổi vắng phát sinh nào tiếp theo (kể cả có phép hay không phép, có giấy khám sức khỏe hay không) sẽ dẫn đến việc đình chỉ thi cuối kỳ và buộc phải đăng ký học lại học phần này.',
        '3. Yêu cầu hành động: Sinh viên cần đi học đầy đủ tất cả các buổi học còn lại của kỳ học, tuyệt đối không vắng thêm. Trường hợp có sự cố bất khả kháng cực kỳ khẩn cấp, sinh viên phải liên hệ trực tiếp văn phòng Đào tạo để được hỗ trợ đặc biệt trong vòng 24 giờ kể từ buổi học phát sinh.'
      ]
    },
    102: {
      title: 'CẢNH BÁO HỌC VỤ: SINH VIÊN CHỈ CÒN ĐƯỢC VẮNG 1 BUỔI',
      date: '03/06/2026',
      time: '10:30',
      type: 'CẢNH BÁO',
      author: 'Phòng Khảo thí & Đào tạo RIKKEI',
      code: 'CB-ATT-2026-01',
      content: 'Cảnh báo nhắc nhở chuyên cần: Sinh viên sắp chạm hạn mức nghỉ phép tối đa (còn lại 1 buổi được phép vắng).',
      details: [
        'Hệ thống quản lý chuyên cần gửi thông báo nhắc nhở tới sinh viên Nguyễn Công Trứ (Mã SV: N24DTCN088) về việc số buổi vắng học phần hiện tại đã cận kề mức giới hạn tối đa.',
        '- Tình trạng hiện tại: Sinh viên chỉ còn được phép vắng tối đa 01 (một) buổi học nữa đối với học phần hiện tại.',
        '- Quy chế học vụ: Nếu vắng thêm từ 02 buổi trở lên, sinh viên sẽ tự động bị mất quyền dự thi cuối kỳ (đình chỉ thi) và nhận điểm 0 cho học phần đó.',
        '- Khuyến nghị: Sinh viên cần nâng cao ý thức kỷ luật chuyên cần, theo dõi sát sao bảng điểm danh trên Portal và sắp xếp lịch trình để tham dự đầy đủ tất cả các buổi học tiếp theo.'
      ]
    }
  };

  const currentNotice = noticeData[id] || {
    title: 'THÔNG BÀO HỌC VỤ',
    date: '24/06/2026',
    time: '16:00',
    type: 'THÔNG BÀO',
    author: 'Tổ chức Giáo dục RIKKEI',
    code: 'TB-HV-2026-GEN',
    content: 'Chi tiết thông tin thông báo học vụ dành cho sinh viên.',
    details: ['Nội dung thông báo đang được cập nhật hoặc không tồn tại trên hệ thống. Sinh viên vui lòng quay lại trang chủ để cập nhật các thông tin mới nhất.']
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    window.close();
  };

  return (
    <div className="notice-detail-wrapper">
      <style>{`
        @page {
          size: A4;
          margin: 0;
        }
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .notice-zoom-toolbar,
          .notice-detail-footer {
            display: none !important;
          }
          html, body, .notice-detail-wrapper {
            background-color: #F8FAFC !important;
            padding: 15mm 0 !important;
            margin: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            overflow: visible !important;
          }
          html.dark, html.dark body, html.dark .notice-detail-wrapper {
            background-color: #F8FAFC !important;
          }
          .notice-detail-card, html.dark .notice-detail-card {
            background-color: #FFFFFF !important;
            color: #334155 !important;
            border: 1px solid #E2E8F0 !important;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05) !important;
            border-radius: 12px !important;
            padding: 48px 56px !important;
            width: 180mm !important;
            max-width: 180mm !important;
            margin: 0 auto !important;
            box-sizing: border-box !important;
            zoom: 1 !important;
            transform: none !important;
          }
          .notice-detail-header {
            border-bottom: 2px solid #0D226B !important;
          }
          .notice-detail-title, html.dark .notice-detail-title {
            color: #0D226B !important;
            font-size: 22px !important;
          }
          .notice-detail-meta-row, html.dark .notice-detail-meta-row {
            color: #64748B !important;
            border-bottom: 1px dashed #E2E8F0 !important;
          }
          .notice-detail-body, html.dark .notice-detail-body {
            color: #334155 !important;
          }
          .notice-detail-sign-off, html.dark .notice-detail-sign-off {
            border-top: 1px dashed #E2E8F0 !important;
            page-break-inside: avoid;
          }
          .notice-detail-meta-info span {
            background-color: #F0F9FF !important;
            color: #0284C7 !important;
            border: 1px solid #E0F2FE !important;
          }
          .notice-detail-wrapper > div:last-child {
            display: none !important;
          }
        }
      `}</style>
      {/* Zoom controls floating bar */}
      <div className="notice-zoom-toolbar">
        <button 
          onClick={() => setZoom(prev => Math.max(0.4, prev - 0.1))}
          className="notice-zoom-btn"
          title="Thu nhỏ (Zoom Out)"
        >
          <ZoomOut size={16} />
        </button>
        
        <span className="notice-zoom-text">
          {Math.round(zoom * 100)}%
        </span>

        <button 
          onClick={() => setZoom(prev => Math.min(1.5, prev + 0.1))}
          className="notice-zoom-btn"
          title="Phóng to (Zoom In)"
        >
          <ZoomIn size={16} />
        </button>

        <div className="notice-zoom-divider" />

        <button 
          onClick={() => setZoom(1.0)}
          className="notice-zoom-btn"
          title="Đặt lại (Reset Zoom)"
        >
          <RotateCcw size={14} />
        </button>

        <div className="notice-zoom-divider" />

        <button 
          onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
          className="notice-zoom-btn"
          title={theme === 'light' ? 'Giao diện tối (Dark Mode)' : 'Giao diện sáng (Light Mode)'}
          style={{ color: theme === 'dark' ? '#F59E0B' : undefined }}
        >
          {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
        </button>
      </div>

      {/* Detail Container Card */}
      <div 
        className="notice-detail-card"
        style={{
          zoom: zoom,
          transition: 'zoom 0.15s ease-out',
        }}
      >
        {/* Banner Top Brand logos */}
        <div className="notice-detail-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BtecLogo height={40} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span style={{ fontWeight: '600' }}>CỔNG THÔNG TIN SINH VIÊN</span>
            <span>Mã hiệu: {currentNotice.code}</span>
          </div>
        </div>
 
        {/* Notice Meta Information */}
        <div className="notice-detail-meta-info">
          {/* Badge type */}
          {(() => {
            const isRedBadge = currentNotice.type.includes('QUYẾT') || currentNotice.type.includes('CẢNH BÁO');
            return (
              <span 
                className={`badge ${isRedBadge ? 'badge-red' : 'badge-blue'}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: isRedBadge ? '#FEF2F2' : '#F0F9FF',
                  color: isRedBadge ? '#EF4444' : '#0284C7',
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  border: isRedBadge ? '1px solid #FEE2E2' : '1px solid #E0F2FE'
                }}
              >
                <FileText size={12} />
                {currentNotice.type}
              </span>
            );
          })()}
 
          <h1 className="notice-detail-title">
            {currentNotice.title}
          </h1>
 
          <div className="notice-detail-meta-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={15} style={{ color: '#EF562F' }} />
              <span>Ngày đăng: <strong>{currentNotice.date}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={15} style={{ color: '#EF562F' }} />
              <span>Thời gian: <strong>{currentNotice.time}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GraduationCap size={15} style={{ color: '#EF562F' }} />
              <span>Đơn vị: <strong>{currentNotice.author}</strong></span>
            </div>
          </div>
        </div>
 
        {/* Detailed Rich Content Body */}
        <div className="notice-detail-body">
          <p style={{ fontWeight: '600', color: 'var(--text-dark)', marginBottom: '20px' }}>
            {currentNotice.content}
          </p>
 
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentNotice.details.map((detail, idx) => (
              <p key={idx} style={{ margin: 0, whiteSpace: 'pre-line' }}>
                {detail}
              </p>
            ))}
          </div>
 
          {/* Sign off */}
          <div className="notice-detail-sign-off">
            <span style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>Hà Nội, ngày {currentNotice.date.split('/')[0]} tháng {currentNotice.date.split('/')[1]} năm {currentNotice.date.split('/')[2]}</span>
            <span style={{ fontWeight: '700', color: 'var(--text-dark)', marginTop: '8px' }}>{currentNotice.author}</span>
            <span style={{ fontSize: '12px', color: '#94A3B8', fontStyle: 'italic' }}>(Đã ký điện tử)</span>
          </div>
        </div>
 
        {/* Bottom Actions footer bar */}
        <div className="notice-detail-footer">
          <button
            onClick={handleClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: 'var(--bg-sidebar)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              fontSize: '13.5px',
              fontWeight: '600',
              color: 'var(--text-dark)',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-cream)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-sidebar)'}
          >
            <X size={15} />
            <span>Đóng cửa sổ</span>
          </button>
 
          <button
            onClick={handlePrint}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              backgroundColor: '#2563EB',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13.5px',
              fontWeight: '600',
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.1)',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
          >
            <Printer size={15} />
            <span>In thông báo</span>
          </button>
        </div>
 
      </div>
 
      {/* Footer copyright */}
      <div style={{ marginTop: '24px', fontSize: '12px', color: '#94A3B8', textAlign: 'center' }}>
        © 2026 Tổ chức Giáo dục RIKKEIEDU - Cổng thông tin học thuật RK
      </div>
    </div>
  );
};
