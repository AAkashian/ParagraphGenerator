
import React from 'react';
import { Loader } from './Loader';

interface ResultDisplayProps {
  paragraph: string;
  isLoading: boolean;
  error: string | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ paragraph, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return (
        <div className="text-center text-red-400 bg-red-900/50 border border-red-700 p-4 rounded-lg">
          <p className="font-bold">An Error Occurred</p>
          <p>{error}</p>
        </div>
      );
    }

    if (paragraph) {
      return (
        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
          {paragraph}
        </p>
      );
    }

    return (
      <div className="text-center text-gray-500">
        <p>Your generated paragraph will appear here.</p>
        <p className="text-sm">Enter a prompt above and click "Generate".</p>
      </div>
    );
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg min-h-[150px] flex items-center justify-center transition-all duration-300">
      <div className="w-full">
        {renderContent()}
      </div>
    </div>
  );
};
