import type { SpendingCategory } from '../types';

export interface CategoryMeta {
  id: SpendingCategory;
  label: string;
  icon: string;
  description: string;
  examples: string;
}

export const categories: CategoryMeta[] = [
  {
    id: 'dining',
    label: 'Dining',
    icon: '🍽️',
    description: 'Restaurants, cafes, food delivery',
    examples: 'Hawker centres, restaurants, GrabFood, Foodpanda, Deliveroo',
  },
  {
    id: 'groceries',
    label: 'Groceries',
    icon: '🛒',
    description: 'Supermarkets and grocery stores',
    examples: 'NTUC FairPrice, Cold Storage, Sheng Siong, Giant, RedMart',
  },
  {
    id: 'online_shopping',
    label: 'Online Shopping',
    icon: '🛍️',
    description: 'E-commerce and online purchases',
    examples: 'Shopee, Lazada, Amazon, Qoo10, Zalora',
  },
  {
    id: 'overseas',
    label: 'Overseas / Foreign Currency',
    icon: '✈️',
    description: 'Spending overseas or in foreign currencies',
    examples: 'Travel abroad, foreign currency online purchases',
  },
  {
    id: 'transport',
    label: 'Transport',
    icon: '🚌',
    description: 'Public transport, taxis and ride-hailing',
    examples: 'MRT, bus, Grab, Gojek, TADA, ComfortDelGro',
  },
  {
    id: 'petrol',
    label: 'Petrol',
    icon: '⛽',
    description: 'Fuel purchases at petrol stations',
    examples: 'Shell, Caltex, Esso, SPC, BP',
  },
  {
    id: 'utilities',
    label: 'Utilities',
    icon: '💡',
    description: 'Electricity, water, gas and telco bills',
    examples: 'SP Group, Geneco, Singtel, StarHub, M1',
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    icon: '🎬',
    description: 'Movies, streaming, leisure activities',
    examples: 'Cathay Cineplexes, Golden Village, Netflix, Spotify',
  },
  {
    id: 'contactless',
    label: 'Contactless Payments',
    icon: '📲',
    description: 'PayWave / NFC tap payments in-store',
    examples: 'Visa PayWave, Mastercard contactless tap payments',
  },
  {
    id: 'general',
    label: 'General Spending',
    icon: '💳',
    description: 'All other everyday spend',
    examples: 'Everything not listed above',
  },
];
