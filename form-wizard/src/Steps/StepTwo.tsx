import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DeliveryPreferencesFormData } from '../types/formTypes';
import { deliveryPreferencesSchema } from '../schemas/formSchemas';
import { Input } from '../UI/Input';
import { TextArea } from '../UI/TextArea';
import { Select } from '../UI/Select';
import { Button } from '../UI/Button';

interface StepTwoProps {
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: DeliveryPreferencesFormData) => void;
  defaultValues: DeliveryPreferencesFormData;
}

export const StepTwo = ({ nextStep, prevStep, updateFormData, defaultValues }: StepTwoProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<DeliveryPreferencesFormData>({
    resolver: zodResolver(deliveryPreferencesSchema),
    defaultValues,
  });

  const onSubmit = (data: DeliveryPreferencesFormData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form  data-testid="step-two"onSubmit={handleSubmit(onSubmit)}>
      <h2>Delivery Preferences</h2>
      <Input
        label="Delivery Address"
        {...register('address')}
        error={errors.address?.message}
      />
      <Select
        label="Preferred Time"
        options={[
          { value: 'morning', label: 'Morning' },
          { value: 'afternoon', label: 'Afternoon' },
          { value: 'evening', label: 'Evening' },
        ]}
        {...register('preferredTime')}
        error={errors.preferredTime?.message}
      />
      <TextArea
        label="Special Instructions"
        {...register('specialInstructions')}
        error={errors.specialInstructions?.message}
      />
      <div>
        <Button type="button" onClick={prevStep}>Back</Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

