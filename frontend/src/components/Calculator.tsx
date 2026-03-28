import { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';
import type { SpendingCategory, RewardType } from '../types';
import { getRecommendations, calculateMonthlyReward } from '../utils/recommend';
import { categories } from '../data/categories';
import RewardBadge from './RewardBadge';

export default function Calculator() {
  const [category, setCategory] = useState<SpendingCategory>('dining');
  const [spend, setSpend] = useState<number>(500);
  const [filterType, setFilterType] = useState<RewardType | 'all'>('all');

  const recs = getRecommendations(category, filterType === 'all' ? undefined : filterType).slice(0, 6);

  return (
    <section id="calculator" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
          <CalcIcon className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Reward Calculator</h2>
          <p className="text-sm text-gray-500">See exactly how much you'll earn per month</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Spending Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as SpendingCategory)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Spend (SGD)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input
              type="number"
              min={0}
              max={10000}
              step={50}
              value={spend}
              onChange={(e) => setSpend(Math.max(0, Number(e.target.value)))}
              className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="range"
            min={0}
            max={3000}
            step={50}
            value={spend}
            onChange={(e) => setSpend(Number(e.target.value))}
            className="w-full mt-2 accent-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reward Type</label>
          <div className="flex rounded-lg border border-gray-300 overflow-hidden text-sm">
            {(['all', 'miles', 'cashback'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`flex-1 py-2 capitalize font-medium transition-colors
                  ${filterType === t ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                {t === 'all' ? 'All' : t === 'miles' ? '✈️ Miles' : '💰 Cash'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">#</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Card</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Rate</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">Monthly Reward</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">Annual Value*</th>
            </tr>
          </thead>
          <tbody>
            {recs.map((rec, i) => {
              const { label } = calculateMonthlyReward(rec.card, category, spend);
              const annualMiles = rec.card.rewardType === 'miles'
                ? Math.floor(spend * rec.rate) * 12
                : null;
              const annualCash = rec.card.rewardType === 'cashback'
                ? (spend * rec.rate) / 100 * 12
                : null;
              const annualValueStr = annualMiles
                ? `~$${(annualMiles * 0.02).toFixed(0)} (${(annualMiles).toLocaleString()} miles)`
                : `$${(annualCash ?? 0).toFixed(2)}`;

              return (
                <tr
                  key={rec.card.id}
                  className={`border-b border-gray-100 last:border-0 ${i === 0 ? 'bg-blue-50/60' : 'hover:bg-gray-50'}`}
                >
                  <td className="px-4 py-3 text-gray-500 font-medium">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{rec.card.name}</div>
                    <div className="text-xs text-gray-500">{rec.card.program}</div>
                  </td>
                  <td className="px-4 py-3">
                    <RewardBadge type={rec.card.rewardType} rate={rec.rate} />
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900">{label}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{annualValueStr}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-3">
        * Miles valued at SGD 0.02/mile (typical business class redemption rate). Cashback figures may be lower due to monthly caps.
      </p>
    </section>
  );
}
