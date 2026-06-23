import { useState } from 'react';
import { 
  Calendar, 
  CreditCard, 
  User, 
  MapPin, 
  Search, 
  Phone, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  DollarSign, 
  Users
} from 'lucide-react';
import { Footer } from './Footer';

interface ProfileProps {
  lang: 'vi' | 'en';
}

export const Profile = ({ lang }: ProfileProps) => {
  const [academicOpen, setAcademicOpen] = useState(true);
  const [financeOpen, setFinanceOpen] = useState(true);
  const [parentsOpen, setParentsOpen] = useState(true);

  // Translation helper
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  const student = {
    name: 'Nguyễn Văn Hùng',
    id: 'BS00679',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120',
    dob: '15/12/2004',
    identityNumber: '030204001944',
    gender: t('Nam', 'Male'),
    dateIssue: '10/06/2019',
    oldAddress: t('Cẩm Vũ, Cẩm Giàng, Hải Dương', 'Cam Vu, Cam Giang, Hai Duong'),
    placeIssue: t('Hải Dương', 'Hai Duong'),
    newAddress: t('Thôn Phú Lộc, Xã Tuệ Tĩnh, Thành phố Hải Phòng', 'Phu Loc, Tue Tinh, Hai Phong City'),
    telephone: '0879378668'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', paddingBottom: '40px', animation: 'fadeIn 0.5s ease forwards' }}>
      <main className="dashboard-container">
        
        {/* Profile Card Header Container with dashed border */}
        <div style={{ 
          border: '1.5px dashed #cbd5e1', 
          borderRadius: '8px', 
          backgroundColor: '#FFFFFF', 
          padding: '24px', 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '32px',
          marginBottom: '20px'
        }}>
          {/* Avatar and name section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '220px', flex: '1 1 200px' }}>
            <img 
              src={student.avatar} 
              alt={student.name} 
              style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0D226B', marginTop: '16px', marginBottom: '4px', textAlign: 'center' }}>
              {student.name}
            </h2>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748B', fontFamily: 'monospace', marginBottom: '12px' }}>
              {student.id}
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span style={{ backgroundColor: '#f37021', color: '#FFFFFF', fontSize: '11px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '12px' }}>k6</span>
              <span style={{ backgroundColor: '#10B981', color: '#FFFFFF', fontSize: '11px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '12px' }}>HL</span>
              <span style={{ backgroundColor: '#3B82F6', color: '#FFFFFF', fontSize: '11px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '12px' }}>Term 7</span>
            </div>
            <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '16px' }}>|</div>
          </div>

          {/* Quick Info Grid */}
          <div style={{ flex: '2 1 400px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px 24px', alignContent: 'center', borderLeft: '1px solid #f1f5f9', paddingLeft: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar size={18} style={{ color: '#f37021', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('Ngày sinh', 'Date of birth')}</span>
                <span style={{ fontSize: '13px', color: '#334155', fontWeight: '600' }}>{student.dob}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CreditCard size={18} style={{ color: '#f37021', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('Số CMND/CCCD', 'Identity Number')}</span>
                <span style={{ fontSize: '13px', color: '#334155', fontWeight: '600' }}>{student.identityNumber}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <User size={18} style={{ color: '#f37021', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('Giới tính', 'Gender')}</span>
                <span style={{ fontSize: '13px', color: '#334155', fontWeight: '600' }}>{student.gender}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar size={18} style={{ color: '#f37021', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('Ngày cấp', 'Date issue')}</span>
                <span style={{ fontSize: '13px', color: '#334155', fontWeight: '600' }}>{student.dateIssue}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', gridColumn: 'span 1' }}>
              <MapPin size={18} style={{ color: '#f37021', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('Địa chỉ cũ', 'Old Address')}</span>
                <span style={{ fontSize: '13px', color: '#334155', fontWeight: '600', lineHeight: '1.4' }}>{student.oldAddress}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Search size={18} style={{ color: '#f37021', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('Nơi cấp', 'Place Issue')}</span>
                <span style={{ fontSize: '13px', color: '#334155', fontWeight: '600' }}>{student.placeIssue}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', gridColumn: 'span 1' }}>
              <MapPin size={18} style={{ color: '#f37021', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('Địa chỉ mới', 'New Address')}</span>
                <span style={{ fontSize: '13px', color: '#334155', fontWeight: '600', lineHeight: '1.4' }}>{student.newAddress}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone size={18} style={{ color: '#f37021', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('Số điện thoại', 'Telephone')}</span>
                <span style={{ fontSize: '13px', color: '#334155', fontWeight: '600' }}>{student.telephone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button style={{
            background: 'none',
            border: '1.5px solid #0D226B',
            borderRadius: '20px',
            color: '#0D226B',
            padding: '8px 20px',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            {t('Quyết định liên quan', 'Related Decision')}
          </button>
          <button style={{
            background: 'none',
            border: '1.5px solid #0D226B',
            borderRadius: '20px',
            color: '#0D226B',
            padding: '8px 20px',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            {t('Hồ sơ trực tuyến', 'Profile Online')}
          </button>
        </div>

        {/* Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* SECTION 1: ACADEMIC */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
            <div 
              onClick={() => setAcademicOpen(!academicOpen)}
              style={{
                backgroundColor: '#0D226B',
                color: '#FFFFFF',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '13px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={16} />
                <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('HỌC TẬP', 'ACADEMIC')}</span>
              </div>
              {academicOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {academicOpen && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', borderCollapse: 'collapse' }}>
                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>MEMBER CODE</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}>hungnvbs00679</div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>EMAIL</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center', textDecoration: 'underline' }}>hungnvbs00679@rikkei.edu.vn</div>
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>ENROLL DATE</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}></div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>MODE</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}>{t('Chính quy', 'Regular')}</div>
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>CURRICULUM CODE</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}>BC_V6_01</div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>INITAL MAJOR</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}>{t('Kỹ thuật phần mềm', 'Software Engineering')}</div>
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>INITIAL ADMISSION COURSE</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}>k6</div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>OLD ROLL NUMBER</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}></div>
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', borderRight: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>LEGAL ENTITY</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}>{t('Trường', 'School')}</div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>CAPSTONE PROJECT</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}></div>
                </div>

                <div style={{ display: 'flex', gridColumn: 'span 2' }}>
                  <div style={{ width: '20%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>SCHOLARSHIP LEVEL</div>
                  <div style={{ width: '80%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}>{t('Ưu đãi 10%', '10% Discount')}</div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: FINANCE */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
            <div 
              onClick={() => setFinanceOpen(!financeOpen)}
              style={{
                backgroundColor: '#0D226B',
                color: '#FFFFFF',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '13px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DollarSign size={16} />
                <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('TÀI CHÍNH', 'FINANCE')}</span>
              </div>
              {financeOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {financeOpen && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', borderCollapse: 'collapse' }}>
                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>TERM PAID</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}></div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>EXTENSION DATE</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}></div>
                </div>

                <div style={{ display: 'flex', borderRight: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>{t('LOẠI TÀI CHÍNH', 'FINANCIAL TYPE')}</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}></div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>WALLET BALANCE</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}>{t('VND 0 đ', '0 VND')}</div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 3: PARENTS */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
            <div 
              onClick={() => setParentsOpen(!parentsOpen)}
              style={{
                backgroundColor: '#0D226B',
                color: '#FFFFFF',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '13px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} />
                <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('PHỤ HUYNH', 'PARENTS')}</span>
              </div>
              {parentsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {parentsOpen && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', borderCollapse: 'collapse' }}>
                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>NAME</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}></div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>PHONE NUMBER</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}>0704780103</div>
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>ADDRESS</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center', lineHeight: '1.4' }}>{t('Cẩm Vũ, Cẩm Giàng, Hải Dương', 'Cam Vu, Cam Giang, Hai Duong')}</div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>EMAIL</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}></div>
                </div>

                <div style={{ display: 'flex', borderRight: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>JOB</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}></div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '40%', backgroundColor: '#f8fafc', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center' }}>PLACE OF WORK</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', alignItems: 'center' }}></div>
                </div>
              </div>
            )}
          </div>

        </div>

      </main>

      {/* Reusable Rikkei Edu Footer */}
      <Footer lang={lang} />
    </div>
  );
};
