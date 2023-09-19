import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, UseFormProps, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import * as yup from 'yup';

import s from '../ProfilePage.module.scss';

import FormTheme from '../../../themes/FormTheme';
import { ThemeProvider } from '@mui/material/styles';
import EmailInput from '../../../components/UI/FormFields/EmailInput';
import Button from '../../../components/UI/Button';

import { RootState, AppDispatch } from '../../../app/store';
import { setIsDisabledEmail } from '../../../app/slices/profile';
import { clearMessage } from '../../../app/slices/message';
import { getUser } from '../../../app/slices/auth';
import { updateUser } from '../../../app/slices/profile';
import { CustomerData } from '../../../types/types';
import ProfileEditBlock from '../ProfileEditBlock';

const EmailForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [cancelSubmit, setCancelSubmit] = useState(false);
  const [formError, setFormError] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);
  const { message } = useSelector((state: RootState) => state.message);
  const { isDisabledEmail } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(getUser());
    dispatch(clearMessage());
  }, [dispatch, cancelSubmit]);

  const onClickSubmit = () => {
    setFormError(false);
    if (errors.email) {
      setFormError(true);
    }
  };
  const onClickCancel = () => {
    dispatch(setIsDisabledEmail());
    setCancelSubmit(!cancelSubmit);
    setIsSuccess(false);
    setFormError(false);
    dispatch(clearMessage());
    reset({
      email: user && user.email ? user.email : '',
    });
  };

  const schema = yup.object().shape({
    email: isDisabledEmail
      ? yup.string()
      : yup
          .string()
          .required('Email is required.')
          .email('Invalid email (e.g., example@example.com)')
          .test('is-valid', 'Invalid email (e.g., example@example.com)', (value) =>
            value
              ? isEmail(value)
              : new yup.ValidationError('Invalid email (e.g., example@example.com)')
          )
          .test('not-default-email', 'Email should not be the previous value', (value) => {
            if (user) {
              return value !== user.email;
            }
          }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerData>({
    resolver: yupResolver(schema) as unknown as Resolver<CustomerData>,
    defaultValues: {
      email: user ? user.email : '',
    },
    mode: 'onChange',
  } as UseFormProps<CustomerData>);

  const onSubmit = async (data: CustomerData) => {
    if (user) {
      try {
        const response = await dispatch(updateUser(data));
        if (!response.payload) {
          setIsSuccess(false);
          return;
        }
        setIsSuccess(true);
        await dispatch(getUser());
        setTimeout(() => {
          dispatch(clearMessage());
          dispatch(setIsDisabledEmail());
          setIsSuccess(false);
        }, 3000);
      } catch (error) {}
    }
  };

  const handleEmailClick = () => {
    dispatch(setIsDisabledEmail());
    reset({
      email: user && user.email ? user.email : '',
    });
  };

  return (
    <ThemeProvider theme={FormTheme}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.width_full}>
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
            const path = '/profile/change-password';
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
      </form>
    </ThemeProvider>
  );
};

export default EmailForm;
