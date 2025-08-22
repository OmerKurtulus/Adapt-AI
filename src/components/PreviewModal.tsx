import React from 'react';
import { X } from 'lucide-react';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlCode: string;
  cssCode: string;
}

function PreviewModal({ isOpen, onClose, htmlCode, cssCode }: PreviewModalProps) {
  if (!isOpen) return null;

  const combinedCode = `
    <html>
      <head>
        <style>${cssCode}</style>
      </head>
      <body>${htmlCode}</body>
    </html>
  `;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-effect rounded-xl shadow-2xl w-full h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">Preview</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/5 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>
        
        <div className="flex-1 bg-white overflow-hidden rounded-b-xl">
          <iframe
            srcDoc={combinedCode}
            className="w-full h-full border-none"
            title="Preview"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;