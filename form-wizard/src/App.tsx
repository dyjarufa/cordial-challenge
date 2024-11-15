import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormWizard } from './components/FormWizard';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FormWizard />
    </QueryClientProvider>
  );
};

export default App;

