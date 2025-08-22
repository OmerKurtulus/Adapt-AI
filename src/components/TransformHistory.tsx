import React from 'react';
import { X, Clock, ArrowRight } from 'lucide-react';

interface Transform {
  htmlCode: string;
  cssCode: string;
  timestamp: number;
}

interface TransformHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  history: Transform[];
  onSelect: (transform: Transform) => void;
}

function TransformHistory({ isOpen, onClose, history, onSelect }: TransformHistoryProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-effect rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Transformation History
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/5 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {history.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No transformations yet
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((transform, index) => (
                <button
                  key={transform.timestamp}
                  onClick={() => {
                    onSelect(transform);
                    onClose();
                  }}
                  className="w-full glass-effect p-4 rounded-lg hover:border-[#3bd4cb]/30 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-white font-medium">
                        Transformation {history.length - index}
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(transform.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#3bd4cb] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransformHistory;