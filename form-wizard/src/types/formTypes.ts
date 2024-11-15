import { z } from 'zod';
import {
  personalInfoSchema,
  deliveryPreferencesSchema,
  formDataSchema,
} from '../schemas/formSchemas';

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type DeliveryPreferencesFormData = z.infer<typeof deliveryPreferencesSchema>;
export type AppFormData = z.infer<typeof formDataSchema>;
