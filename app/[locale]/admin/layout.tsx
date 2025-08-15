'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, Settings, Users, MapPin, Utensils, BarChart3, Calendar } from 'lucide-react';
import { clsx } from 'clsx';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: 'https://via.placeholder.com/40'
  });

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

  const handleLogout = () => {
    // Aquí se implementará la lógica de logout con Firebase
    router.push('/es/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={clsx(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Admin Panel
              </h1>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {currentUser.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentUser.email}
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
                        'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors',
                        item.active
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
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
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
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
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
