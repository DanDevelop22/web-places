'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import Button from '@/components/atoms/Button';

export default function TestThemePage() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-brand-dark-50 dark:bg-brand-dark-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-gradient text-4xl font-bold">
            DóndeTú - Test Theme
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
            <p><strong>Clase HTML:</strong> {isDarkMode ? 'dark' : 'light'}</p>
            <p><strong>Fondo:</strong> {isDarkMode ? 'brand-dark-900' : 'brand-dark-50'}</p>
            <p><strong>Card:</strong> {isDarkMode ? 'brand-dark-800' : 'white'}</p>
          </div>
        </div>

        {/* Elementos de prueba */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card de prueba */}
          <div className="card-brand p-6">
            <h3 className="text-xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-3">
              Card de Prueba
            </h3>
            <p className="text-brand-dark-600 dark:text-brand-dark-300 mb-4">
              Esta es una card que debería cambiar de color según el tema.
            </p>
            <Button variant="primary" className="mr-2">
              Botón Primario
            </Button>
            <Button variant="secondary">
              Botón Secundario
            </Button>
          </div>

          {/* Input de prueba */}
          <div className="card-brand p-6">
            <h3 className="text-xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-3">
              Input de Prueba
            </h3>
            <input
              type="text"
              placeholder="Escribe algo aquí..."
              className="input-brand mb-4"
            />
            <textarea
              placeholder="Área de texto..."
              rows={3}
              className="input-brand"
            />
          </div>
        </div>

        {/* Colores del brand */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
            Colores del Brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-brand mx-auto mb-2"></div>
              <p className="text-sm text-brand-dark-600 dark:text-brand-dark-300">Primary</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-secondary rounded-brand mx-auto mb-2"></div>
              <p className="text-sm text-brand-dark-600 dark:text-brand-dark-300">Secondary</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-accent rounded-brand mx-auto mb-2"></div>
              <p className="text-sm text-brand-dark-600 dark:text-brand-dark-300">Accent</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-gradient rounded-brand mx-auto mb-2"></div>
              <p className="text-sm text-brand-dark-600 dark:text-brand-dark-300">Gradient</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
