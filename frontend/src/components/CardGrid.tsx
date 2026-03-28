import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import type { RewardType } from '../types';
import { cards } from '../data/cards';
import CardVisual from './CardVisual';
import RewardBadge from './RewardBadge';

const typeOptions = [
  { value: 'all', label: 'All Cards' },
  { value: 'miles', label: '✈️ Miles' },
  { value: 'cashback', label: '💰 Cashback' },
] as const;

export default function CardGrid() {
  const [filter, setFilter] = useState<RewardType | 'all'>('all');
  const filtered = filter === 'all' ? cards : cards.filter((c) => c.rewardType === filter);

  return (
    <section id="all-cards" className="space-y-6">
      {/* Section header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-navy-900">All Singapore Credit Cards</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            {filtered.length} cards · ranked by top earn rates
          </p>
        </div>
        <div className="flex bg-white border border-slate-200 rounded-xl p-1 gap-1 shadow-sm">
          {typeOptions.map((t) => (
            <button
              key={t.value}
              onClick={() => setFilter(t.value as RewardType | 'all')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === t.value
                  ? 'bg-navy-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((card) => {
          const topCategories = [...card.categories]
            .sort((a, b) => b.rate - a.rate)
            .slice(0, 3);

          return (
            <div
              key={card.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 flex flex-col group"
            >
              {/* Card visual */}
              <div className="p-5 pb-3">
                <CardVisual card={card} />
              </div>

              {/* Content */}
              <div className="px-5 pb-5 flex-1 flex flex-col">
                <h3 className="font-extrabold text-navy-900 text-base leading-tight">{card.name}</h3>
                <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed">{card.tagline}</p>

                {/* Top earn rates */}
                <div className="flex-1 space-y-2 mb-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Top earn rates</p>
                  {topCategories.map((cat) => (
                    <div key={cat.category} className="flex items-center justify-between">
                      <span className="text-xs text-slate-600 capitalize">{cat.category.replace(/_/g, ' ')}</span>
                      <RewardBadge type={card.rewardType} rate={cat.rate} />
                    </div>
                  ))}
                </div>

                {/* Footer: fee + CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Annual fee</p>
                    <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                      {card.annualFee === 0 ? (
                        <span className="text-emerald-600">Free</span>
                      ) : (
                        `S$${card.annualFee.toFixed(0)}`
                      )}
                    </p>
                    {card.annualFeeWaiver && (
                      <p className="text-[10px] text-emerald-600 font-medium mt-0.5 leading-tight">{card.annualFeeWaiver}</p>
                    )}
                  </div>
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-navy-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-navy-700 transition-colors shadow-sm whitespace-nowrap"
                  >
                    Apply now <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
