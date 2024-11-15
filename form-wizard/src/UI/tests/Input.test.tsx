import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from '../Input';

describe('Input', () => {

  test('renders error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    render(<Input label="Test Label" error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass('error');
  });

  test('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input label="Test Label" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('passes through additional props to input element', () => {
    render(
      <Input
        label="Test Label"
        placeholder="Enter value"
        type="email"
        required
        data-testid="test-input"
      />
    );
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('placeholder', 'Enter value');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toBeRequired();
  });

  test('does not render error paragraph when no error provided', () => {
    render(<Input label="Test Label" />);
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });
});
