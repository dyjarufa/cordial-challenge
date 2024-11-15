import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormWizard } from '../FormWizard';

jest.mock('../../hooks/useFormData', () => ({
  useFormData: () => ({
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      preferredTime: 'morning',
    },
    updateFormData: jest.fn(),
    resetFormData: jest.fn(),
  }),
}));

describe('FormWizard', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('initializes with step 1 when no saved step exists', () => {
    render(<FormWizard />);
    expect(screen.getByTestId('step-one')).toBeInTheDocument();
  });

  test('initializes with saved step from localStorage', () => {
    localStorage.setItem('currentStep', '2');
    render(<FormWizard />);
    expect(screen.getByTestId('step-two')).toBeInTheDocument();
  });

  test('shows error message for invalid step', () => {
    localStorage.setItem('currentStep', '4');
    render(<FormWizard />);
    expect(screen.getByText('Error: Unknown step')).toBeInTheDocument();
  });

 
});
