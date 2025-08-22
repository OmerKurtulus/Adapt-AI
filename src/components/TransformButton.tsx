import React from 'react';
import { RefreshCw } from 'lucide-react';

interface TransformButtonProps {
  onClick: () => void;
  isProcessing: boolean;
  disabled: boolean;
}

function TransformButton({ onClick, isProcessing, disabled }: TransformButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isProcessing}
      className="group relative flex items-center space-x-2 px-8 py-3 rounded-lg overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(59,212,203,0.5)] hover:border hover:border-[#3bd4cb]/30"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#3bd4cb] to-[#2fa69f] transition-transform duration-300 group-hover:scale-105"></div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-white to-transparent transition-opacity duration-300"></div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-[#3bd4cb] blur-xl transition-opacity duration-300"></div>
      <div className="relative flex items-center space-x-2">
        <RefreshCw className={`h-5 w-5 text-[#10131d] ${isProcessing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
        <span className="text-[#10131d] font-medium">{isProcessing ? 'Processing...' : 'Transform Code'}</span>
      </div>
    </button>
  );
}

export default TransformButton;