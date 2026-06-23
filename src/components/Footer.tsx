import { MapPin, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="portal-footer">
      <div className="footer-grid">
        
        {/* Left Column - HCMC Campus Contact (Vietnamese) */}
        <div className="footer-column">
          <p className="footer-headline">
            Mọi người góp ý, thắc mắc xin liên hệ: Trung tâm Cao đẳng quốc tế tại Hồ Chí Minh – Trường Cao đẳng FPT Polytechnic
          </p>
          <div className="footer-contact-list">
            <div className="footer-contact-row">
              <MapPin size={16} className="footer-contact-icon" />
              <div>
                <span className="footer-contact-label">Địa chỉ:</span>
                <span>Tòa Genpacific, Công Viên Phần Mềm Quang Trung, Phường Trung Mỹ Tây, Thành phố Hồ Chí Minh.</span>
              </div>
            </div>
            <div className="footer-contact-row">
              <Mail size={16} className="footer-contact-icon" />
              <div>
                <span className="footer-contact-label">E-mail:</span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span>Phòng TC&QLĐT: <a href="mailto:Academic.btec.hcm@fe.edu.vn" className="footer-link">Academic.btec.hcm@fe.edu.vn</a></span>
                  <span>DVSV/CTSV: <a href="mailto:Sro.btec.hcm@fe.edu.vn" className="footer-link">Sro.btec.hcm@fe.edu.vn</a></span>
                  <span>Bộ phận thu ngân: <a href="mailto:Accounting.btec.hcm@fe.edu.vn" className="footer-link">Accounting.btec.hcm@fe.edu.vn</a></span>
                </span>
              </div>
            </div>
            <div className="footer-contact-row">
              <Phone size={16} className="footer-contact-icon" />
              <div>
                <span className="footer-contact-label">Đường dây nóng:</span>
                <span style={{ fontWeight: '600' }}>028 730 99 679</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - FPT Polytechnic International Contact (English) */}
        <div className="footer-column">
          <p className="footer-headline">
            For more information or any queries, please contact: FPT Polytechnic International in Ho Chi Minh
          </p>
          <div className="footer-contact-list">
            <div className="footer-contact-row">
              <MapPin size={16} className="footer-contact-icon" />
              <div>
                <span className="footer-contact-label" style={{ minWidth: '60px' }}>Address:</span>
                <span>Genpacific Building, Quang Trung Software City, Trung My Tay Ward, Ho Chi Minh City.</span>
              </div>
            </div>
            <div className="footer-contact-row">
              <Mail size={16} className="footer-contact-icon" />
              <div>
                <span className="footer-contact-label" style={{ minWidth: '60px' }}>Email:</span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span>Academic Department: <a href="mailto:Academic.btec.hcm@fe.edu.vn" className="footer-link">Academic.btec.hcm@fe.edu.vn</a></span>
                  <span>SRO Department: <a href="mailto:Sro.btec.hcm@fe.edu.vn" className="footer-link">Sro.btec.hcm@fe.edu.vn</a></span>
                  <span>Finance Department: <a href="mailto:Accounting.btec.hcm@fe.edu.vn" className="footer-link">Accounting.btec.hcm@fe.edu.vn</a></span>
                </span>
              </div>
            </div>
            <div className="footer-contact-row">
              <Phone size={16} className="footer-contact-icon" />
              <div>
                <span className="footer-contact-label" style={{ minWidth: '60px' }}>Hotline:</span>
                <span style={{ fontWeight: '600' }}>028 730 99 679</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
