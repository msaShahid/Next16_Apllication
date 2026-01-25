'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface ProfileMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface ProfileMenuProps {
  menuItems?: ProfileMenuItem[];
}

export default function ProfileMenu({ menuItems }: ProfileMenuProps) {

  const defaultMenuItems: ProfileMenuItem[] = [
    { label: 'Profile', href: '/profile' },
    { label: 'Settings', href: '/profile/settings' },
    {
      label: 'Logout',
      onClick: () => {
        router.push('/signin'); 
      },
    },
  ];

  const items = menuItems || defaultMenuItems;
  const router = useRouter();
  return (
    <ul className="py-2">
      {items.map((item, idx) => (
        <li key={idx}>
          {item.href ? (
            <Link
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </Link>
          ) : (
            <button
              onClick={item.onClick}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition text-left"
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
