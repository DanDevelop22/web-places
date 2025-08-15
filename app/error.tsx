'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from 'lucide-react';
import Button from '@/components/atoms/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Icono de Error */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-16 h-16 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Título y Mensaje */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ¡Algo salió mal!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Ha ocurrido un error inesperado
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            Nuestro equipo ha sido notificado del problema
          </p>
        </div>

        {/* Detalles del Error (solo en desarrollo) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
              Detalles del Error:
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300 font-mono">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Ilustración */}
        <div className="mb-8">
          <div className="w-48 h-32 mx-auto bg-gradient-to-r from-red-200 to-red-300 dark:from-red-800 dark:to-red-700 rounded-lg relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-6 w-6 h-6 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-6 left-8 w-4 h-4 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            
            {/* Líneas que simulan calles rotas */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/30">
              <div className="w-1/3 h-full bg-red-400/50"></div>
            </div>
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/30">
              <div className="h-1/3 w-full bg-red-400/50"></div>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={reset}
              variant="primary"
              size="lg"
              className="flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Intentar de Nuevo
            </Button>
            
            <Button
              onClick={() => router.push('/es')}
              variant="secondary"
              size="lg"
              className="flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Ir al Inicio
            </Button>
          </div>
          
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="md"
            className="flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver Atrás
          </Button>
        </div>

        {/* Información Adicional */}
        <div className="mt-12 p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            ¿El problema persiste?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Si el error continúa, puedes:
          </p>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-500">
            <p>• Recargar la página</p>
            <p>• Limpiar el caché del navegador</p>
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
