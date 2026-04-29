import { Link, useLocation } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { GraduationCap, Scale, Brain, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { compareList } = useCompare();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: 'Colleges' },
    { to: '/compare', label: 'Compare', badge: compareList.length },
    { to: '/predict', label: 'Predictor' },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
              <GraduationCap size={18} className="text-white" />
            </div>
            <span className="font-display font-700 text-lg text-slate-900" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
              College<span className="text-blue-600">Compass</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label, badge }) => (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive(to)
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {label}
                {badge > 0 && (
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 text-xs flex items-center justify-center font-bold">
                    {badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          {links.map(({ to, label, badge }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium ${
                isActive(to) ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {label}
              {badge > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 text-xs flex items-center justify-center font-bold">
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
