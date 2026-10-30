import { useState, useEffect } from 'react';
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
  Users,
  Camera,
  Image as ImageIcon,
  Edit,
  X,
  Save
} from 'lucide-react';

interface ProfileProps {
  lang: 'vi' | 'en';
}

export const Profile = ({ lang }: ProfileProps) => {
  const [academicOpen, setAcademicOpen] = useState(true);
  const [financeOpen, setFinanceOpen] = useState(true);
  const [parentsOpen, setParentsOpen] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Translation helper
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  // Profile presets
  const avatarPresets = [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120', // Original guy
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120', // Woman coder
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120', // Tech guy
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120', // Pro woman
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120'  // Creative guy
  ];

  const bannerPresets = [
    'linear-gradient(135deg, #0D226B, #f37021)', // Rikkei Theme
    'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', // Dark Tech
    'linear-gradient(135deg, #00c6ff, #0072ff)', // Ocean Breeze
    'linear-gradient(135deg, #f12711, #f5af19)', // Sunset Orange
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600', // Premium Abstract
    'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=600'  // Modern Minimal Workspace
  ];

  // Load from localStorage or use default
  const getInitialProfile = () => {
    const saved = localStorage.getItem('student_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name && parsed.id) return parsed;
      } catch (e) {}
    }
    return {
      name: 'Nguyễn Công Trứ',
      id: 'N24DTCN088',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120',
      banner: 'linear-gradient(135deg, #0D226B, #3B82F6)',
      dob: '15/12/2004',
      identityNumber: '030204001944',
      gender: 'Nam',
      dateIssue: '10/06/2019',
      oldAddress: 'Cẩm Vũ, Cẩm Giàng, Hải Dương',
      placeIssue: 'Hải Dương',
      newAddress: 'Thôn Phú Lộc, Xã Tuệ Tĩnh, Thành phố Hải Phòng',
      telephone: '0879378668',
      username: 'truncn24dtcn088',
      email: 'truncn24dtcn088@rikkei.edu.vn',
      class: 'K24',
      campus: 'CNTT2',
      term: 'Term 7',
      major: 'Kỹ thuật phần mềm'
    };
  };

  const [student, setStudent] = useState(getInitialProfile);

  // Form State
  const [formName, setFormName] = useState(student.name);
  const [formId, setFormId] = useState(student.id);
  const [formAvatar, setFormAvatar] = useState(student.avatar);
  const [formBanner, setFormBanner] = useState(student.banner);
  const [formDob, setFormDob] = useState(student.dob);
  const [formIdentityNumber, setFormIdentityNumber] = useState(student.identityNumber);
  const [formGender, setFormGender] = useState(student.gender);
  const [formDateIssue, setFormDateIssue] = useState(student.dateIssue);
  const [formOldAddress, setFormOldAddress] = useState(student.oldAddress);
  const [formPlaceIssue, setFormPlaceIssue] = useState(student.placeIssue);
  const [formNewAddress, setFormNewAddress] = useState(student.newAddress);
  const [formTelephone, setFormTelephone] = useState(student.telephone);
  const [formUsername, setFormUsername] = useState(student.username || 'truncn24dtcn088');
  const [formEmail, setFormEmail] = useState(student.email || 'truncn24dtcn088@rikkei.edu.vn');
  const [formClass, setFormClass] = useState(student.class || 'K24');
  const [formCampus, setFormCampus] = useState(student.campus || 'CNTT2');

  // Sync form state when student changes
  useEffect(() => {
    setFormName(student.name);
    setFormId(student.id);
    setFormAvatar(student.avatar);
    setFormBanner(student.banner || 'linear-gradient(135deg, #0D226B, #3B82F6)');
    setFormDob(student.dob);
    setFormIdentityNumber(student.identityNumber);
    setFormGender(student.gender);
    setFormDateIssue(student.dateIssue);
    setFormOldAddress(student.oldAddress);
    setFormPlaceIssue(student.placeIssue);
    setFormNewAddress(student.newAddress);
    setFormTelephone(student.telephone);
    setFormUsername(student.username || 'truncn24dtcn088');
    setFormEmail(student.email || 'truncn24dtcn088@rikkei.edu.vn');
    setFormClass(student.class || 'K24');
    setFormCampus(student.campus || 'CNTT2');
  }, [student]);

  const handleSave = () => {
    const updatedProfile = {
      ...student,
      name: formName,
      id: formId,
      avatar: formAvatar,
      banner: formBanner,
      dob: formDob,
      identityNumber: formIdentityNumber,
      gender: formGender,
      dateIssue: formDateIssue,
      oldAddress: formOldAddress,
      placeIssue: formPlaceIssue,
      newAddress: formNewAddress,
      telephone: formTelephone,
      username: formUsername,
      email: formEmail,
      class: formClass,
      campus: formCampus
    };
    localStorage.setItem('student_profile', JSON.stringify(updatedProfile));
    setStudent(updatedProfile);
    setEditModalOpen(false);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('student_profile_updated'));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', paddingBottom: '40px', animation: 'fadeIn 0.5s ease forwards' }}>
      <main className="dashboard-container">
        
        {/* Profile Card Header Container with Banner & Overlapping Avatar */}
        <div style={{
          borderRadius: '16px',
          backgroundColor: 'var(--bg-sidebar)',
          overflow: 'hidden',
          boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
          border: '1px solid var(--border-color)',
          marginBottom: '24px',
          position: 'relative'
        }}>
          {/* Banner Image or Gradient */}
          <div style={{
            height: '180px',
            background: student.banner.startsWith('linear-gradient') ? student.banner : `url(${student.banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}>
            {/* Edit Banner Button (icon) */}
            <button 
              onClick={() => setEditModalOpen(true)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s',
                outline: 'none'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              title={t('Chỉnh sửa hình nền', 'Edit background')}
            >
              <ImageIcon size={16} style={{ color: 'var(--primary-text-theme, #0D226B)' }} />
            </button>
          </div>

          {/* Profile Info Overlay Wrapper */}
          <div style={{
            padding: '0 24px 24px 24px',
            position: 'relative',
            marginTop: '-60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              width: '100%',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              {/* Avatar Container */}
              <div style={{ position: 'relative' }}>
                <img 
                  src={student.avatar} 
                  alt={student.name} 
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    borderRadius: '50%', 
                    objectFit: 'cover', 
                    border: '4px solid var(--bg-sidebar)', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    backgroundColor: '#F8FAFC'
                  }}
                />
                <button 
                  onClick={() => setEditModalOpen(true)}
                  style={{
                    position: 'absolute',
                    bottom: '4px',
                    right: '4px',
                    backgroundColor: '#0D226B',
                    border: '2px solid #FFFFFF',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    outline: 'none'
                  }}
                  title={t('Thay đổi avatar', 'Change avatar')}
                >
                  <Camera size={14} style={{ color: '#FFFFFF' }} />
                </button>
              </div>

              {/* Edit Profile Button */}
              <button 
                onClick={() => setEditModalOpen(true)}
                style={{
                  backgroundColor: '#0D226B',
                  color: '#FFFFFF',
                  padding: '10px 20px',
                  borderRadius: '24px',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(13, 34, 107, 0.25)',
                  transition: 'all 0.2s',
                  marginBottom: '8px',
                  outline: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1E3A8A'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0D226B'}
              >
                <Edit size={16} />
                <span>{t('Chỉnh sửa trang cá nhân', 'Edit profile')}</span>
              </button>
            </div>

            {/* Name and Tags section */}
            <div style={{ marginTop: '16px', width: '100%' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary-text-theme, #0D226B)', margin: '0 0 4px 0' }}>
                {student.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748B', fontFamily: 'monospace' }}>
                  {student.id}
                </span>
                <span style={{ color: '#cbd5e1' }}>•</span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ backgroundColor: '#f37021', color: '#FFFFFF', fontSize: '11px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '12px' }}>
                    {student.class || 'K24'}
                  </span>
                  <span style={{ backgroundColor: '#10B981', color: '#FFFFFF', fontSize: '11px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '12px' }}>
                    {student.campus || 'CNTT2'}
                  </span>
                  <span style={{ backgroundColor: '#3B82F6', color: '#FFFFFF', fontSize: '11px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '12px' }}>
                    {student.term || 'Term 7'}
                  </span>
                </div>
              </div>
            </div>

            {/* Horizontal separator */}
            <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-color)', margin: '24px 0' }} />

            {/* Quick Info Grid */}
            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={18} style={{ color: '#f37021', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('Ngày sinh', 'Date of birth')}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '600' }}>{student.dob}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CreditCard size={18} style={{ color: '#f37021', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('Số CMND/CCCD', 'Identity Number')}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '600' }}>{student.identityNumber}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <User size={18} style={{ color: '#f37021', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('Giới tính', 'Gender')}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '600' }}>{t(student.gender, student.gender === 'Nam' ? 'Male' : 'Female')}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={18} style={{ color: '#f37021', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('Ngày cấp', 'Date issue')}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '600' }}>{student.dateIssue}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <MapPin size={18} style={{ color: '#f37021', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('Địa chỉ cũ', 'Old Address')}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '600', lineHeight: '1.4' }}>{student.oldAddress}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Search size={18} style={{ color: '#f37021', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('Nơi cấp', 'Place Issue')}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '600' }}>{student.placeIssue}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <MapPin size={18} style={{ color: '#f37021', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('Địa chỉ mới', 'New Address')}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '600', lineHeight: '1.4' }}>{student.newAddress}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={18} style={{ color: '#f37021', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('Số điện thoại', 'Telephone')}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '600' }}>{student.telephone}</span>
                </div>
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
            color: 'var(--primary-text-theme, #0D226B)',
            padding: '8px 20px',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#0D226B'; e.currentTarget.style.color = '#FFFFFF'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#0D226B'; }}
          >
            {t('Quyết định liên quan', 'Related Decision')}
          </button>
          <button 
            onClick={() => window.open(window.location.origin + '/portfolio/1', '_blank')}
            style={{
              background: 'none',
              border: '1.5px solid #0D226B',
              borderRadius: '20px',
              color: 'var(--primary-text-theme, #0D226B)',
              padding: '8px 20px',
              fontSize: '13px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#0D226B'; e.currentTarget.style.color = '#FFFFFF'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#0D226B'; }}
          >
            {t('Hồ sơ trực tuyến', 'Profile Online')}
          </button>
        </div>

        {/* Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* SECTION 1: ACADEMIC */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'var(--bg-sidebar)' }}>
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
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>MEMBER CODE</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}>{student.username || 'truncn24dtcn088'}</div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>EMAIL</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', textDecoration: 'underline' }}>{student.email || 'truncn24dtcn088@rikkei.edu.vn'}</div>
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>ENROLL DATE</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}></div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>MODE</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}>{t('Chính quy', 'Regular')}</div>
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>CURRICULUM CODE</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}>BC_V6_01</div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>INITIAL MAJOR</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}>{t('Lập trình máy tính', 'Computer Programming')}</div>
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>INITIAL ADMISSION COURSE</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}>{student.class || 'K24'}</div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>OLD ROLL NUMBER</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}></div>
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>LEGAL ENTITY</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}>{t('Trường', 'School')}</div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>CAPSTONE PROJECT</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}></div>
                </div>

                <div style={{ display: 'flex', gridColumn: 'span 2' }}>
                  <div style={{ width: '20%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>SCHOLARSHIP LEVEL</div>
                  <div style={{ width: '80%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}>{t('Ưu đãi 10%', '10% Discount')}</div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: FINANCE */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'var(--bg-sidebar)' }}>
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
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>TERM PAID</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}></div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>EXTENSION DATE</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}></div>
                </div>

                <div style={{ display: 'flex', borderRight: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>{t('LOẠI TÀI CHÍNH', 'FINANCIAL TYPE')}</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}></div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>WALLET BALANCE</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}>{t('VND 0 đ', '0 VND')}</div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 3: PARENTS */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'var(--bg-sidebar)' }}>
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
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>NAME</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}></div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>PHONE NUMBER</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}>0704780103</div>
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>ADDRESS</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', lineHeight: '1.4' }}>{student.oldAddress}</div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>EMAIL</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}></div>
                </div>

                <div style={{ display: 'flex', borderRight: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>JOB</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}></div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '40%', backgroundColor: 'var(--bg-cream)', padding: '10px 16px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>PLACE OF WORK</div>
                  <div style={{ width: '60%', padding: '10px 16px', fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center' }}></div>
                </div>
              </div>
            )}
          </div>

        </div>

      </main>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="modal-overlay" style={{ overflowY: 'auto', padding: '20px' }}>
          <div className="modal-content" style={{ maxWidth: '720px', width: '100%', textAlign: 'left', position: 'relative', margin: '40px auto', padding: '28px' }}>
            {/* Modal Close Button */}
            <button 
              onClick={() => setEditModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#64748B',
                padding: '4px',
                outline: 'none'
              }}
            >
              <X size={22} />
            </button>

            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-text-theme, #0D226B)', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
              {t('Chỉnh sửa thông tin cá nhân', 'Edit Personal Information')}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Avatar Presets Selection */}
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-dark)', display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {t('1. Thay đổi ảnh đại diện (Avatar)', '1. Change Avatar')}
                </label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px', alignItems: 'center' }}>
                  {avatarPresets.map((preset, idx) => (
                    <img 
                      key={idx}
                      src={preset}
                      alt="preset"
                      onClick={() => setFormAvatar(preset)}
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: formAvatar === preset ? '3px solid #0D226B' : '2px solid #cbd5e1',
                        boxShadow: formAvatar === preset ? '0 0 8px rgba(13, 34, 107, 0.4)' : 'none',
                        transition: 'all 0.2s'
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>{t('Hoặc nhập địa chỉ (URL) ảnh tự chọn:', 'Or enter custom image URL:')}</span>
                  <input 
                    type="text" 
                    value={formAvatar} 
                    onChange={(e) => setFormAvatar(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '13px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      outline: 'none'
                    }}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
              </div>

              {/* Banner Presets Selection */}
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-dark)', display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {t('2. Thay đổi hình nền (Background Banner)', '2. Change Background Banner')}
                </label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  {bannerPresets.map((preset, idx) => {
                    const isGradient = preset.startsWith('linear-gradient');
                    return (
                      <div 
                        key={idx}
                        onClick={() => setFormBanner(preset)}
                        style={{
                          width: '80px',
                          height: '46px',
                          borderRadius: '6px',
                          background: isGradient ? preset : `url(${preset})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          cursor: 'pointer',
                          border: formBanner === preset ? '3px solid #0D226B' : '2px solid #cbd5e1',
                          boxShadow: formBanner === preset ? '0 0 8px rgba(13, 34, 107, 0.4)' : 'none',
                          transition: 'all 0.2s'
                        }}
                        title={isGradient ? `Gradient ${idx+1}` : `Image ${idx+1}`}
                      />
                    );
                  })}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>{t('Hoặc nhập địa chỉ (URL) / CSS Gradient hình nền:', 'Or enter custom URL / CSS Gradient code:')}</span>
                  <input 
                    type="text" 
                    value={formBanner} 
                    onChange={(e) => setFormBanner(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '13px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      outline: 'none'
                    }}
                    placeholder="linear-gradient(...) or https://example.com/banner.jpg"
                  />
                </div>
              </div>

              {/* Personal Details Inputs Grid */}
              <div>
                <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-dark)', display: 'block', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {t('3. Thông tin cá nhân chi tiết', '3. Detailed Personal Information')}
                </label>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px 18px' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>{t('Họ và tên', 'Full Name')}</label>
                    <input 
                      type="text" 
                      value={formName} 
                      onChange={(e) => setFormName(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '13.5px', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>{t('Mã sinh viên', 'Student ID')}</label>
                    <input 
                      type="text" 
                      value={formId} 
                      onChange={(e) => setFormId(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '13.5px', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>{t('Ngày sinh', 'Date of birth')}</label>
                    <input 
                      type="text" 
                      value={formDob} 
                      onChange={(e) => setFormDob(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '13.5px', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>{t('Giới tính', 'Gender')}</label>
                    <select 
                      value={formGender} 
                      onChange={(e) => setFormGender(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '13.5px', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none', backgroundColor: 'var(--bg-sidebar)', cursor: 'pointer' }}
                    >
                      <option value="Nam">{t('Nam', 'Male')}</option>
                      <option value="Nữ">{t('Nữ', 'Female')}</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>{t('Số CMND/CCCD', 'Identity Number')}</label>
                    <input 
                      type="text" 
                      value={formIdentityNumber} 
                      onChange={(e) => setFormIdentityNumber(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '13.5px', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>{t('Số điện thoại', 'Telephone')}</label>
                    <input 
                      type="text" 
                      value={formTelephone} 
                      onChange={(e) => setFormTelephone(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '13.5px', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>{t('Ngày cấp', 'Date issue')}</label>
                    <input 
                      type="text" 
                      value={formDateIssue} 
                      onChange={(e) => setFormDateIssue(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '13.5px', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>{t('Nơi cấp', 'Place Issue')}</label>
                    <input 
                      type="text" 
                      value={formPlaceIssue} 
                      onChange={(e) => setFormPlaceIssue(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '13.5px', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>{t('Địa chỉ cũ', 'Old Address')}</label>
                    <input 
                      type="text" 
                      value={formOldAddress} 
                      onChange={(e) => setFormOldAddress(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '13.5px', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>{t('Địa chỉ mới', 'New Address')}</label>
                    <input 
                      type="text" 
                      value={formNewAddress} 
                      onChange={(e) => setFormNewAddress(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '13.5px', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                    />
                  </div>

                  {/* Academic specific */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>MEMBER CODE</label>
                    <input 
                      type="text" 
                      value={formUsername} 
                      onChange={(e) => setFormUsername(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '13.5px', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>EMAIL</label>
                    <input 
                      type="text" 
                      value={formEmail} 
                      onChange={(e) => setFormEmail(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '13.5px', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>CLASS / COHORT</label>
                    <input 
                      type="text" 
                      value={formClass} 
                      onChange={(e) => setFormClass(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '13.5px', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>CAMPUS</label>
                    <input 
                      type="text" 
                      value={formCampus} 
                      onChange={(e) => setFormCampus(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '13.5px', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                    />
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '18px', marginTop: '6px' }}>
                <button 
                  onClick={() => setEditModalOpen(false)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '24px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-sidebar)',
                    color: 'var(--text-muted)',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  {t('Hủy', 'Cancel')}
                </button>
                <button 
                  onClick={handleSave}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '24px',
                    backgroundColor: '#0D226B',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(13, 34, 107, 0.25)',
                    outline: 'none'
                  }}
                >
                  <Save size={16} />
                  <span>{t('Lưu thay đổi', 'Save changes')}</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
