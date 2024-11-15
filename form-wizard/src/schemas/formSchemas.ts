import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z
    .string()
    .email('Invalid email address')
    .min(1, { message: 'Email is required' }),
});

export const deliveryPreferencesSchema = z.object({
  address: z.string().min(1, { message: 'Delivery address is required'}),
  preferredTime: z.enum(['morning', 'afternoon', 'evening'], {
    errorMap: () => ({ message: 'Please select a preferred time' }),
  }),
  specialInstructions: z.string().optional(),
});

export const formDataSchema = personalInfoSchema.merge(deliveryPreferencesSchema);
