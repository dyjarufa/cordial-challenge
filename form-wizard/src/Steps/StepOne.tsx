import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInfoFormData } from '../types/formTypes';
import { personalInfoSchema } from '../../src/schemas/formSchemas';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';


interface StepOneProps {
  nextStep: () => void;
  updateFormData: (data: PersonalInfoFormData) => void;
  defaultValues: PersonalInfoFormData;
}

export const StepOne: React.FC<StepOneProps> = ({
  nextStep,
  updateFormData,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Personal Information</h2>

      <Input
        label="First Name"
        {...register('firstName')}
        error={errors.firstName?.message}
      />

      <Input
        label="Last Name"
        {...register('lastName')}
        error={errors.lastName?.message}
      />

      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <Button type="submit">Next</Button>
    </form>
  );
};

