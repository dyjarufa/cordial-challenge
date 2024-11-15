import { submitFormData } from './../api';
import { AppFormData } from './../../types/formTypes';
import fetchMock from 'jest-fetch-mock';

describe('submitFormData', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('successfully submits form data', async () => {
    const mockData: AppFormData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      address: '123 Main St',
      preferredTime: 'morning'
    };

    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    await expect(submitFormData(mockData)).resolves.not.toThrow();
    
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockData)
    });
  });
  test('throws error when response is not ok', async () => {
    const mockData: AppFormData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      address: '123 Main St',
      preferredTime: 'morning'
    };

    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ message: 'Server error' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    }));

    await expect(submitFormData(mockData)).rejects.toThrow('Server error');
  });

  test('throws generic error when no error message provided', async () => {
    const mockData: AppFormData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      address: '123 Main St',
        preferredTime: 'morning'
    };

    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({}), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    }));

    await expect(submitFormData(mockData)).rejects.toThrow('Failed to submit form');
  });

  test('handles network errors', async () => {
    const mockData: AppFormData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      address: '123 Main St',
      preferredTime: 'morning'
    };

    fetchMock.mockRejectedValueOnce(new Error('Network error'));

    await expect(submitFormData(mockData)).rejects.toThrow('Network error');
  });
});
