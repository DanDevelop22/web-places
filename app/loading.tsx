'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import Logo from '@/components/atoms/Logo';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark-50 via-white to-brand-dark-100 dark:from-brand-dark-900 dark:via-brand-dark-800 dark:to-brand-dark-900 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Logo con spinner */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full flex items-center justify-center">
            <Logo variant="primary" size="lg" type="icon" />
          </div>
          
          {/* Spinner giratorio alrededor del logo */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-primary animate-spin"></div>
        </div>

        {/* Texto de carga */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-dark-900 dark:text-brand-dark-100">
            Cargando DóndeTú...
          </h2>
          <p className="text-brand-dark-600 dark:text-brand-dark-400">
            Preparando tu experiencia de navegación
          </p>
          
          {/* Barra de progreso animada */}
          <div className="w-64 h-2 bg-brand-dark-200 dark:bg-brand-dark-700 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-brand-gradient rounded-full progress-bar-animation"></div>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-brand-primary rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-brand-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Mensaje adicional */}
        <div className="mt-8 text-sm text-brand-dark-500 dark:text-brand-dark-400">
          <p>Descubriendo los mejores lugares de La Habana...</p>
        </div>


      </div>
    </div>
  );
}
