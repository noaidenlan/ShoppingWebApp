import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import type { SpendingCategory, RewardType } from '../types';
import CategoryPicker from './CategoryPicker';
import RecommendationList from './RecommendationList';

export default function FinderSection() {
  const [category, setCategory] = useState<SpendingCategory>('dining');
  const [rewardType, setRewardType] = useState<RewardType | 'all'>('all');

  return (
    <section id="finder" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-yellow-100 rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-yellow-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Find the Best Card</h2>
          <p className="text-sm text-gray-500">Pick a spending category to see ranked recommendations</p>
        </div>
      </div>

      {/* Reward type toggle */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">I prefer:</span>
        <div className="flex rounded-lg border border-gray-300 overflow-hidden text-sm">
          {(['all', 'miles', 'cashback'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setRewardType(t)}
              className={`px-4 py-2 font-medium transition-colors
                ${rewardType === t ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              {t === 'all' ? 'Both' : t === 'miles' ? '✈️ Miles' : '💰 Cashback'}
            </button>
          ))}
        </div>
      </div>

      <CategoryPicker selected={category} onChange={setCategory} />

      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-3">Top Recommendations</h3>
        <RecommendationList
          category={category}
          filterType={rewardType === 'all' ? undefined : rewardType}
          limit={5}
        />
      </div>
    </section>
  );
}
