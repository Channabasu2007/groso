// components/ButtonLoader.jsx
import React from 'react';

const ButtonLoader = ({ size = 'w-4 h-4', color = 'border-white' }) => {
  return (
    <div
      className={`
        ${size}
        ${color}
        border-2 border-solid border-current border-r-transparent
        rounded-full
        animate-spin
      `}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ButtonLoader;