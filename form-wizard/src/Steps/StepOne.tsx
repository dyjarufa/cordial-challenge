import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInfoFormData } from '../types/formTypes';
import { personalInfoSchema } from '../schemas/formSchemas';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';


interface StepOneProps {
  nextStep: () => void;
  updateFormData: (data: PersonalInfoFormData) => void;
  defaultValues: PersonalInfoFormData;
}

const StepOne: React.FC<StepOneProps> = ({
  nextStep,
  updateFormData,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
    mode: 'onChange',
  });

  const hasMiddleName = watch('hasMiddleName');

  const onSubmit = (data: PersonalInfoFormData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form data-testid="step-one" onSubmit={handleSubmit(onSubmit)}>
      <h2>Personal Information</h2>

      <Input
        label="First Name"
        {...register('firstName')}
        error={errors.firstName?.message}
      />

      <div>
        <label>
          <input type="checkbox" {...register('hasMiddleName')} />
          Do you have a middle name?
        </label>
      </div>

      {hasMiddleName && (
        <Input
          label="Middle Name"
          {...register('middleName')}
          error={errors.middleName?.message}
        />
      )}

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

export default StepOne;
