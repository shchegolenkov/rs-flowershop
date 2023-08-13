import { createTheme } from '@mui/material/styles';

const FormTheme = createTheme({
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
  },
  overrides: {
    MuiOutlinedInput: {
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
    MuiFormHelperText: {
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
});

export default FormTheme;
