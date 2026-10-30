import { useState, useEffect, useRef } from 'react';
import { Bell, Menu, BookOpen, GraduationCap, LogOut, Globe } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  title: string;
  lang: 'vi' | 'en';
  onLangChange: (lang: 'vi' | 'en') => void;
  setActiveItem: (item: string) => void;
  onLogout: () => void;
}

export const Header = ({ onMenuToggle, title, lang, onLangChange, setActiveItem, onLogout }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mock student info
  const student = {
    name: 'Nguyễn Văn Hùng',
    id: 'BS00679',
    class: 'k6',