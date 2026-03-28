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
            className={`group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all duration-200 text-center cursor-pointer focus:outline-none
              ${isSelected
                ? 'border-navy-600 bg-navy-600 shadow-glow'
                : 'border-slate-200 bg-white hover:border-navy-300 hover:bg-navy-50 shadow-sm hover:shadow-card'
              }`}
          >
            <span className={`text-2xl transition-transform duration-200 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
              {cat.icon}
            </span>
            <span className={`text-xs font-semibold leading-tight ${isSelected ? 'text-white' : 'text-slate-700'}`}>
              {cat.label}
            </span>
            {isSelected && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-80" />
            )}
          </button>
        );
      })}
    </div>
  );
}
