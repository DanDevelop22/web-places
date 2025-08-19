'use client';

import React from 'react';
import { AuthContainer } from '@/components/auth/AuthContainer';
import { AuthProvider } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import Button from '@/components/atoms/Button';

export default function LoginDemoPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen transition-colors duration-300">
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

        {/* Título de demostración */}
        <div className="absolute top-4 left-4 z-50">
          <h1 className="text-gradient text-2xl font-bold">
            DóndeTú - Demo Login
          </h1>
          <p className="text-brand-dark-600 dark:text-brand-dark-300 text-sm">
            Demostración de estilos del brand
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
