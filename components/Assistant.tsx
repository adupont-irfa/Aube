import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

const Assistant: React.FC = () => {
  // Assistant conversationnel local (aucun appel externe).
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Bonjour ! Je suis l'assistant expert du projet de pr?diction des tensions RH en Normandie. Posez-moi des questions sur la m?thodologie (SARIMA, LSTM), les sources de donn?es ou les r?sultats.",
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    // Force le d?filement en bas du fil apr?s l'ajout d'un message.
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    // Simule une r?ponse locale sans appel r?seau.
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        role: 'model',
        text: "Mode hors-ligne : je synth?tise les ?l?ments connus (SARIMA, LSTM, donn?es Dares/INSEE) sans appel externe.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setLoading(false);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // D?clenche l'envoi lorsqu'on presse Entr?e sans Shift.
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center space-x-2">
            <div className="bg-blue-100 p-2 rounded-full">
                <Sparkles size={20} className="text-blue-600" />
            </div>
            <div>
                <h3 className="font-bold text-slate-800">Assistant Expert Data Science</h3>
                <p className="text-xs text-slate-500">Mode hors-ligne, r?ponses internes</p>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
              <div className={`p-2 rounded-full mt-1 ${msg.role === 'user' ? 'bg-blue-600 ml-2' : 'bg-white border border-slate-200 mr-2'}`}>
                {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-blue-600" />}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm text-sm whitespace-pre-wrap leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none ml-10 shadow-sm">
                <Loader2 className="animate-spin text-blue-600" size={16} />
                <span className="text-xs text-slate-500">Analyse en cours...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center space-x-2 relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Posez une question sur le mod?le LSTM, les donn?es Dares..."
            className="flex-1 p-3 pr-12 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="absolute right-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
