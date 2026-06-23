import { Phone, Mail } from 'lucide-react';

interface FooterProps {
  lang: 'vi' | 'en';
}

export const Footer = ({ lang: _lang }: FooterProps) => {
  return (
    <footer style={{
      borderTop: '1px solid #e2e8f0',
      backgroundColor: '#ffffff',
      padding: '24px 32px',
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: '#1e293b',
      marginTop: 'auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>
          
          {/* LEFT COLUMN: VIETNAMESE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            <p style={{ fontSize: '13px', fontWeight: '500', color: '#1e293b', margin: 0, lineHeight: '1.6' }}>
              Mọi góp ý, thắc mắc xin liên hệ: <strong>Trung tâm Quốc tế RIKKEI tại Hồ Chí Minh - Học viện RIKKEI</strong>
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#475569' }}>
              {/* Address */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Mail size={15} style={{ color: '#ef562f', flexShrink: 0, marginTop: '4px' }} />
                <span style={{ display: 'flex', gap: '6px' }}>
                  <span>Địa chi:</span>
                  <span style={{ fontWeight: '500', color: '#1e293b' }}>
                    Tòa Genpacific, Công Viên Phần Mềm Quang Trung, Phường Trung Mỹ Tây, Thành phố Hồ Chí Minh.
                  </span>
                </span>
              </div>

              {/* Email list */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Mail size={15} style={{ color: '#ef562f', flexShrink: 0, marginTop: '4px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontWeight: '500', color: '#1e293b' }}>Email:</span>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <li>
                      Phòng TC&QLĐT:{' '}
                      <a href="mailto:academic.rk.hcm@rikkei.edu.vn" style={{ color: '#ef562f', textDecoration: 'underline' }}>
                        academic.rk.hcm@rikkei.edu.vn
                      </a>
                    </li>
                    <li>
                      DVSV/CTSV:{' '}
                      <a href="mailto:sro.rk.hcm@rikkei.edu.vn" style={{ color: '#ef562f', textDecoration: 'underline' }}>
                        sro.rk.hcm@rikkei.edu.vn
                      </a>
                    </li>
                    <li>
                      Bộ phận thu ngân:{' '}
                      <a href="mailto:accounting.rk.hcm@rikkei.edu.vn" style={{ color: '#ef562f', textDecoration: 'underline' }}>
                        accounting.rk.hcm@rikkei.edu.vn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Hotline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} style={{ color: '#ef562f', flexShrink: 0 }} />
                <span>
                  Hotline:{' '}
                  <strong style={{ color: '#1e293b', fontSize: '13.5px' }}>028 730 99 679</strong>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ENGLISH */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            <p style={{ fontSize: '13px', fontWeight: '500', color: '#1e293b', margin: 0, lineHeight: '1.6' }}>
              For more information or any queries, please contact: <strong>RIKKEI International in Ho Chi Minh</strong>
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#475569' }}>
              {/* Address */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Mail size={15} style={{ color: '#ef562f', flexShrink: 0, marginTop: '4px' }} />
                <span style={{ display: 'flex', gap: '6px' }}>
                  <span>Address:</span>
                  <span style={{ fontWeight: '500', color: '#1e293b' }}>
                    Genpacific Building, Quang Trung Software City, Trung My Tay Ward, Ho Chi Minh City.
                  </span>
                </span>
              </div>

              {/* Email list */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Mail size={15} style={{ color: '#ef562f', flexShrink: 0, marginTop: '4px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontWeight: '500', color: '#1e293b' }}>Email:</span>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <li>
                      Academic Department:{' '}
                      <a href="mailto:academic.rk.hcm@rikkei.edu.vn" style={{ color: '#ef562f', textDecoration: 'underline' }}>
                        academic.rk.hcm@rikkei.edu.vn
                      </a>
                    </li>
                    <li>
                      SRO Department:{' '}
                      <a href="mailto:sro.rk.hcm@rikkei.edu.vn" style={{ color: '#ef562f', textDecoration: 'underline' }}>
                        sro.rk.hcm@rikkei.edu.vn
                      </a>
                    </li>
                    <li>
                      Finance Department:{' '}
                      <a href="mailto:accounting.rk.hcm@rikkei.edu.vn" style={{ color: '#ef562f', textDecoration: 'underline' }}>
                        accounting.rk.hcm@rikkei.edu.vn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Hotline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} style={{ color: '#ef562f', flexShrink: 0 }} />
                <span>
                  Hotline:{' '}
                  <strong style={{ color: '#1e293b', fontSize: '13.5px' }}>028 730 99 679</strong>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
