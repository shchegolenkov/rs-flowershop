import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, UseFormProps, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import s from '../ProfilePage.module.scss';

import SimpleInput from '../../../components/UI/FormFields/SimpleInput';
import SimpleSelect from '../../../components/UI/FormFields/SimpleSelect';
import SimpleCheckbox from '../../../components/UI/FormFields/SimpleCheckbox';
import { Typography } from '../../../components/UI/Typography';
import EditIco from '../../../assets/svg/edit.svg';
import EditIcoActive from '../../../assets/svg/editActive.svg';
import EditIcoErr from '../../../assets/svg/editErr.svg';
import DeleteAddress from '../../../assets/svg/delAddress.svg';

import { countries } from '../../../constants/const';
import { AddressAction, ProfileAddress, ProfileForm, User } from '../../../types/types';
import ProfileEditBlock from '../ProfileEditBlock';

import { getUser } from '../../../app/slices/auth';
import {
  updateUserAddress,
  updateBillingAddress,
  updateShippingAddress,
  setDefaultShippingAddress,
  setDefaultBillingAddress,
  removeAddress,
} from '../../../app/slices/profile';
import { clearMessage } from '../../../app/slices/message';

import FormTheme from '../../../themes/FormTheme';
import { ThemeProvider } from '@mui/material/styles';

import * as yup from 'yup';

import { AppDispatch, RootState } from '../../../app/store';

interface ProfileEditBlockProps {
  address: ProfileAddress;
  indexMap?: number;
  user: User;
  typeAddress: AddressAction;
}

