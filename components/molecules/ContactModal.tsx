'use client';

import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';
import Button from '@/components/atoms/Button';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Aquí se implementará el envío real del formulario
      // Por ahora simulamos el envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      
      // Resetear formulario después de 3 segundos
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error enviando mensaje:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contacto@mapadelugares.com',
      link: 'mailto:contacto@mapadelugares.com'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      value: '+53 7 123 4567',
      link: 'tel:+5371234567'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      value: 'La Habana, Cuba',
      link: null
    },
    {
      icon: Clock,
      title: 'Horario',
      value: 'Lun - Vie: 9:00 - 18:00',
      link: null
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-brand-dark-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white dark:bg-brand-dark-800 rounded-brand-xl shadow-brand-xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-brand-gradient p-6 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-brand transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-2">¡Únete a Nuestra Plataforma!</h2>
            <p className="text-white/90">
              ¿Quieres agregar tu restaurante o tienes preguntas? Estamos aquí para ayudarte a crecer.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Información de Contacto */}
            <div className="p-6 bg-brand-dark-50 dark:bg-brand-dark-700">
              <h3 className="text-lg font-semibold text-brand-dark-900 dark:text-brand-dark-100 mb-6">
                Información de Contacto
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-primary/10 dark:bg-brand-primary/30 rounded-brand flex items-center justify-center">
                        <Icon className="w-5 h-5 text-brand-primary dark:text-brand-primary-light" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-brand-dark-900 dark:text-brand-dark-100">
                          {info.title}
                        </p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-sm text-brand-primary dark:text-brand-primary-light hover:underline"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm text-brand-dark-600 dark:text-brand-dark-400">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Redes Sociales */}
              <div className="mt-8">
                <h4 className="text-sm font-medium text-brand-dark-900 dark:text-brand-dark-100 mb-3">
                  Síguenos en redes sociales
                </h4>
                <div className="flex gap-3">
                  {[
                    { name: 'Facebook', color: 'bg-brand-info' },
                    { name: 'Instagram', color: 'bg-brand-primary' },
                    { name: 'Twitter', color: 'bg-brand-secondary' },
                    { name: 'LinkedIn', color: 'bg-brand-accent' }
                  ].map((social, index) => (
                    <button
                      key={index}
                      className={clsx(
                        'w-10 h-10 rounded-brand text-white flex items-center justify-center transition-transform hover:scale-110 shadow-brand',
                        social.color
                      )}
                    >
                      <span className="text-sm font-medium">{social.name[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Rápida */}
              <div className="mt-8">
                <h4 className="text-sm font-medium text-brand-dark-900 dark:text-brand-dark-100 mb-3">
                  Preguntas Frecuentes
                </h4>
                <div className="space-y-2 text-sm text-brand-dark-600 dark:text-brand-dark-400">
                  <p>• ¿Cómo agregar mi restaurante?</p>
                  <p>• ¿Cuánto cuesta el servicio?</p>
                  <p>• ¿Ofrecen soporte técnico?</p>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark-700 dark:text-brand-dark-300 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input-brand"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-dark-700 dark:text-brand-dark-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input-brand"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-dark-700 dark:text-brand-dark-300 mb-2">
                      Asunto *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="input-brand"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="agregar-restaurante">Agregar mi restaurante</option>
                      <option value="informacion-servicios">Información sobre servicios</option>
                      <option value="soporte-tecnico">Soporte técnico</option>
                      <option value="partnership">Alianzas comerciales</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-dark-700 dark:text-brand-dark-300 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="input-brand resize-none"
                      placeholder="Cuéntanos más sobre tu consulta..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="brand-spinner"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Únete Ahora
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-brand-success/10 dark:bg-brand-success/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-brand-success" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-dark-900 dark:text-brand-dark-100 mb-2">
                    ¡Mensaje Enviado!
                  </h3>
                  <p className="text-brand-dark-600 dark:text-brand-dark-400">
                    Gracias por contactarnos. Te responderemos en las próximas 24 horas.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
