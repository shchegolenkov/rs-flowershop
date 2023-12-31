import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, UseFormProps, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import s from '../ProfilePage.module.scss';

import SimpleInput from '../../../components/UI/FormFields/SimpleInput';
import SimpleSelect from '../../../components/UI/FormFields/SimpleSelect';
import SimpleCheckbox from '../../../components/UI/FormFields/SimpleCheckbox';
import Button from '../../../components/UI/Button';
import { Typography } from '../../../components/UI/Typography';
import Alert from '@mui/material/Alert';

import { countries } from '../../../constants/const';
import { AddressAction, ApiResponse, ProfileForm, User } from '../../../types/types';

import { getUser } from '../../../app/slices/auth';
import {
  setDefaultShippingAddress,
  setDefaultBillingAddress,
  addAddress,
  addShippingBillingAddresses,
} from '../../../app/slices/profile';
import { clearMessage } from '../../../app/slices/message';

import FormTheme from '../../../themes/FormTheme';
import { ThemeProvider } from '@mui/material/styles';

import * as yup from 'yup';

import { AppDispatch, RootState } from '../../../app/store';

interface ProfileEditBlockProps {
  user: User;
  typeAddress: AddressAction;
  setIsCancelledAdd: (value: boolean) => void;
}

const AddNewAddressBlock: React.FC<ProfileEditBlockProps> = ({
  user,
  typeAddress,
  setIsCancelledAdd,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { message } = useSelector((state: RootState) => state.message);
  const [formError, setFormError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [checkedShipBillAddress, setCheckedShipBillAddress] = useState(false);
  const [checkedBillShipAddress, setCheckedBillShipAddress] = useState(false);
  const [checkedShipDefAddress, setCheckedShipDefAddress] = useState(false);
  const [checkedBillDefAddress, setCheckedBillDefAddress] = useState(false);

  const schema = yup.object().shape({
    streetName: yup
      .string()
      .required('Street is required.')
      .max(100, 'Street must be at most 100 characters.'),
    postalCode: yup
      .string()
      .required('Postal code is required.')
      .matches(/^(?:NL-)?(\d{4})\s*([A-Z]{2})$/i, 'Invalid postal code (e.g., 2378AP)'),
    country: yup.string().required('Country is required.'),
    city: yup
      .string()
      .required('City is required.')
      .max(100, 'City must be at most 100 characters.')
      .matches(/^[a-zA-Z]+$/, 'City cannot contain special characters or numbers.'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: yupResolver(schema) as unknown as Resolver<ProfileForm>,
    defaultValues: {
      streetName: '',
      postalCode: '',
      country: '',
      city: '',
      id: '',
    },
    mode: 'onChange',
  } as UseFormProps<ProfileForm>);

  const checkResponse = (apiResponse: ApiResponse) => {
    if (apiResponse && apiResponse.meta.requestStatus === 'rejected') {
      setIsSuccess(false);
    } else setIsSuccess(true);
  };

  const onSubmit = async (data: ProfileForm) => {
    data.id = user.id;
    data.typeAddress = typeAddress;

    if (user) {
      try {
        const response = await dispatch(addAddress(data));
        if (response.meta.requestStatus === 'rejected') {
          setIsSuccess(false);
          return;
        }

        setIsSuccess(true);
        await dispatch(getUser());

        const newAddressId = localStorage.getItem('addAddressId');
        if (!newAddressId) {
          return;
        }
        const newData = {
          typeAddress: typeAddress,
          id: newAddressId,
        };
        const apiResponse = await dispatch(addShippingBillingAddresses(newData));
        checkResponse(apiResponse as ApiResponse);
        await dispatch(getUser());
        if (typeAddress === 'shipping' && checkedShipBillAddress) {
          const newData = {
            typeAddress: 'billing',
            id: newAddressId,
          };
          const apiResponse = await dispatch(addShippingBillingAddresses(newData));
          if (apiResponse && apiResponse.meta.requestStatus === 'rejected') {
            setIsSuccess(false);
          } else setIsSuccess(true);
        }
        await dispatch(getUser());
        if (typeAddress === 'billing' && checkedBillShipAddress) {
          const newData = {
            typeAddress: 'shipping',
            id: newAddressId,
          };
          const apiResponse = await dispatch(addShippingBillingAddresses(newData));
          checkResponse(apiResponse as ApiResponse);
        }
        await dispatch(getUser());
        if (typeAddress === 'shipping' && checkedShipDefAddress) {
          const newData = data;
          newData.id = newAddressId;
          const apiResponse = await dispatch(setDefaultShippingAddress(newData));
          checkResponse(apiResponse as ApiResponse);
        }
        await dispatch(getUser());
        if (typeAddress === 'billing' && checkedBillDefAddress) {
          const newData = data;
          newData.id = newAddressId;
          const apiResponse = await dispatch(setDefaultBillingAddress(newData));
          checkResponse(apiResponse as ApiResponse);
        }
        await dispatch(getUser());

        setTimeout(() => {
          localStorage.removeItem('addAddressId');
          dispatch(clearMessage());
          setIsSuccess(false);
          setIsCancelledAdd(true);
        }, 2000);
      } catch (error) {
        console.error('Failed to add Address:', error);
      }
    }
  };

  const onClickSubmit = () => {
    setFormError(false);
    if (errors.streetName || errors.postalCode || errors.country || errors.city) {
      setFormError(true);
    }
  };
  const onClickCancel = () => {
    setIsSuccess(false);
    dispatch(clearMessage());
    setIsCancelledAdd(true);
    reset();
  };

  const addressName = () => {
    let message = '';
    if (typeAddress === 'shipping') {
      message = `Add Shipping Address`;
    }
    if (typeAddress === 'billing') {
      message = `Add Billing Address`;
    }

    return (
      <div className={s.address_control}>
        <Typography variant="h4" className={s.form__title_size}>
          {message}
        </Typography>
      </div>
    );
  };

  return (
    <ThemeProvider theme={FormTheme}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.width_full}>
        {typeAddress === 'shipping' || typeAddress === 'billing' ? addressName() : null}
        <SimpleInput
          register={register}
          errors={errors}
          err={errors.streetName}
          errMessage={errors.streetName?.message}
          name={`streetName`}
          label="Street *"
          id={`streetName-${user.id}`}
        />
        <SimpleInput
          register={register}
          errors={errors}
          err={errors.city}
          errMessage={errors.city?.message}
          name={`city`}
          label="City *"
          id={`city-${user.id}`}
        />
        <div className={s.two__items_container}>
          <SimpleInput
            register={register}
            errors={errors}
            err={errors.postalCode}
            errMessage={errors.postalCode?.message}
            name={`postalCode`}
            label="Postal Code *"
            id={`postalCode-${user.id}`}
          />
          <SimpleSelect
            register={register}
            errors={errors}
            err={errors.country}
            errMessage={errors.country?.message}
            name={'country'}
            label="Country *"
            id={`country-${user.id}`}
            selectData={countries}
          />
        </div>
        {typeAddress === 'shipping' ? (
          <div className={s.checkboxes_container}>
            <SimpleCheckbox
              id="shippingBillingAddress"
              register={register}
              name={'shippingBillingAddress'}
              label="Set as billing address"
              isChecked={checkedShipBillAddress}
              setChecked={setCheckedShipBillAddress}
            />
            <SimpleCheckbox
              id="shippingDefaultAddress"
              register={register}
              name={'shippingDefaultAddress'}
              label="Set as default shipping address"
              isChecked={checkedShipDefAddress}
              setChecked={setCheckedShipDefAddress}
            />
          </div>
        ) : null}
        {typeAddress === 'billing' ? (
          <div className={s.checkboxes_container}>
            <SimpleCheckbox
              id="billingShippingAddress"
              register={register}
              name={'billingShippingAddress'}
              label="Set as shipping address"
              isChecked={checkedBillShipAddress}
              setChecked={setCheckedBillShipAddress}
            />
            <SimpleCheckbox
              id="billingDefaultAddress"
              register={register}
              name={'billingDefaultAddress'}
              label="Set as default billing address"
              isChecked={checkedBillDefAddress}
              setChecked={setCheckedBillDefAddress}
            />
          </div>
        ) : null}
        <div className={clsx(s.width_full)}>
          <div className={s.submit__btn__container}>
            <div className={s.save_edit_container}>
              <Button type="submit" variant="primary" onClick={onClickSubmit}>
                ADD ADDRESS
              </Button>
              <Button type="button" variant="underlined" onClick={onClickCancel}>
                Cancel
              </Button>
            </div>
            <div className={s.alert_position}>
              {formError ? (
                <Alert variant="outlined" severity="error">
                  Something went wrong - please check the form!
                </Alert>
              ) : null}
              {isSuccess ? (
                <Alert severity="success" variant="outlined">
                  Address was added successfully!
                </Alert>
              ) : null}
              {message ? (
                <Alert variant="outlined" severity="error">
                  {message}
                </Alert>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default AddNewAddressBlock;
