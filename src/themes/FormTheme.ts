import { createTheme, Theme } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

interface CustomTypographyOptions extends TypographyOptions {
  fontWeight?: number;
}

const FormTheme: Theme = createTheme({
  palette: {
    primary: {
      main: '#D2D2D7',
    },
    error: {
      main: '#F55F56',
    },
  },
  typography: {
    fontFamily: 'Poppins, Roboto, sans-serif',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '17px',
    letterSpacing: 0,
    textAlign: 'left',
  } as CustomTypographyOptions,
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D2D2D7',
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F55F56',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins, Roboto, sans-serif',
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '17px',
          letterSpacing: 0,
          textAlign: 'left',
          color: '#F55F56',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins, Roboto, sans-serif',
          fontSize: 12,
          fontWeight: 400,
          lineHeight: '15px',
          letterSpacing: 0,
          textAlign: 'left',
          color: '#F55F56',
          alignItems: 'center',
        },
      },
    },
  },
});

export default FormTheme;
