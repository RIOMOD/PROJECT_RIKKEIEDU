import { useState } from 'react';
import { Trash2, Star, CheckCircle2 } from 'lucide-react';

interface HistoryItem {
  code: string;
  service: string;
  regDate: string;
  compDate: string;
  status: string;
  statusType: 'orange' | 'yellow';
  notice: string;
  hasCancel: boolean;
  hasRate: boolean;
}

export const RegistrationHistory = () => {
  // Initialize mock history data exactly matching the screenshot mockup
  const [historyList, setHistoryList] = useState<HistoryItem[]>([
    {
      code: '#7008',
      service: 'ĐĂNG KÝ HỌC LẠI',
      regDate: '2026-05-04 08:42:44',
      compDate: '',
      status: 'Chờ xếp lớp',
      statusType: 'orange',
      notice: '',
      hasCancel: true,
      hasRate: false
    },
    {
      code: '#7007',
      service: 'ĐĂNG KÝ HỌC LẠI',
      regDate: '2026-05-04 08:40:00',
      compDate: '2026-05-04 08:50:25',
      status: 'Close (Đã xếp lớp)',
      statusType: 'yellow',
      notice: '',
      hasCancel: false,
      hasRate: true
    },
    {
      code: '#7006',
      service: 'ĐĂNG KÝ HỌC LẠI',
      regDate: '2026-05-04 08:30:27',
      compDate: '2026-05-04 08:51:00',
      status: 'Close (Đã xếp lớp)',
      statusType: 'yellow',
      notice: '',
      hasCancel: false,
      hasRate: true
    },
    {
      code: '#6817',
      service: 'ĐĂNG KÝ HỌC LẠI',
      regDate: '2026-03-29 15:17:07',
      compDate: '2026-05-03 19:22:39',
      status: 'Close (Đã xếp lớp)',
      statusType: 'yellow',
      notice: '',
      hasCancel: false,
      hasRate: true
    },
    {
      code: '#6816',
      service: 'ĐĂNG KÝ HỌC LẠI',
      regDate: '2026-03-29 15:12:29',
      compDate: '',
      status: 'Chờ xếp lớp',
      statusType: 'orange',
      notice: '',
      hasCancel: true,
      hasRate: false
    },
    {
      code: '#6815',
      service: 'ĐĂNG KÝ HỌC LẠI',
      regDate: '2026-03-29 15:06:21',
      compDate: '',
      status: 'Chờ xếp lớp',
      statusType: 'orange',
      notice: '',
      hasCancel: true,
      hasRate: false
    },
    {
      code: '#6700',
      service: 'ĐĂNG KÝ KHÔI PHỤC ĐIỂM DANH',
      regDate: '2026-03-16 07:59:59',
      compDate: '2026-03-16 08:10:24',
      status: 'Close',
      statusType: 'yellow',
      notice: 'ĐÃ ĐỒNG Ý YÊU CẦU()',
      hasCancel: false,
      hasRate: true
    },
    {
      code: '#6663',
      service: 'ĐĂNG KÝ KHÔI PHỤC ĐIỂM DANH',
      regDate: '2026-03-10 10:13:16',
      compDate: '2026-03-10 11:20:41',
      status: 'Close',
      statusType: 'yellow',
      notice: 'ĐÃ ĐỒNG Ý YÊU CẦU()',
      hasCancel: false,
      hasRate: true
    },
    {
      code: '#6369',
      service: 'ĐĂNG KÝ HỌC LẠI',
      regDate: '2026-01-05 03:44:46',
      compDate: '2026-01-05 06:01:46',
      status: 'Close (Đã xếp lớp)',
      statusType: 'yellow',
      notice: '',
      hasCancel: false,
      hasRate: true
    },
    {
      code: '#6325',
      service: 'ĐĂNG KÝ KHÔI PHỤC ĐIỂM DANH',
      regDate: '2025-12-20 14:33:12',
      compDate: '2025-12-20 14:34:35',
      status: 'Close',
      statusType: 'yellow',
      notice: 'ĐÃ ĐỒNG Ý YÊU CẦU()',
      hasCancel: false,
      hasRate: true
    }
  ]);

  // Modal control states
  const [cancelTarget, setCancelTarget] = useState<HistoryItem | null>(null);
  const [rateTarget, setRateTarget] = useState<HistoryItem | null>(null);
  const [ratingValue, setRatingValue] = useState<number>(5);
  const [ratingComment, setRatingComment] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Active page state for page links
  const [activePage, setActivePage] = useState(1);

  const handleCancelRequest = () => {
    if (!cancelTarget) return;

    // Filter out or update cancelled item
    setHistoryList(prev => prev.filter(item => item.code !== cancelTarget.code));
    setSuccessMsg(`Hủy đơn đăng ký ${cancelTarget.code} thành công.`);
    setShowSuccess(true);
    
    setTimeout(() => {
      setCancelTarget(null);
      setShowSuccess(false);
    }, 1800);
  };

  const handleRateSubmit = () => {
    if (!rateTarget) return;

    // Mark as rated (disable action) or show alert
    setSuccessMsg(`Cảm ơn bạn đã đánh giá dịch vụ ${rateTarget.code}!`);
    setShowSuccess(true);

    setTimeout(() => {
      setRateTarget(null);
      setShowSuccess(false);
      setRatingComment('');
    }, 1800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      
      {/* Main Container */}
      <main className="dashboard-container">
        
        {/* Title */}
        <h2 className="services-section-title">Dịch vụ đã đăng ký</h2>

        {/* Warning Debt notice */}
        <div className="warning-banner">
          Sinh viên vui lòng truy cập Debtlist để kiểm tra và thanh toán các công nợ dịch vụ trực tuyến ở trạng thái (Chờ thanh toán)
        </div>

        {/* History Table */}
        <div className="services-table-wrapper">
          <table className="services-table">
            <thead className="services-thead">
              <tr>
                <th className="services-th">MÃ ĐƠN</th>
                <th className="services-th">LOẠI DỊCH VỤ</th>
                <th className="services-th">THỜI GIAN ĐĂNG KÝ</th>
                <th className="services-th">THỜI GIAN HOÀN THÀNH</th>
                <th className="services-th">TRẠNG THÁI VÀ THÔNG TIN</th>
                <th className="services-th">THÔNG BÁO</th>
                <th className="services-th center">HÀNH ĐỘNG</th>
                <th className="services-th center">ĐÁNH GIÁ</th>
              </tr>
            </thead>
            <tbody>
              {historyList.map((item) => {
                // Determine row class based on status type
                const rowClass = item.statusType === 'orange' ? 'tr-yellow' : 'tr-green';
                
                return (
                  <tr key={item.code} className={`services-tr ${rowClass}`}>
                    {/* Mã đơn */}
                    <td className="services-td" style={{ fontWeight: '700' }}>
                      {item.code}
                    </td>
                    
                    {/* Bày dịch vụ */}
                    <td className="services-td" style={{ fontWeight: '600' }}>
                      {item.service}
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
                      <span className={`status-badge ${item.statusType === 'orange' ? 'orange-badge' : 'yellow-badge'}`}>
                        {item.status}
                      </span>
                    </td>
                    
                    {/* Thông báo */}
                    <td className="services-td" style={{ fontWeight: '600', fontSize: '11px', color: 'var(--fpt-blue)' }}>
                      {item.notice || <span style={{ color: '#CBD5E1' }}>—</span>}
                    </td>
                    
                    {/* Hành động */}
                    <td className="services-td center">
                      {item.hasCancel ? (
                        <button 
                          onClick={() => setCancelTarget(item)}
                          className="cancel-btn"
                        >
                          Hủy
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
                          Đánh giá
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
            <button className="pagination-btn">Trước</button>
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
            <button className="pagination-btn">Kế tiếp</button>
          </div>
        </div>

      </main>

      {/* Cancellation Confirmation Modal */}
      {cancelTarget && (
        <div className="modal-overlay">
          <div className="modal-content">
            {!showSuccess ? (
              <>
                <div className="modal-icon" style={{ backgroundColor: '#FEF2F2', color: '#EF4444' }}>
                  <Trash2 size={26} />
                </div>
                <h3 className="modal-title">Hủy đơn đăng ký</h3>
                <p className="modal-desc">
                  Bạn có chắc chắn muốn hủy bỏ đơn đăng ký <strong>{cancelTarget.code} ({cancelTarget.service})</strong> không? Thao tác này không thể hoàn tác.
                </p>
                <div className="modal-actions">
                  <button onClick={handleCancelRequest} className="modal-btn-confirm" style={{ backgroundColor: '#E11D48' }}>
                    Đồng ý hủy
                  </button>
                  <button onClick={() => setCancelTarget(null)} className="modal-btn-cancel">
                    Đóng lại
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="modal-icon" style={{ backgroundColor: '#ECFDF5', color: '#10B981' }}>
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="modal-title" style={{ color: '#065F46' }}>Đã hủy đơn!</h3>
                <p className="modal-desc" style={{ marginBottom: 0 }}>
                  {successMsg}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Evaluation Rating Modal */}
      {rateTarget && (
        <div className="modal-overlay">
          <div className="modal-content">
            {!showSuccess ? (
              <>
                <div className="modal-icon" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>
                  <Star size={26} fill="currentColor" />
                </div>
                <h3 className="modal-title">Đánh giá chất lượng dịch vụ</h3>
                <p className="modal-desc">
                  Vui lòng đánh giá mức độ hài lòng về dịch vụ <strong>{rateTarget.service} (Đơn {rateTarget.code})</strong>.
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
                    placeholder="Nhập ý kiến đóng góp của bạn tại đây..."
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
                    Gửi đánh giá
                  </button>
                  <button onClick={() => setRateTarget(null)} className="modal-btn-cancel">
                    Hủy bỏ
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="modal-icon" style={{ backgroundColor: '#ECFDF5', color: '#10B981' }}>
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="modal-title" style={{ color: '#065F46' }}>Gửi thành công!</h3>
                <p className="modal-desc" style={{ marginBottom: 0 }}>
                  {successMsg}
                </p>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
