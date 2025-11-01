
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 border-4 border-t-purple-500 border-r-purple-500 border-b-purple-500/30 border-l-purple-500/30 rounded-full animate-spin"></div>
        <p className="text-gray-400">Crafting your paragraph...</p>
    </div>
  );
};
