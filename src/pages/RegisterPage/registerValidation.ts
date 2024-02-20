import * as yup from 'yup';

import {
  dateOfBirthRules,
  emailRules,
  firstNameRules,
  lastNameRules,
  passwordRules,
} from '@/utils/validationRules';

export const schema = yup.object().shape({
  email: emailRules,
  password: passwordRules,
  firstName: firstNameRules,
  lastName: lastNameRules,
  dateOfBirth: dateOfBirthRules,
  shippingStreet: yup
    .string()
    .required('Street is required')
    .max(100, 'Street must be at most 100 characters'),
  shippingCity: yup
    .string()
    .required('City is required')
    .max(100, 'City must be at most 100 characters')
    .matches(/^[a-zA-Z]+$/, 'City cannot contain special characters or numbers'),
  shippingPostalCode: yup
    .string()
    .required('Postal code is required.')
    .matches(/^(?:NL-)?(\d{4})\s*([A-Z]{2})$/i, 'Invalid postal code (e.g., 2378AP)'),
  shippingCountry: yup.string().required('Country is required'),
  billingStreet: yup
    .string()
    .max(100, 'Street must be at most 100 characters')
    .test({
      name: 'is shipping address default for billing',
      test: function (value) {
        const shippingBillingAddress = this.parent.shippingBillingAddress;
        if (shippingBillingAddress) {
          return true;
        }
        return !!value || this.createError({ message: 'Street is required' });
      },
    }),
  billingCity: yup
    .string()
    .max(100, 'City must be at most 100 characters')
    .test({
      name: 'is shipping address default for billing',
      test: function (value) {
        const shippingBillingAddress = this.parent.shippingBillingAddress;
        if (shippingBillingAddress) {
          return true;
        }
        if (!value) {
          return this.createError({ message: 'City is required' });
        }
        if (!/^[a-zA-Z]+$/.test(value)) {
          return this.createError({
            message: 'City cannot contain special characters or numbers',
          });
        }

        return true;
      },
    }),
  billingPostalCode: yup.string().test({
    name: 'is shipping address default for billing',
    test: function (value) {
      const shippingBillingAddress = this.parent.shippingBillingAddress;
      if (shippingBillingAddress) {
        return true;
      }
      if (!value) {
        return this.createError({ message: 'Postal code is required' });
      }
      if (!/^(?:NL-)?(\d{4})\s*([A-Z]{2})$/i.test(value)) {
        return this.createError({
          message: "Invalid postal code (e.g., 2378AP)'",
        });
      }

      return true;
    },
  }),
  billingCountry: yup.string().test({
    name: 'is shipping address default for billing',
    test: function (value) {
      const shippingBillingAddress = this.parent.shippingBillingAddress;
      if (shippingBillingAddress) {
        return true;
      }
      return !!value || this.createError({ message: 'Country is required' });
    },
  }),
});
