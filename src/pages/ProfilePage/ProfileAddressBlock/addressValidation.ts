import * as yup from 'yup';

export const schema = yup.object().shape({
  streetName: yup
    .string()
    .required('Street is required')
    .max(100, 'Street must be at most 100 characters'),
  postalCode: yup
    .string()
    .required('Postal code is required')
    .matches(/^(?:NL-)?(\d{4})\s*([A-Z]{2})$/i, 'Invalid postal code (e.g., 2378AP)'),
  country: yup.string().required('Country is required'),
  city: yup
    .string()
    .required('City is required')
    .max(100, 'City must be at most 100 characters')
    .matches(/^[a-zA-Z]+$/, 'City cannot contain special characters or numbers'),
});
