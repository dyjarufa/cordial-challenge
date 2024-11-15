
import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, ...props }, ref) => (
    <div>
      <label>{label}</label>
      <textarea ref={ref} {...props} />
      {error && <p className="error">{error}</p>}
    </div>
  )
);

