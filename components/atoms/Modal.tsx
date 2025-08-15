'use client';

import React, { useEffect } from 'react';
import { X, CheckCircle, Copy, Share2 } from 'lucide-react';
import { clsx } from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  showIcon?: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'success',
  showIcon = true,
  autoClose = true,
  autoCloseDelay = 3000
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'info':
        return <Share2 className="w-8 h-8 text-blue-500" />;
      case 'warning':
        return <Copy className="w-8 h-8 text-yellow-500" />;
      case 'error':
        return <X className="w-8 h-8 text-red-500" />;
      default:
        return <CheckCircle className="w-8 h-8 text-green-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20';
      default:
        return 'bg-green-50 dark:bg-green-900/20';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-200 dark:border-green-800';
      case 'info':
        return 'border-blue-200 dark:border-blue-800';
      case 'warning':
        return 'border-yellow-200 dark:border-yellow-800';
      case 'error':
        return 'border-red-200 dark:border-red-800';
      default:
        return 'border-green-200 dark:border-green-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={clsx(
        "relative w-full max-w-md mx-4 transform transition-all duration-300 ease-out",
        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
      )}>
        <div className={clsx(
          "relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border",
          getBgColor(),
          getBorderColor()
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center gap-3">
              {showIcon && getIcon()}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {message}
            </p>
          </div>

          {/* Progress bar for auto-close */}
          {autoClose && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-b-2xl overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-linear"
                style={{
                  width: '100%',
                  animation: `shrink ${autoCloseDelay}ms linear forwards`
                }}
              />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Modal;
