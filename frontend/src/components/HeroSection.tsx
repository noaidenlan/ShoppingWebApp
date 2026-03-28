import { ArrowRight, Star, RefreshCw, Shield } from 'lucide-react';

const stats = [
  { value: '16', label: 'Cards compared' },
  { value: '10', label: 'Spend categories' },
  { value: '10%', label: 'Max cashback' },
  { value: '3 mpd', label: 'Max miles rate' },
];

const highlights = [
  { icon: Star, label: 'Best pick per category', desc: 'Ranked recommendations for every spending type' },
  { icon: RefreshCw, label: 'Live calculator', desc: 'See exact monthly and annual rewards instantly' },
  { icon: Shield, label: 'Bank-verified rates', desc: 'Rates cross-checked against official bank pages' },
];

export default function HeroSection() {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-navy-900 text-white">
      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-navy-600 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative px-6 sm:px-10 pt-12 pb-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-200 mb-6 tracking-wide uppercase">
          🇸🇬 Singapore Cards · Updated {new Date().toLocaleDateString('en-SG', { month: 'long', year: 'numeric' })}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: copy */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight mb-5 text-balance">
              Spend Smarter.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                Earn More.
              </span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-md">
              Discover the best Singapore credit card for every dollar you spend.
              Maximise miles for your next holiday or get the highest cashback — in seconds.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#finder"
                className="inline-flex items-center gap-2 bg-white text-navy-900 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                Find My Best Card <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all"
              >
                Try Calculator
              </a>
            </div>
          </div>

          {/* Right: floating cards mockup */}
          <div className="hidden lg:flex items-center justify-center relative h-52">
            {/* Card 3 — back */}
            <div className="absolute right-4 top-4 w-56 h-36 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-2xl rotate-6 opacity-70" />
            {/* Card 2 — middle */}
            <div className="absolute right-10 top-2 w-56 h-36 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-2xl rotate-2 opacity-85" />
            {/* Card 1 — front */}
            <div className="shine absolute right-16 w-56 h-36 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 shadow-2xl -rotate-1">
              <div className="p-5 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-white/70 uppercase tracking-widest">DBS Bank</span>
                  <span className="text-sm font-black text-white/80 tracking-widest">VISA</span>
                </div>
                <div>
                  <p className="font-mono text-xs text-white/50 tracking-widest mb-1">•••• •••• •••• 4521</p>
                  <p className="text-sm font-semibold text-white">Altitude Card</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <p className="text-2xl font-extrabold text-white">{s.value}</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature pills */}
      <div className="relative border-t border-white/10 px-6 sm:px-10 py-5 grid sm:grid-cols-3 gap-4">
        {highlights.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <Icon className="w-4 h-4 text-blue-300" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
