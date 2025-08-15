import { useState } from 'react';
import { FormikHelpers } from 'formik';

interface UseFormikFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useFormikForm<T>({
  initialValues,
  onSubmit,
  onSuccess,
  onError
}: UseFormikFormOptions<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (
    values: T,
    formikHelpers: FormikHelpers<T>
  ) => {
    setIsLoading(true);
    setError('');

    try {
      await onSubmit(values, formikHelpers);
      onSuccess?.();
    } catch (err: any) {
      const errorMessage = err?.message || 'Ha ocurrido un error inesperado';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
      formikHelpers.setSubmitting(false);
    }
  };

  const clearError = () => setError('');

  return {
    isLoading,
    error,
    handleSubmit,
    clearError
  };
}
