'use client';

import React, { useState } from 'react';
import { AuthContainer } from '@/components/auth/AuthContainer';
import { AuthProvider } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Eye } from 'lucide-react';
import Button from '@/components/atoms/Button';

export default function LoginTestPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showDebug, setShowDebug] = useState(false);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <AuthProvider>
        {/* Header con controles */}
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <Button
            onClick={toggleDarkMode}
            variant="secondary"
            className="flex items-center gap-2"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4" />
                Claro
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                Oscuro
              </>
            )}
          </Button>
          
          <Button
            onClick={() => setShowDebug(!showDebug)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Debug
          </Button>
        </div>

        {/* Información de debug */}
        {showDebug && (
          <div className="fixed top-4 left-4 z-50 card-brand p-4 max-w-sm">
            <h3 className="font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-2">
              Debug Info
            </h3>
            <div className="text-sm space-y-1 text-brand-dark-600 dark:text-brand-dark-300">
              <p>Modo: {isDarkMode ? 'Oscuro' : 'Claro'}</p>
              <p>Clase: {isDarkMode ? 'dark' : 'light'}</p>
              <p>Fondo: {isDarkMode ? 'brand-dark-900' : 'brand-dark-50'}</p>
              <p>Card: {isDarkMode ? 'brand-dark-800' : 'white'}</p>
            </div>
          </div>
        )}

        {/* Título de demostración */}
        <div className="absolute top-4 left-4 z-40">
          <h1 className="text-gradient text-2xl font-bold">
            DóndeTú - Test Login
          </h1>
          <p className="text-brand-dark-600 dark:text-brand-dark-300 text-sm">
            Prueba del modo oscuro
          </p>
        </div>

        <AuthContainer 
          onAuthSuccess={() => console.log('Login exitoso')}
          defaultMode="login"
        />
      </AuthProvider>
    </div>
  );
}
