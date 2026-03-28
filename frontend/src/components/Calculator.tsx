import { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';
import type { SpendingCategory, RewardType } from '../types';
import { getRecommendations, calculateMonthlyReward } from '../utils/recommend';
import { categories } from '../data/categories';
import RewardBadge from './RewardBadge';

const typeOptions = [
  { value: 'all', label: 'All' },
  { value: 'miles', label: '✈️ Miles' },
  { value: 'cashback', label: '💰 Cash' },
] as const;

export default function Calculator() {
  const [category, setCategory] = useState<SpendingCategory>('dining');
  const [spend, setSpend] = useState<number>(500);
  const [filterType, setFilterType] = useState<RewardType | 'all'>('all');

  const recs = getRecommendations(category, filterType === 'all' ? undefined : filterType).slice(0, 6);
  const catMeta = categories.find((c) => c.id === category)!;

  return (
    <section id="calculator" className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-slate-100 px-6 sm:px-8 py-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-md shrink-0">
            <CalcIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-navy-900">Reward Calculator</h2>
            <p className="text-sm text-slate-500 mt-0.5">See exactly how much you earn based on your monthly spend</p>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8 py-6 space-y-6">
        {/* Inputs */}
        <div className="grid sm:grid-cols-3 gap-4">
          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Spending Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SpendingCategory)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500 shadow-sm"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Spend */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Monthly Spend
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">S$</span>
              <input
                type="number"
                min={0}
                max={10000}
                step={50}
                value={spend}
                onChange={(e) => setSpend(Math.max(0, Number(e.target.value)))}
                className="w-full border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500 shadow-sm"
              />
            </div>
            <input
              type="range"
              min={0}
              max={3000}
              step={50}
              value={Math.min(spend, 3000)}
              onChange={(e) => setSpend(Number(e.target.value))}
              className="w-full mt-2.5 accent-navy-600 h-1.5"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-0.5">
              <span>$0</span><span>$1,500</span><span>$3,000</span>
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Reward Type
            </label>
            <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
              {typeOptions.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setFilterType(t.value as RewardType | 'all')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    filterType === t.value
                      ? 'bg-white text-navy-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Current selection summary */}
            <div className="mt-3 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
              <p className="text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{catMeta.icon} {catMeta.label}</span>
                {' '}· S${spend.toLocaleString()}/mo
              </p>
            </div>
          </div>
        </div>

        {/* Results table */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-8">#</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Card</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Rate</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Monthly</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Annual value*</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recs.map((rec, i) => {
                const { label } = calculateMonthlyReward(rec.card, category, spend);
                const annualMiles = rec.card.rewardType === 'miles' ? Math.floor(spend * rec.rate) * 12 : null;
                const annualCash = rec.card.rewardType === 'cashback' ? (spend * rec.rate) / 100 * 12 : null;
                const annualStr = annualMiles
                  ? `~$${(annualMiles * 0.02).toFixed(0)}`
                  : `$${(annualCash ?? 0).toFixed(2)}`;

                return (
                  <tr
                    key={rec.card.id}
                    className={`transition-colors ${i === 0 ? 'bg-navy-50/60' : 'hover:bg-slate-50'}`}
                  >
                    <td className="px-4 py-3.5">
                      <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-extrabold
                        ${i === 0 ? 'bg-gold-400 text-white' : 'text-slate-400'}`}>
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-bold text-slate-900">{rec.card.name}</p>
                      <p className="text-xs text-slate-400">{rec.card.program}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <RewardBadge type={rec.card.rewardType} rate={rec.rate} />
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className={`font-extrabold ${i === 0 ? 'text-navy-700' : 'text-slate-700'}`}>
                        {label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right text-slate-500 hidden sm:table-cell">
                      {annualStr}
                      {annualMiles && (
                        <p className="text-xs text-slate-400">{annualMiles.toLocaleString()} miles</p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          * Miles valued at SGD 0.02 per mile (typical premium cabin redemption). Cashback figures may be reduced by monthly caps — check card T&Cs.
        </p>
      </div>
    </section>
  );
}
