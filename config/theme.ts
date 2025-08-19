/**
 * Configuración de tema para DóndeTú
 * 
 * Este archivo centraliza toda la configuración de colores y estilos
 * para facilitar cambios futuros en la identidad visual.
 */

export const themeConfig = {
  // Colores principales del brand (basados en el logo)
  colors: {
    // Gradiente principal del logo
    primary: '#FF006E', // Magenta vibrante
    secondary: '#FF6B35', // Naranja coral
    accent: '#FF8E53', // Naranja más claro
    
    // Variaciones del gradiente
    primaryLight: '#FF4D8A',
    primaryDark: '#CC0057',
    secondaryLight: '#FF8A5C',
    secondaryDark: '#E55A2B',
    
    // Colores neutros (fondo oscuro del logo)
    dark: {
      50: '#F8F9FA',
      100: '#E9ECEF',
      200: '#DEE2E6',
      300: '#CED4DA',
      400: '#ADB5BD',
      500: '#6C757D',
      600: '#495057',
      700: '#343A40',
      800: '#212529',
      900: '#1A1D20', // Fondo oscuro del logo
    },
    
    // Colores de estado
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Colores de texto
    text: {
      primary: '#1A1D20',
      secondary: '#6C757D',
      light: '#F8F9FA',
      dark: '#1A1D20',
    },
  },
  
  // Gradientes
  gradients: {
    primary: 'linear-gradient(135deg, #FF006E 0%, #FF6B35 100%)',
    horizontal: 'linear-gradient(90deg, #FF006E 0%, #FF6B35 100%)',
    vertical: 'linear-gradient(180deg, #FF006E 0%, #FF6B35 100%)',
    radial: 'radial-gradient(circle, #FF006E 0%, #FF6B35 100%)',
  },
  
  // Sombras
  shadows: {
    brand: '0 4px 14px 0 rgba(255, 0, 110, 0.25)',
    brandLg: '0 10px 25px 0 rgba(255, 0, 110, 0.3)',
    brandXl: '0 20px 40px 0 rgba(255, 0, 110, 0.35)',
    brandGlow: '0 0 20px rgba(255, 0, 110, 0.5)',
  },
  
  // Tipografía
  typography: {
    fontFamily: {
      brand: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Poppins', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
  
  // Bordes redondeados
  borderRadius: {
    brand: '12px',
    brandLg: '16px',
    brandXl: '20px',
  },
  
  // Espaciado
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  // Animaciones
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Configuración específica de componentes
  components: {
    button: {
      primary: {
        background: 'linear-gradient(135deg, #FF006E 0%, #FF6B35 100%)',
        color: '#FFFFFF',
        padding: '12px 24px',
        borderRadius: '12px',
        fontWeight: '600',
        shadow: '0 4px 14px 0 rgba(255, 0, 110, 0.25)',
      },
      secondary: {
        background: 'transparent',
        color: '#FF006E',
        border: '2px solid #FF006E',
        padding: '12px 24px',
        borderRadius: '12px',
        fontWeight: '600',
      },
    },
    card: {
      background: '#FFFFFF',
      borderRadius: '16px',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #E5E7EB',
    },
    input: {
      background: '#FFFFFF',
      border: '1px solid #D1D5DB',
      borderRadius: '12px',
      padding: '12px 16px',
      focusRing: '2px solid #FF006E',
    },
  },
};

// Función helper para obtener colores con opacidad
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convertir hex a rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Función helper para generar variaciones de color
export const generateColorVariations = (baseColor: string) => {
  return {
    light: getColorWithOpacity(baseColor, 0.8),
    dark: getColorWithOpacity(baseColor, 0.6),
    transparent: getColorWithOpacity(baseColor, 0.1),
  };
};

// Configuración para modo oscuro
export const darkThemeConfig = {
  ...themeConfig,
  colors: {
    ...themeConfig.colors,
    text: {
      primary: '#F8F9FA',
      secondary: '#ADB5BD',
      light: '#F8F9FA',
      dark: '#1A1D20',
    },
  },
  components: {
    ...themeConfig.components,
    card: {
      background: '#1A1D20',
      borderRadius: '16px',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
      border: '1px solid #343A40',
    },
    input: {
      background: '#212529',
      border: '1px solid #495057',
      borderRadius: '12px',
      padding: '12px 16px',
      focusRing: '2px solid #FF006E',
    },
  },
};

export default themeConfig;
