import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReviewSubmit from '../ReviewSubmit';


jest.mock('../../utils/api', () => ({
  submitFormData: jest.fn()
}));

describe('ReviewSubmit', () => {
  const queryClient = new QueryClient();
  const mockProps = {
    prevStep: jest.fn(),
    formData: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      address: '123 Main St',
      preferredTime: 'morning' as const,
    },
    resetForm: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithQueryClient = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  test('renders review submit component', () => {
    renderWithQueryClient(<ReviewSubmit {...mockProps} />);
    expect(screen.getByTestId('review-submit')).toBeInTheDocument();
  });

  test('displays review content correctly', () => {
    renderWithQueryClient(<ReviewSubmit {...mockProps} />);
    expect(screen.getByText(mockProps.formData.firstName)).toBeInTheDocument();
    expect(screen.getByText(mockProps.formData.lastName)).toBeInTheDocument();
    expect(screen.getByText(mockProps.formData.email)).toBeInTheDocument();
    expect(screen.getByText(mockProps.formData.address)).toBeInTheDocument();
  });


  test('handles back button click', () => {
    renderWithQueryClient(<ReviewSubmit {...mockProps} />);
    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);
    expect(mockProps.prevStep).toHaveBeenCalled();
  });
});
