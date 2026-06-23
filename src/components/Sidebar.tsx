import { useState } from 'react';
import { BtecLogo } from './BtecLogo';
import { 
  Home, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft,
  ClipboardList, 
  UserCheck, 
  MessageSquare, 
  Calendar, 
  Clock, 
  FileText, 
  BookOpen,
  FileSpreadsheet,
  BarChart2,
  Eye
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
  lang: 'vi' | 'en';
  role?: 'student' | 'parent';
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar = ({ 
  isOpen, 
  onClose, 
  activeItem, 
  setActiveItem,
  lang,
  role = 'student',
  isCollapsed = false,
  onToggleCollapse
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

  const handleLogoClick = () => {
    setActiveItem('trang-chu');
    // Scroll the content container to the top
    const scrollContainer = document.querySelector('.scrollable-content');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Close sidebar on mobile
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
      <aside className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        
        {/* Sidebar Header with Rikkei Logo */}
        <div 
          className="sidebar-brand" 
          onClick={handleLogoClick}
          style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          <BtecLogo height={46} className="sidebar-brand-logo" />
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (window.innerWidth >= 1024 && onToggleCollapse) {
                onToggleCollapse();
              } else {
                onClose();
              }
            }} 
            className="sidebar-close-btn" 
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Scrollable Navigation Menu */}
        <div className="sidebar-menu">
          {role === 'parent' ? (
            <>
              {/* TRANG CHỦ link */}
              <div 
                onClick={() => handleLinkClick('trang-chu')}
                className={`sidebar-link ${activeItem === 'trang-chu' ? 'active' : ''}`}
                style={{ margin: '4px 10px' }}
              >
                <span className="sidebar-link-content">
                  <Home size={16} className="text-orange-500" />
                  <span>{t('Trang chủ', 'Home')}</span>
                </span>
              </div>

              {/* TKB HẰNG TUẦN */}
              <div 
                onClick={() => handleLinkClick('tkb-hang-tuan')}
                className={`sidebar-link ${activeItem === 'tkb-hang-tuan' ? 'active' : ''}`}
                style={{ margin: '4px 10px' }}
              >
                <span className="sidebar-link-content">
                  <Clock size={16} className="text-orange-500" />
                  <span>{t('Thời khóa biểu hàng tuần', 'Weekly Timetable')}</span>
                </span>
              </div>

              {/* BÁO CÁO ĐIỂM DANH */}
              <div 
                onClick={() => handleLinkClick('bc-diem-danh')}
                className={`sidebar-link ${activeItem === 'bc-diem-danh' ? 'active' : ''}`}
                style={{ margin: '4px 10px' }}
              >
                <span className="sidebar-link-content">
                  <UserCheck size={16} className="text-orange-500" />
                  <span>{t('Báo cáo điểm danh', 'Attendance Report')}</span>
                </span>
              </div>

              {/* BÁO CÁO MARK */}
              <div 
                onClick={() => handleLinkClick('bc-mark')}
                className={`sidebar-link ${activeItem === 'bc-mark' ? 'active' : ''}`}
                style={{ margin: '4px 10px' }}
              >
                <span className="sidebar-link-content">
                  <FileSpreadsheet size={16} className="text-orange-500" />
                  <span>{t('Báo cáo Mark', 'Mark Report')}</span>
                </span>
              </div>

              {/* BẢNG ĐIỂM HỌC TẬP */}
              <div 
                onClick={() => handleLinkClick('bang-diem-ht')}
                className={`sidebar-link ${activeItem === 'bang-diem-ht' ? 'active' : ''}`}
                style={{ margin: '4px 10px' }}
              >
                <span className="sidebar-link-content">
                  <FileText size={16} className="text-orange-500" />
                  <span>{t('Bảng điểm học tập', 'Academic Transcript')}</span>
                </span>
              </div>
            </>
          ) : isCollapsed ? (
            <>
              {/* Trang chủ */}
              <div 
                onClick={() => handleLinkClick('trang-chu')}
                className={`sidebar-link ${activeItem === 'trang-chu' ? 'active' : ''}`}
                style={{ margin: '4px 10px' }}
                title={t('Trang chủ', 'Home')}
              >
                <span className="sidebar-link-content">
                  <Home size={16} className="text-orange-500" />
                  <span>{t('Trang chủ', 'Home')}</span>
                </span>
              </div>

              {/* Đăng ký / Phản hồi */}
              <div 
                onClick={() => {
                  setOpenSubmenus(prev => ({ ...prev, dangKy: true }));
                  if (onToggleCollapse) onToggleCollapse();
                }}
                className={`sidebar-link ${['dv-truc-tuyen', 'lich-su-dk', 'phan-hoi-clgd'].includes(activeItem) ? 'active' : ''}`}
                style={{ margin: '4px 10px' }}
                title={t('Đăng ký / Phản hồi', 'Registration / Feedback')}
              >
                <span className="sidebar-link-content">
                  <ClipboardList size={16} className="text-orange-500" />
                  <span>{t('Đăng ký / Phản hồi', 'Registration / Feedback')}</span>
                </span>
              </div>

              {/* Truy cập thông tin */}
              <div 
                onClick={() => {
                  setOpenSubmenus(prev => ({ ...prev, truyCap: true }));
                  if (onToggleCollapse) onToggleCollapse();
                }}
                className={`sidebar-link ${['tkb-hang-tuan', 'tkb-lop-hoc', 'xem-lich-thi'].includes(activeItem) ? 'active' : ''}`}
                style={{ margin: '4px 10px' }}
                title={t('Truy cập thông tin', 'Information Access')}
              >
                <span className="sidebar-link-content">
                  <Eye size={16} className="text-orange-500" />
                  <span>{t('Truy cập thông tin', 'Information Access')}</span>
                </span>
              </div>

              {/* Báo cáo */}
              <div 
                onClick={() => {
                  setOpenSubmenus(prev => ({ ...prev, baoCao: true }));
                  if (onToggleCollapse) onToggleCollapse();
                }}
                className={`sidebar-link ${['bc-diem-danh', 'bc-mark', 'bang-diem-ht', 'chuong-trinh-gd'].includes(activeItem) ? 'active' : ''}`}
                style={{ margin: '4px 10px' }}
                title={t('Báo cáo', 'Reports')}
              >
                <span className="sidebar-link-content">
                  <BarChart2 size={16} className="text-orange-500" />
                  <span>{t('Báo cáo', 'Reports')}</span>
                </span>
              </div>

              {/* Sổ tay sinh viên */}
              <div 
                onClick={() => handleLinkClick('so-tay-sv')}
                className={`sidebar-link ${activeItem === 'so-tay-sv' ? 'active' : ''}`}
                style={{ margin: '4px 10px' }}
                title={t('Sổ tay sinh viên', 'Student Handbook')}
              >
                <span className="sidebar-link-content">
                  <BookOpen size={16} className="text-orange-500" />
                  <span>{t('Sổ tay sinh viên', 'Student Handbook')}</span>
                </span>
              </div>
            </>
          ) : (
            <>
              {/* Trang chủ link (no duplicate heading) */}
              <div 
                onClick={() => handleLinkClick('trang-chu')}
                className={`sidebar-link ${activeItem === 'trang-chu' ? 'active' : ''}`}
                style={{ margin: '4px 10px' }}
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
                    <ClipboardList size={14} className="text-slate-400" style={{ marginRight: '6px' }} />
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
                    <Eye size={14} className="text-slate-400" style={{ marginRight: '6px' }} />
                    <span>{t('Truy cập thông tin', 'Information Access')}</span>
                  </div>
                  {openSubmenus.truyCap ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </div>

                <div className={`submenu-container ${openSubmenus.truyCap ? 'open' : ''}`}>
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
                    <BarChart2 size={14} className="text-slate-400" style={{ marginRight: '6px' }} />
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
                className={`sidebar-link ${activeItem === 'so-tay-sv' ? 'active' : ''}`}
                style={{ fontWeight: '700', paddingLeft: '16px', margin: '4px 10px' }}
              >
                <span className="sidebar-link-content">
                  <BookOpen size={16} className="text-orange-500" />
                  <span>{t('Sổ tay sinh viên', 'Student Handbook')}</span>
                </span>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
};
