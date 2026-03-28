import { CreditCard } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-gray-900 text-lg leading-tight">
              SG Card Guru
            </span>
            <p className="text-xs text-gray-500 leading-tight hidden sm:block">
              Singapore's credit card maximiser
            </p>
          </div>
        </div>
        <nav className="flex items-center gap-4 text-sm text-gray-600">
          <a href="#finder" className="hover:text-blue-600 transition-colors">
            Find Best Card
          </a>
          <a href="#calculator" className="hover:text-blue-600 transition-colors">
            Calculator
          </a>
          <a href="#all-cards" className="hover:text-blue-600 transition-colors">
            All Cards
          </a>
        </nav>
      </div>
    </header>
  );
}
