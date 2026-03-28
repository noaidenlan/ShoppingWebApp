import type { RewardType } from '../types';

interface Props {
  type: RewardType;
  rate: number;
  className?: string;
}

export default function RewardBadge({ type, rate, className = '' }: Props) {
  if (type === 'miles') {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 ${className}`}>
        ✈️ {rate} mpd
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 ${className}`}>
      💰 {rate}% cash
    </span>
  );
}
