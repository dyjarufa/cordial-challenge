import { AppFormData } from '../types/formTypes';

export const submitFormData = async (data: AppFormData): Promise<void> => {
  const response = await fetch('http://localhost:5000/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to submit form');
  }
};
