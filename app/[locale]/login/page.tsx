'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Utensils } from 'lucide-react';
import { clsx } from 'clsx';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Esquema de validación
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de email inválido')
    .required('El email es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida')
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const initialValues = {
    email: '',
    password: ''
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setIsLoading(true);
    setError('');

    try {
      // Aquí se implementará la autenticación con Firebase
      // Por ahora, simulamos un login exitoso
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular validación básica
      if (values.email === 'admin@example.com' && values.password === 'admin123') {
        router.push('/es/admin');
      } else {
        setError('Credenciales incorrectas. Usa admin@example.com / admin123');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Aquí se implementará el login con Google
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/es/admin');
    } catch (err) {
      setError('Error al iniciar sesión con Google.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4">
            <Utensils className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona tus restaurantes y menús
          </p>
        </div>

        {/* Formulario de Login */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className={clsx(
                        'block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors',
                        errors.email && touched.email
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                      )}
                      placeholder="tu@email.com"
                    />
                  </div>
                  <ErrorMessage name="email" component="p" className="text-red-600 dark:text-red-400 text-sm mt-1" />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      className={clsx(
                        'block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors',
                        errors.password && touched.password
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                      )}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="p" className="text-red-600 dark:text-red-400 text-sm mt-1" />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className={clsx(
                    'w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors',
                    (isSubmitting || isLoading) && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {isSubmitting || isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      Iniciar Sesión
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  O continúa con
                </span>
              </div>
            </div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className={clsx(
              'w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors',
              isLoading && 'opacity-50 cursor-not-allowed'
            )}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <strong>Credenciales de Demo:</strong>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Email: admin@example.com<br />
              Password: admin123
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes una cuenta?{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
              Contacta con soporte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
