
import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const MagicWandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.19995 19.3333L3.16662 18.3667L4.13328 17.4L2.19995 19.3333ZM18.3666 3.16669L19.3333 2.20001L21.2666 4.13335L20.3 5.10001L18.3666 3.16669ZM12.7 7.50001L15.9 10.7L9.83328 16.7667L6.63328 13.5667L12.7 7.50001ZM14.1 6.10001C13.8416 5.84168 13.5291 5.64168 13.1833 5.51668C12.8375 5.38751 12.4666 5.33335 12.1 5.33335C11.7333 5.33335 11.3625 5.38751 11.0166 5.51668C10.6708 5.64168 10.3583 5.84168 10.1 6.10001L4.66662 11.5333L3.73328 12.4667L4.73328 13.4667L5.66662 14.4L11.5333 8.53335L11.7 8.36668L11.8666 8.20001L14.1 6.10001ZM8.53328 11.5333L7.69995 12.3667L8.73328 13.4L9.56662 12.5667L8.53328 11.5333Z" />
    </svg>
);


export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-lg">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., The importance of space exploration for humanity..."
          className="w-full h-28 bg-transparent text-gray-200 placeholder-gray-500 rounded-md p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-shadow"
          disabled={isLoading}
        />
      </div>
      <div className="mt-3 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={isLoading || !prompt.trim()}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <MagicWandIcon className="w-5 h-5" />
              <span>Generate</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
