import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { FormData } from '../../src/types/formTypes';
import { submitFormData } from '../utils/api';
import { Button } from '../UI/Button';

interface ReviewSubmitProps {
  prevStep: () => void;
  formData: FormData;
  resetForm: () => void;
}

export const ReviewSubmit =  ({ prevStep, formData, resetForm }: ReviewSubmitProps) => {
  const mutation = useMutation({
    mutationFn: submitFormData,
    onSuccess: () => {
      alert('Form submitted successfully!');
      resetForm();
    },
    onError: (error: Error) => {
      alert(`Error submitting form: ${error.message}`);
    },
  });

  const handleSubmit = () => {
    mutation.mutate(formData);
  };

  return (
    <div>
      <h2>Review and Submit</h2>
      <ul>
        <li><strong>First Name:</strong> {formData.firstName}</li>
        <li><strong>Last Name:</strong> {formData.lastName}</li>
        <li><strong>Email:</strong> {formData.email}</li>
        <li><strong>Address:</strong> {formData.address}</li>
        <li><strong>Preferred Time:</strong> {formData.preferredTime}</li>
        <li><strong>Special Instructions:</strong> {formData.specialInstructions}</li>
      </ul>
      <div>
        <Button onClick={prevStep}>Back</Button>
        <Button onClick={handleSubmit} disabled={mutation.isPending}>
          {mutation.isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
      {mutation.isError && <p className="error">Error submitting the form</p>}
    </div>
  );
};
