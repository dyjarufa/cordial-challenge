import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TextArea } from '../TextArea';

describe('TextArea', () => {

  test('displays error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    render(<TextArea label="Test Label" error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass('error');
  });

  test('forwards ref to textarea element', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<TextArea label="Test Label" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  test('passes through additional props to textarea', () => {
    const placeholder = 'Enter text here';
    render(<TextArea label="Test Label" placeholder={placeholder} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', placeholder);
  });

  test('renders without error message when error prop is not provided', () => {
    render(<TextArea label="Test Label" />);
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });
});
