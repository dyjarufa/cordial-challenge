import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../Button';

describe('Button', () => {
  test('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('passes through HTML button attributes', () => {
    render(<Button disabled type="submit">Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  test('handles aria attributes', () => {
    render(<Button aria-label="Close dialog">✕</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close dialog');
  });
});
