import { useState } from 'react';
import { BtecLogo } from './BtecLogo';
import { 
  Home, 
  ChevronDown, 
  ChevronRight, 
  ClipboardList, 
  UserCheck, 
  MessageSquare, 
  Calendar, 
  Clock, 
  FileText, 
  CreditCard, 
  GraduationCap, 
  Users,
  Sparkles,
  BookOpen,
  FileSpreadsheet,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
  lang: 'vi' | 'en';
}

export const Sidebar = ({ 
  isOpen, 
  onClose, 
  activeItem, 
  setActiveItem,
  lang
}: SidebarProps) => {
  // Submenu states - default open as shown in mockup
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    dangKy: true,
    dichVuTrucTuyen: true,
    truyCap: true,
    baoCao: true,
    nguoiKhac: true
  });

  const toggleSubmenu = (menuKey: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const handleLinkClick = (itemKey: string) => {
    setActiveItem(itemKey);
    // On mobile, automatically close sidebar after choosing a link
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  // Translation mapping helper
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        
        {/* Sidebar Header with BTEC Logo */}
        <div className="sidebar-brand">
          <BtecLogo height={46} className="sidebar-brand-logo" />
          <button onClick={onClose} className="sidebar-close-btn" aria-label="Close sidebar">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Navigation Menu */}
        <div className="sidebar-menu">
          
          {/* TRANG CHỦ heading & link */}
          <div className="sidebar-heading">
            <div className="sidebar-heading-left">
              <Sparkles size={13} className="text-slate-400" />
              <span>{t('Trang chủ', 'Home')}</span>
            </div>
          </div>
          <div 
            onClick={() => handleLinkClick('trang-chu')}
            className={`sidebar-link ${activeItem === 'trang-chu' ? 'active' : ''}`}
          >
            <span className="sidebar-link-content">
              <Home size={16} className="text-orange-500" />
              <span>{t('Trang chủ', 'Home')}</span>
            </span>
          </div>

          {/* ĐĂNG KÝ / PHẢN HỒI SECTION */}
          <div>
            <div 
              className="sidebar-heading cursor-pointer"
              onClick={() => toggleSubmenu('dangKy')}
              style={{ cursor: 'pointer' }}
            >
              <div className="sidebar-heading-left">
                <Sparkles size={13} className="text-slate-400" />
                <span>{t('Đăng ký / Phản hồi', 'Registration / Feedback')}</span>
              </div>
              {openSubmenus.dangKy ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
            
            <div className={`submenu-container ${openSubmenus.dangKy ? 'open' : ''}`}>
              {/* Dịch vụ trực tuyến (collapsible nested) */}
              <div>
                <div 
                  onClick={() => toggleSubmenu('dichVuTrucTuyen')}
                  className="sidebar-link"
                >
                  <span className="sidebar-link-content">
                    <ClipboardList size={16} className="text-orange-500" />
                    <span>{t('Dịch vụ trực tuyến', 'Online Service')}</span>
                  </span>
                  {openSubmenus.dichVuTrucTuyen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                </div>

                <div className={`submenu-container ${openSubmenus.dichVuTrucTuyen ? 'open' : ''}`}>
                  <div 
                    onClick={() => handleLinkClick('dv-truc-tuyen')}
                    className={`sidebar-sublink ${activeItem === 'dv-truc-tuyen' ? 'active' : ''}`}
                  >
                    <span>&gt; {t('Dịch vụ trực tuyến', 'Online Service')}</span>
                  </div>
                  <div 
                    onClick={() => handleLinkClick('lich-su-dk')}
                    className={`sidebar-sublink ${activeItem === 'lich-su-dk' ? 'active' : ''}`}
                  >
                    <span>&gt; {t('Lịch sử đăng ký', 'Registration History')}</span>
                  </div>
                </div>
              </div>

              {/* Thay đổi lớp */}
              <div 
                onClick={() => handleLinkClick('thay-doi-lop')}
                className={`sidebar-link ${activeItem === 'thay-doi-lop' ? 'active' : ''}`}
              >
                <span className="sidebar-link-content">
                  <Users size={16} className="text-orange-500" />
                  <span>{t('Thay đổi lớp', 'Change Class')}</span>
                </span>
              </div>

              {/* Phản hồi về chất lượng giảng dạy */}
              <div 
                onClick={() => handleLinkClick('phan-hoi-clgd')}
                className={`sidebar-link ${activeItem === 'phan-hoi-clgd' ? 'active' : ''}`}
              >
                <span className="sidebar-link-content">
                  <MessageSquare size={16} className="text-orange-500" />
                  <span>{t('Phản hồi về chất lượng giảng dạy', 'Feedback on Teaching Quality')}</span>
                </span>
              </div>
            </div>
          </div>

          {/* TRUY CẬP THÔNG TIN SECTION */}
          <div>
            <div 
              className="sidebar-heading cursor-pointer"
              onClick={() => toggleSubmenu('truyCap')}
              style={{ cursor: 'pointer' }}
            >
              <div className="sidebar-heading-left">
                <Sparkles size={13} className="text-slate-400" />
                <span>{t('Truy cập thông tin', 'Information Access')}</span>
              </div>
              {openSubmenus.truyCap ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>

            <div className={`submenu-container ${openSubmenus.truyCap ? 'open' : ''}`}>
              <div 
                onClick={() => handleLinkClick('xem-lich-trinh')}
                className={`sidebar-link ${activeItem === 'xem-lich-trinh' ? 'active' : ''}`}
              >
                <span className="sidebar-link-content">
                  <Calendar size={16} className="text-orange-500" />
                  <span>{t('Xem lịch trình', 'View Schedule')}</span>
                </span>
              </div>

              <div 
                onClick={() => handleLinkClick('tkb-hang-tuan')}
                className={`sidebar-link ${activeItem === 'tkb-hang-tuan' ? 'active' : ''}`}
              >
                <span className="sidebar-link-content">
                  <Clock size={16} className="text-orange-500" />
                  <span>{t('Thời khóa biểu hàng tuần', 'Weekly Timetable')}</span>
                </span>
              </div>

              <div 
                onClick={() => handleLinkClick('tkb-lop-hoc')}
                className={`sidebar-link ${activeItem === 'tkb-lop-hoc' ? 'active' : ''}`}
              >
                <span className="sidebar-link-content">
                  <Calendar size={16} className="text-orange-500" />
                  <span>{t('Thời khóa biểu lớp học', 'Class Timetable')}</span>
                </span>
              </div>

              <div 
                onClick={() => handleLinkClick('xem-lich-thi')}
                className={`sidebar-link ${activeItem === 'xem-lich-thi' ? 'active' : ''}`}
              >
                <span className="sidebar-link-content">
                  <FileText size={16} className="text-orange-500" />
                  <span>{t('Xem lịch thi', 'View Exam Schedule')}</span>
                </span>
              </div>

              <div 
                onClick={() => handleLinkClick('hoc-phi')}
                className={`sidebar-link ${activeItem === 'hoc-phi' ? 'active' : ''}`}
              >
                <span className="sidebar-link-content">
                  <CreditCard size={16} className="text-orange-500" />
                  <span>{t('Học phí', 'Course Fee')}</span>
                </span>
              </div>

              <div 
                onClick={() => handleLinkClick('tot-nghiep')}
                className={`sidebar-link ${activeItem === 'tot-nghiep' ? 'active' : ''}`}
              >
                <span className="sidebar-link-content">
                  <GraduationCap size={16} className="text-orange-500" />
                  <span>{t('Thời gian lấy bằng tốt nghiệp', 'Diploma period')}</span>
                </span>
              </div>
            </div>
          </div>

          {/* BÁO CÁO SECTION */}
          <div>
            <div 
              className="sidebar-heading cursor-pointer"
              onClick={() => toggleSubmenu('baoCao')}
              style={{ cursor: 'pointer' }}
            >
              <div className="sidebar-heading-left">
                <Sparkles size={13} className="text-slate-400" />
                <span>{t('Báo cáo', 'Reports')}</span>
              </div>
              {openSubmenus.baoCao ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>

            <div className={`submenu-container ${openSubmenus.baoCao ? 'open' : ''}`}>
              {/* Báo cáo điểm danh */}
              <div 
                onClick={() => handleLinkClick('bc-diem-danh')}
                className={`sidebar-link ${activeItem === 'bc-diem-danh' ? 'active' : ''}`}
              >
                <span className="sidebar-link-content">
                  <UserCheck size={16} className="text-orange-500" />
                  <span>{t('Báo cáo điểm danh', 'Attendance Report')}</span>
                </span>
              </div>

              {/* Báo cáo Mark */}
              <div 
                onClick={() => handleLinkClick('bc-mark')}
                className={`sidebar-link ${activeItem === 'bc-mark' ? 'active' : ''}`}
              >
                <span className="sidebar-link-content">
                  <FileSpreadsheet size={16} className="text-orange-500" />
                  <span>{t('Báo cáo Mark', 'Mark Report')}</span>
                </span>
              </div>

              {/* Bảng điểm học tập */}
              <div 
                onClick={() => handleLinkClick('bang-diem-ht')}
                className={`sidebar-link ${activeItem === 'bang-diem-ht' ? 'active' : ''}`}
              >
                <span className="sidebar-link-content">
                  <FileText size={16} className="text-orange-500" />
                  <span>{t('Bảng điểm học tập', 'Academic Transcript')}</span>
                </span>
              </div>

              {/* Chương trình giảng dạy */}
              <div 
                onClick={() => handleLinkClick('chuong-trinh-gd')}
                className={`sidebar-link ${activeItem === 'chuong-trinh-gd' ? 'active' : ''}`}
              >
                <span className="sidebar-link-content">
                  <BookOpen size={16} className="text-orange-500" />
                  <span>{t('Chương trình giảng dạy', 'Curriculum')}</span>
                </span>
              </div>
            </div>
          </div>


          {/* SỔ TAY SINH VIÊN SECTION */}
          <div 
            onClick={() => handleLinkClick('so-tay-sv')}
            className={`sidebar-link`}
            style={{ fontWeight: '700', paddingLeft: '16px', margin: '4px 10px' }}
          >
            <span className="sidebar-link-content">
              <BookOpen size={16} className="text-orange-500" />
              <span>{t('📖 Sổ tay sinh viên', 'Student Handbook')}</span>
            </span>
          </div>


        </div>
      </aside>
    </>
  );
};
