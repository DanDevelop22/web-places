'use client';

import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Globe, 
  Phone, 
  Mail,
  ExternalLink
} from 'lucide-react';
import { SocialMedia } from '@/types';
import { clsx } from 'clsx';
import TikTokIcon from '@/components/atoms/TikTokIcon';

interface SocialMediaLinksProps {
  socialMedia: SocialMedia;
  className?: string;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ 
  socialMedia, 
  className 
}) => {
  const socialLinks = [
    {
      key: 'facebook',
      icon: Facebook,
      label: 'Facebook',
      url: socialMedia.facebook,
      color: 'hover:bg-brand-info hover:text-white',
      bgColor: 'bg-brand-info/10 dark:bg-brand-info/20',
      borderColor: 'border-brand-info/20 dark:border-brand-info/30',
      iconColor: 'text-brand-info'
    },
    {
      key: 'instagram',
      icon: Instagram,
      label: 'Instagram',
      url: socialMedia.instagram,
      color: 'hover:bg-brand-gradient hover:text-white',
      bgColor: 'bg-brand-primary/10 dark:bg-brand-primary/20',
      borderColor: 'border-brand-primary/20 dark:border-brand-primary/30',
      iconColor: 'text-brand-primary'
    },
    {
      key: 'twitter',
      icon: Twitter,
      label: 'Twitter',
      url: socialMedia.twitter,
      color: 'hover:bg-brand-secondary hover:text-white',
      bgColor: 'bg-brand-secondary/10 dark:bg-brand-secondary/20',
      borderColor: 'border-brand-secondary/20 dark:border-brand-secondary/30',
      iconColor: 'text-brand-secondary'
    },
    {
      key: 'youtube',
      icon: Youtube,
      label: 'YouTube',
      url: socialMedia.youtube,
      color: 'hover:bg-brand-error hover:text-white',
      bgColor: 'bg-brand-error/10 dark:bg-brand-error/20',
      borderColor: 'border-brand-error/20 dark:border-brand-error/30',
      iconColor: 'text-brand-error'
    },
    {
      key: 'tiktok',
      icon: TikTokIcon,
      label: 'TikTok',
      url: socialMedia.tiktok,
      color: 'hover:bg-brand-dark-900 hover:text-white',
      bgColor: 'bg-brand-dark-100 dark:bg-brand-dark-800',
      borderColor: 'border-brand-dark-200 dark:border-brand-dark-700',
      iconColor: 'text-brand-dark-600 dark:text-brand-dark-400'
    },
    {
      key: 'website',
      icon: Globe,
      label: 'Sitio Web',
      url: socialMedia.website,
      color: 'hover:bg-brand-dark-600 hover:text-white',
      bgColor: 'bg-brand-dark-50 dark:bg-brand-dark-900/20',
      borderColor: 'border-brand-dark-200 dark:border-brand-dark-700',
      iconColor: 'text-brand-dark-600 dark:text-brand-dark-400'
    },
    {
      key: 'phone',
      icon: Phone,
      label: 'Teléfono',
      url: socialMedia.phone ? `tel:${socialMedia.phone}` : undefined,
      color: 'hover:bg-brand-success hover:text-white',
      bgColor: 'bg-brand-success/10 dark:bg-brand-success/20',
      borderColor: 'border-brand-success/20 dark:border-brand-success/30',
      iconColor: 'text-brand-success'
    },
    {
      key: 'email',
      icon: Mail,
      label: 'Email',
      url: socialMedia.email ? `mailto:${socialMedia.email}` : undefined,
      color: 'hover:bg-brand-accent hover:text-white',
      bgColor: 'bg-brand-accent/10 dark:bg-brand-accent/20',
      borderColor: 'border-brand-accent/20 dark:border-brand-accent/30',
      iconColor: 'text-brand-accent'
    }
  ];

  const availableLinks = socialLinks.filter(link => link.url);

  if (availableLinks.length === 0) {
    return null;
  }

  const handleLinkClick = (url: string, label: string) => {
    // Abrir en nueva pestaña para URLs externas
    if (url.startsWith('http') || url.startsWith('tel:') || url.startsWith('mailto:')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={clsx('space-y-4', className)}>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-brand-dark-900 dark:text-brand-dark-100">
          Redes Sociales
        </h3>
        <div className="flex-1 h-px bg-brand-dark-200 dark:bg-brand-dark-700" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {availableLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.key}
              onClick={() => handleLinkClick(link.url!, link.label)}
              className={clsx(
                'flex items-center gap-3 p-4 rounded-brand-lg border transition-all duration-200',
                'transform hover:scale-105 active:scale-95',
                'group relative overflow-hidden min-h-[70px]',
                link.bgColor,
                link.borderColor,
                link.color
              )}
              title={`Abrir ${link.label}`}
            >
              <Icon className={clsx('w-6 h-6 flex-shrink-0 transition-transform group-hover:scale-110', link.iconColor)} />
              <span className="text-base font-medium text-brand-dark-700 dark:text-brand-dark-300 flex-1 text-left leading-tight">
                {link.label}
              </span>
              <ExternalLink className="w-5 h-5 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SocialMediaLinks;
