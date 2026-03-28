export type RewardType = 'miles' | 'cashback';
export type Network = 'Visa' | 'Mastercard' | 'Amex' | 'UnionPay';
export type Bank =
  | 'DBS'
  | 'UOB'
  | 'OCBC'
  | 'Citibank'
  | 'HSBC'
  | 'Standard Chartered'
  | 'American Express'
  | 'Maybank'
  | 'BOC';

export interface CategoryRate {
  category: SpendingCategory;
  /** miles per dollar OR cashback percentage */
  rate: number;
  /** human-readable note, e.g. "min $600/mo spend" */
  note?: string;
  /** whether the rate is capped (true = cap applies) */
  capped?: boolean;
  /** monthly cap in SGD */
  cap?: number;
}

export type SpendingCategory =
  | 'dining'
  | 'groceries'
  | 'online_shopping'
  | 'overseas'
  | 'transport'
  | 'petrol'
  | 'utilities'
  | 'entertainment'
  | 'contactless'
  | 'general';

export interface CreditCard {
  id: string;
  name: string;
  bank: Bank;
  network: Network;
  rewardType: RewardType;
  annualFee: number;
  /** waiver condition */
  annualFeeWaiver?: string;
  minIncome: number;
  baseRate: number;
  categories: CategoryRate[];
  /** miles program or cashback program name */
  program: string;
  url: string;
  /** highlight colour for the card visual */
  colour: string;
  /** brief value proposition */
  tagline: string;
}
