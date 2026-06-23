import { CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TuitionReportProps {
  lang: 'vi' | 'en';
}

export const TuitionReport = ({ lang }: TuitionReportProps) => {
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  const student = {
    name: 'Nguyễn Văn Hùng',
    id: 'BS00679',
    class: 'k6',
    major: t('Lập trình máy tính', 'Computer Programming')
  };

  const summary = {
    total: '124,000,000 VND',
    paid: '96,000,000 VND',
    discount: '12,000,000 VND',
    balance: '16,000,000 VND'
  };

  const invoices = [
    {
      id: 'INV-2026-003',
      term: 'SUMMER 2026',
      amount: '16,000,000 VND',
      dueDate: '15/07/2026',
      status: 'Pending',
      paidDate: '-'
    },
    {
      id: 'INV-2026-002',
      term: 'SPRING 2026',
      amount: '16,000,000 VND',
      dueDate: '15/02/2026',
      status: 'Paid',
      paidDate: '10/02/2026'
    },
    {
      id: 'INV-2025-004',
      term: 'FALL 2025',
      amount: '16,000,000 VND',
      dueDate: '15/10/2025',
      status: 'Paid',
      paidDate: '12/10/2025'
    },
    {
      id: 'INV-2025-003',
      term: 'SUMMER 2025',
      amount: '16,000,000 VND',
      dueDate: '15/07/2025',
      status: 'Paid',
      paidDate: '09/07/2025'
    },
    {
      id: 'INV-2025-002',
      term: 'SPRING 2025',
      amount: '16,000,000 VND',
      dueDate: '15/02/2025',
      status: 'Paid',
      paidDate: '11/02/2025'
    },
    {
      id: 'INV-2024-004',
      term: 'FALL 2024',
      amount: '16,000,000 VND',
      dueDate: '15/10/2024',
      status: 'Paid',
      paidDate: '14/10/2024'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease' }}>
      <main className="dashboard-container" style={{ textAlign: 'left' }}>
        
        {/* Header Title */}
        <div style={{ marginBottom: '24px' }}>
          <h2 className="services-section-title" style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: '800' }}>
            {t(`HỌC PHÍ CỦA SINH VIÊN: ${student.name} (${student.id})`, `TUITION REPORT FOR STUDENT: ${student.name} (${student.id})`)}
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
            {t('Xem chi tiết tiến trình đóng học phí và các hóa đơn học thuật.', 'View details of tuition payment progress and academic invoices.')}
          </p>
        </div>

        {/* Tuition summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ backgroundColor: '#eff6ff', color: '#3b82f6', padding: '12px', borderRadius: '8px' }}>
              <CreditCard size={22} />
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                {t('Tổng học phí dự tính', 'Total Estimated Tuition')}
              </span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#0d226b' }}>{summary.total}</span>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '12px', borderRadius: '8px' }}>
              <CheckCircle size={22} />
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                {t('Đã đóng (Đã khấu trừ)', 'Total Paid (Deducted)')}
              </span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#16a34a' }}>{summary.paid}</span>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ backgroundColor: '#fff7ed', color: '#ea580c', padding: '12px', borderRadius: '8px' }}>
              <CheckCircle size={22} />
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                {t('Khấu trừ / Học bổng', 'Deduction / Scholarship')}
              </span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#ea580c' }}>{summary.discount}</span>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '8px' }}>
              <Clock size={22} />
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                {t('Còn nợ (Cần đóng)', 'Remaining Balance')}
              </span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#dc2626' }}>{summary.balance}</span>
            </div>
          </div>

        </div>

        {/* Invoice List Table */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#0d226b', color: '#ffffff', borderBottom: '1px solid #cbd5e1' }}>
                <th style={{ padding: '14px 16px', fontWeight: '700', textAlign: 'left' }}>{t('Mã hóa đơn', 'Invoice ID')}</th>
                <th style={{ padding: '14px 16px', fontWeight: '700', textAlign: 'left' }}>{t('Kỳ học', 'Semester')}</th>
                <th style={{ padding: '14px 16px', fontWeight: '700', textAlign: 'right' }}>{t('Số tiền', 'Amount')}</th>
                <th style={{ padding: '14px 16px', fontWeight: '700', textAlign: 'center' }}>{t('Hạn đóng', 'Due Date')}</th>
                <th style={{ padding: '14px 16px', fontWeight: '700', textAlign: 'center' }}>{t('Ngày đóng', 'Paid Date')}</th>
                <th style={{ padding: '14px 16px', fontWeight: '700', textAlign: 'center' }}>{t('Trạng thái', 'Status')}</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} style={{ borderBottom: '1px solid #e2e8f0', transition: 'background-color 0.15s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '14px 16px', fontWeight: '600', color: '#1e293b' }}>{inv.id}</td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{inv.term}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: '700', color: '#0d226b' }}>{inv.amount}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#475569' }}>{inv.dueDate}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center', color: '#475569' }}>{inv.paidDate}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      backgroundColor: inv.status === 'Paid' ? '#dcfce7' : '#fef3c7',
                      color: inv.status === 'Paid' ? '#16a34a' : '#d97706',
                      textTransform: 'uppercase'
                    }}>
                      {inv.status === 'Paid' ? t('Đã đóng', 'Paid') : t('Chưa đóng', 'Pending')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Warning note */}
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <AlertCircle size={20} style={{ color: '#d97706', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h5 style={{ margin: '0 0 4px 0', fontSize: '13.5px', fontWeight: '700', color: '#b45309' }}>
              {t('⚠️ Lưu ý quan trọng về thời hạn đóng học phí:', '⚠️ Important notice on tuition deadlines:')}
            </h5>
            <p style={{ margin: 0, fontSize: '12.5px', color: '#d97706', lineHeight: '1.5' }}>
              {t(
                'Sinh viên cần hoàn thành học phí đúng hạn quy định trên hóa đơn. Các trường hợp nộp muộn sau hạn đóng có thể bị đình chỉ học tập hoặc từ chối tham gia thi cuối kỳ học phần hiện tại.',
                'Students are required to settle tuition fee balances on or before the indicated due date. Late payments may result in temporary suspension of academic status or restriction from final course examinations.'
              )}
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};
