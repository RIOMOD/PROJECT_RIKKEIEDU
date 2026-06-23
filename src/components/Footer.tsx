import { MapPin, Phone, Mail } from 'lucide-react';
import logoRikkeiedu from '../assets/logorikkeiedu.png';

interface FooterProps {
  lang: 'vi' | 'en';
}

export const Footer = ({ lang }: FooterProps) => {
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  return (
    <footer style={{
      borderTop: '1px solid #e2e8f0',
      backgroundColor: '#ffffff',
      padding: '40px 24px',
      fontFamily: "'Inter', sans-serif",
      color: '#1e293b',
      marginTop: 'auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Top brand header */}
        <div style={{ marginBottom: '32px', textAlign: 'left' }}>
          <img 
            src={logoRikkeiedu} 
            alt="Rikkei Edu Logo" 
            style={{ height: '42px', objectFit: 'contain', display: 'block', marginBottom: '8px' }} 
          />
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '800', 
            color: '#0D226B', 
            margin: 0,
            letterSpacing: '0.2px'
          }}>
            {t('Tổ chức Giáo dục & Phát triển Nhân lực quốc tế', 'International Education & Human Resources Development Organization')}
          </h3>
        </div>

        {/* 3-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>
          
          {/* COLUMN 1: CONTACT INFORMATION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            <h4 style={{ 
              fontSize: '12.5px', 
              fontWeight: '700', 
              color: '#64748b', 
              textTransform: 'uppercase', 
              letterSpacing: '0.5px',
              borderBottom: '2px solid #F2F7FF',
              paddingBottom: '6px',
              margin: 0
            }}>
              {t('THÔNG TIN LIÊN HỆ', 'CONTACT INFORMATION')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px', color: '#475569', lineHeight: '1.6' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={15} style={{ color: '#ef4444', flexShrink: 0, marginTop: '3px' }} />
                <span>
                  <strong style={{ color: '#0d226b' }}>{t('Cơ sở Hà Nội:', 'Hanoi Campus:')}</strong>{' '}
                  {t('Toà nhà HPC Landmark 105, 105 Tố Hữu, La Khê, Hà Đông, Hà Nội', 'HPC Landmark 105 Building, 105 To Huu, La Khe, Ha Dong, Hanoi')}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={15} style={{ color: '#ef4444', flexShrink: 0, marginTop: '3px' }} />
                <span>
                  <strong style={{ color: '#0d226b' }}>{t('Cơ sở Hồ Chí Minh:', 'HCMC Campus:')}</strong>{' '}
                  {t('Tầng 2, Tòa nhà Dali Tower, số 24C đường Phan Đăng Lưu, Phường 6, Quận Bình Thạnh, TP. Hồ Chí Minh', '2nd Floor, Dali Tower, 24C Phan Dang Luu Street, Ward 6, Binh Thanh District, Ho Chi Minh City')}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={15} style={{ color: '#ef4444', flexShrink: 0, marginTop: '3px' }} />
                <span>
                  <strong style={{ color: '#0d226b' }}>{t('Cơ sở Fukuoka:', 'Fukuoka Campus:')}</strong>{' '}
                  {t('Phòng 417, Tầng 4, Tòa nhà Tokan Fukuoka số 2, số 1-18 Hie-machi, quận Hakata, Fukuoka', 'Room 417, 4th Floor, Tokan Fukuoka Building No. 2, 1-18 Hie-machi, Hakata Ward, Fukuoka')}
                </span>
              </div>
            </div>

            {/* Phone & Email side by side */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '24px', 
              marginTop: '12px',
              borderTop: '1px solid #f1f5f9',
              paddingTop: '16px'
            }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  {t('SỐ ĐIỆN THOẠI', 'TELEPHONE')}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: '700', color: '#0d226b' }}>
                  <Phone size={14} style={{ color: '#3b82f6' }} />
                  <span>0862 069 233</span>
                </div>
              </div>
              <div>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  EMAIL
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: '700', color: '#0d226b' }}>
                  <Mail size={14} style={{ color: '#3b82f6' }} />
                  <a href="mailto:academy@rikkeisoft.com" style={{ color: 'inherit', textDecoration: 'none' }}>academy@rikkeisoft.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: PRODUCTS & SERVICES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            <h4 style={{ 
              fontSize: '12.5px', 
              fontWeight: '700', 
              color: '#64748b', 
              textTransform: 'uppercase', 
              letterSpacing: '0.5px',
              borderBottom: '2px solid #F2F7FF',
              paddingBottom: '6px',
              margin: 0
            }}>
              {t('SẢN PHẨM & DỊCH VỤ', 'PRODUCTS & SERVICES')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '12.5px' }}>
              <div>
                <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#0d226b', margin: '0 0 6px 0' }}>
                  {t('Hợp tác đào tạo Đại học', 'University Training Partnership')}
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#475569', lineHeight: '1.4' }}>
                  <span>• {t('Kỹ sư Công nghệ thông tin (PTIT x Rikkeisoft)', 'IT Engineer (PTIT x Rikkeisoft)')}</span>
                  <span>• {t('Cử nhân Quản trị Kinh doanh - Định hướng Kinh doanh số (PTIT x Rikkeisoft)', 'Bachelor of Business Administration - Digital Business (PTIT x Rikkeisoft)')}</span>
                  <span>• {t('Chương trình đào tạo Data Analysis (HUST x Rikkeisoft)', 'Data Analysis Training (HUST x Rikkeisoft)')}</span>
                  <span>• {t('Chương trình đào tạo Lập trình Nhúng giảng dạy bởi Trường Điện – Điện tử (ĐHBKHN) x Rikkeisoft', 'Embedded Programming by School of Electrical & Electronic Eng (HUST) x Rikkeisoft')}</span>
                </div>
              </div>
              <div>
                <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#0d226b', margin: '0 0 6px 0' }}>
                  {t('Học viện đào tạo', 'Academy Training Programs')}
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#475569', lineHeight: '1.4' }}>
                  <span>• {t('Chương trình Đào tạo IT TSUBASA', 'IT TSUBASA Training Program')}</span>
                  <span>• {t('Chương trình Đào tạo Java Backend Full-Skill', 'Java Backend Full-Skill Training Program')}</span>
                </div>
              </div>
              <div>
                <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#0d226b', margin: '0 0 6px 0' }}>
                  {t('Du học & Việc làm Nhật Bản', 'Study & Work in Japan')}
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#475569', lineHeight: '1.4' }}>
                  <span>• {t('Du học Rikkei Academy', 'Rikkei Academy Study Abroad')}</span>
                  <span>• {t('Cung ứng nhân lực Nhật Bản', 'Japan Manpower Supply')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: JAPANESE & EDTECH ECOSYSTEM */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            <h4 style={{ 
              fontSize: '12.5px', 
              fontWeight: '700', 
              color: '#64748b', 
              textTransform: 'none', 
              letterSpacing: '0.5px',
              borderBottom: '2px solid #F2F7FF',
              paddingBottom: '6px',
              margin: 0
            }}>
              &nbsp;
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '12.5px' }}>
              <div>
                <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#0d226b', margin: '0 0 6px 0' }}>
                  {t('Tiếng Nhật', 'Japanese Language')}
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#475569', lineHeight: '1.4' }}>
                  <span>• JLPT</span>
                  <span>• IT TALK</span>
                  <span>• {t('Đào tạo Doanh nghiệp', 'Corporate Training')}</span>
                </div>
              </div>
              <div>
                <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#0d226b', margin: '0 0 6px 0' }}>
                  {t('Hệ sinh thái EdTech', 'EdTech Ecosystem')}
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#475569', lineHeight: '1.4' }}>
                  <span>• Internship One Connect</span>
                  <span>• {t('Khảo thí chất lượng đào tạo', 'Training Quality Assessment')}</span>
                  <span>• Rikkei Edu LMS</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