const ProfileAddressBlock: React.FC<ProfileEditBlockProps> = ({ address, user, typeAddress }) => {
  const defaultBillingAddressId = user.defaultBillingAddressId || null;
  const defaultShippingAddressId = user.defaultShippingAddressId || '';
  const billingAddressIds = user.billingAddressIds || [];
  const shippingAddressIds = user.shippingAddressIds || [];
  const defInitStateDefShippingAddress = defaultShippingAddressId === address.id;
  const defInitStateDefBillAddress = defaultBillingAddressId === address.id;
  const dispatch = useDispatch<AppDispatch>();
  const { message } = useSelector((state: RootState) => state.message);
  const [cancelSubmit, setCancelSubmit] = useState(false);
  const [formError, setFormError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDisabledAddress, setIsDisabledAddress] = useState(true);

  const switchEditModeField = () => {
    setIsDisabledAddress(!isDisabledAddress);
  };

  const [checkedShipBillAddress, setCheckedShipBillAddress] = React.useState(
    billingAddressIds.includes(address.id)
  );
  const [checkedBillShipAddress, setCheckedBillShipAddress] = React.useState(
    shippingAddressIds.includes(address.id)
  );
  const [checkedShipDefAddress, setCheckedShipDefAddress] = React.useState(
    defInitStateDefShippingAddress
  );
  const [checkedBillDefAddress, setCheckedBillDefAddress] = React.useState(
    defInitStateDefBillAddress
  );

  const disabledAllFields = () => {
    setIsDisabledAddress(true);
  };

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
      streetName: address.streetName,
      postalCode: address.postalCode,
      country: address.country,
      city: address.city,
      id: address.id,
    },
    mode: 'onChange',
  } as UseFormProps<ProfileForm>);

  const onSubmit = (data: ProfileForm) => {
    data.id = address.id;
    if (user) {
      dispatch(updateUserAddress(data))
        .then((response) => {
          if (response.meta.requestStatus === 'rejected') {
            setIsSuccess(false);
          } else {
            setIsSuccess(true);
            return dispatch(getUser());
          }
        })
        .then(() => {
          if (typeAddress === 'shipping') {
            if (
              shippingAddressIds.includes(address.id) &&
              checkedShipBillAddress !== billingAddressIds.includes(address.id)
            ) {
              return dispatch(updateBillingAddress(data));
            }
          }
          if (typeAddress === 'billing') {
            if (
              billingAddressIds.includes(address.id) &&
              checkedBillShipAddress !== shippingAddressIds.includes(address.id)
            ) {
              return dispatch(updateShippingAddress(data));
            }
          }
        })
        .then(() => {
          if (typeAddress === 'shipping') {
            if (
              shippingAddressIds.includes(address.id) &&
              checkedShipDefAddress !== defInitStateDefShippingAddress
            ) {
              return dispatch(setDefaultShippingAddress(data));
            }
          }
          if (typeAddress === 'billing') {
            if (
              billingAddressIds.includes(address.id) &&
              checkedBillDefAddress !== defInitStateDefBillAddress
            ) {
              return dispatch(setDefaultBillingAddress(data));
            }
          }
        })
        .then((billingResponse) => {
          if (billingResponse && billingResponse.meta.requestStatus === 'rejected') {
            setIsSuccess(false);
          } else {
            setIsSuccess(true);
            return dispatch(getUser());
          }
        })
        .then(() => {
          setTimeout(() => {
            dispatch(clearMessage());
            setIsSuccess(false);
            disabledAllFields();
          }, 4000);
        });
    }
  };

  function processAddress(typeAddress: AddressAction): string {
    switch (typeAddress) {
      case 'shipping':
        return 'removeShippingAddressId';
      case 'billing':
        return 'removeBillingAddressId';
      case 'no_assigned':
        return 'removeAddress';
      default:
        return 'removeAddress';
    }
  }

  const deleteAddress = () => {
    const data = {
      id: address.id,
      action: processAddress(typeAddress),
    };
    dispatch(removeAddress(data))
      .then((response) => {
        if (response.meta.requestStatus === 'rejected') {
          setIsSuccess(false);
        } else {
          setIsSuccess(true);
          return dispatch(getUser());
        }
      })
      .then(() => {
        if (typeAddress === 'shipping' && !user?.billingAddressIds?.includes(address.id)) {
          const newData = {
            id: address.id,
            action: 'removeAddress',
          };
          dispatch(removeAddress(newData));
        }
        if (typeAddress === 'billing' && !user?.shippingAddressIds?.includes(address.id)) {
          const newData = {
            id: address.id,
            action: 'removeAddress',
          };
          dispatch(removeAddress(newData));
        }
      })
      .then(() => {
        setTimeout(() => {
          dispatch(getUser());
          dispatch(clearMessage());
          setIsSuccess(false);
          disabledAllFields();
        }, 4000);
      });
  };

  const onClickSubmit = () => {
    setFormError(false);
    if (errors.streetName || errors.postalCode || errors.country || errors.city) {
      setFormError(true);
    }
  };
  const onClickCancel = () => {
    disabledAllFields();
    setCancelSubmit(!cancelSubmit);
    setIsSuccess(false);
    setFormError(false);
    dispatch(clearMessage());
    setCheckedShipBillAddress(billingAddressIds.includes(address.id));
    setCheckedShipDefAddress(defaultShippingAddressId === address.id);
    reset();
  };

  const addressName = () => {
    let message = '';
    if (typeAddress === 'shipping') {
      if (checkedShipDefAddress) {
        message = `Shipping Address (Default)`;
      } else message = `Shipping Address`;
    }
    if (typeAddress === 'billing') {
      if (checkedBillDefAddress) {
        message = `Billing Address (Default)`;
      } else message = `Billing Address`;
    }

    const isHasErrors = () => {
      return !errors.streetName && !errors.postalCode && !errors.city && !errors.country;
    };

    return (
      <div className={s.address_control}>
        <Typography variant="h4" className={s.form__title_size}>
          {message}
        </Typography>
        <div>
          <button type="button" onClick={isHasErrors() ? switchEditModeField : undefined}>
            {isDisabledAddress ? (
              <div>
                <EditIco />
              </div>
            ) : isHasErrors() ? (
              <div>
                <EditIcoActive />
              </div>
            ) : (
              <div className={s.err_edit_btn}>
                <EditIcoErr />
              </div>
            )}
          </button>
          <button type="button" onClick={deleteAddress}>
            <div>
              <DeleteAddress />
            </div>
          </button>
        </div>
      </div>
    );
  };

  return (
    <ThemeProvider theme={FormTheme}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.width_full}>
        {typeAddress === 'shipping'
          ? shippingAddressIds.includes(address.id)
            ? addressName()
            : null
          : null}
        {typeAddress === 'billing'
          ? billingAddressIds.includes(address.id)
            ? addressName()
            : null
          : null}
        <SimpleInput
          register={register}
          errors={errors}
          err={errors.streetName}
          errMessage={errors.streetName?.message}
          name={`streetName`}
          label="Street *"
          id={`streetName-${address.id}`}
          defaultValue={address.streetName}
          isEditField={true}
          isDisabled={isDisabledAddress}
          isAddressField={true}
        />
        <SimpleInput
          register={register}
          errors={errors}
          err={errors.city}
          errMessage={errors.city?.message}
          name={`city`}
          label="City *"
          id={`city-${address.id}`}
          defaultValue={address.city}
          isEditField={true}
          isDisabled={isDisabledAddress}
          isAddressField={true}
        />
        <div className={s.two__items_container}>
          <SimpleInput
            register={register}
            errors={errors}
            err={errors.postalCode}
            errMessage={errors.postalCode?.message}
            name={`postalCode`}
            label="Postal Code *"
            id={`postalCode-${address.id}`}
            defaultValue={address.postalCode}
            isEditField={true}
            isDisabled={isDisabledAddress}
            isAddressField={true}
          />
          <SimpleSelect
            register={register}
            errors={errors}
            err={errors.country}
            errMessage={errors.country?.message}
            name={'country'}
            label="Country *"
            id={`country-${address.id}`}
            selectData={countries}
            defaultValue={address.country}
            isEditField={true}
            isDisabled={isDisabledAddress}
          />
        </div>
        {shippingAddressIds.includes(address.id) && typeAddress === 'shipping' ? (
          <div className={s.checkboxes_container}>
            {billingAddressIds.includes(address.id) ? null : (
              <SimpleCheckbox
                id="shippingBillingAddress"
                register={register}
                name={'shippingBillingAddress'}
                label="Set as billing address"
                isChecked={checkedShipBillAddress}
                setChecked={setCheckedShipBillAddress}
                isEditField={true}
                isDisabled={isDisabledAddress}
              />
            )}
            {defaultShippingAddressId === address.id && typeAddress === 'shipping' ? null : (
              <SimpleCheckbox
                id="shippingDefaultAddress"
                register={register}
                name={'shippingDefaultAddress'}
                label="Set as default shipping address"
                isChecked={checkedShipDefAddress}
                setChecked={setCheckedShipDefAddress}
                isEditField={true}
                isDisabled={isDisabledAddress}
              />
            )}
          </div>
        ) : null}
        {billingAddressIds.includes(address.id) && typeAddress === 'billing' ? (
          <div className={s.checkboxes_container}>
            {shippingAddressIds.includes(address.id) ? null : (
              <SimpleCheckbox
                id="billingShippingAddress"
                register={register}
                name={'billingShippingAddress'}
                label="Set as shipping address"
                isChecked={checkedBillShipAddress}
                setChecked={setCheckedBillShipAddress}
                isEditField={true}
                isDisabled={isDisabledAddress}
              />
            )}
            {defaultBillingAddressId === address.id && typeAddress === 'billing' ? null : (
              <SimpleCheckbox
                id="billingDefaultAddress"
                register={register}
                name={'billingDefaultAddress'}
                label="Set as default billing address"
                isChecked={checkedBillDefAddress}
                setChecked={setCheckedBillDefAddress}
                isEditField={true}
                isDisabled={isDisabledAddress}
              />
            )}
          </div>
        ) : null}
        {!isDisabledAddress ? (
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
      </form>
    </ThemeProvider>
  );
};

export default ProfileAddressBlock;
