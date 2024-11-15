import { z } from 'zod';

export const personalInfoSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    hasMiddleName: z.boolean().optional(),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z
      .string()
      .email('Invalid email address')
      .min(1, { message: 'Email is required' }),
  })
  .refine((data) => {
    if (data.hasMiddleName) {
      return data.middleName && data.middleName.length > 0;
    }
    return true;
  }, {
    message: 'Middle name is required',
    path: ['middleName'],
  });

  export const deliveryPreferencesSchema = z
  .object({
    address: z.string().min(1, { message: 'Delivery address is required' }),
    preferredTime: z.enum(['morning', 'afternoon', 'evening'], {
      errorMap: () => ({ message: 'Please select a preferred time' }),
    }),
    isAvailableAfter8PM: z.boolean().optional(),
    specialInstructions: z.string().optional(),
  })
  .refine((data) => {
    if (data.preferredTime === 'evening') {
      return data.isAvailableAfter8PM !== undefined;
    }
    return true;
  }, {
    message: 'Please specify if you are available after 8 PM',
    path: ['isAvailableAfter8PM'],
  });

  export const formDataSchema = z.intersection(personalInfoSchema, deliveryPreferencesSchema);
