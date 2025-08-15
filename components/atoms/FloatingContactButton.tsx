'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Mail, Phone } from 'lucide-react';
import { clsx } from 'clsx';

interface FloatingContactButtonProps {
  onContactClick: () => void;
}

export default function FloatingContactButton({ onContactClick }: FloatingContactButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const contactOptions = [
    {
      icon: Mail,
      label: 'Email',
      action: () => window.open('mailto:contacto@mapadelugares.com', '_blank'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Phone,
      label: 'Llamar',
      action: () => window.open('tel:+5371234567', '_blank'),
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Opciones de contacto expandidas */}
      {isExpanded && (
        <div className="mb-4 space-y-3">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div
                key={index}
                className={clsx(
                  'flex items-center gap-3 p-3 rounded-full text-white shadow-lg transition-all duration-300 transform hover:scale-105',
                  option.color
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInFromBottom 0.3s ease-out forwards'
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium whitespace-nowrap">
                  {option.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Botón principal */}
      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        >
          {isExpanded ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>

        {/* Botón de contacto general */}
        {!isExpanded && (
          <button
            onClick={onContactClick}
            className="absolute -top-2 -left-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 text-xs font-bold"
            title="Únete"
          >
            Ú
          </button>
        )}
      </div>

      {/* Estilos CSS para animaciones */}
      <style jsx>{`
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
