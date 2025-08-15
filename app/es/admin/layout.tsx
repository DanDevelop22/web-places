import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, Settings, Users, MapPin, Utensils, BarChart3, Calendar, Moon, Sun, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from '@/contexts/ThemeContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navItems = [
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
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:static lg:inset-0'
      )}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => router.push(item.href)}
                    className={clsx(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
                      item.active
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Panel de Administración
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              
              {/* User Menu */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
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
