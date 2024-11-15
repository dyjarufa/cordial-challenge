import { AppFormData } from './../types/formTypes';
import { useState, useEffect } from 'react';


export const useFormData = () => {
  const initialData: AppFormData  = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    preferredTime: 'morning',
    specialInstructions: '',
  };

  const [formData, setFormData] = useState<AppFormData>(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const updateFormData = (data: Partial<AppFormData>) => {
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

