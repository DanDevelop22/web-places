'use client';

import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import Button from '@/components/atoms/Button';
import Logo from '@/components/atoms/Logo';

interface ContactSectionProps {
  onContactClick: () => void;
}

export default function ContactSection({ onContactClick }: ContactSectionProps) {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contacto@mapadelugares.com',
      link: 'mailto:contacto@mapadelugares.com',
      description: 'Escríbenos para cualquier consulta'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      value: '+53 7 123 4567',
      link: 'tel:+5371234567',
      description: 'Llámanos de lunes a viernes'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      value: 'La Habana, Cuba',
      link: null,
      description: 'Servicio disponible en toda Cuba'
    },
    {
      icon: Clock,
      title: 'Horario',
      value: 'Lun - Vie: 9:00 - 18:00',
      link: null,
      description: 'Atención al cliente'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-brand-dark-50 to-brand-dark-100 dark:from-brand-dark-800 dark:to-brand-dark-900 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo variant="primary" size="lg" />
          </div>
          <h2 className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
            ¿Necesitas Ayuda?
          </h2>
          <p className="text-lg text-brand-dark-600 dark:text-brand-dark-400 max-w-2xl mx-auto">
            ¿Tienes preguntas sobre nuestros servicios o quieres agregar tu restaurante? 
            Nuestro equipo está aquí para ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div
                key={index}
                className="card-brand p-6 hover:shadow-brand-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/30 rounded-brand flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-primary dark:text-brand-primary-light" />
                </div>
                <h3 className="text-lg font-semibold text-brand-dark-900 dark:text-brand-dark-100 mb-2">
                  {info.title}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-brand-primary dark:text-brand-primary-light hover:underline font-medium"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-brand-dark-900 dark:text-brand-dark-100 font-medium">
                    {info.value}
                  </p>
                )}
                <p className="text-sm text-brand-dark-600 dark:text-brand-dark-400 mt-2">
                  {info.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="card-brand p-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-brand-primary/10 dark:bg-brand-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-brand-primary dark:text-brand-primary-light" />
            </div>
            <h3 className="text-xl font-semibold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
              ¿Quieres Agregar tu Restaurante?
            </h3>
            <p className="text-brand-dark-600 dark:text-brand-dark-400 mb-6">
              Únete a nuestra plataforma y conecta con miles de clientes. 
              Te ayudamos a crear tu perfil y gestionar tu presencia digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onContactClick}
                variant="primary"
                size="lg"
                className="flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Únete Ahora
              </Button>
              <Button
                onClick={() => window.open('/es/login', '_blank')}
                variant="secondary"
                size="lg"
                className="flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                Acceder al Panel
              </Button>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-brand-dark-900 dark:text-brand-dark-100 mb-2">
                Servicios Incluidos
              </h4>
              <ul className="text-sm text-brand-dark-600 dark:text-brand-dark-400 space-y-1">
                <li>• Perfil completo del restaurante</li>
                <li>• Menú digital interactivo</li>
                <li>• Sistema de reseñas</li>
                <li>• Estadísticas de visitas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-brand-dark-900 dark:text-brand-dark-100 mb-2">
                Soporte Técnico
              </h4>
              <ul className="text-sm text-brand-dark-600 dark:text-brand-dark-400 space-y-1">
                <li>• Configuración inicial</li>
                <li>• Capacitación del personal</li>
                <li>• Soporte 24/7</li>
                <li>• Actualizaciones gratuitas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-brand-dark-900 dark:text-brand-dark-100 mb-2">
                Beneficios
              </h4>
              <ul className="text-sm text-brand-dark-600 dark:text-brand-dark-400 space-y-1">
                <li>• Mayor visibilidad</li>
                <li>• Más clientes</li>
                <li>• Gestión simplificada</li>
                <li>• Análisis de datos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
