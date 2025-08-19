import React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

interface LogoIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  priority?: boolean;
}

const LogoIcon: React.FC<LogoIconProps> = ({ 
  size = 'md', 
  className,
  priority = false 
}) => {
  const getSize = () => {
    switch (size) {
      case 'sm':
        return { width: 24, height: 24 };
      case 'lg':
        return { width: 48, height: 48 };
      case 'xl':
        return { width: 64, height: 64 };
      default:
        return { width: 32, height: 32 };
    }
  };

  const { width, height } = getSize();

  return (
    <div className={clsx('logo-icon-container', className)}>
      <Image
        src="/images/logo_dondetu_sin_texto.png"
        alt="DóndeTú"
        width={width}
        height={height}
        priority={priority}
        className="logo-icon-image"
      />
    </div>
  );
};

export default LogoIcon;
