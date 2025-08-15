'use client';

import React from 'react';
import { MapPin } from 'lucide-react';

export default function LocaleLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Icono animado */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center animate-pulse">
            <MapPin className="w-16 h-16 text-primary-600 dark:text-primary-400" />
          </div>
          
          {/* Círculo de carga giratorio */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600 dark:border-t-primary-400 animate-spin"></div>
        </div>

        {/* Texto de carga */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Cargando mapa...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Preparando tu experiencia de navegación
          </p>
          
          {/* Indicador de progreso animado */}
          <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Mensaje adicional */}
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-500">
          <p>Descubriendo los mejores lugares de La Habana...</p>
        </div>
      </div>
    </div>
  );
}
