'use client';

import React, { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { AuthContainer } from '@/components/auth/AuthContainer';
import { AuthProvider } from '@/contexts/AuthContext';

export default function ForceDarkPage() {
  const { setDarkMode } = useTheme();

  useEffect(() => {
    // Forzar modo oscuro
    setDarkMode(true);
    document.documentElement.classList.add('dark');
  }, [setDarkMode]);

  return (
    <div className="min-h-screen bg-brand-dark-50 dark:bg-brand-dark-900 transition-colors duration-300">
      <AuthProvider>
        <div className="fixed top-4 left-4 z-50 text-white">
          <h1 className="text-gradient text-2xl font-bold">
            DóndeTú - Forzar Oscuro
          </h1>
          <p className="text-brand-dark-300 text-sm">
            Modo oscuro forzado
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
