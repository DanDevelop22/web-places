'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

type AuthMode = 'login' | 'register';

interface AuthContainerProps {
  onAuthSuccess?: () => void;
  defaultMode?: AuthMode;
}

export const AuthContainer = ({ onAuthSuccess, defaultMode = 'login' }: AuthContainerProps) => {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && onAuthSuccess) {
      onAuthSuccess();
    }
  }, [user, onAuthSuccess]);

  const switchToLogin = () => setMode('login');
  const switchToRegister = () => setMode('register');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark-50 dark:bg-brand-dark-900">
        <div className="text-center">
          <div className="brand-spinner mx-auto"></div>
          <p className="mt-4 text-brand-dark-600 dark:text-brand-dark-300">Cargando...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark-50 dark:bg-brand-dark-900">
        <div className="text-center">
          <div className="text-brand-success text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-2">¡Bienvenido!</h2>
          <p className="text-brand-dark-600 dark:text-brand-dark-300">Has iniciado sesión correctamente</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark-50 dark:bg-brand-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {mode === 'login' && (
          <LoginForm 
            onSwitchToRegister={switchToRegister}
          />
        )}
        
        {mode === 'register' && (
          <RegisterForm 
            onSwitchToLogin={switchToLogin}
          />
        )}
      </div>
    </div>
  );
};

