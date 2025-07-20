// components/Quantitybatch.jsx
import React from 'react';

const Quantitybatch = ({ grocery }) => {
  const getUnitColorClasses = (unitString) => {
    if (!unitString || unitString.trim() === "") {
      // Default colors for empty/undefined units
      return {
        textColor: "text-zinc-600 dark:text-zinc-300",
        bgColor: "bg-zinc-200 dark:bg-zinc-700" // Neutral gray background
      };
    }

    const lowerUnit = unitString.toLowerCase();
    let textColor = "";
    let bgColor = "";

    // Define distinct colors for light mode and dark mode using Tailwind's `dark:` variant
    if (lowerUnit.includes('kg')) {
      textColor = "text-white dark:text-red-300";   // White text in light mode, light red text in dark mode
      bgColor = "bg-red-700 dark:bg-red-900";      // Strong red badge in light mode, very dark red in dark mode
    } else if (lowerUnit.includes('g')) {
      textColor = "text-black dark:text-yellow-300"; // Black text in light mode, light yellow text in dark mode
      bgColor = "bg-yellow-500 dark:bg-yellow-900"; // Bright yellow badge in light mode, very dark yellow in dark mode
    } else if (lowerUnit.includes('liter') || lowerUnit.includes('l')) {
      textColor = "text-white dark:text-green-300"; // White text in light mode, light green text in dark mode
      bgColor = "bg-green-600 dark:bg-green-900";   // Strong green badge in light mode, very dark green in dark mode
    } else if (lowerUnit.includes('ml')) {
      textColor = "text-white dark:text-blue-300";   // White text in light mode, light blue text in dark mode
      bgColor = "bg-blue-600 dark:bg-blue-900";     // Strong blue badge in light mode, very dark blue in dark mode
    } else {
      // Fallback for units not specifically colored
      textColor = "text-zinc-600 dark:text-zinc-300";
      bgColor = "bg-zinc-200 dark:bg-zinc-700";
    }

    return { textColor, bgColor };
  };

  const { textColor, bgColor } = getUnitColorClasses(grocery.unit);

  return (
    <div className="flex items-center gap-1">
      {grocery.unit && grocery.unit.trim() !== "" && (
        <span
          className={`
            inline-flex items-center
            px-2 py-0.5
            rounded-full
            text-xs
            font-semibold
            ${textColor} 
            ${bgColor}
            flex-shrink-0
          `}
        >
          {grocery.unit}
        </span>
      )}
    </div>
  );
};

export default Quantitybatch;