import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, UseFormProps, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import s from './ProfilePage.module.scss';

import SimpleInput from '../../components/UI/FormFields/SimpleInput';
import BirthDateInput from '../../components/UI/FormFields/BirthDateInput';
import Button from '../../components/UI/Button';
import ProfileEditBlock from './ProfileEditBlock/';
import ProfileAddressBlock from './ProfileAddressBlock';
import NewAddressBlock from './NewAddressBlock';
import EmailForm from './EmailEditBlock';

import { Typography } from '../../components/UI/Typography';
import { CustomerData, ProfileAddress } from '../../types/types';

import FormTheme from '../../themes/FormTheme';
import { ThemeProvider } from '@mui/material/styles';

import * as yup from 'yup';

import { RootState, AppDispatch } from '../../app/store';
import {
  setIsDisabledFirstName,
  setIsDisabledLastName,
  setIsDisabledDateOfBirth,
  setDisabledAllFields,
} from '../../app/slices/profile';
import { clearMessage } from '../../app/slices/message';
import { getUser } from '../../app/slices/auth';
import { updateUser } from '../../app/slices/profile';

const ProfilePage: React.FC = () => {
  const [cancelSubmit, setCancelSubmit] = useState(false);
  const [formError, setFormError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCancelledAddShippingAddress, setIsCancelledAddShippingAddress] = useState(true);
  const [isCancelledAddBillingAddress, setIsCancelledAddBillingAddress] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const { message } = useSelector((state: RootState) => state.message);
  const { isDisabledFirstName, isDisabledLastName, isDisabledDateOfBirth } = useSelector(
    (state: RootState) => state.profile
  );

  const newShippingAddressBlockRef = useRef<HTMLDivElement | null>(null);
  const newBillingAddressBlockRef = useRef<HTMLDivElement | null>(null);

  const scrollToNewShippingAddressBlockRef = () => {
    if (newShippingAddressBlockRef.current) {
      newShippingAddressBlockRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToNewBillingAddressBlockRef = () => {
    if (newBillingAddressBlockRef.current) {
      newBillingAddressBlockRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
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
    setFocus,
    formState: { errors },
  } = useForm<CustomerData>({
    resolver: yupResolver(schema) as unknown as Resolver<CustomerData>,
    defaultValues: {
      password: user ? user.password : '',
      firstName: user ? user.firstName : '',
      lastName: user ? user.lastName : '',
    },
    mode: 'onChange',
  } as UseFormProps<CustomerData>);

  useEffect(() => {
    if (!isDisabledFirstName) {
      setFocus('firstName');
    }
    if (!isDisabledLastName) {
      setFocus('lastName');
    }
  }, [setFocus, isDisabledFirstName, isDisabledLastName]);

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
    if (errors.firstName || errors.lastName || errors.dateOfBirth || errors.addresses) {
      setFormError(true);
    }
  };
  const onClickCancel = () => {
    dispatch(setDisabledAllFields());
    setCancelSubmit(!cancelSubmit);
    setIsSuccess(false);
    setFormError(false);
    dispatch(clearMessage());
    reset({
      password: user ? user.password : '',
      firstName: user ? user.firstName : '',
      lastName: user ? user.lastName : '',
      dateOfBirth: user && user.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
    });
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
  const handleAddShippingAddress = () => {
    setIsCancelledAddShippingAddress(!isCancelledAddShippingAddress);
    setTimeout(() => {
      scrollToNewShippingAddressBlockRef();
    }, 0);
  };
  const handleAddBillingAddress = () => {
    setIsCancelledAddBillingAddress(!isCancelledAddBillingAddress);
    setTimeout(() => {
      scrollToNewBillingAddressBlockRef();
    }, 0);
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
      <div className={clsx(s.elements__flow)}>
        <div className={clsx(s.form__element, s.form__element_left)}>
          <Typography variant="h2" className={s.form__title_size}>
            1. Account Info
          </Typography>
        </div>
        <div className={clsx(s.form__element, s.form__element_flow)}>
          <EmailForm key={'email-form'} />
        </div>
      </div>
      <ThemeProvider theme={FormTheme}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
      <div className={clsx(s.elements__flow)}>
        <div className={clsx(s.form__element, s.form__element_left)}>
          <div className={s.address_addBtn}>
            <Typography variant="h2" className={s.form__title_size}>
              3. Shipping Address
            </Typography>
            {isCancelledAddShippingAddress && user && user.shippingAddressIds?.length !== 0 ? (
              <Button type="submit" variant="primary" onClick={handleAddShippingAddress}>
                ADD ADDRESS
              </Button>
            ) : null}
          </div>
        </div>
        <div className={clsx(s.form__element, s.form__element_flow)}>
          {user && user.addresses && user.shippingAddressIds
            ? user.shippingAddressIds.map((id, index) => {
                const address: ProfileAddress | undefined = user.addresses.find(
                  (address) => address.id === id
                );
                return address !== undefined && address.id === user.defaultShippingAddressId ? (
                  <ProfileAddressBlock
                    key={address.id}
                    address={address}
                    indexMap={index}
                    user={user}
                    typeAddress={'shipping'}
                  />
                ) : null;
              })
            : null}
          {user && user.addresses && user.shippingAddressIds
            ? user.shippingAddressIds.map((id, index) => {
                const address: ProfileAddress | undefined = user.addresses.find(
                  (address) => address.id === id
                );
                return address !== undefined && address.id !== user.defaultShippingAddressId ? (
                  <ProfileAddressBlock
                    key={address.id}
                    address={address}
                    indexMap={index}
                    user={user}
                    typeAddress={'shipping'}
                  />
                ) : null;
              })
            : null}
          {user && user.shippingAddressIds?.length === 0 && isCancelledAddShippingAddress ? (
            <div className={clsx(s.address_addBtn, s.add_pb)}>
              <Typography variant="h4" className={s.dont_have_address_message}>
                You don&#96;t have a shipping address, would you like to add one?
              </Typography>
              <Button type="submit" variant="primary" onClick={handleAddShippingAddress}>
                ADD ADDRESS
              </Button>
            </div>
          ) : null}
          {user && !isCancelledAddShippingAddress ? (
            <div ref={newShippingAddressBlockRef} className={s.width_full}>
              <NewAddressBlock
                user={user}
                typeAddress={'shipping'}
                setIsCancelledAdd={setIsCancelledAddShippingAddress}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className={clsx(s.elements__flow)}>
        <div className={clsx(s.form__element, s.form__element_left, s.no__border_bottom_billing)}>
          <div className={s.address_addBtn}>
            <Typography variant="h2" className={s.form__title_size}>
              4. Billing Address
            </Typography>
            {isCancelledAddBillingAddress && user && user.billingAddressIds?.length !== 0 ? (
              <Button type="submit" variant="primary" onClick={handleAddBillingAddress}>
                ADD ADDRESS
              </Button>
            ) : null}
          </div>
        </div>
        <div className={clsx(s.form__element, s.form__element_flow, s.no__border_bottom)}>
          {user && user.addresses && user.billingAddressIds
            ? user.billingAddressIds.map((id, index) => {
                const address: ProfileAddress | undefined = user.addresses.find(
                  (address) => address.id === id
                );
                return address !== undefined && address.id === user.defaultBillingAddressId ? (
                  <ProfileAddressBlock
                    key={address.id}
                    address={address}
                    indexMap={index}
                    user={user}
                    typeAddress={'billing'}
                  />
                ) : null;
              })
            : null}
          {user && user.addresses && user.billingAddressIds
            ? user.billingAddressIds.map((id, index) => {
                const address: ProfileAddress | undefined = user.addresses.find(
                  (address) => address.id === id
                );
                return address !== undefined && address.id !== user.defaultBillingAddressId ? (
                  <ProfileAddressBlock
                    key={address.id}
                    address={address}
                    indexMap={index}
                    user={user}
                    typeAddress={'billing'}
                  />
                ) : null;
              })
            : null}
          {user && user.billingAddressIds?.length === 0 && isCancelledAddBillingAddress ? (
            <div className={clsx(s.address_addBtn, s.add_pb)}>
              <Typography variant="h4" className={s.dont_have_address_message}>
                You don&#96;t have a billing address, would you like to add one?
              </Typography>
              <Button type="submit" variant="primary" onClick={handleAddBillingAddress}>
                ADD ADDRESS
              </Button>
            </div>
          ) : null}
          {user && !isCancelledAddBillingAddress ? (
            <div ref={newBillingAddressBlockRef} className={s.width_full}>
              <NewAddressBlock
                user={user}
                typeAddress={'billing'}
                setIsCancelledAdd={setIsCancelledAddBillingAddress}
              />
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
};
export default ProfilePage;
