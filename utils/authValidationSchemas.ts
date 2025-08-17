import * as yup from 'yup';

// Esquema para login con email y contraseña
export const loginSchema = yup.object({
  email: yup
    .string()
    .email('El email debe tener un formato válido')
    .required('El email es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
});

// Esquema para registro con email y contraseña
export const registerSchema = yup.object({
  displayName: yup
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .required('El nombre es requerido'),
  email: yup
    .string()
    .email('El email debe tener un formato válido')
    .required('El email es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'La contraseña debe contener al menos una letra mayúscula, una minúscula y un número'
    )
    .required('La contraseña es requerida'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
    .required('Confirma tu contraseña'),
  phoneNumber: yup
    .string()
    .matches(
      /^\+?[1-9]\d{1,14}$/,
      'El número de teléfono debe tener un formato válido (ej: +1234567890)'
    )
    .required('El número de teléfono es requerido'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'Debes aceptar los términos y condiciones')
    .required('Debes aceptar los términos y condiciones'),
});

// Esquema para recuperación de contraseña
export const resetPasswordSchema = yup.object({
  email: yup
    .string()
    .email('El email debe tener un formato válido')
    .required('El email es requerido'),
});

// Tipos para los esquemas
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;

