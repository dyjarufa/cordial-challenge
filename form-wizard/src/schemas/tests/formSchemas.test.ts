import { z } from 'zod';
import { personalInfoSchema, deliveryPreferencesSchema, formDataSchema } from '../formSchemas';

describe('Form Schemas', () => {
  describe('personalInfoSchema', () => {
    test('validates valid personal info data', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        hasMiddleName: false
      };
      
      const result = personalInfoSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    test('requires middle name when hasMiddleName is true', () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        hasMiddleName: true
      };
      
      const result = personalInfoSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    test('validates with middle name when provided', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        hasMiddleName: true,
        middleName: 'Robert'
      };
      
      const result = personalInfoSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('deliveryPreferencesSchema', () => {
    test('validates valid delivery preferences', () => {
      const validData = {
        address: '123 Main St',
        preferredTime: 'morning',
        specialInstructions: 'Leave at door'
      };
      
      const result = deliveryPreferencesSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    test('requires isAvailableAfter8PM when preferredTime is evening', () => {
      const invalidData = {
        address: '123 Main St',
        preferredTime: 'evening',
        specialInstructions: 'Leave at door'
      };
      
      const result = deliveryPreferencesSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    test('validates evening delivery with availability specified', () => {
      const validData = {
        address: '123 Main St',
        preferredTime: 'evening',
        isAvailableAfter8PM: true,
        specialInstructions: 'Leave at door'
      };
      
      const result = deliveryPreferencesSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('formDataSchema', () => {
    test('validates complete valid form data', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        address: '123 Main St',
        preferredTime: 'morning',
        specialInstructions: 'Leave at door'
      };
      
      const result = formDataSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    test('fails validation when required fields are missing', () => {
      const invalidData = {
        firstName: 'John',
        email: 'john@example.com',
        preferredTime: 'morning'
      };
      
      const result = formDataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
