import { ExternalLink, AlertCircle } from 'lucide-react';
import type { SpendingCategory, RewardType } from '../types';
import { getRecommendations } from '../utils/recommend';
import { categories } from '../data/categories';
import CardVisual from './CardVisual';
import RewardBadge from './RewardBadge';

interface Props {
  category: SpendingCategory;
  filterType?: RewardType;
  limit?: number;
}

export default function RecommendationList({ category, filterType, limit = 5 }: Props) {
  const recs = getRecommendations(category, filterType).slice(0, limit);
  const catMeta = categories.find((c) => c.id === category)!;

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        {catMeta.icon} <span className="font-medium text-gray-700">{catMeta.label}</span>
        {' '}— {catMeta.examples}
      </p>

      {recs.map((rec, i) => (
        <div
          key={rec.card.id}
          className={`bg-white rounded-xl border p-4 flex items-center gap-4 transition-shadow hover:shadow-md
            ${i === 0 ? 'border-blue-400 ring-1 ring-blue-300' : 'border-gray-200'}`}
        >
          {/* Rank */}
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0
              ${i === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}
          >
            {i + 1}
          </div>

          {/* Card thumbnail */}
          <div className="shrink-0 hidden sm:block">
            <CardVisual card={rec.card} small />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-gray-900 text-sm">{rec.card.name}</span>
              {i === 0 && (
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                  Best choice
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <RewardBadge type={rec.card.rewardType} rate={rec.rate} />
              {rec.capped && (
                <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                  <AlertCircle className="w-3 h-3" /> Capped
                </span>
              )}
            </div>
            {rec.note && (
              <p className="text-xs text-gray-500 mt-1">{rec.note}</p>
            )}
          </div>

          {/* CTA */}
          <a
            href={rec.card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Apply <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ))}
    </div>
  );
}
