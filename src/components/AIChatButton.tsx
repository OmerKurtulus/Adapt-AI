import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, AlertCircle, Send, Bot, Loader, Copy, Check } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import CodeEditor from './CodeEditor';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const AIChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orbitDegree, setOrbitDegree] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrbitDegree((prev) => (prev + 1) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCopy = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const detectLanguage = (content: string): string => {
    if (content.includes('```')) {
      const match = content.match(/```(\w+)/);
      if (match && match[1]) return match[1];
    }
    
    if (content.includes('#include')) return 'c';
    if (content.includes('printf')) return 'c';
    if (content.includes('scanf')) return 'c';
    if (content.includes('int main')) return 'c';
    if (content.includes('function')) return 'javascript';
    if (content.includes('const')) return 'javascript';
    if (content.includes('let')) return 'javascript';
    if (content.includes('var')) return 'javascript';
    if (content.includes('import')) return 'javascript';
    if (content.includes('class')) return 'javascript';
    if (content.includes('<')) return 'html';
    if (content.includes('/>')) return 'jsx';
    
    return 'plaintext';
  };

  const extractCodeFromMarkdown = (content: string): string => {
    if (content.includes('```')) {
      const match = content.match(/```(?:\w+)?\n([\s\S]*?)```/);
      return match ? match[1].trim() : content;
    }
    return content;
  };

  const isCodeBlock = (content: string): boolean => {
    return content.includes('```') || 
           /^(const|let|var|function|class|import|export|if|for|while|#include|int main)/.test(content.trim()) ||
           content.includes('{') || 
           content.includes('</');
  };

  const formatMessage = (message: Message): JSX.Element => {
    const { content, id } = message;
    
    if (isCodeBlock(content)) {
      const language = detectLanguage(content);
      const codeContent = extractCodeFromMarkdown(content);
      
      return (
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400 capitalize">{language}</span>
            <button
              onClick={() => handleCopy(codeContent, id)}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-700/50 hover:bg-gray-700 transition-colors"
            >
              {copiedId === id ? (
                <>
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="w-full" style={{ minHeight: '200px' }}>
            <CodeEditor
              value={codeContent}
              language={language}
              className="min-h-[200px]"
            />
          </div>
        </div>
      );
    }

    const sections = content.split('\n\n');
    return (
      <div className="space-y-4">
        {sections.map((section, index) => {
          if (section.startsWith('#')) {
            const level = section.match(/^#+/)[0].length;
            const title = section.replace(/^#+\s/, '');
            const className = `text-${level === 1 ? '2xl' : level === 2 ? 'xl' : 'lg'} font-bold mb-2`;
            return <h1 key={index} className={className}>{title}</h1>;
          }
          return <p key={index} className="leading-relaxed">{section}</p>;
        })}
      </div>
    );
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `You are an AI code assistant. Please help with the following question or task related to programming: ${input.trim()}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: text
      }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get response';
      setError(errorMessage === 'API key not configured' 
        ? 'Please configure your Gemini API key in the .env file (VITE_GEMINI_API_KEY)'
        : 'Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 group"
        aria-label="Open AI Chat"
      >
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3bd4cb] to-[#2fa69f] transform transition-all duration-300 group-hover:scale-110 shadow-[0_0_20px_rgba(59,212,203,0.3)] group-hover:shadow-[0_0_30px_rgba(59,212,203,0.5)]">
            <div className="absolute inset-0.5 bg-[#10131d] rounded-full flex items-center justify-center overflow-hidden">
              <div className="relative text-3xl font-bold text-[#3bd4cb] transform transition-transform group-hover:scale-110">
                A
                <div className="absolute inset-0 bg-gradient-to-t from-[#3bd4cb] to-transparent opacity-20"></div>
              </div>
            </div>
          </div>
          
          <div
            className="absolute w-full h-full transition-transform pointer-events-none"
            style={{
              transform: `rotate(${orbitDegree}deg)`,
            }}
          >
            <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 bg-[#3bd4cb] rounded-full shadow-[0_0_10px_rgba(59,212,203,0.5)] blur-[1px]" />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-effect rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3bd4cb] to-[#2fa69f] shadow-[0_0_10px_rgba(59,212,203,0.3)]">
                    <div className="absolute inset-0.5 bg-[#10131d] rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-[#3bd4cb]">A</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">Adapt Code Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3bd4cb] to-[#2fa69f] shadow-[0_0_20px_rgba(59,212,203,0.3)]">
                      <div className="absolute inset-1 bg-[#10131d] rounded-full flex items-center justify-center">
                        <span className="text-3xl font-bold text-[#3bd4cb]">A</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-medium">How can I help you with coding today?</p>
                  <p className="text-sm mt-2">Ask me anything about programming, debugging, or best practices!</p>
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  } w-full`}
                >
                  <div
                    className={`max-w-[95%] w-full p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-[#3bd4cb] text-[#10131d]'
                        : 'glass-effect text-white'
                    }`}
                  >
                    {formatMessage(message)}
                  </div>
                </div>
              ))}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="glass-effect p-4 rounded-lg flex items-center gap-3">
                    <Loader className="h-5 w-5 text-[#3bd4cb] animate-spin" />
                    <span className="text-[#3bd4cb]">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything about code..."
                    rows={1}
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3bd4cb] focus:border-transparent resize-none"
                    style={{
                      minHeight: '44px',
                      maxHeight: '120px'
                    }}
                  />
                  <div className="absolute right-3 bottom-2 text-xs text-gray-400">
                    Press Enter to send, Shift + Enter for new line
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-4 py-2 bg-[#3bd4cb] text-[#10131d] rounded-lg hover:bg-[#2fa69f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:shadow-[0_0_20px_rgba(59,212,203,0.3)]"
                >
                  <Send className="h-5 w-5" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatButton;