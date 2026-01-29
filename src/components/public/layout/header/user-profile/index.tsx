'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import ProfileMenu, { ProfileMenuItem } from './profile-menu';
import Link from 'next/link';

interface UserProfileProps {
  name: string;
  image?: string;
  menuItems?: ProfileMenuItem[];
  className?: string;
}

export default function UserProfile({
  name,
  image,
  menuItems,
  className,
}: UserProfileProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const profileImage = image || '/next.svg';

  const handleClose = useCallback((e: MouseEvent | KeyboardEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
    if ('key' in e && e.key === 'Escape') {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('keydown', handleClose);
    };
  }, [handleClose]);

  return (
    <div ref={dropdownRef} className={`relative ${className || ''}`}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Image
          src={profileImage}
          alt={`${name} profile picture`}
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
        <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[100px]">
          {name}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-secondary rounded-lg shadow-lg z-50 border border-gray-100 dark:border-gray-800">
          <ProfileMenu menuItems={menuItems} />
        </div>
      )}
    </div>
  );
}
