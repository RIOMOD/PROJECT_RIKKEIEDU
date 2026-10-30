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
  Clock, 
  FileText, 
  BookOpen,
  FileSpreadsheet,
  BarChart2,
  Eye,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  setActiveItem: (item: string, resetScroll?: boolean) => void;
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
    setActiveItem('trang-chu', true);
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

              {/* CHƯƠNG TRÌNH KHUNG */}
              <div 
                onClick={() => handleLinkClick('chuong-trinh-gd')}
                className={`sidebar-link ${activeItem === 'chuong-trinh-gd' ? 'active' : ''}`}
                style={{ margin: '4px 10px' }}
              >
                <span className="sidebar-link-content">
                  <BookOpen size={16} className="text-orange-500" />
                  <span>{t('Chương trình khung', 'Curriculum')}</span>
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