'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '@/lib/hooks/useChat';
import toast, { Toaster } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `Tu es l'assistant virtuel d'ECR360 Digital, une agence digitale suisse spécialisée dans les solutions pour PME. Tu réponds toujours en français, de manière professionnelle, chaleureuse et concise.

Voici les informations clés sur ECR360 Digital :

**Services :**
- **Création de site web** : Sites professionnels, rapides et optimisés SEO
- **Solutions Marketing** : SEO, publicité Google/Meta, gestion des réseaux sociaux, email marketing
- **Automatisation IA** : Chatbots, automatisation des processus, intégrations intelligentes

**Packs et Tarifs :**
- **Pack Essentiel** : 890.- CHF (setup) + 19.90 CHF/mois — Site vitrine professionnel, hébergement inclus, support de base
- **Pack Confort** : 890.- CHF (setup) + 39.90 CHF/mois — Site + marketing digital de base, rapports mensuels, support prioritaire
- **Pack Croissance** : 890.- CHF (setup) + 99.90 CHF/mois — Site + marketing avancé + automatisation IA, accompagnement complet

**Points forts :**
- Basé en Suisse, compréhension des besoins des PME locales
- Tarifs transparents, sans surprise
- Support réactif en français
- Résultats mesurables

Si un visiteur est intéressé ou souhaite en savoir plus, encourage-le à soumettre une demande de projet via le formulaire en ligne (lien : /demande). Ne fournis pas d'informations inventées. Si tu ne sais pas quelque chose, invite l'utilisateur à contacter l'équipe directement.`;

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content: 'Bonjour ! 👋 Je suis l\'assistant d\'ECR360 Digital. Je peux vous renseigner sur nos services, nos packs et tarifs, ou vous aider à démarrer votre projet digital. Comment puis-je vous aider ?',
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [pendingUserMessage, setPendingUserMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { response, isLoading, error, sendMessage } = useChat(
    'GEMINI',
    'gemini/gemini-2.5-flash',
    true
  );

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    if (response && !isLoading && pendingUserMessage !== null) {
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && last?.content === response) return prev;
        const withoutStreaming = prev.filter((m) => !(m.role === 'assistant' && m.content === ''));
        return [...withoutStreaming, { role: 'assistant', content: response }];
      });
      setPendingUserMessage(null);
    }
  }, [response, isLoading, pendingUserMessage]);

  // Live streaming update
  useEffect(() => {
    if (isLoading && response) {
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return [...prev.slice(0, -1), { role: 'assistant', content: response }];
        }
        return [...prev, { role: 'assistant', content: response }];
      });
    }
  }, [response, isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setPendingUserMessage(text);

    const apiMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...updatedMessages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    ];

    sendMessage(apiMessages, { temperature: 0.7, max_tokens: 800 });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none"
        style={{
          background: 'linear-gradient(135deg, #00C2FF 0%, #0066CC 100%)',
          boxShadow: '0 4px 24px rgba(0, 194, 255, 0.4)',
        }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl overflow-hidden flex flex-col"
          style={{
            height: '480px',
            background: '#0A1628',
            border: '1px solid rgba(0, 194, 255, 0.2)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 194, 255, 0.1)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #0066CC 0%, #00C2FF 100%)' }}
          >
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.798-1.414 2.798H4.213c-1.444 0-2.414-1.798-1.414-2.798L4 15.3" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Assistant ECR360</p>
              <p className="text-white/70 text-xs">Réponse instantanée</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/70 text-xs">En ligne</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,194,255,0.2) transparent' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full flex-shrink-0 mr-2 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0066CC, #00C2FF)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.798-1.414 2.798H4.213c-1.444 0-2.414-1.798-1.414-2.798L4 15.3" />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === 'user' ?'rounded-tr-sm text-white' :'rounded-tl-sm text-gray-100'
                  }`}
                  style={{
                    background:
                      msg.role === 'user' ?'linear-gradient(135deg, #0066CC, #00C2FF)' :'rgba(255,255,255,0.07)',
                    border: msg.role === 'assistant' ? '1px solid rgba(0,194,255,0.15)' : 'none',
                  }}
                >
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-strong:text-accent">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <span>{msg.content}</span>
                  )}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full flex-shrink-0 mr-2 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0066CC, #00C2FF)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5" />
                  </svg>
                </div>
                <div className="rounded-2xl rounded-tl-sm px-4 py-3" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(0,194,255,0.15)' }}>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* CTA Banner */}
          <div className="px-4 py-2 flex-shrink-0" style={{ background: 'rgba(0,194,255,0.06)', borderTop: '1px solid rgba(0,194,255,0.1)' }}>
            <a
              href="/demande"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #0066CC 0%, #00C2FF 100%)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Démarrer mon projet →
            </a>
          </div>

          {/* Input */}
          <div className="px-3 pb-3 pt-2 flex-shrink-0" style={{ borderTop: '1px solid rgba(0,194,255,0.1)' }}>
            <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,194,255,0.2)' }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Posez votre question..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-gray-100 placeholder-gray-500 outline-none disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-40 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #0066CC, #00C2FF)' }}
                aria-label="Envoyer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster position="bottom-left" />
    </>
  );
}
