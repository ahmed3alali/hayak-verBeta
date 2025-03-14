import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CategoryFilter = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category); // Pass the selected category back to the parent component (Menu)
  };

  const {t} = useTranslation()

  return (
    <div className="overflow-x-auto py-4 px-4">
      <div className="flex items-center justify-center gap-2 min-w-max">
        <button
          onClick={() => handleCategoryClick('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-primary text-black font-bold'
              : 'bg-soft-gray text-gray-600 hover:bg-gray-200'
          }`}
        >
       {t("All")} 
        </button>
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => handleCategoryClick(category.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.key
                ? 'bg-primary text-black bg-slate-300'
                : 'bg-soft-gray text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
