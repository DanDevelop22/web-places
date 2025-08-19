'use client';

import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema, RegisterFormData } from '@/utils/authValidationSchemas';
import Button from '@/components/atoms/Button';
import FormField from '@/components/atoms/FormField';
import Logo from '@/components/atoms/Logo';
import { AppleIcon } from '@/components/atoms/AppleIcon';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const { registerWithEmail, loginWithGoogle, loginWithApple, loading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (values: RegisterFormData) => {
    try {
      clearError();
      await registerWithEmail(
        values.email,
        values.password,
        values.displayName,
        values.phoneNumber
      );
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

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card-brand p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo variant="primary" size="lg" />
          </div>
          <h2 className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-2">Crear Cuenta</h2>
          <p className="text-brand-dark-600 dark:text-brand-dark-300">Únete a nuestra comunidad</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-brand-error/10 dark:bg-brand-error/20 border border-brand-error/20 dark:border-brand-error/30 rounded-brand">
            <p className="text-brand-error text-sm">{error}</p>
          </div>
        )}

        <Formik
          initialValues={{
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            acceptTerms: false,
          }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <FormField
                  label="Nombre completo"
                  name="displayName"
                  type="text"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

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
                      className="text-brand-dark-400 hover:text-brand-dark-600 dark:text-brand-dark-500 dark:hover:text-brand-dark-300"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  }
                />
              </div>

              <div>
                <FormField
                  label="Confirmar contraseña"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  endAdornment={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-brand-dark-400 hover:text-brand-dark-600 dark:text-brand-dark-500 dark:hover:text-brand-dark-300"
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  }
                />
              </div>

              <div>
                <FormField
                  label="Número de teléfono"
                  name="phoneNumber"
                  type="tel"
                  placeholder="+1234567890"
                  required
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={values.acceptTerms}
                    onChange={(e) => setFieldValue('acceptTerms', e.target.checked)}
                    className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-brand-dark-300 dark:border-brand-dark-600 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTerms" className="text-brand-dark-700 dark:text-brand-dark-300">
                    Acepto los{' '}
                    <a href="#" className="text-brand-primary hover:text-brand-primary-dark dark:text-brand-primary-light">
                      términos y condiciones
                    </a>{' '}
                    y la{' '}
                    <a href="#" className="text-brand-primary hover:text-brand-primary-dark dark:text-brand-primary-light">
                      política de privacidad
                    </a>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || loading}
                className="w-full"
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brand-dark-200 dark:border-brand-dark-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="separator-text">O regístrate con</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              variant="secondary"
              className="flex items-center justify-center"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>

            <Button
              type="button"
              onClick={handleAppleLogin}
              disabled={loading}
              variant="secondary"
              className="flex items-center justify-center"
            >
              <AppleIcon className="h-5 w-5 mr-2" />
              Apple
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
                      <p className="text-sm text-brand-dark-600 dark:text-brand-dark-300">
              ¿Ya tienes una cuenta?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-medium text-brand-primary hover:text-brand-primary-dark dark:text-brand-primary-light transition-colors"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
