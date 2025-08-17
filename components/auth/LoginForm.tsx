'use client';

import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, LoginFormData } from '@/utils/authValidationSchemas';
import Button from '@/components/atoms/Button';
import FormField from '@/components/atoms/FormField';
import { AppleIcon } from '@/components/atoms/AppleIcon';
import { diagnoseAppleSignIn } from '@/services/auth';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const { loginWithEmail, loginWithGoogle, loginWithApple, loading, error, clearError, user, checkUserInFirestore, hasRole, checkEmailExists } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: LoginFormData) => {
    try {
      clearError();
      await loginWithEmail(values.email, values.password);
    } catch (error) {
      // El error ya se maneja en el hook
    }
  };

  const handleGoogleLogin = async () => {
    try {
      clearError();
      await loginWithGoogle();
    } catch (error) {
      // El error ya se maneja en el hook
    }
  };

  const handleAppleLogin = async () => {
    try {
      clearError();
      await loginWithApple();
    } catch (error) {
      // El error ya se maneja en el hook
    }
  };

  const handleDiagnoseApple = async () => {
    try {
      console.log('Ejecutando diagnóstico de Apple Sign-In...');
      await diagnoseAppleSignIn();
    } catch (error) {
      console.error('Error en diagnóstico:', error);
    }
  };

  const handleCheckUserInFirestore = async () => {
    try {
      if (user) {
        console.log('Verificando usuario actual en Firestore...');
        await checkUserInFirestore(user.uid);
      } else {
        console.log('No hay usuario autenticado');
      }
    } catch (error) {
      console.error('Error al verificar usuario en Firestore:', error);
    }
  };

  const handleCheckUserRoles = async () => {
    try {
      if (user) {
        console.log('Verificando roles del usuario...');
        const isUser = await hasRole(user.uid, 'user');
        const isAdmin = await hasRole(user.uid, 'admin');
        console.log('Rol "user":', isUser);
        console.log('Rol "admin":', isAdmin);
      } else {
        console.log('No hay usuario autenticado');
      }
    } catch (error) {
      console.error('Error al verificar roles:', error);
    }
  };

  const handleCheckEmailExists = async () => {
    try {
      if (user && user.email) {
        console.log('Verificando si el email existe en Firestore...');
        const emailExists = await checkEmailExists(user.email);
        console.log('Email existe en Firestore:', emailExists);
        console.log('Email verificado:', user.email);
      } else {
        console.log('No hay usuario autenticado o no tiene email');
      }
    } catch (error) {
      console.error('Error al verificar email:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
          <p className="text-gray-600">Accede a tu cuenta</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <FormField
                  label="Contraseña"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  endAdornment={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  }
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O continúa con</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </Button>

            <Button
              type="button"
              onClick={handleAppleLogin}
              disabled={loading}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <AppleIcon />
            </Button>
          </div>
        </div>

        {/* Botón temporal de diagnóstico - ELIMINAR DESPUÉS */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleDiagnoseApple}
            className="text-xs text-gray-500 hover:text-gray-700 underline mr-4"
          >
            🔧 Diagnosticar Apple Sign-In (temporal)
          </button>
          <button
            type="button"
            onClick={handleCheckUserInFirestore}
            className="text-xs text-gray-500 hover:text-gray-700 underline mr-4"
          >
            🔍 Verificar usuario en Firestore (temporal)
          </button>
          <button
            type="button"
            onClick={handleCheckUserRoles}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            👤 Verificar roles (temporal)
          </button>
          <button
            type="button"
            onClick={handleCheckEmailExists}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            ✉️ Verificar email (temporal)
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
