import './index.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FinderSection from './components/FinderSection';
import QuickComparison from './components/QuickComparison';
import Calculator from './components/Calculator';
import CardGrid from './components/CardGrid';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <HeroSection />
        <FinderSection />
        <QuickComparison />
        <Calculator />
        <CardGrid />
      </main>

      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
            <div>
              <p className="font-semibold text-gray-700">SG Card Guru</p>
              <p className="mt-0.5">Singapore's independent credit card comparison tool</p>
            </div>
            <div className="space-y-1 text-xs">
              <p>⚠️ Rates and terms subject to change. Always verify with the issuing bank.</p>
              <p>Not affiliated with any bank. Information is for educational purposes only.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
