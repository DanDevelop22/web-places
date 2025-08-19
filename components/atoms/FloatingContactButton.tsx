'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Mail, Phone } from 'lucide-react';
import { clsx } from 'clsx';
import LogoIcon from './LogoIcon';

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
      color: 'bg-brand-info hover:bg-brand-info/80'
    },
    {
      icon: Phone,
      label: 'Llamar',
      action: () => window.open('tel:+5371234567', '_blank'),
      color: 'bg-brand-success hover:bg-brand-success/80'
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
                  'flex items-center gap-3 p-3 rounded-full text-white shadow-brand-lg transition-all duration-300 transform hover:scale-105',
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
          className="w-14 h-14 bg-brand-gradient text-white rounded-full shadow-brand-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-brand-xl"
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
            className="absolute -top-2 -left-2 w-8 h-8 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-full shadow-brand flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            title="DóndeTú"
          >
            <LogoIcon size="sm" />
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
