import { LayoutGrid } from 'lucide-react';
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
    <section className="space-y-5">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-navy-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-md shrink-0">
          <LayoutGrid className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-navy-900">Best Card by Category</h2>
          <p className="text-slate-500 text-sm mt-0.5">At-a-glance champion for each spending type</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wider bg-slate-50/80 w-40">Category</th>
                <th className="text-left px-5 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wider bg-slate-50/80 hidden md:table-cell">Examples</th>
                <th className="text-left px-5 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wider bg-slate-50/80">Best Card</th>
                <th className="text-left px-5 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wider bg-slate-50/80">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((cat) => {
                const best = getBestCard(cat.id, filterType);
                if (!best) return null;
                return (
                  <tr key={cat.id} className="hover:bg-navy-50/40 transition-colors group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{cat.icon}</span>
                        <span className="font-semibold text-slate-800 text-sm">{cat.label}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 text-xs hidden md:table-cell max-w-xs">
                      <span className="line-clamp-1">{cat.examples}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 hidden lg:block opacity-90 group-hover:opacity-100 transition-opacity">
                          <CardVisual card={best.card} small />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm leading-tight">{best.card.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{best.card.bank}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <RewardBadge type={best.card.rewardType} rate={best.rate} />
                      {best.note && (
                        <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">{best.note}</p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
