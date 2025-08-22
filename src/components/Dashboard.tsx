import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import CodeEditor from './CodeEditor';
import TransformButton from './TransformButton';
import OutputModal from './OutputModal';
import TransformHistory from './TransformHistory';
import PreviewModal from './PreviewModal';
import { History, Eye, AlertCircle } from 'lucide-react';

interface Transform {
  htmlCode: string;
  cssCode: string;
  timestamp: number;
}

function Dashboard() {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [outputHtml, setOutputHtml] = useState('');
  const [outputCss, setOutputCss] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [transformHistory, setTransformHistory] = useState<Transform[]>([]);

  const processCode = async () => {
    if (!htmlCode && !cssCode) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const combinedCode = `HTML:\n${htmlCode}\n\nCSS:\n${cssCode}`;
      const prompt = `Modernize and make responsive the following HTML and CSS code. Return the HTML and CSS separately, clearly marked with HTML: and CSS: prefixes. Include detailed comments explaining the changes: ${combinedCode}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const output = response.text();

      const htmlMatch = output.match(/HTML:([\s\S]*?)(?=CSS:|$)/i);
      const cssMatch = output.match(/CSS:([\s\S]*?)$/i);

      const newHtml = htmlMatch ? htmlMatch[1].trim() : '';
      const newCss = cssMatch ? cssMatch[1].trim() : '';

      setOutputHtml(newHtml);
      setOutputCss(newCss);
      
      setTransformHistory(prev => [{
        htmlCode: newHtml,
        cssCode: newCss,
        timestamp: Date.now()
      }, ...prev]);
      
      setShowModal(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during processing';
      setError(errorMessage === 'API key not configured' 
        ? 'Please configure your Gemini API key in the .env file (VITE_GEMINI_API_KEY)'
        : 'An error occurred while processing your code. Please try again.');
      setOutputHtml('');
      setOutputCss('');
    } finally {
      setIsProcessing(false);
    }
  };

  const viewTransform = (transform: Transform) => {
    setOutputHtml(transform.htmlCode);
    setOutputCss(transform.cssCode);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">
            Code Transformer
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-2 px-4 py-2 glass-effect rounded-lg text-[#3bd4cb] hover:text-white transition-colors"
            >
              <History className="h-5 w-5" />
              <span>History</span>
            </button>
            <button
              onClick={() => outputHtml && outputCss && setShowPreview(true)}
              disabled={!outputHtml && !outputCss}
              className="flex items-center gap-2 px-4 py-2 glass-effect rounded-lg text-[#3bd4cb] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Eye className="h-5 w-5" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-white font-medium">Your HTML Code</h3>
            <div className="glass-effect rounded-lg p-1">
              <CodeEditor
                value={htmlCode}
                onChange={setHtmlCode}
                language="html"
                className="h-[400px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-medium">Your CSS Code</h3>
            <div className="glass-effect rounded-lg p-1">
              <CodeEditor
                value={cssCode}
                onChange={setCssCode}
                language="css"
                className="h-[400px]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <TransformButton
            onClick={processCode}
            isProcessing={isProcessing}
            disabled={!htmlCode && !cssCode}
          />
        </div>
      </div>

      <OutputModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        htmlCode={outputHtml}
        cssCode={outputCss}
        onPreview={() => setShowPreview(true)}
      />

      <TransformHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={transformHistory}
        onSelect={viewTransform}
      />

      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        htmlCode={outputHtml}
        cssCode={outputCss}
      />
    </div>
  );
}

export default Dashboard;