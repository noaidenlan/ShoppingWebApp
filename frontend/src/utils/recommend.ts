import type { CreditCard, SpendingCategory, RewardType } from '../types';
import { cards } from '../data/cards';

export interface Recommendation {
  card: CreditCard;
  rate: number;
  note?: string;
  capped?: boolean;
}

/**
 * Returns cards sorted by their rate for a given spending category.
 * Optionally filter by reward type.
 */
export function getRecommendations(
  category: SpendingCategory,
  filterType?: RewardType
): Recommendation[] {
  const pool = filterType ? cards.filter((c) => c.rewardType === filterType) : cards;

  return pool
    .map((card) => {
      const match = card.categories.find((r) => r.category === category);
      const rate = match?.rate ?? card.baseRate;
      return { card, rate, note: match?.note, capped: match?.capped };
    })
    .sort((a, b) => b.rate - a.rate);
}

/**
 * Returns the single best card for a given category.
 */
export function getBestCard(
  category: SpendingCategory,
  filterType?: RewardType
): Recommendation | null {
  const results = getRecommendations(category, filterType);
  return results[0] ?? null;
}

/**
 * Given a monthly spend amount and a card, calculate the expected monthly reward.
 */
export function calculateMonthlyReward(
  card: CreditCard,
  category: SpendingCategory,
  monthlySpend: number
): { reward: number; label: string } {
  const match = card.categories.find((r) => r.category === category);
  const rate = match?.rate ?? card.baseRate;

  if (card.rewardType === 'miles') {
    const miles = Math.floor(monthlySpend * rate);
    return { reward: miles, label: `${miles.toLocaleString()} miles/mo` };
  } else {
    const raw = (monthlySpend * rate) / 100;
    const capped = match?.capped && match.cap ? Math.min(raw, match.cap) : raw;
    return {
      reward: parseFloat(capped.toFixed(2)),
      label: `$${capped.toFixed(2)} cashback/mo`,
    };
  }
}

/**
 * Approximate annual value of rewards (miles valued at 2 cents each for travel redemptions).
 */
export function annualValue(
  card: CreditCard,
  category: SpendingCategory,
  monthlySpend: number
): number {
  const { reward } = calculateMonthlyReward(card, category, monthlySpend);
  if (card.rewardType === 'miles') {
    // standard valuation: 1 mile ≈ SGD 0.02
    return reward * 12 * 0.02;
  }
  return reward * 12;
}
