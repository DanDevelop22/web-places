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
        return <CheckCircle className="w-8 h-8 text-brand-success" />;
      case 'info':
        return <Share2 className="w-8 h-8 text-brand-info" />;
      case 'warning':
        return <Copy className="w-8 h-8 text-brand-warning" />;
      case 'error':
        return <X className="w-8 h-8 text-brand-error" />;
      default:
        return <CheckCircle className="w-8 h-8 text-brand-success" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-brand-success/10 dark:bg-brand-success/20';
      case 'info':
        return 'bg-brand-info/10 dark:bg-brand-info/20';
      case 'warning':
        return 'bg-brand-warning/10 dark:bg-brand-warning/20';
      case 'error':
        return 'bg-brand-error/10 dark:bg-brand-error/20';
      default:
        return 'bg-brand-success/10 dark:bg-brand-success/20';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-brand-success/20 dark:border-brand-success/30';
      case 'info':
        return 'border-brand-info/20 dark:border-brand-info/30';
      case 'warning':
        return 'border-brand-warning/20 dark:border-brand-warning/30';
      case 'error':
        return 'border-brand-error/20 dark:border-brand-error/30';
      default:
        return 'border-brand-success/20 dark:border-brand-success/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-dark-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={clsx(
        "relative w-full max-w-md mx-4 transform transition-all duration-300 ease-out",
        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
      )}>
        <div className={clsx(
          "modal-brand relative rounded-brand-xl shadow-brand-xl border",
          getBgColor(),
          getBorderColor()
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center gap-3">
              {showIcon && getIcon()}
              <h3 className="text-lg font-semibold text-brand-dark-900 dark:text-brand-dark-100">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-brand-dark-100 dark:hover:bg-brand-dark-700 transition-colors"
            >
              <X className="w-5 h-5 text-brand-dark-500 dark:text-brand-dark-400" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <p className="text-brand-dark-600 dark:text-brand-dark-300 leading-relaxed">
              {message}
            </p>
          </div>

          {/* Progress bar for auto-close */}
          {autoClose && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-dark-200 dark:bg-brand-dark-700 rounded-b-brand-xl overflow-hidden">
              <div 
                className="h-full bg-brand-gradient transition-all duration-300 ease-linear"
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
