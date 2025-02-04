import { ThemeOptions, createTheme } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#2c6e9c', // Deep ocean blue
      light: '#4a4a4a',
      dark: '#1d4d6e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#34836f', // Forest green
      light: '#4aa08a',
      dark: '#245c4d',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fafbfc', // Very light blue-gray
      paper: '#ffffff',
    },
    text: {
      primary: '#2c353d', // Dark blue-gray
      secondary: '#546573', // Medium blue-gray
    },
    divider: 'rgba(44, 110, 156, 0.12)', // Subtle blue divider
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
      color: '#496d8d',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.3,
      color: '#496d8d',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#2c353d',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#2c353d',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#2c353d',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
      color: '#546573',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'black',
          color:'white',
          borderBottom: '1px solid rgba(44, 110, 156, 0.12)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(44, 110, 156, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(44, 110, 156, 0.08)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(44, 110, 156, 0.12)',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(44, 110, 156, 0.04)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(44, 110, 156, 0.08)',
        },
      },
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
};

export const theme = createTheme(themeOptions);