import { TrendingUp, Shield, Zap } from 'lucide-react';

const highlights = [
  { icon: TrendingUp, label: 'Maximise returns', desc: 'Miles or cashback — find the optimal card' },
  { icon: Zap, label: 'Instant results', desc: 'No sign-up needed, real-time recommendations' },
  { icon: Shield, label: 'Always up to date', desc: 'Rates verified against bank websites' },
];

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 rounded-2xl overflow-hidden text-white px-8 py-12">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          🇸🇬 Singapore Credit Cards
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
          Spend Smart.<br />Earn More.
        </h1>
        <p className="text-blue-100 text-lg mb-8 leading-relaxed">
          Find the best Singapore credit card for every dollar you spend.
          Maximise miles for your next trip or get the most cashback — instantly.
        </p>
        <a
          href="#finder"
          className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
        >
          Find My Best Card →
        </a>
      </div>

      <div className="relative mt-10 grid sm:grid-cols-3 gap-4">
        {highlights.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <Icon className="w-5 h-5 text-blue-200 mb-2" />
            <p className="font-semibold text-sm">{label}</p>
            <p className="text-blue-200 text-xs mt-0.5">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
