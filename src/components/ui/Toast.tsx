import { Toaster } from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';

export const Toast = () => {
  const { theme } = useTheme();

  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          background: theme === 'dark' ? '#1e293b' : '#ffffff',
          color: theme === 'dark' ? '#e2e8f0' : '#1e293b',
          border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: 'white',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: 'white',
          },
        },
      }}
    />
  );
};