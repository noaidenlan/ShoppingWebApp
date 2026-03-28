import type { CreditCard } from '../types';

interface Props {
  card: CreditCard;
  small?: boolean;
}

const networkLabel: Record<string, string> = {
  Visa: 'VISA',
  Mastercard: 'MC',
  Amex: 'AMEX',
  UnionPay: 'UP',
};

export default function CardVisual({ card, small = false }: Props) {
  if (small) {
    return (
      <div
        className="shine w-24 h-14 rounded-xl shadow-md flex flex-col justify-between p-2 select-none shrink-0"
        style={{ background: `linear-gradient(135deg, ${card.colour}ee 0%, ${card.colour}99 100%)` }}
      >
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-bold text-white/80 uppercase tracking-wider leading-none">
            {card.bank}
          </span>
          <span className="text-[9px] font-black text-white/70 tracking-widest">
            {networkLabel[card.network]}
          </span>
        </div>
        <p className="text-[8px] font-mono text-white/40 tracking-widest">•••• ••••</p>
      </div>
    );
  }

  return (
    <div
      className="shine relative w-full rounded-2xl overflow-hidden text-white shadow-card select-none"
      style={{
        background: `linear-gradient(135deg, ${card.colour} 0%, ${card.colour}cc 60%, ${card.colour}88 100%)`,
        aspectRatio: '1.586 / 1',
      }}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/20 pointer-events-none" />
      {/* Large decorative circle */}
      <div
        className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full border border-white/10"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      />
      <div
        className="absolute -top-6 -left-6 w-36 h-36 rounded-full"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      />

      <div className="relative h-full flex flex-col justify-between p-5">
        {/* Top row */}
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold tracking-widest text-white/80 uppercase">{card.bank}</span>
          <span className="text-base font-black tracking-widest text-white/75">{networkLabel[card.network]}</span>
        </div>

        {/* Chip */}
        <div className="w-9 h-7 rounded-md bg-gradient-to-br from-gold-300 to-gold-500 opacity-90 shadow-inner" />

        {/* Bottom row */}
        <div>
          <p className="font-mono text-xs text-white/40 tracking-[0.2em] mb-1.5">•••• •••• •••• ••••</p>
          <p className="text-sm font-bold text-white leading-tight truncate">
            {card.name.replace(card.bank + ' ', '')}
          </p>
        </div>
      </div>
    </div>
  );
}
