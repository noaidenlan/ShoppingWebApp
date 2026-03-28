import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import type { SpendingCategory, RewardType } from '../types';
import CategoryPicker from './CategoryPicker';
import RecommendationList from './RecommendationList';

const typeOptions = [
  { value: 'all', label: 'Both' },
  { value: 'miles', label: '✈️ Miles' },
  { value: 'cashback', label: '💰 Cashback' },
] as const;

export default function FinderSection() {
  const [category, setCategory] = useState<SpendingCategory>('dining');
  const [rewardType, setRewardType] = useState<RewardType | 'all'>('all');

  return (
    <section id="finder" className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden">
      {/* Section header */}
      <div className="bg-gradient-to-r from-navy-50 to-blue-50 border-b border-slate-100 px-6 sm:px-8 py-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center shadow-md shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-extrabold text-navy-900">Find the Best Card</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Select your spending category — we'll rank every card by return rate
            </p>
          </div>
          {/* Reward type toggle — inline with header on desktop */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 rounded-xl p-1">
            {typeOptions.map((t) => (
              <button
                key={t.value}
                onClick={() => setRewardType(t.value as RewardType | 'all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  rewardType === t.value
                    ? 'bg-white text-navy-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8 py-6 space-y-6">
        {/* Mobile reward type toggle */}
        <div className="sm:hidden flex items-center gap-1 bg-slate-100 rounded-xl p-1 self-start w-full">
          {typeOptions.map((t) => (
            <button
              key={t.value}
              onClick={() => setRewardType(t.value as RewardType | 'all')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                rewardType === t.value
                  ? 'bg-white text-navy-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <CategoryPicker selected={category} onChange={setCategory} />

        <div>
          <h3 className="text-base font-bold text-navy-900 mb-4 flex items-center gap-2">
            Top Picks
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          </h3>
          <RecommendationList
            category={category}
            filterType={rewardType === 'all' ? undefined : rewardType}
            limit={5}
          />
        </div>
      </div>
    </section>
  );
}
