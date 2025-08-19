'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, RefreshCw } from 'lucide-react';
import Button from '@/components/atoms/Button';

export default function DebugThemePage() {
  const { isDarkMode, toggleDarkMode, setDarkMode } = useTheme();
  const [htmlClasses, setHtmlClasses] = useState<string>('');
  const [localStorageValue, setLocalStorageValue] = useState<string>('');

  useEffect(() => {
    // Actualizar información en tiempo real
    const updateInfo = () => {
      setHtmlClasses(document.documentElement.className);
      setLocalStorageValue(localStorage.getItem('darkMode') || 'null');
    };

    updateInfo();
    const interval = setInterval(updateInfo, 1000);
    return () => clearInterval(interval);
  }, []);

  const forceDark = () => {
    setDarkMode(true);
    document.documentElement.classList.add('dark');
  };

  const forceLight = () => {
    setDarkMode(false);
    document.documentElement.classList.remove('dark');
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-brand-dark-50 dark:bg-brand-dark-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-gradient text-4xl font-bold">
            DóndeTú - Debug Theme
          </h1>
          <div className="flex gap-2">
            <Button
              onClick={toggleDarkMode}
              variant="secondary"
              className="flex items-center gap-2"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4" />
                  Claro
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  Oscuro
                </>
              )}
            </Button>
            <Button
              onClick={refreshPage}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Información de diagnóstico */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Estado del contexto */}
          <div className="card-brand p-6">
            <h2 className="text-2xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
              Estado del Contexto
            </h2>
            <div className="space-y-2 text-brand-dark-600 dark:text-brand-dark-300">
              <p><strong>isDarkMode:</strong> {isDarkMode.toString()}</p>
              <p><strong>Tipo:</strong> {typeof isDarkMode}</p>
            </div>
          </div>

          {/* Estado del DOM */}
          <div className="card-brand p-6">
            <h2 className="text-2xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
              Estado del DOM
            </h2>
            <div className="space-y-2 text-brand-dark-600 dark:text-brand-dark-300">
              <p><strong>HTML Classes:</strong> <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{htmlClasses}</code></p>
              <p><strong>Tiene 'dark':</strong> {htmlClasses.includes('dark') ? 'Sí' : 'No'}</p>
            </div>
          </div>

          {/* LocalStorage */}
          <div className="card-brand p-6">
            <h2 className="text-2xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
              LocalStorage
            </h2>
            <div className="space-y-2 text-brand-dark-600 dark:text-brand-dark-300">
              <p><strong>darkMode:</strong> <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{localStorageValue}</code></p>
            </div>
          </div>

          {/* Controles de fuerza */}
          <div className="card-brand p-6">
            <h2 className="text-2xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
              Controles de Fuerza
            </h2>
            <div className="space-y-2">
              <Button
                onClick={forceDark}
                variant="primary"
                className="w-full"
              >
                Forzar Oscuro
              </Button>
              <Button
                onClick={forceLight}
                variant="secondary"
                className="w-full"
              >
                Forzar Claro
              </Button>
            </div>
          </div>
        </div>

        {/* Prueba visual */}
        <div className="card-brand p-6">
          <h2 className="text-2xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
            Prueba Visual
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-primary rounded-brand mx-auto mb-2"></div>
              <p className="text-sm text-brand-dark-600 dark:text-brand-dark-300">Primary</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-secondary rounded-brand mx-auto mb-2"></div>
              <p className="text-sm text-brand-dark-600 dark:text-brand-dark-300">Secondary</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-gradient rounded-brand mx-auto mb-2"></div>
              <p className="text-sm text-brand-dark-600 dark:text-brand-dark-300">Gradient</p>
            </div>
          </div>
          
          <div className="mt-6">
            <input
              type="text"
              placeholder="Input de prueba..."
              className="input-brand mb-4"
            />
            <textarea
              placeholder="Textarea de prueba..."
              rows={3}
              className="input-brand"
            />
          </div>
        </div>

        {/* Información del sistema */}
        <div className="card-brand p-6 mt-6">
          <h2 className="text-2xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
            Información del Sistema
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-brand-dark-600 dark:text-brand-dark-300">
            <div>
              <p><strong>User Agent:</strong></p>
              <p className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">{navigator.userAgent}</p>
            </div>
            <div>
              <p><strong>Ventana:</strong></p>
              <p>Ancho: {typeof window !== 'undefined' ? window.innerWidth : 'N/A'}</p>
              <p>Alto: {typeof window !== 'undefined' ? window.innerHeight : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
