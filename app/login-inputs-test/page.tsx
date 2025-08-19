'use client';

import React from 'react';
import { AuthContainer } from '@/components/auth/AuthContainer';
import { AuthProvider } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import Button from '@/components/atoms/Button';

export default function LoginInputsTestPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-brand-dark-50 dark:bg-brand-dark-900 transition-colors duration-300">
      <AuthProvider>
        {/* Header con toggle de modo oscuro */}
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={toggleDarkMode}
            variant="secondary"
            className="flex items-center gap-2"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4" />
                Modo Claro
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                Modo Oscuro
              </>
            )}
          </Button>
        </div>

        {/* Información de debug */}
        <div className="fixed top-4 left-4 z-50 card-brand p-4 max-w-sm">
          <h3 className="font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-2">
            Inputs Test
          </h3>
          <div className="text-sm space-y-1 text-brand-dark-600 dark:text-brand-dark-300">
            <p>Modo: {isDarkMode ? 'Oscuro' : 'Claro'}</p>
            <p>Fondo input: {isDarkMode ? 'brand-dark-700' : 'white'}</p>
            <p>Texto: {isDarkMode ? 'white' : 'gray-900'}</p>
          </div>
        </div>

        <AuthContainer 
          onAuthSuccess={() => console.log('Login exitoso')}
          defaultMode="login"
        />
      </AuthProvider>
    </div>
  );
}
