import { useState, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '@mui/material/Alert';
import clsx from 'clsx';
import { useForm, UseFormProps, Resolver } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import * as yup from 'yup';

import { selectAuth, selectMessage } from '@/app/selectors';
import { registerUser, loginUser, getUser } from '@/app/slices/auth';
import { clearMessage } from '@/app/slices/message';
import { AppDispatch } from '@/app/store';
import Button from '@/components/UI/Button';
import BirthDateInput from '@/components/UI/FormFields/BirthDateInput';
import EmailInput from '@/components/UI/FormFields/EmailInput';
import PasswordInput from '@/components/UI/FormFields/PasswordInput';
import SimpleCheckbox from '@/components/UI/FormFields/SimpleCheckbox';
import SimpleInput from '@/components/UI/FormFields/SimpleInput';
import SimpleSelect from '@/components/UI/FormFields/SimpleSelect';
import { Typography } from '@/components/UI/Typography';
import { countries } from '@/constants';
import { CustomerData } from '@/types/types';

import s from './RegisterPage.module.scss';

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { message } = useSelector(selectMessage);
  const { isLoggedIn } = useSelector(selectAuth);

  const [checkedShipBillAddress, setCheckedShipBillAddress] = useState(false);
  const [checkedShipDefAddress, setCheckedShipDefAddress] = useState(true);
  const [checkedBillDefAddress, setCheckedBillDefAddress] = useState(true);
  const [formError, setFormError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const currentDate = new Date();

  const thirteenYearsAgo = new Date(
    currentDate.getFullYear() - 13,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const minDate = new Date(1900, 1, 1);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required.')
      .email('Invalid email (e.g., example@example.com)')
      .test('is-valid', 'Invalid email (e.g., example@example.com)', (value) =>
        value
          ? isEmail(value)
          : new yup.ValidationError('Invalid email (e.g., example@example.com)')
      ),
    password: yup
      .string()
      .required('Password is required.')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter (e.g., [A-Z])')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter (e.g., [a-z])')
      .matches(/[0-9]/, 'Password must contain at least one digit (e.g., [0-9])')
      .matches(
        /[!@#$%^&*]/,
        'Password must contain at least one special character (e.g., !@#$%^&*)'
      )
      .matches(/^\S*$/, 'Password cannot contain spaces.'),
    firstName: yup
      .string()
      .required('First name is required.')
      .matches(/^[a-zA-Z]+$/, 'First name cannot contain special characters or numbers.'),
    lastName: yup
      .string()
      .required('Last name is required.')
      .matches(/^[a-zA-Z]+$/, 'Last name cannot contain special characters or numbers.'),
    dateOfBirth: yup
      .date()
      .max(thirteenYearsAgo)
      .min(minDate)
      .typeError('Please enter a valid date.')
      .required('Date is required.'),
    shippingStreet: yup
      .string()
      .required('Street is required.')
      .max(100, 'Street must be at most 100 characters.'),
    shippingCity: yup
      .string()
      .required('City is required.')
      .max(100, 'City must be at most 100 characters.')
      .matches(/^[a-zA-Z]+$/, 'City cannot contain special characters or numbers.'),
    shippingPostalCode: yup
      .string()
      .required('Postal code is required.')
      .matches(/^(?:NL-)?(\d{4})\s*([A-Z]{2})$/i, 'Invalid postal code (e.g., 2378AP)'),
    shippingCountry: yup.string().required('Country is required.'),
    billingStreet: yup
      .string()
      .max(100, 'Street must be at most 100 characters.')
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
      .max(100, 'City must be at most 100 characters.')
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
              message: 'City cannot contain special characters or numbers.',
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

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerData>({
    resolver: yupResolver(schema) as unknown as Resolver<CustomerData>,
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      shippingStreet: '',
      shippingCity: '',
      shippingPostalCode: '',
      shippingCountry: '',
      shippingBillingAddress: false,
      shippingDefaultAddress: true,
      billingStreet: '',
      billingCity: '',
      billingPostalCode: '',
      billingCountry: '',
      billingDefaultAddress: true,
    },
    mode: 'onChange',
  } as UseFormProps<CustomerData>);

  const onSubmit = (data: CustomerData) => {
    setIsSuccess(false);
    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        dispatch(loginUser(data))
          .unwrap()
          .then(() => {
            dispatch(getUser());
          })
          .then(() => {
            setIsSuccess(true);
          })
          .catch(() => {
            setIsSuccess(false);
          });
      })
      .catch(() => {
        setIsSuccess(false);
      });
  };

  const onClickSubmit = () => {
    setFormError(false);
    if (
      errors.email ||
      errors.password ||
      errors.lastName ||
      errors.firstName ||
      errors.dateOfBirth ||
      errors.shippingStreet ||
      errors.shippingCity ||
      errors.shippingPostalCode ||
      errors.shippingCountry ||
      errors.billingStreet ||
      errors.billingCity ||
      errors.billingPostalCode ||
      errors.billingCountry
    ) {
      setFormError(true);
    }
  };

  return (
    <main>
      <div className={s.container}>
        <div className={clsx(s.elements__flow, s.signin__header, s.signin__header_flow)}>
          <div className={clsx(s.form__element, s.signin__header_element, s.header__img)}></div>
          <div className={clsx(s.form__element, s.signin__header_element, s.header__message)}>
            <Typography variant="h2">
              Welcome! Create
              <br /> your account now
            </Typography>
            <div className={s.login__container}>
              <span className={s.login__text}>Already have an account?</span>
              <Button
                className={s.login__btn}
                variant="secondary"
                onClick={() => {
                  const path = '/login';
                  navigate(path);
                }}
              >
                LOG IN
              </Button>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={clsx(s.elements__flow)}>
          <div className={clsx(s.form__element, s.form__element_left)}>
            <Typography variant="h2" className={s.form__title_size}>
              1. Account Info
            </Typography>
          </div>
          <div className={clsx(s.form__element, s.form__element_flow)}>
            <EmailInput register={register} errors={errors} />
            <PasswordInput
              register={register}
              name="password"
              err={errors.password}
              errMessage={errors.password?.message}
              label="Password *"
              id="password-reg"
            />
          </div>
        </div>
        <div className={clsx(s.elements__flow)}>
          <div className={clsx(s.form__element, s.form__element_left)}>
            <Typography variant="h2" className={s.form__title_size}>
              2. User Info
            </Typography>
          </div>
          <div className={clsx(s.form__element, s.form__element_flow)}>
            <SimpleInput
              register={register}
              errors={errors}
              err={errors.firstName}
              errMessage={errors.firstName?.message}
              name="firstName"
              label="First name *"
              id="firstName-input"
            />
            <SimpleInput
              register={register}
              errors={errors}
              err={errors.lastName}
              errMessage={errors.lastName?.message}
              name="lastName"
              label="Last name *"
              id="lastName-input"
            />
            <BirthDateInput
              register={register}
              errors={errors}
              control={control}
              reset={reset}
              defaultValue={new Date('01-01-2010')}
            />
          </div>
        </div>
        <div className={clsx(s.elements__flow)}>
          <div
            className={clsx(s.form__element, s.form__element_left, s.no__border_bottom_shipping)}
          >
            <Typography variant="h2" className={s.form__title_size}>
              3. Shipping Address
            </Typography>
          </div>
          <div className={clsx(s.form__element, s.form__element_flow, s.no__border_bottom)}>
            <SimpleInput
              register={register}
              errors={errors}
              err={errors.shippingStreet}
              errMessage={errors.shippingStreet?.message}
              name="shippingStreet"
              label="Street *"
              id="street-input"
            />
            <SimpleInput
              register={register}
              errors={errors}
              err={errors.shippingCity}
              errMessage={errors.shippingCity?.message}
              name="shippingCity"
              label="City *"
              id="shipping-input"
            />
            <div className={s.two__items_container}>
              <SimpleInput
                register={register}
                errors={errors}
                err={errors.shippingPostalCode}
                errMessage={errors.shippingPostalCode?.message}
                name="shippingPostalCode"
                label="Postal Code *"
                id="shippingPostalCode-input"
              />
              <SimpleSelect
                register={register}
                errors={errors}
                err={errors.shippingCountry}
                errMessage={errors.shippingCountry?.message}
                name="shippingCountry"
                label="Country *"
                id="shippingCountry-input"
                selectData={countries}
                defaultValue=""
              />
            </div>
            <div className={s.checkboxes_container}>
              <SimpleCheckbox
                id="shippingBillingAddress"
                register={register}
                name="shippingBillingAddress"
                label="Set as default billing address"
                isChecked={checkedShipBillAddress}
                setChecked={setCheckedShipBillAddress}
              />
              <SimpleCheckbox
                id="shippingDefaultAddress"
                register={register}
                name="shippingDefaultAddress"
                label="Set as default shipping address"
                isChecked={checkedShipDefAddress}
                setChecked={setCheckedShipDefAddress}
              />
            </div>
            {checkedShipBillAddress ? (
              <div className={s.submit__btn__container}>
                <Button type="submit" full={true} variant="primary" onClick={onClickSubmit}>
                  JOIN US
                </Button>
                <div className={s.alert_position}>
                  {formError ? (
                    <Alert variant="outlined" severity="error">
                      Something went wrong - please check the form!
                    </Alert>
                  ) : null}
                  {isSuccess ? (
                    <Alert severity="success" variant="outlined">
                      Registration was successful!
                    </Alert>
                  ) : null}
                  {message ? (
                    <Alert variant="outlined" severity="error">
                      {message}
                    </Alert>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {checkedShipBillAddress ? null : (
          <div className={clsx(s.elements__flow)}>
            <div
              className={clsx(
                s.form__element,
                s.form__element_left,
                s.no__border_bottom,
                s.add__border_top
              )}
            >
              <Typography variant="h2" className={s.form__title_size}>
                4. Billing Address
              </Typography>
            </div>
            <div
              className={clsx(
                s.form__element,
                s.form__element_flow,
                s.no__border_bottom,
                s.add__border_top
              )}
            >
              <SimpleInput
                register={register}
                errors={errors}
                err={errors.billingStreet}
                errMessage={errors.billingStreet?.message}
                name="billingStreet"
                label="Street *"
                id="billing-street-input"
              />
              <SimpleInput
                register={register}
                errors={errors}
                err={errors.billingCity}
                errMessage={errors.billingCity?.message}
                name="billingCity"
                label="City *"
                id="billing-shipping-input"
              />
              <div className={s.two__items_container}>
                <SimpleInput
                  register={register}
                  errors={errors}
                  err={errors.billingPostalCode}
                  errMessage={errors.billingPostalCode?.message}
                  name="billingPostalCode"
                  label="Postal Code *"
                  id="billingPostalCode-input"
                />
                <SimpleSelect
                  register={register}
                  errors={errors}
                  err={errors.billingCountry}
                  errMessage={errors.billingCountry?.message}
                  name="billingCountry"
                  label="Country *"
                  id="billingCountry-input"
                  selectData={countries}
                  defaultValue=""
                />
              </div>
              <div className={s.checkboxes_container}>
                <SimpleCheckbox
                  id="billingDefaultAddress"
                  register={register}
                  name="billingDefaultAddress"
                  label="Set as default billing address"
                  isChecked={checkedBillDefAddress}
                  setChecked={setCheckedBillDefAddress}
                />
              </div>
              {checkedShipBillAddress ? null : (
                <div className={s.submit__btn__container}>
                  <Button full={true} type="submit" variant="primary" onClick={onClickSubmit}>
                    JOIN US
                  </Button>
                  <div className={s.alert_position}>
                    {formError ? (
                      <Alert variant="outlined" severity="error">
                        Something went wrong - please check the form!
                      </Alert>
                    ) : null}
                    {isSuccess ? (
                      <Alert severity="success" variant="outlined">
                        Registration was successful!
                      </Alert>
                    ) : null}
                    {message ? (
                      <Alert variant="outlined" severity="error">
                        {message}
                      </Alert>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </form>
    </main>
  );
};
export default RegisterPage;
