import { FileText, Download, ExternalLink, Info } from 'lucide-react';

interface StudentHandbookProps {
  lang: 'vi' | 'en';
}

export const StudentHandbook = ({ lang }: StudentHandbookProps) => {
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  const pdfUrl = '/cam-nang-sinh-vien.pdf';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      
      <main className="dashboard-container" style={{ textAlign: 'left' }}>
        
        {/* Page Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
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
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-dark)', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {t('Sổ tay sinh viên', 'Student Handbook')}
          </h2>
        </div>

        {/* Handbook Information Card */}
        <div style={{
          backgroundColor: 'var(--bg-sidebar)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '24px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '10px',
              backgroundColor: '#FEF2F2',
              color: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontWeight: '800', fontSize: '15px' }}>PDF</span>
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-dark)', margin: '0 0 4px 0' }}>
                {t('Cẩm nang sinh viên RIKKEIEDU 2026', 'RIKKEIEDU Student Handbook 2026')}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: 0 }}>
                {t('Dung lượng: 50.2 MB • Cập nhật lần cuối: 15/06/2026', 'Size: 50.2 MB • Last updated: 06/15/2026')}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Open in new tab button */}
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: 'var(--bg-sidebar)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--text-dark)',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
            >
              <ExternalLink size={16} />
              <span>{t('Mở trong tab mới', 'Open in new tab')}</span>
            </a>

            {/* Download button */}
            <a 
              href={pdfUrl} 
              download="cam-nang-sinh-vien-rikkeiedu.pdf"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                backgroundColor: '#2563EB',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#FFFFFF',
                textDecoration: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.1)',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
            >
              <Download size={16} />
              <span>{t('Tải xuống', 'Download')}</span>
            </a>
          </div>
        </div>

        {/* Large File Instruction Box */}
        <div style={{
          display: 'flex',
          gap: '12px',
          padding: '16px 20px',
          backgroundColor: 'var(--bg-cream)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          color: 'var(--text-dark)',
          marginBottom: '24px',
          textAlign: 'left'
        }}>
          <div style={{ color: 'var(--primary-text-theme, #2563EB)', flexShrink: 0, marginTop: '2px' }}>
            <Info size={18} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>
              {t('Hướng dẫn xem cẩm nang dung lượng lớn', 'Large File Viewing Guide')}
            </h4>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, color: '#1E3A8A' }}>
              {t(
                'Để tiết kiệm dữ liệu di động và có trải nghiệm đọc mượt mà nhất, chúng tôi khuyên bạn nên nhấn nút "Mở trong tab mới" hoặc "Tải xuống" để đọc trực tiếp bằng trình xem PDF tích hợp sẵn trên thiết bị của bạn.',
                'For the smoothest reading experience and to save mobile data, we recommend clicking "Open in new tab" or "Download" to view it directly with your device\'s built-in PDF viewer.'
              )}
            </p>
          </div>
        </div>

        {/* Embedded PDF Viewer Container */}
        <div style={{
          backgroundColor: 'var(--bg-sidebar)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          overflow: 'hidden'
        }}>
          <iframe 
            src={pdfUrl} 
            title="RIKKEIEDU Student Handbook"
            width="100%" 
            height="700px" 
            style={{ border: 'none', borderRadius: '8px', backgroundColor: 'var(--bg-cream)' }}
            // Handle fallback if file is not uploaded yet or fails to load
            onError={(e) => {
              console.log("PDF not found", e);
            }}
          />
        </div>

      </main>

    </div>
  );
};
