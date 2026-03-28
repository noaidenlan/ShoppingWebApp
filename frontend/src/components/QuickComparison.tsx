import { categories } from '../data/categories';
import { getBestCard } from '../utils/recommend';
import CardVisual from './CardVisual';
import RewardBadge from './RewardBadge';
import type { RewardType } from '../types';

interface Props {
  filterType?: RewardType;
}

export default function QuickComparison({ filterType }: Props) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Best Card by Category</h2>
        <p className="text-gray-500 text-sm mt-0.5">At-a-glance: which card wins for each spending type</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-5 py-3 font-semibold text-gray-700">Category</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-700 hidden sm:table-cell">Examples</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-700">Best Card</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-700">Rate</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, i) => {
              const best = getBestCard(cat.id, filterType);
              if (!best) return null;
              return (
                <tr
                  key={cat.id}
                  className={`border-b border-gray-100 last:border-0 hover:bg-blue-50/40 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/40'}`}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cat.icon}</span>
                      <span className="font-medium text-gray-900">{cat.label}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500 text-xs hidden sm:table-cell max-w-xs truncate">
                    {cat.examples}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="shrink-0 hidden md:block">
                        <CardVisual card={best.card} small />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-xs leading-tight">{best.card.name}</p>
                        <p className="text-xs text-gray-500">{best.card.bank}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <RewardBadge type={best.card.rewardType} rate={best.rate} />
                    {best.note && <p className="text-xs text-gray-400 mt-0.5 max-w-xs">{best.note}</p>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
