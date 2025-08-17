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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-green-600 text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Bienvenido!</h2>
          <p className="text-gray-600">Has iniciado sesión correctamente</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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

