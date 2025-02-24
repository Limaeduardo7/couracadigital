'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

// Número do WhatsApp no formato internacional (sem o +)
const WHATSAPP_NUMBER = "5575930250077"; // substitua pelo número correto
const WHATSAPP_MESSAGE = "Olá! Estou visitando o site da Couraça Digital e gostaria de mais informações.";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleChatClick = () => {
    // Redireciona para o WhatsApp
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 glass-effect rounded-lg p-4 w-64 shadow-lg animate-fadeIn">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-medium">Fale conosco</h3>
            <button 
              onClick={toggleChat}
              className="text-gray-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            Como podemos ajudar? Clique abaixo para iniciar um chat no WhatsApp.
          </p>
          <button
            onClick={handleChatClick}
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Iniciar conversa
          </button>
        </div>
      )}
      
      <button
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-lg hover-glow transition-all"
        aria-label="Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
} 