'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Utensils, Star, Users, ArrowRight, Play, MessageCircle } from 'lucide-react';
import Button from '@/components/atoms/Button';
import ContactSection from '@/components/molecules/ContactSection';
import ContactModal from '@/components/molecules/ContactModal';
import Logo from '@/components/atoms/Logo';

export default function LandingPage() {
  const router = useRouter();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const features = [
    {
      icon: MapPin,
      title: 'Mapa Interactivo',
      description: 'Explora restaurantes, bares y eventos en La Habana con nuestro mapa interactivo'
    },
    {
      icon: Utensils,
      title: 'Menús Digitales',
      description: 'Accede a menús completos con fotos, precios y descripciones detalladas'
    },
    {
      icon: Star,
      title: 'Reseñas Auténticas',
      description: 'Lee y escribe reseñas reales de otros usuarios de la comunidad'
    },
    {
      icon: Users,
      title: 'Comunidad Activa',
      description: 'Conecta con otros amantes de la gastronomía cubana'
    }
  ];

  const stats = [
    { number: '50+', label: 'Restaurantes' },
    { number: '1000+', label: 'Reseñas' },
    { number: '10k+', label: 'Usuarios' },
    { number: '24/7', label: 'Soporte' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo variant="primary" size="md" />
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsContactModalOpen(true)}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Únete Ahora
              </Button>
              <Button
                onClick={() => router.push('/es')}
                variant="primary"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                Explorar Mapa
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <Logo variant="primary" size="xl" className="logo-glow" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Descubre La Habana
            <span className="text-primary-600 dark:text-primary-400"> Gastronómica</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Explora los mejores restaurantes, bares y eventos de La Habana. 
            Encuentra lugares auténticos, lee reseñas reales y planifica tu próxima aventura culinaria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push('/es')}
              variant="primary"
              size="lg"
              className="flex items-center justify-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Explorar Mapa
            </Button>
            <Button
              onClick={() => setIsContactModalOpen(true)}
              variant="secondary"
              size="lg"
              className="flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Únete Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Todo lo que necesitas para explorar La Habana
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Una plataforma completa para descubrir y disfrutar de la gastronomía cubana
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para explorar?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya están descubriendo los mejores lugares de La Habana
          </p>
          <Button
            onClick={() => router.push('/es')}
            variant="secondary"
            size="lg"
            className="flex items-center justify-center gap-2 mx-auto"
          >
            <MapPin className="w-5 h-5" />
            Comenzar Ahora
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection onContactClick={() => setIsContactModalOpen(true)} />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">Mapa de Lugares</h3>
              </div>
              <p className="text-gray-400">
                Descubre los mejores lugares de La Habana con nuestra plataforma interactiva.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Explorar Mapa</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Restaurantes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Eventos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reseñas</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresas</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Agregar Restaurante</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Panel de Admin</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Soporte</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contacto@mapadelugares.com</li>
                <li>+53 7 123 4567</li>
                <li>La Habana, Cuba</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mapa de Lugares. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
