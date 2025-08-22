import React from 'react';
import { Code2, FileCode } from 'lucide-react';

interface ModeSelectionProps {
  onSelect: (mode: 'html' | 'css') => void;
}

function ModeSelection({ onSelect }: ModeSelectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <button
          onClick={() => onSelect('html')}
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-4"
        >
          <FileCode className="h-16 w-16 text-[#013c68]" />
          <h3 className="text-xl font-bold text-[#0d1d4c]">HTML Modernization</h3>
          <p className="text-gray-600 text-center">Transform legacy HTML into responsive, modern markup</p>
        </button>
        
        <button
          onClick={() => onSelect('css')}
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-4"
        >
          <Code2 className="h-16 w-16 text-[#013c68]" />
          <h3 className="text-xl font-bold text-[#0d1d4c]">CSS Modernization</h3>
          <p className="text-gray-600 text-center">Convert traditional CSS into modern, responsive styles</p>
        </button>
      </div>
    </div>
  );
}

export default ModeSelection;