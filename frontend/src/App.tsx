import './index.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FinderSection from './components/FinderSection';
import QuickComparison from './components/QuickComparison';
import Calculator from './components/Calculator';
import CardGrid from './components/CardGrid';
import { CreditCard } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <HeroSection />
        <FinderSection />
        <QuickComparison />
        <Calculator />
        <CardGrid />
      </main>

      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid sm:grid-cols-3 gap-8 items-start">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-navy-600 to-navy-800 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
                <span className="font-extrabold text-navy-900 text-base">SG Card Guru</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Singapore's independent credit card comparison tool. Find the highest-earning card for every dollar you spend.
              </p>
            </div>

            {/* Categories */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Categories</p>
              <div className="grid grid-cols-2 gap-1 text-sm text-slate-500">
                {['Dining', 'Groceries', 'Online Shopping', 'Overseas', 'Transport', 'Petrol'].map((c) => (
                  <a key={c} href="#finder" className="hover:text-navy-700 transition-colors">{c}</a>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Disclaimer</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rates and T&Cs are subject to change. Always verify with the issuing bank before applying.
                SG Card Guru is not affiliated with any bank or financial institution.
                Information is for educational purposes only and does not constitute financial advice.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">© {new Date().getFullYear()} SG Card Guru. All rights reserved.</p>
            <p className="text-xs text-slate-400">Rates verified {new Date().toLocaleDateString('en-SG', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
