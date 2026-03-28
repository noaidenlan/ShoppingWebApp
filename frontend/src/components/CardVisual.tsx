import type { CreditCard } from '../types';

interface Props {
  card: CreditCard;
  small?: boolean;
}

const networkLogo: Record<string, string> = {
  Visa: 'VISA',
  Mastercard: 'MC',
  Amex: 'AMEX',
  UnionPay: 'UP',
};

const networkColour: Record<string, string> = {
  Visa: 'text-white opacity-80',
  Mastercard: 'text-orange-200',
  Amex: 'text-blue-200',
  UnionPay: 'text-red-200',
};

export default function CardVisual({ card, small = false }: Props) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden text-white shadow-lg select-none
        ${small ? 'w-28 h-16' : 'w-full aspect-[1.586/1]'}`}
      style={{ background: `linear-gradient(135deg, ${card.colour} 0%, ${card.colour}cc 100%)` }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-white/10" />

      <div className={`relative h-full flex flex-col justify-between ${small ? 'p-2' : 'p-5'}`}>
        <div className="flex justify-between items-start">
          <span className={`font-bold tracking-wide ${small ? 'text-xs' : 'text-sm'}`}>
            {card.bank}
          </span>
          <span className={`font-black tracking-widest ${small ? 'text-xs' : 'text-base'} ${networkColour[card.network]}`}>
            {networkLogo[card.network]}
          </span>
        </div>
        {!small && (
          <>
            <div className="font-mono tracking-widest text-sm text-white/70">
              •••• •••• •••• ••••
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight truncate">{card.name.replace(card.bank + ' ', '')}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
