import React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

interface LogoProps {
  variant?: 'primary' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  type?: 'full' | 'icon';
  className?: string;
  priority?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  type = 'full',
  className,
  priority = false 
}) => {
  const getLogoPath = () => {
    // Por ahora usamos el mismo logo para todas las variantes
    // En el futuro puedes crear versiones específicas
    if (type === 'icon') {
      return '/images/logo_dondetu_sin_texto.png';
    }
    return '/images/logo_dondetu.png';
  };

  const getSize = () => {
    if (type === 'icon') {
      // Para el icono sin texto, usamos dimensiones cuadradas
      switch (size) {
        case 'sm':
          return { width: 32, height: 32 };
        case 'lg':
          return { width: 64, height: 64 };
        case 'xl':
          return { width: 96, height: 96 };
        default:
          return { width: 48, height: 48 };
      }
    } else {
      // Para el logo completo, mantenemos las proporciones originales
      switch (size) {
        case 'sm':
          return { width: 80, height: 30 };
        case 'lg':
          return { width: 180, height: 60 };
        case 'xl':
          return { width: 240, height: 80 };
        default:
          return { width: 120, height: 40 };
      }
    }
  };

  const { width, height } = getSize();

  return (
    <div className={clsx('logo-container', className)}>
      <Image
        src={getLogoPath()}
        alt="DóndeTú"
        width={width}
        height={height}
        priority={priority}
        className="logo-image"
      />
    </div>
  );
};

export default Logo;
