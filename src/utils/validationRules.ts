import isEmail from 'validator/lib/isEmail';
import * as yup from 'yup';

const currentDate = new Date();

const thirteenYearsAgo = new Date(
  currentDate.getFullYear() - 13,
  currentDate.getMonth(),
  currentDate.getDate()
);

const minDate = new Date(1900, 1, 1);

export const dateOfBirthRules = yup
  .date()
  .max(thirteenYearsAgo)
  .min(minDate)
  .typeError('Please enter a valid date')
  .required('Date is required');

export const emailRules = yup
  .string()
  .required('Email is required')
  .email('Invalid email (e.g., example@example.com)')
  .test('is-valid', 'Invalid email (e.g., example@example.com)', (value) =>
    value ? isEmail(value) : new yup.ValidationError('Invalid email (e.g., example@example.com)')
  );

export const passwordRules = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter (e.g., [A-Z])')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter (e.g., [a-z])')
  .matches(/[0-9]/, 'Password must contain at least one digit (e.g., [0-9])')
  .matches(/[!@#$%^&*]/, 'Password must contain at least one special character (e.g., !@#$%^&*)')
  .matches(/^\S*$/, 'Password cannot contain spaces');

export const firstNameRules = yup
  .string()
  .required('First name is required')
  .matches(/^[a-zA-Z]+$/, 'First name cannot contain special characters or numbers');

export const lastNameRules = yup
  .string()
  .required('Last name is required')
  .matches(/^[a-zA-Z]+$/, 'Last name cannot contain special characters or numbers');
