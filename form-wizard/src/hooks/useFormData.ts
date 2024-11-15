import { useState, useEffect } from 'react';
import { FormData } from '../types/formTypes';

export const useFormData = () => {
  const initialData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    preferredTime: 'morning',
    specialInstructions: '',
  };

  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prevData => ({ ...prevData, ...data }));
  };

  const resetFormData = () => {
    setFormData(initialData);
    localStorage.removeItem('formData');
  };

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  return { formData, updateFormData, resetFormData };
};

