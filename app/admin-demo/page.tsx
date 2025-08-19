'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import Button from '@/components/atoms/Button';

export default function AdminDemoPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-brand-dark-50 dark:bg-brand-dark-900 transition-colors duration-300">
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
          DóndeTú - Admin Demo
        </h1>
        <p className="text-brand-dark-600 dark:text-brand-dark-300 text-sm">
          Demostración del panel de administración
        </p>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100">
                Dashboard
              </h1>
              <p className="text-brand-dark-600 dark:text-brand-dark-400 mt-1">
                Bienvenido al panel de administración de DóndeTú
              </p>
            </div>
            <Button variant="primary" className="flex items-center gap-2">
              Crear Restaurante
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-brand p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-dark-600 dark:text-brand-dark-400">
                    Total Restaurantes
                  </p>
                  <p className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100">
                    3
                  </p>
                </div>
                <div className="w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-brand flex items-center justify-center">
                  <span className="text-brand-primary text-xl">🍽️</span>
                </div>
              </div>
            </div>

            <div className="card-brand p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-dark-600 dark:text-brand-dark-400">
                    Total Reseñas
                  </p>
                  <p className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100">
                    24
                  </p>
                </div>
                <div className="w-12 h-12 bg-brand-success/10 dark:bg-brand-success/20 rounded-brand flex items-center justify-center">
                  <span className="text-brand-success text-xl">⭐</span>
                </div>
              </div>
            </div>

            <div className="card-brand p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-dark-600 dark:text-brand-dark-400">
                    Rating Promedio
                  </p>
                  <p className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100">
                    4.2
                  </p>
                </div>
                <div className="w-12 h-12 bg-brand-warning/10 dark:bg-brand-warning/20 rounded-brand flex items-center justify-center">
                  <span className="text-brand-warning text-xl">🌟</span>
                </div>
              </div>
            </div>

            <div className="card-brand p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-dark-600 dark:text-brand-dark-400">
                    Visitas Mensuales
                  </p>
                  <p className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100">
                    1,250
                  </p>
                </div>
                <div className="w-12 h-12 bg-brand-info/10 dark:bg-brand-info/20 rounded-brand flex items-center justify-center">
                  <span className="text-brand-info text-xl">📈</span>
                </div>
              </div>
            </div>
          </div>

          {/* Acciones Rápidas */}
          <div className="card-brand p-6">
            <h2 className="text-lg font-semibold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
              Acciones Rápidas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center gap-3 p-4 bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 dark:border-brand-primary/30 rounded-brand hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 transition-all duration-200">
                <span className="text-brand-primary text-xl">➕</span>
                <div className="text-left">
                  <p className="font-medium text-brand-primary dark:text-brand-primary-light">
                    Crear Restaurante
                  </p>
                  <p className="text-sm text-brand-primary/70 dark:text-brand-primary/80">
                    Añadir nuevo establecimiento
                  </p>
                </div>
              </button>
              
              <button className="flex items-center gap-3 p-4 bg-brand-success/5 dark:bg-brand-success/10 border border-brand-success/20 dark:border-brand-success/30 rounded-brand hover:bg-brand-success/10 dark:hover:bg-brand-success/20 transition-all duration-200">
                <span className="text-brand-success text-xl">✏️</span>
                <div className="text-left">
                  <p className="font-medium text-brand-success dark:text-brand-success">
                    Editar Menús
                  </p>
                  <p className="text-sm text-brand-success/70 dark:text-brand-success/80">
                    Actualizar cartas y platos
                  </p>
                </div>
              </button>
              
              <button className="flex items-center gap-3 p-4 bg-brand-info/5 dark:bg-brand-info/10 border border-brand-info/20 dark:border-brand-info/30 rounded-brand hover:bg-brand-info/10 dark:hover:bg-brand-info/20 transition-all duration-200">
                <span className="text-brand-info text-xl">👥</span>
                <div className="text-left">
                  <p className="font-medium text-brand-info dark:text-brand-info">
                    Gestionar Reseñas
                  </p>
                  <p className="text-sm text-brand-info/70 dark:text-brand-info/80">
                    Ver y responder comentarios
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Información del tema */}
          <div className="card-brand p-6">
            <h2 className="text-lg font-semibold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
              Información del Tema
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-brand-dark-600 dark:text-brand-dark-400">Modo:</p>
                <p className="font-medium text-brand-dark-900 dark:text-brand-dark-100">
                  {isDarkMode ? 'Oscuro' : 'Claro'}
                </p>
              </div>
              <div>
                <p className="text-brand-dark-600 dark:text-brand-dark-400">Fondo:</p>
                <p className="font-medium text-brand-dark-900 dark:text-brand-dark-100">
                  {isDarkMode ? 'brand-dark-900' : 'brand-dark-50'}
                </p>
              </div>
              <div>
                <p className="text-brand-dark-600 dark:text-brand-dark-400">Card:</p>
                <p className="font-medium text-brand-dark-900 dark:text-brand-dark-100">
                  {isDarkMode ? 'brand-dark-800' : 'white'}
                </p>
              </div>
              <div>
                <p className="text-brand-dark-600 dark:text-brand-dark-400">Texto:</p>
                <p className="font-medium text-brand-dark-900 dark:text-brand-dark-100">
                  {isDarkMode ? 'brand-dark-100' : 'brand-dark-900'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
