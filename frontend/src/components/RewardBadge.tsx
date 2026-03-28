import type { RewardType } from '../types';

interface Props {
  type: RewardType;
  rate: number;
  size?: 'sm' | 'md';
  className?: string;
}

export default function RewardBadge({ type, rate, size = 'sm', className = '' }: Props) {
  const base = size === 'md'
    ? 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold'
    : 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold';

  if (type === 'miles') {
    return (
      <span className={`${base} bg-blue-100 text-blue-800 ring-1 ring-blue-200 ${className}`}>
        <span>✈️</span>
        <span>{rate} mpd</span>
      </span>
    );
  }
  return (
    <span className={`${base} bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200 ${className}`}>
      <span>💰</span>
      <span>{rate}%</span>
    </span>
  );
}
