'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Home, ArrowLeft, Search } from 'lucide-react';
import Button from '@/components/atoms/Button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Icono y Número 404 */}
        <div className="mb-8">
          <div className="relative">
            {/* Icono de mapa de fondo */}
            <div className="w-32 h-32 mx-auto mb-4 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <MapPin className="w-16 h-16 text-primary-600 dark:text-primary-400" />
            </div>
            
            {/* Número 404 superpuesto */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
              404
            </div>
          </div>
        </div>

        {/* Título y Mensaje */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ¡Ups! Página no encontrada
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Parece que te has perdido en el mapa
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            La página que buscas no existe o ha sido movida
          </p>
        </div>

        {/* Ilustración */}
        <div className="mb-8">
          <div className="w-48 h-32 mx-auto bg-gradient-to-r from-primary-200 to-primary-300 dark:from-primary-800 dark:to-primary-700 rounded-lg relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full"></div>
            <div className="absolute top-8 right-6 w-6 h-6 bg-white/20 rounded-full"></div>
            <div className="absolute bottom-6 left-8 w-4 h-4 bg-white/20 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 rounded-full"></div>
            
            {/* Líneas que simulan calles */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/30"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/30"></div>
            
            {/* Marcador perdido */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push('/es')}
              variant="primary"
              size="lg"
              className="flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Ir al Mapa Principal
            </Button>
            
            <Button
              onClick={() => router.back()}
              variant="secondary"
              size="lg"
              className="flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver Atrás
            </Button>
          </div>
          
          <Button
            onClick={() => router.push('/es/login')}
            variant="ghost"
            size="md"
            className="flex items-center justify-center gap-2 mx-auto"
          >
            <Search className="w-4 h-4" />
            Acceder al Panel de Admin
          </Button>
        </div>

        {/* Información Adicional */}
        <div className="mt-12 p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            ¿Necesitas ayuda?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Si crees que esto es un error, puedes:
          </p>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-500">
            <p>• Verificar que la URL sea correcta</p>
            <p>• Usar el mapa principal para navegar</p>
            <p>• Contactar con soporte técnico</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © 2024 Mapa de Lugares - Descubre La Habana
          </p>
        </div>
      </div>
    </div>
  );
}
