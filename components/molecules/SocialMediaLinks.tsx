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
      color: 'hover:bg-blue-500 hover:text-white',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      key: 'instagram',
      icon: Instagram,
      label: 'Instagram',
      url: socialMedia.instagram,
      color: 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white',
      bgColor: 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      key: 'twitter',
      icon: Twitter,
      label: 'Twitter',
      url: socialMedia.twitter,
      color: 'hover:bg-sky-500 hover:text-white',
      bgColor: 'bg-sky-50 dark:bg-sky-900/20',
      borderColor: 'border-sky-200 dark:border-sky-800',
      iconColor: 'text-sky-600 dark:text-sky-400'
    },
    {
      key: 'youtube',
      icon: Youtube,
      label: 'YouTube',
      url: socialMedia.youtube,
      color: 'hover:bg-red-500 hover:text-white',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      iconColor: 'text-red-600 dark:text-red-400'
    },
    {
      key: 'tiktok',
      icon: TikTokIcon,
      label: 'TikTok',
      url: socialMedia.tiktok,
      color: 'hover:bg-black hover:text-white',
      bgColor: 'bg-gray-50 dark:bg-gray-900/20',
      borderColor: 'border-gray-200 dark:border-gray-800',
      iconColor: 'text-gray-600 dark:text-gray-400'
    },
    {
      key: 'website',
      icon: Globe,
      label: 'Sitio Web',
      url: socialMedia.website,
      color: 'hover:bg-gray-600 hover:text-white',
      bgColor: 'bg-gray-50 dark:bg-gray-900/20',
      borderColor: 'border-gray-200 dark:border-gray-800',
      iconColor: 'text-gray-600 dark:text-gray-400'
    },
    {
      key: 'phone',
      icon: Phone,
      label: 'Teléfono',
      url: socialMedia.phone ? `tel:${socialMedia.phone}` : undefined,
      color: 'hover:bg-green-500 hover:text-white',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      key: 'email',
      icon: Mail,
      label: 'Email',
      url: socialMedia.email ? `mailto:${socialMedia.email}` : undefined,
      color: 'hover:bg-orange-500 hover:text-white',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      iconColor: 'text-orange-600 dark:text-orange-400'
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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Redes Sociales
        </h3>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {availableLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.key}
              onClick={() => handleLinkClick(link.url!, link.label)}
              className={clsx(
                'flex items-center gap-3 p-4 rounded-xl border transition-all duration-200',
                'transform hover:scale-105 active:scale-95',
                'group relative overflow-hidden min-h-[70px]',
                link.bgColor,
                link.borderColor,
                link.color
              )}
              title={`Abrir ${link.label}`}
            >
              <Icon className={clsx('w-6 h-6 flex-shrink-0 transition-transform group-hover:scale-110', link.iconColor)} />
              <span className="text-base font-medium text-gray-700 dark:text-gray-300 flex-1 text-left leading-tight">
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
