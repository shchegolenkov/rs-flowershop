import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './ProfilePage.module.scss';
import clsx from 'clsx';

import { Typography } from '../../components/UI/Typography';
import ProfileEditBlock from './ProfileEditBlock/';
import EmailInput from '../../components/UI/FormFields/EmailInput';
import SimpleInput from '../../components/UI/FormFields/SimpleInput';
import BirthDateInput from '../../components/UI/FormFields/BirthDateInput';
import Button from '../../components/UI/Button';
import { validateEmail } from '../../utils/validators';
import { CustomerData } from '../../types/types';

import FormTheme from '../../themes/FormTheme';
import { ThemeProvider } from '@mui/material/styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Resolver, useForm, UseFormProps } from 'react-hook-form';

import { RootState, AppDispatch } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsDisabledFirstName,
  setIsDisabledLastName,
  setIsDisabledDateOfBirth,
  setDisabledAllFields,
  setIsDisabledEmail,
} from '../../app/slices/profile';
import { clearMessage } from '../../app/slices/message';
import { getUser, updateUser } from '../../app/slices/auth';

const ProfilePage: React.FC = () => {
  const [cancelSubmit, setCancelSubmit] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const { message } = useSelector((state: RootState) => state.message);
  const { isDisabledEmail, isDisabledFirstName, isDisabledLastName, isDisabledDateOfBirth } =
    useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    dispatch(getUser());
    dispatch(clearMessage());
  }, [dispatch, cancelSubmit]);
  const currentDate = new Date();
  const thirteenYearsAgo = new Date(
    currentDate.getFullYear() - 13,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const minDate = new Date(1900, 1, 1);

  const schema = yup.object().shape({
    email: isDisabledEmail
      ? yup.string()
      : yup
          .string()
          .required('Email is required.')
          .email('Invalid email (e.g., example@example.com)')
          .matches(/^[^@]+@[^.]+\..+$/, 'Email should contain a dot in the domain')
          .test('custom-email-validation', `${emailError}`, (value) => {
            return validateEmail(value as string, setEmailError);
          })
          .test('not-default-email', 'Email should not be the previous value', (value) => {
            if (user) {
              return value !== user.email;
            }
          }),

    firstName: isDisabledFirstName
      ? yup.string()
      : yup
          .string()
          .required('First name is required.')
          .matches(/^[a-zA-Z]+$/, 'First name cannot contain special characters or numbers.'),

    lastName: isDisabledLastName
      ? yup.string()
      : yup
          .string()
          .required('Last name is required.')
          .matches(/^[a-zA-Z]+$/, 'Last name cannot contain special characters or numbers.'),

    dateOfBirth: isDisabledDateOfBirth
      ? yup.string()
      : yup
          .date()
          .max(thirteenYearsAgo)
          .min(minDate)
          .typeError('Please enter a valid date.')
          .required('Date is required.'),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerData>({
    resolver: yupResolver(schema) as unknown as Resolver<CustomerData>,
    mode: 'onChange',
  } as UseFormProps<CustomerData>);

  const onSubmit = (data: CustomerData) => {
    if (user) {
      dispatch(updateUser(data))
        .then((response) => {
          if (response.meta.requestStatus === 'rejected') {
            setIsSuccess(false);
            reset({ email: user ? user.email : '' });
          } else setIsSuccess(true);
        })
        .then(() => {
          dispatch(getUser());
        })
        .then(() => {
          setTimeout(() => {
            dispatch(clearMessage());
            setIsSuccess(false);
            dispatch(setDisabledAllFields());
          }, 4000);
        });
    }
  };

  const onClickSubmit = () => {
    setFormError(false);
    if (errors.email || errors.firstName || errors.lastName || errors.dateOfBirth) {
      setFormError(true);
    }
  };
  const onClickCancel = () => {
    dispatch(setDisabledAllFields());
    setCancelSubmit(!cancelSubmit);
    setIsSuccess(false);
    dispatch(clearMessage());
    reset();
    reset({
      dateOfBirth: user && user.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
    });
  };

  const handleEmailClick = () => {
    dispatch(setIsDisabledEmail());
    if (!isDisabledEmail) {
      reset({ email: user ? user.email : '' });
    }
  };

  const handleFirstNameClick = () => {
    dispatch(setIsDisabledFirstName());
    if (!isDisabledFirstName) {
      reset({ firstName: user ? user.firstName : '' });
    }
  };

  const handleLastNameClick = () => {
    dispatch(setIsDisabledLastName());
    if (!isDisabledLastName) {
      reset({ lastName: user ? user.lastName : '' });
    }
  };
  const handleDateOfBirthClick = () => {
    dispatch(setIsDisabledDateOfBirth());
    if (!isDisabledDateOfBirth) {
      reset({
        dateOfBirth: user && user.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
      });
    }
  };

  return (
    <main>
      <div className={s.container}>
        <div className={clsx(s.elements__flow, s.profile__header, s.profile__header_flow)}>
          <div className={clsx(s.form__element, s.profile__header_element, s.header__img)}></div>
          <div className={clsx(s.form__element, s.profile__header_element, s.header__message)}>
            <Typography variant="h2">Profile Account</Typography>
          </div>
        </div>
      </div>
      <ThemeProvider theme={FormTheme}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={clsx(s.elements__flow)}>
            <div className={clsx(s.form__element, s.form__element_left)}>
              <Typography variant="h2" className={s.form__title_size}>
                1. Account Info
              </Typography>
            </div>
            <div className={clsx(s.form__element, s.form__element_flow)}>
              <EmailInput
                register={register}
                errors={errors}
                defaultValue={user ? user.email : ''}
                isEditField={true}
                isDisabled={isDisabledEmail}
                switchEditModeField={handleEmailClick}
              />
              <Button
                full={true}
                type="button"
                variant="secondary"
                onClick={() => {
                  const path = '/password';
                  navigate(path);
                }}
                className={s.change_password_btn}
              >
                CHANGE PASSWORD
              </Button>
              {!isDisabledEmail ? (
                <ProfileEditBlock
                  onClickSubmit={onClickSubmit}
                  onClickCancel={onClickCancel}
                  formError={formError}
                  isSuccess={isSuccess}
                  message={message}
                />
              ) : null}
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
                name={'firstName'}
                label="First name *"
                id="firstName-input"
                defaultValue={user ? user.firstName : ''}
                isEditField={true}
                isDisabled={isDisabledFirstName}
                switchEditModeField={handleFirstNameClick}
              />
              <SimpleInput
                register={register}
                errors={errors}
                err={errors.lastName}
                errMessage={errors.lastName?.message}
                name={'lastName'}
                label="Last name *"
                id="lastName-input"
                defaultValue={user ? user.lastName : ''}
                isEditField={true}
                isDisabled={isDisabledLastName}
                switchEditModeField={handleLastNameClick}
              />
              <BirthDateInput
                register={register}
                errors={errors}
                control={control}
                reset={reset}
                defaultValue={user && user.dateOfBirth ? new Date(user.dateOfBirth) : null}
                isEditField={true}
                isDisabled={isDisabledDateOfBirth}
                switchEditModeField={handleDateOfBirthClick}
              />
              {!isDisabledFirstName || !isDisabledLastName || !isDisabledDateOfBirth ? (
                <div className={clsx(s.width_full)}>
                  <ProfileEditBlock
                    onClickSubmit={onClickSubmit}
                    onClickCancel={onClickCancel}
                    formError={formError}
                    isSuccess={isSuccess}
                    message={message}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </ThemeProvider>
    </main>
  );
};
export default ProfilePage;
