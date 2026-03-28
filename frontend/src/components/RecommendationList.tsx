import { ExternalLink, AlertTriangle } from 'lucide-react';
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

const rankStyle = ['bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-md', 'bg-slate-200 text-slate-600', 'bg-slate-100 text-slate-500'];

export default function RecommendationList({ category, filterType, limit = 5 }: Props) {
  const recs = getRecommendations(category, filterType).slice(0, limit);
  const catMeta = categories.find((c) => c.id === category)!;

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500 flex items-center gap-1.5">
        <span className="text-base">{catMeta.icon}</span>
        <span className="font-semibold text-slate-700">{catMeta.label}</span>
        <span className="text-slate-400">·</span>
        <span>{catMeta.examples}</span>
      </p>

      {recs.map((rec, i) => (
        <div
          key={rec.card.id}
          className={`bg-white rounded-2xl border transition-all duration-200 hover:shadow-card-hover p-4 flex items-center gap-4
            ${i === 0 ? 'border-navy-600 ring-1 ring-navy-600/30 shadow-card' : 'border-slate-200 shadow-sm'}`}
        >
          {/* Rank badge */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${rankStyle[i] ?? rankStyle[2]}`}>
            {i + 1}
          </div>

          {/* Card thumbnail */}
          <div className="shrink-0 hidden sm:block">
            <CardVisual card={rec.card} small />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-bold text-slate-900 text-sm">{rec.card.name}</span>
              {i === 0 && (
                <span className="bg-gold-400/20 text-gold-600 text-xs font-bold px-2 py-0.5 rounded-full border border-gold-400/40">
                  ★ Best
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <RewardBadge type={rec.card.rewardType} rate={rec.rate} />
              {rec.capped && (
                <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                  <AlertTriangle className="w-3 h-3" /> Capped
                </span>
              )}
            </div>
            {rec.note && (
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{rec.note}</p>
            )}
          </div>

          {/* Apply CTA */}
          <a
            href={rec.card.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors
              ${i === 0
                ? 'bg-navy-600 text-white hover:bg-navy-700'
                : 'border border-slate-200 text-slate-600 hover:border-navy-300 hover:text-navy-700 hover:bg-navy-50'
              }`}
          >
            Apply <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ))}
    </div>
  );
}
