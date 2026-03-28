import { CreditCard, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '#finder', label: 'Find Best Card' },
  { href: '#calculator', label: 'Calculator' },
  { href: '#all-cards', label: 'All Cards' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass border-b border-white/60 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-gradient-to-br from-navy-600 to-navy-800 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div className="leading-none">
            <span className="font-extrabold text-navy-900 text-lg tracking-tight">
              SG Card Guru
            </span>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block mt-0.5">
              Singapore's card maximiser
            </p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-navy-700 hover:bg-navy-50 transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-slate-100 bg-white/95 px-4 py-3 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-navy-50 hover:text-navy-700 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
