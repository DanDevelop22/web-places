'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import Button from '@/components/atoms/Button';
import FormField from '@/components/atoms/FormField';
import { Formik, Form } from 'formik';

export default function TestInputsPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-brand-dark-50 dark:bg-brand-dark-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-gradient text-4xl font-bold">
            DóndeTú - Test Inputs
          </h1>
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

        {/* Información del tema */}
        <div className="card-brand p-6 mb-6">
          <h2 className="text-2xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
            Estado del Tema
          </h2>
          <div className="space-y-2 text-brand-dark-600 dark:text-brand-dark-300">
            <p><strong>Modo actual:</strong> {isDarkMode ? 'Oscuro' : 'Claro'}</p>
            <p><strong>Fondo del input:</strong> {isDarkMode ? 'brand-dark-700' : 'white'}</p>
            <p><strong>Color del texto:</strong> {isDarkMode ? 'white' : 'gray-900'}</p>
          </div>
        </div>

        {/* Prueba de inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs básicos */}
          <div className="card-brand p-6">
            <h3 className="text-xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
              Inputs Básicos
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Input básico..."
                className="input-brand"
              />
              <input
                type="email"
                placeholder="email@ejemplo.com"
                className="input-brand"
              />
              <input
                type="password"
                placeholder="Contraseña..."
                className="input-brand"
              />
              <textarea
                placeholder="Área de texto..."
                rows={3}
                className="input-brand"
              />
            </div>
          </div>

          {/* Inputs con FormField */}
          <div className="card-brand p-6">
            <h3 className="text-xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
              Inputs con FormField
            </h3>
            <Formik
              initialValues={{
                nombre: '',
                email: '',
                mensaje: ''
              }}
              onSubmit={() => {}}
            >
              <Form className="space-y-4">
                <FormField
                  label="Nombre"
                  name="nombre"
                  placeholder="Tu nombre"
                  required
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                />
                <FormField
                  label="Mensaje"
                  name="mensaje"
                  as="textarea"
                  rows={3}
                  placeholder="Escribe tu mensaje..."
                />
              </Form>
            </Formik>
          </div>
        </div>

        {/* Comparación de fondos */}
        <div className="card-brand p-6 mt-6">
          <h3 className="text-xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
            Comparación de Fondos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-brand mx-auto mb-2 border border-gray-300"></div>
              <p className="text-sm text-brand-dark-600 dark:text-brand-dark-300">bg-white</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-dark-700 rounded-brand mx-auto mb-2 border border-brand-dark-600"></div>
              <p className="text-sm text-brand-dark-600 dark:text-brand-dark-300">bg-brand-dark-700</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-dark-800 rounded-brand mx-auto mb-2 border border-brand-dark-600"></div>
              <p className="text-sm text-brand-dark-600 dark:text-brand-dark-300">bg-brand-dark-800</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-dark-900 rounded-brand mx-auto mb-2 border border-brand-dark-600"></div>
              <p className="text-sm text-brand-dark-600 dark:text-brand-dark-300">bg-brand-dark-900</p>
            </div>
          </div>
        </div>

        {/* Prueba de contraste */}
        <div className="card-brand p-6 mt-6">
          <h3 className="text-xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
            Prueba de Contraste
          </h3>
          <div className="space-y-4">
            <div className="bg-brand-dark-700 p-4 rounded-brand">
              <p className="text-white">Texto blanco sobre brand-dark-700</p>
            </div>
            <div className="bg-brand-dark-800 p-4 rounded-brand">
              <p className="text-white">Texto blanco sobre brand-dark-800</p>
            </div>
            <div className="bg-brand-dark-900 p-4 rounded-brand">
              <p className="text-white">Texto blanco sobre brand-dark-900</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
