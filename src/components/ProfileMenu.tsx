import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut } from 'lucide-react';

interface ProfileMenuProps {
  username: string;
  isAdmin: boolean;
  onSignOut: () => void;
  onToggleAdmin: () => void;
}

function ProfileMenu({ username, isAdmin, onSignOut, onToggleAdmin }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 glass-effect rounded-lg text-[#3bd4cb] hover:text-white transition-colors"
      >
        <User className="h-5 w-5" />
        <span>{username}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 glass-effect rounded-lg shadow-lg py-1 z-50">
          {isAdmin && (
            <button
              onClick={() => {
                onToggleAdmin();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 w-full text-left"
            >
              <Settings className="h-4 w-4" />
              <span>Admin Panel</span>
            </button>
          )}
          <button
            onClick={onSignOut}
            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-white/5 w-full text-left"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;