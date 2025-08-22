import React, { useState } from 'react';
import { X, Copy, Check, Eye } from 'lucide-react';
import CodeEditor from './CodeEditor';

interface OutputModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlCode: string;
  cssCode: string;
  onPreview: () => void;
}

function OutputModal({ isOpen, onClose, htmlCode, cssCode, onPreview }: OutputModalProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCode = activeTab === 'html' ? htmlCode : cssCode;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-effect rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'html'
                  ? 'bg-[#3bd4cb] text-[#10131d]'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              HTML
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'css'
                  ? 'bg-[#3bd4cb] text-[#10131d]'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              CSS
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onPreview}
              className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-[#3bd4cb] text-[#10131d] hover:bg-[#2fa69f] transition-all"
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-[#3bd4cb] text-[#10131d] hover:bg-[#2fa69f] transition-all"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/5 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="h-full">
            <CodeEditor
              value={currentCode}
              language={activeTab}
              className="h-[60vh] min-h-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutputModal;