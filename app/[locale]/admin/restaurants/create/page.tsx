'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Upload, X, Plus, Clock, Phone, Mail, Globe, Utensils } from 'lucide-react';
import { clsx } from 'clsx';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Configuración de Mapbox
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

// Esquema de validación
const RestaurantSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .required('El nombre es requerido'),
  category: Yup.string()
    .oneOf(['restaurant', 'bar', 'concert'], 'Categoría inválida')
    .required('La categoría es requerida'),
  description: Yup.string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .required('La descripción es requerida'),
  address: Yup.string()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .required('La dirección es requerida'),
  phone: Yup.string()
    .matches(/^[\+]?[0-9\s\-\(\)]+$/, 'Formato de teléfono inválido'),
  email: Yup.string()
    .email('Formato de email inválido'),
  website: Yup.string()
    .url('Formato de URL inválido'),
  hours: Yup.object().shape({
    monday: Yup.string(),
    tuesday: Yup.string(),
    wednesday: Yup.string(),
    thursday: Yup.string(),
    friday: Yup.string(),
    saturday: Yup.string(),
    sunday: Yup.string()
  }),
  socialMedia: Yup.object().shape({
    facebook: Yup.string().url('Formato de URL inválido'),
    instagram: Yup.string().url('Formato de URL inválido'),
    twitter: Yup.string().url('Formato de URL inválido'),
    youtube: Yup.string().url('Formato de URL inválido'),
    tiktok: Yup.string().url('Formato de URL inválido'),
    website: Yup.string().url('Formato de URL inválido'),
    phone: Yup.string(),
    email: Yup.string().email('Formato de email inválido')
  })
});

// Esquema de validación para elementos del menú
const MenuItemSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre del plato debe tener al menos 2 caracteres')
    .required('El nombre del plato es requerido'),
  description: Yup.string()
    .min(5, 'La descripción debe tener al menos 5 caracteres')
    .required('La descripción es requerida'),
  price: Yup.number()
    .min(0, 'El precio no puede ser negativo')
    .required('El precio es requerido')
});

