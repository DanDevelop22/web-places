'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, Settings, Users, MapPin, Utensils, BarChart3, Calendar, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuthContext } from '@/contexts/AuthContext';
import Logo from '@/components/atoms/Logo';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthContext();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const menuItems = [
    {
      name: 'Dashboard',
      icon: BarChart3,
      href: '/es/admin',
      active: pathname === '/es/admin'
    },
    {
      name: 'Mis Restaurantes',
      icon: Utensils,
      href: '/es/admin/restaurants',
      active: pathname === '/es/admin/restaurants'
    },
    {
      name: 'Crear Restaurante',
      icon: MapPin,
      href: '/es/admin/restaurants/create',
      active: pathname === '/es/admin/restaurants/create'
    },
    {
      name: 'Reseñas',
      icon: Users,
      href: '/es/admin/reviews',
      active: pathname === '/es/admin/reviews'
    },
    {
      name: 'Configuración',
      icon: Settings,
      href: '/es/admin/settings',
      active: pathname === '/es/admin/settings'
    }
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.push('/es/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Aún redirigir al login en caso de error
      router.push('/es/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark-50 dark:bg-brand-dark-900">
      {/* Sidebar */}
      <div className={clsx(
        'fixed inset-y-0 left-0 z-50 w-64 card-brand shadow-brand-xl transform transition-transform duration-300 ease-in-out',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-brand-dark-200 dark:border-brand-dark-700">
            <div className="flex items-center gap-3">
              <Logo variant="primary" size="sm" type="full" />
              <h1 className="text-xl font-bold text-brand-dark-900 dark:text-brand-dark-100">
               Admin
              </h1>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-brand-dark-100 dark:hover:bg-brand-dark-700 rounded-brand transition-colors"
            >
              <X className="w-5 h-5 text-brand-dark-600 dark:text-brand-dark-400" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-brand-dark-200 dark:border-brand-dark-700">
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL || 'https://via.placeholder.com/40'}
                alt={user?.displayName || 'Usuario'}
                className="w-10 h-10 rounded-full border-2 border-brand-primary"
              />
              <div>
                <p className="font-medium text-brand-dark-900 dark:text-brand-dark-100">
                  {user?.displayName || 'Usuario'}
                </p>
                <p className="text-sm text-brand-dark-500 dark:text-brand-dark-400">
                  {user?.email || 'usuario@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={clsx(
                        'flex items-center gap-3 px-4 py-3 rounded-brand font-medium transition-all duration-200',
                        item.active
                          ? 'bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary border border-brand-primary/20'
                          : 'text-brand-dark-700 dark:text-brand-dark-300 hover:bg-brand-dark-100 dark:hover:bg-brand-dark-700 hover:text-brand-primary'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-6 border-t border-brand-dark-200 dark:border-brand-dark-700">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-3 w-full px-4 py-3 text-brand-dark-700 dark:text-brand-dark-300 hover:bg-brand-error/10 dark:hover:bg-brand-error/20 hover:text-brand-error rounded-brand font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="w-5 h-5" />
              {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={clsx(
        'transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
      )}>
        {/* Top Bar */}
        <div className="card-brand shadow-sm border-b border-brand-dark-200 dark:border-brand-dark-700">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-brand-dark-100 dark:hover:bg-brand-dark-700 rounded-brand transition-colors"
            >
              <Menu className="w-5 h-5 text-brand-dark-600 dark:text-brand-dark-400" />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-brand-dark-500 dark:text-brand-dark-400">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('es-ES')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
