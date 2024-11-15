import React, { useState, useEffect } from 'react';

import { useFormData } from '../hooks/useFormData';

import '../styles/FormWizard.css';
import { StepTwo } from '../Steps/StepTwo';
import StepOne from '../Steps/StepOne';
import ReviewSubmit from './ReviewSubmit';


 export const FormWizard = () => {
  const { formData, updateFormData, resetFormData } = useFormData();

  const [currentStep, setCurrentStep] = useState<number>(() => {
    const savedStep = localStorage.getItem('currentStep');
    return savedStep ? JSON.parse(savedStep) : 1;
  });

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  useEffect(() => {
    localStorage.setItem('currentStep', JSON.stringify(currentStep));
  }, [currentStep]);

  const resetForm = () => {
    resetFormData();
    setCurrentStep(1);
    localStorage.removeItem('currentStep');
  };

  switch (currentStep) {
    case 1:
      return (
        <StepOne
          data-testid="step-one"
          nextStep={nextStep}
          updateFormData={updateFormData}
          defaultValues={formData}
        />
      );
    case 2:
      return (
        <StepTwo
        data-testid="step-two"
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
          defaultValues={formData}
        />
      );
    case 3:
      return (
        <ReviewSubmit
          prevStep={prevStep}
          formData={formData}
          resetForm={resetForm}
        />
      );
    default:
      return <div>Error: Unknown step</div>;
  }
};
