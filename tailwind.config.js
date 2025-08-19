/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta principal basada en el logo de DóndeTú
        brand: {
          // Gradiente principal del logo (magenta a naranja)
          primary: '#FF006E', // Magenta vibrante
          secondary: '#FF6B35', // Naranja coral
          accent: '#FF8E53', // Naranja más claro
          
          // Variaciones del gradiente
          'primary-light': '#FF4D8A',
          'primary-dark': '#CC0057',
          'secondary-light': '#FF8A5C',
          'secondary-dark': '#E55A2B',
          
          // Colores neutros para el fondo oscuro del logo
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
          
          // Colores de acento complementarios
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
        
        // Mantener compatibilidad con colores existentes
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      
      // Gradientes personalizados
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #FF006E 0%, #FF6B35 100%)',
        'brand-gradient-horizontal': 'linear-gradient(90deg, #FF006E 0%, #FF6B35 100%)',
        'brand-gradient-vertical': 'linear-gradient(180deg, #FF006E 0%, #FF6B35 100%)',
        'brand-gradient-radial': 'radial-gradient(circle, #FF006E 0%, #FF6B35 100%)',
      },
      
      // Sombras con colores del brand
      boxShadow: {
        'brand': '0 4px 14px 0 rgba(255, 0, 110, 0.25)',
        'brand-lg': '0 10px 25px 0 rgba(255, 0, 110, 0.3)',
        'brand-xl': '0 20px 40px 0 rgba(255, 0, 110, 0.35)',
        'brand-glow': '0 0 20px rgba(255, 0, 110, 0.5)',
      },
      
      // Tipografía
      fontFamily: {
        'brand': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      
      // Bordes redondeados personalizados
      borderRadius: {
        'brand': '12px',
        'brand-lg': '16px',
        'brand-xl': '20px',
      },
      
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-in',
        'fade-in': 'fadeIn 0.2s ease-out',
        'brand-pulse': 'brandPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'brand-glow': 'brandGlow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        brandPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        brandGlow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 0, 110, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 0, 110, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
