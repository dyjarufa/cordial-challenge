import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { submitFormData } from '../utils/api';
import { AppFormData } from '../types/formTypes';
import { Button } from '../UI/Button';

interface ReviewSubmitProps {
  prevStep: () => void;
  formData: AppFormData;
  resetForm: () => void;
}

const ReviewSubmit = ({
  prevStep,
  formData,
  resetForm,
}: ReviewSubmitProps) => {
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
        <li>
          <strong>First Name:</strong> {formData.firstName}
        </li>
        {formData.hasMiddleName && (
          <li>
            <strong>Middle Name:</strong> {formData.middleName}
          </li>
        )}
        <li>
          <strong>Last Name:</strong> {formData.lastName}
        </li>
        <li>
          <strong>Email:</strong> {formData.email}
        </li>
        <li>
          <strong>Address:</strong> {formData.address}
        </li>
        <li>
          <strong>Preferred Time:</strong> {formData.preferredTime}
        </li>
        {formData.preferredTime === 'evening' && (
          <li>
            <strong>Available after 8 PM:</strong>{' '}
            {formData.isAvailableAfter8PM ? 'Yes' : 'No'}
          </li>
        )}
        <li>
          <strong>Special Instructions:</strong> {formData.specialInstructions}
        </li>
      </ul>
      <div>
        <Button onClick={prevStep}>Back</Button>
        <Button data-testid='review-submit' onClick={handleSubmit} disabled={mutation.isPending}>
          {mutation.isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
      {mutation.isError && (
        <p className="error">Error submitting the form</p>
      )}
    </div>
  );
};

export default ReviewSubmit;
