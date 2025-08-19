'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthContainer } from '@/components/auth/AuthContainer';
import { AuthProvider } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();

  const handleAuthSuccess = () => {
    // Redirigir al admin después del login exitoso
    router.push('/es/admin');
  };

  return (
    <AuthProvider>
      <AuthContainer 
        onAuthSuccess={handleAuthSuccess}
        defaultMode="login"
      />
    </AuthProvider>
  );
}
