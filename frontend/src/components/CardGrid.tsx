import { ExternalLink } from 'lucide-react';
import type { RewardType } from '../types';
import { cards } from '../data/cards';
import CardVisual from './CardVisual';
import RewardBadge from './RewardBadge';
import { useState } from 'react';

export default function CardGrid() {
  const [filter, setFilter] = useState<RewardType | 'all'>('all');

  const filtered = filter === 'all' ? cards : cards.filter((c) => c.rewardType === filter);

  return (
    <section id="all-cards" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All Singapore Credit Cards</h2>
          <p className="text-gray-500 text-sm mt-0.5">Full list with rates and features</p>
        </div>
        <div className="flex rounded-lg border border-gray-300 overflow-hidden text-sm">
          {(['all', 'miles', 'cashback'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 capitalize font-medium transition-colors
                ${filter === t ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              {t === 'all' ? 'All' : t === 'miles' ? '✈️ Miles' : '💰 Cashback'}
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
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="p-5">
                <CardVisual card={card} />
              </div>

              <div className="px-5 pb-5 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 text-base">{card.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5 mb-3">{card.tagline}</p>

                <div className="space-y-1.5 flex-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Top earn rates</p>
                  {topCategories.map((cat) => {
                    const catLabel = cat.category.replace(/_/g, ' ');
                    return (
                      <div key={cat.category} className="flex items-center justify-between">
                        <span className="text-xs text-gray-700 capitalize">{catLabel}</span>
                        <RewardBadge type={card.rewardType} rate={cat.rate} />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Annual fee</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {card.annualFee === 0 ? 'Free' : `$${card.annualFee.toFixed(2)}`}
                    </p>
                    {card.annualFeeWaiver && (
                      <p className="text-xs text-green-600">{card.annualFeeWaiver}</p>
                    )}
                  </div>
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply <ExternalLink className="w-3.5 h-3.5" />
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
