import type { SpendingCategory } from '../types';
import { categories } from '../data/categories';

interface Props {
  selected: SpendingCategory;
  onChange: (cat: SpendingCategory) => void;
}

export default function CategoryPicker({ selected, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {categories.map((cat) => {
        const isSelected = selected === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center cursor-pointer
              ${isSelected
                ? 'border-blue-600 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/40'
              }`}
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className={`text-xs font-medium leading-tight ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
