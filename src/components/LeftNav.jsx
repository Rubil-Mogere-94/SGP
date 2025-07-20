import { NavLink, useLocation } from 'react-router-dom';
import { Home, List, DollarSign, Settings } from 'lucide-react';

export default function LeftNav() {
  const links = [
    { to: '/', icon: <Home />, label: 'Overview' },
    { to: '/goals', icon: <List />, label: 'Goals' },
    { to: '/deposits', icon: <DollarSign />, label: 'Deposits' },
    { to: '/settings', icon: <Settings />, label: 'Settings' },
  ];
  const location = useLocation();

  return (
    <nav className="w-20 bg-gradient-to-b from-primary to-secondary text-base-100 flex flex-col items-center py-6 space-y-6 shadow-lg">
      {links.map(({ to, icon, label }) => {
        const isActive = location.pathname === to;
        return (
          <NavLink
            key={to}
            to={to}
            aria-label={label}
            className={`p-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-accent text-white shadow-md'
                : 'hover:bg-accent-hover hover:text-white'
            }`}
          >
            {icon}
          </NavLink>
        );
      })}
    </nav>
  );
}