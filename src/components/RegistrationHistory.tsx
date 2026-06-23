import { useState } from 'react';
import { Trash2, Star, CheckCircle2 } from 'lucide-react';

interface HistoryItem {
  code: string;
  serviceVi: string;
  serviceEn: string;
  regDate: string;
  compDate: string;
  statusVi: string;
  statusEn: string;
  statusType: 'orange' | 'yellow';
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
      serviceVi: 'ĐĂNG KÝ KHÔI PHỤC ĐIỂM DANH',
      serviceEn: 'ATTENDANCE RECOVERY REGISTRATION',
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
      serviceVi: 'ĐĂNG KÝ KHÔI PHỤC ĐIỂM DANH',
      serviceEn: 'ATTENDANCE RECOVERY REGISTRATION',
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
      serviceVi: 'ĐĂNG KÝ KHÔI PHỤC ĐIỂM DANH',
      serviceEn: 'ATTENDANCE RECOVERY REGISTRATION',
      regDate: '2025-12-20 14:33:12',
      compDate: '2025-12-20 14:34:35',
      statusVi: 'Close',
      statusEn: 'Closed',
      statusType: 'yellow',
      noticeVi: 'ĐÃ ĐỒNG Ý YÊU CẦU()',
      noticeEn: 'APPROVED REQUEST()',
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      
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
                const rowClass = item.statusType === 'orange' ? 'tr-yellow' : 'tr-green';
                
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
                      <span className={`status-badge ${item.statusType === 'orange' ? 'orange-badge' : 'yellow-badge'}`}>
                        {t(item.statusVi, item.statusEn)}
                      </span>
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
      {cancelTarget && (
        <div className="modal-overlay">
          <div className="modal-content">
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
        </div>
      )}

    </div>
  );
};