export default function CreateRestaurantPage() {
  const router = useRouter();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  const [menuItems, setMenuItems] = useState<Array<{
    name: string;
    description: string;
    price: number;
  }>>([]);

  const [photos, setPhotos] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Valores iniciales del formulario
  const initialValues = {
    name: '',
    category: 'restaurant',
    description: '',
    address: '',
    coordinates: { lat: 23.1136, lng: -82.3666 }, // Havana default
    phone: '',
    email: '',
    website: '',
    hours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
      tiktok: '',
      website: '',
      phone: '',
      email: ''
    }
  };

  // Inicializar mapa
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [initialValues.coordinates.lng, initialValues.coordinates.lat],
      zoom: 13
    });

    // Agregar controles
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }), 'top-right');

    // Crear marcador
    marker.current = new mapboxgl.Marker({ draggable: true })
      .setLngLat([initialValues.coordinates.lng, initialValues.coordinates.lat])
      .addTo(map.current);

    // Evento de arrastrar marcador
    marker.current.on('dragend', () => {
      const lngLat = marker.current?.getLngLat();
      if (lngLat) {
        // Actualizar coordenadas en el formulario
        console.log('Nuevas coordenadas:', { lat: lngLat.lat, lng: lngLat.lng });
      }
    });

    // Evento de clic en el mapa
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      marker.current?.setLngLat([lng, lat]);
      console.log('Nuevas coordenadas:', { lat, lng });
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotos(prev => [...prev, ...files]);
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const addMenuItem = () => {
    setMenuItems(prev => [...prev, { name: '', description: '', price: 0 }]);
  };

  const updateMenuItem = (index: number, field: string, value: string | number) => {
    setMenuItems(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const removeMenuItem = (index: number) => {
    setMenuItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values: any, { setSubmitting, setFieldError }: any) => {
    setIsLoading(true);

    try {
      // Validar elementos del menú
      for (let i = 0; i < menuItems.length; i++) {
        try {
          await MenuItemSchema.validate(menuItems[i]);
        } catch (error: any) {
          setFieldError(`menuItem_${i}`, error.message);
          setSubmitting(false);
          setIsLoading(false);
          return;
        }
      }

      // Aquí se implementará la lógica para guardar en Firebase
      console.log('Datos del restaurante:', {
        ...values,
        menu: menuItems,
        photos: photos.map(f => f.name)
      });

      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      router.push('/es/admin/restaurants');
    } catch (error) {
      console.error('Error al crear restaurante:', error);
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Crear Restaurante
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Añade un nuevo establecimiento a la plataforma
            </p>
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={RestaurantSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
          <Form className="space-y-8">
            {/* Información Básica */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Información Básica
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nombre del Restaurante *
                  </label>
                  <Field
                    name="name"
                    type="text"
                    className={clsx(
                      'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors',
                      errors.name && touched.name
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    )}
                    placeholder="Ej: La Bodeguita del Medio"
                  />
                  <ErrorMessage name="name" component="p" className="text-red-600 dark:text-red-400 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Categoría
                  </label>
                  <Field
                    name="category"
                    as="select"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  >
                    <option value="restaurant">Restaurante</option>
                    <option value="bar">Bar</option>
                    <option value="concert">Concierto/Evento</option>
                  </Field>
                  <ErrorMessage name="category" component="p" className="text-red-600 dark:text-red-400 text-sm mt-1" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Descripción *
                  </label>
                  <Field
                    name="description"
                    as="textarea"
                    rows={4}
                    className={clsx(
                      'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors',
                      errors.description && touched.description
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    )}
                    placeholder="Describe tu restaurante..."
                  />
                  <ErrorMessage name="description" component="p" className="text-red-600 dark:text-red-400 text-sm mt-1" />
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Ubicación
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Dirección *
                  </label>
                  <Field
                    name="address"
                    type="text"
                    className={clsx(
                      'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors',
                      errors.address && touched.address
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    )}
                    placeholder="Ej: Calle Empedrado 207, La Habana"
                  />
                  <ErrorMessage name="address" component="p" className="text-red-600 dark:text-red-400 text-sm mt-1" />
                  
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Coordenadas: {values.coordinates.lat.toFixed(6)}, {values.coordinates.lng.toFixed(6)}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Haz clic en el mapa o arrastra el marcador para seleccionar la ubicación exacta
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mapa
                  </label>
                  <div 
                    ref={mapContainer}
                    className="w-full h-64 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Contacto */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Información de Contacto
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Teléfono
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Field
                      name="phone"
                      type="tel"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                      placeholder="+53 7 8671374"
                    />
                  </div>
                  <ErrorMessage name="phone" component="p" className="text-red-600 dark:text-red-400 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Field
                      name="email"
                      type="email"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                      placeholder="info@restaurante.com"
                    />
                  </div>
                  <ErrorMessage name="email" component="p" className="text-red-600 dark:text-red-400 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sitio Web
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Field
                      name="website"
                      type="url"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                      placeholder="https://restaurante.com"
                    />
                  </div>
                  <ErrorMessage name="website" component="p" className="text-red-600 dark:text-red-400 text-sm mt-1" />
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Horarios de Apertura
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries({
                  monday: 'Lunes',
                  tuesday: 'Martes',
                  wednesday: 'Miércoles',
                  thursday: 'Jueves',
                  friday: 'Viernes',
                  saturday: 'Sábado',
                  sunday: 'Domingo'
                }).map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {label}
                    </label>
                    <Field
                      name={`hours.${key}`}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                      placeholder="9:00 - 22:00"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Redes Sociales
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries({
                  facebook: 'Facebook',
                  instagram: 'Instagram',
                  twitter: 'Twitter',
                  youtube: 'YouTube',
                  tiktok: 'TikTok'
                }).map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {label}
                    </label>
                    <Field
                      name={`socialMedia.${key}`}
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                      placeholder={`https://${key}.com/usuario`}
                    />
                    <ErrorMessage name={`socialMedia.${key}`} component="p" className="text-red-600 dark:text-red-400 text-sm mt-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Fotos */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Fotos del Restaurante
              </h2>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Arrastra las fotos aquí o haz clic para seleccionar
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    Seleccionar Fotos
                  </label>
                </div>

                {photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Menú */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Menú
                </h2>
                <button
                  type="button"
                  onClick={addMenuItem}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Añadir Plato
                </button>
              </div>
              
              <div className="space-y-4">
                {menuItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nombre del Plato
                      </label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateMenuItem(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                        placeholder="Ej: Ropa Vieja"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Descripción
                      </label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateMenuItem(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                        placeholder="Descripción del plato"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Precio (€)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={item.price}
                          onChange={(e) => updateMenuItem(index, 'price', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                          placeholder="0.00"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeMenuItem(index)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {menuItems.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Utensils className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No hay platos en el menú</p>
                    <p className="text-sm">Haz clic en "Añadir Plato" para comenzar</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className={clsx(
                  'px-6 py-3 bg-primary-600 text-white rounded-lg font-medium transition-colors',
                  (isSubmitting || isLoading)
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-primary-700'
                )}
              >
                {isSubmitting || isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Creando...
                  </div>
                ) : (
                  'Crear Restaurante'
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
