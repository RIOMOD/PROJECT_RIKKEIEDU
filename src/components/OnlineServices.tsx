import { useState } from 'react';
import { Footer } from './Footer';
import { ClipboardList, CheckCircle2 } from 'lucide-react';

interface ServiceItem {
  stt: number;
  task: string;
  desc: string;
}

export const OnlineServices = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock list of 10 services from the second screenshot
  const services: ServiceItem[] = [
    {
      stt: 1,
      task: 'ĐĂNG KÝ KHÔI PHỤC ĐIỂM',
      desc: ''
    },
    {
      stt: 2,
      task: 'ĐĂNG KÝ HỌC LẠI MIỄN PHÍ-V2',
      desc: 'ĐĂNG KÝ HỌC LẠI MIỄN PHÍ CHO SINH VIÊN'
    },
    {
      stt: 3,
      task: 'ĐĂNG KÝ KÝ TÊN LẠI',
      desc: 'ÁP DỤNG CHO TRƯỜNG THỂ SV BỊ MẤT/HỎNG. BÀI HỌC MỚI SV KHÔNG ĐĂNG NHẬP ĐƯỢC DỊCH VỤ NÀY'
    },
    {
      stt: 4,
      task: 'ĐĂNG KÝ PHẦN GIẢM HỌC',
      desc: ''
    },
    {
      stt: 5,
      task: 'ĐĂNG KÝ THAY ĐỔI THÔNG TIN',
      desc: ''
    },
    {
      stt: 6,
      task: 'ĐĂNG KÝ THÔI HỌC',
      desc: ''
    },
    {
      stt: 7,
      task: 'ĐĂNG KÝ NGƯỜI NHẬN XÁC THỰC',
      desc: 'SINH VIÊN DOWNLOAD MẪU XÁC NHẬN, ĐIỀN ĐẦY ĐỦ THÔNG TIN VÀ UPLOAD LÊN ĐĂNG KÝ'
    },
    {
      stt: 8,
      task: 'ĐĂNG KÝ HỌC LẠI',
      desc: 'ĐĂNG KÝ HỌC LẠI CHO SINH VIÊN TRƯỢT MÔN HỌC'
    },
    {
      stt: 9,
      task: 'ĐĂNG KÝ TẠM THỜI HỌC',
      desc: 'DỊCH VỤ ÁP DỤNG CHO TRƯỜP HỢP SV CẦN TẠM DỪNG HỌC KHI LỚP HỌC CHƯA KẾT THÚC'
    },
    {
      stt: 10,
      task: 'ĐĂNG KÝ VÀ DỊCH VỤ KHÁC',
      desc: 'SỬ DỤNG CHUNG CHO CÁC DỊCH VỤ KHÔNG BỊ MẤT PHÍ NHƯ: THẮC MẮC, KHIẾU NẠI,...'
    }
  ];

  const handleRegisterClick = (service: ServiceItem) => {
    setSelectedService(service);
    setShowSuccess(false);
  };

  const handleConfirmRegistration = () => {
    setShowSuccess(true);
    // Auto close success alert after 2 seconds
    setTimeout(() => {
      setSelectedService(null);
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      
      {/* Main Content Area */}
      <main className="dashboard-container">
        
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

      </main>

      {/* Footer Details */}
      <Footer />

      {/* Confirmation / Success Modal Popups */}
      {selectedService && (
        <div className="modal-overlay">
          <div className="modal-content">
            {!showSuccess ? (
              <>
                <div className="modal-icon">
                  <ClipboardList size={28} />
                </div>
                <h3 className="modal-title">Xác nhận đăng ký</h3>
                <p className="modal-desc">
                  Bạn có chắc chắn muốn đăng ký dịch vụ <strong>{selectedService.task}</strong> không? Đơn đăng ký của bạn sẽ được gửi tới Ban Đào Tạo BTEC để phê duyệt.
                </p>
                <div className="modal-actions">
                  <button onClick={handleConfirmRegistration} className="modal-btn-confirm">
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
