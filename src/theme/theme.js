import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', 
    primary: {
      main: '#1976d2', 
    },
    secondary: {
      main: '#ff4081', 
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 12, // Rounded corners for components
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #ddd', // Add minimal border
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Elevation effect
          borderRadius: 12, // Match with the theme
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '6px 12px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h6: {
          fontWeight: '600', // Slightly bolder title
        },
      },
    },
  },
});

export default theme;
