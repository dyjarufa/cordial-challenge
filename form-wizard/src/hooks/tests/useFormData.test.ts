import { useFormData } from './../useFormData';
// src/hooks/useFormData.test.ts

import { renderHook, act } from '@testing-library/react';

describe('useFormData Hook', () => {

  test('updates form data correctly', () => {
    const { result } = renderHook(() => useFormData());

    act(() => {
      result.current.updateFormData({ firstName: 'John' });
    });

    expect(result.current.formData.firstName).toBe('John');
  });

  test('resets form data', () => {
    const { result } = renderHook(() => useFormData());

    act(() => {
      result.current.updateFormData({ firstName: 'John' });
      result.current.resetFormData();
    });

    expect(result.current.formData.firstName).toBe('');
  });
});
