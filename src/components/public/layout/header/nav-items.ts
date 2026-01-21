export const navItems = [
  {
    type: 'link',
    href: '/',
    label: 'Home',
  },
  {
    type: 'link',
    label: 'Contact',
    href: '/contact',
  },
  {
    type: 'dropdown',
    label: 'Resources',
    items: [
      { href: '/Event', label: 'Event' },
      { href: '/Blog', label: 'Blog' },
      { href: '/FAQ', label: 'FAQ' },
    ],
  },
] satisfies NavItem[];

type NavItem = Record<string, string | unknown> &
  (
    | {
        type: 'link';
        href: string;
      }
    | {
        type: 'dropdown';
      }
  );
