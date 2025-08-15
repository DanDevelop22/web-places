import * as Yup from 'yup';

// Esquema de validación para login
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de email inválido')
    .required('El email es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida')
});

// Esquema de validación para restaurantes
export const RestaurantSchema = Yup.object().shape({
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
export const MenuItemSchema = Yup.object().shape({
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

// Esquema de validación para reseñas
export const ReviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, 'La calificación debe ser al menos 1')
    .max(5, 'La calificación no puede exceder 5')
    .required('La calificación es requerida'),
  comment: Yup.string()
    .min(10, 'El comentario debe tener al menos 10 caracteres')
    .max(500, 'El comentario no puede exceder 500 caracteres')
    .required('El comentario es requerido')
});

// Esquema de validación para búsqueda
export const SearchSchema = Yup.object().shape({
  query: Yup.string()
    .min(2, 'La búsqueda debe tener al menos 2 caracteres')
    .max(100, 'La búsqueda no puede exceder 100 caracteres')
});

// Esquema de validación para filtros
export const FilterSchema = Yup.object().shape({
  category: Yup.string()
    .oneOf(['all', 'restaurant', 'bar', 'concert'], 'Categoría inválida'),
  rating: Yup.number()
    .min(1, 'Rating mínimo es 1')
    .max(5, 'Rating máximo es 5'),
  priceRange: Yup.object().shape({
    min: Yup.number().min(0, 'Precio mínimo no puede ser negativo'),
    max: Yup.number().min(0, 'Precio máximo no puede ser negativo')
  })
});
