'use client';

import { useState, useRef, useEffect } from 'react';
import { IoMdSend } from 'react-icons/io';
import { FaRobot, FaUser, FaTimes } from 'react-icons/fa';
import { MdOutlineSmartToy } from 'react-icons/md';
import { SiOpenai } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

type AIProvider = 'grok' | 'llama' | 'aisdk';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Halo! Saya asisten AI Anda. Ada yang bisa saya bantu terkait pembelajaran batik atau pertanyaan lainnya?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [provider, setProvider] = useState<AIProvider>('grok');

  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponses: Record<AIProvider, string> = {
        grok: `Sebagai Grok, saya senang membantu! ${generateResponse(newMessage)}`,
        llama: `Llama 3 di sini. ${generateResponse(newMessage)}`,
        aisdk: `AISDK siap membantu. ${generateResponse(newMessage)}`,
      };

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[provider],
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string) => {
    // Contoh sederhana respons berdasarkan input
    if (query.toLowerCase().includes('batik')) {
      return 'Batika adalah teknik menggambar atau mewarnai kain dengan menggunakan lilin malam untuk mencegah penyerapan warna. Di Indonesia, batik memiliki nilai budaya yang sangat tinggi dan menjadi warisan budaya yang dilindungi UNESCO.';
    } else if (query.toLowerCase().includes('apa kabar') || query.toLowerCase().includes('halo')) {
      return 'Saya baik-baik saja, terima kasih telah bertanya! Bagaimana dengan Anda?';
    } else if (query.toLowerCase().includes('terima kasih')) {
      return 'Sama-sama! Senang bisa membantu Anda.';
    } else {
      return 'Mohon maaf, saya masih terbatas dalam memberikan informasi. Untuk pertanyaan spesifik tentang batik, saya akan senang membantu Anda.';
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const getProviderIcon = () => {
    switch (provider) {
      case 'grok':
        return <MdOutlineSmartToy className="text-lg" />;
      case 'llama':
        return <FaRobot className="text-lg" />;
      case 'aisdk':
        return <SiOpenai className="text-lg" />;
      default:
        return <FaRobot className="text-lg" />;
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-10 transition-all duration-300"
      >
        <FaRobot className="text-white text-xl" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden flex flex-col z-20"
            ref={chatBoxRef}
          >
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getProviderIcon()}
                <h3 className="font-bold">Batika Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as AIProvider)}
                  className="bg-blue-700 text-white text-sm p-1 rounded border border-blue-500"
                >
                  <option value="grok">Grok</option>
                  <option value="llama">Llama 3</option>
                  <option value="aisdk">AI SDK</option>
                </select>
                <button onClick={toggleChat}>
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 flex items-start gap-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-50'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-50'
                    }`}
                  >
                    {message.sender === 'bot' ? (
                      <div className="bg-blue-600 text-white p-1 mt-1 rounded-full flex-shrink-0">
                        {getProviderIcon()}
                      </div>
                    ) : (
                      <div className="bg-green-600 text-white p-1 mt-1 rounded-full flex-shrink-0">
                        <FaUser className="text-lg" />
                      </div>
                    )}
                    <div>
                      <p>{message.text}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex mb-4">
                  <div className="bg-gray-100 dark:bg-slate-700 rounded-lg px-4 py-2 flex items-center gap-2">
                    <div className="bg-blue-600 text-white p-1 rounded-full">
                      {getProviderIcon()}
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ketik pesan..."
                  className="flex-1 p-2 border dark:border-slate-600 dark:bg-slate-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-md"
                >
                  <IoMdSend />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 