import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Select } from '../Select';

describe('Select', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  test('renders select component with label', () => {
    render(<Select label="Test Select" options={mockOptions} />);
    expect(screen.getByText('Test Select')).toBeInTheDocument();
  });

  test('renders all options correctly', () => {
    render(<Select label="Test Select" options={mockOptions} />);
    expect(screen.getByText('Select')).toBeInTheDocument();
    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test('displays error message when error prop is provided', () => {
    const errorMessage = 'This is an error';
    render(<Select label="Test Select" options={mockOptions} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('handles selection change', () => {
    const handleChange = jest.fn();
    render(<Select label="Test Select" options={mockOptions} onChange={handleChange} />);
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'option2' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSelectElement>();
    render(<Select label="Test Select" options={mockOptions} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  test('applies additional props to select element', () => {
    render(<Select label="Test Select" options={mockOptions} data-testid="custom-select" />);
    expect(screen.getByTestId('custom-select')).toBeInTheDocument();
  });
});
