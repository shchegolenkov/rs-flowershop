import axios from 'axios';

import { AddShipBillProperty, CustomerData, DelAddress, ProfileForm } from '../../types/types';
import dayjs from 'dayjs';

const REG_USER_URL = process.env.CTP_REGUSER_URL as string;

const setDefaultShippingAddress = async (data: ProfileForm) => {
  const accessToken = localStorage.getItem('accessToken') || 'notFoundToken';
  const userId = localStorage.getItem('userId') || 'notFoundId';
  const user = JSON.parse(localStorage.getItem('user') as string);
  const action = 'setDefaultShippingAddress';
  const requestPayload = {
    version: user.version,
    actions: [
      {
        action: action,
        addressId: data.id,
      },
    ],
  };
  try {
    return axios.post(`${REG_USER_URL}/${userId}`, requestPayload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    throw error;
  }
};

const setDefaultBillingAddress = async (data: ProfileForm) => {
  const accessToken = localStorage.getItem('accessToken') || 'notFoundToken';
  const userId = localStorage.getItem('userId') || 'notFoundId';
  const user = JSON.parse(localStorage.getItem('user') as string);
  const action = 'setDefaultBillingAddress';
  const requestPayload = {
    version: user.version,
    actions: [
      {
        action: action,
        addressId: data.id,
      },
    ],
  };
  try {
    return axios.post(`${REG_USER_URL}/${userId}`, requestPayload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    throw error;
  }
};

const addAddress = async (data: ProfileForm) => {
  const accessToken = localStorage.getItem('accessToken') || 'notFoundToken';
  const userId = localStorage.getItem('userId') || 'notFoundId';
  const user = JSON.parse(localStorage.getItem('user') as string);
  const requestPayload = {
    version: user.version,
    actions: [
      {
        action: 'addAddress',
        address: {
          streetName: data.streetName,
          postalCode: data.postalCode,
          country: data.country,
          city: data.city,
        },
      },
    ],
  };

  try {
    return axios.post(`${REG_USER_URL}/${userId}`, requestPayload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    throw error;
  }
};

const addShippingBillingAddresses = async (data: AddShipBillProperty) => {
  const accessToken = localStorage.getItem('accessToken') || 'notFoundToken';
  const userId = localStorage.getItem('userId') || 'notFoundId';
  const user = JSON.parse(localStorage.getItem('user') as string);
  const action = data.typeAddress === 'shipping' ? 'addShippingAddressId' : 'addBillingAddressId';

  const requestPayload = {
    version: user.version,
    actions: [
      {
        action: action,
        addressId: data.id,
      },
    ],
  };
  try {
    return axios.post(`${REG_USER_URL}/${userId}`, requestPayload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    throw error;
  }
};

const removeAddress = async (data: DelAddress) => {
  const accessToken = localStorage.getItem('accessToken') || 'notFoundToken';
  const userId = localStorage.getItem('userId') || 'notFoundId';
  const user = JSON.parse(localStorage.getItem('user') as string);
  const requestPayload = {
    version: user.version,
    actions: [
      {
        action: data.action,
        addressId: data.id,
      },
    ],
  };
  try {
    return axios.post(`${REG_USER_URL}/${userId}`, requestPayload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    throw error;
  }
};

type Action =
  | { action: 'changeEmail'; email: string }
  | { action: 'setFirstName'; firstName: string }
  | { action: 'setLastName'; lastName: string }
  | { action: 'setDateOfBirth'; dateOfBirth: string }
  | {
      action: 'changeAddress';
      addressId: string;
      address: { streetName: string; postalCode: string; country: string; city: string };
    };

const updateUser = async (data: CustomerData) => {
  const accessToken = localStorage.getItem('accessToken') || 'notFoundToken';
  const userId = localStorage.getItem('userId') || 'notFoundId';
  const user = JSON.parse(localStorage.getItem('user') as string);
  const requestPayload = {
    version: user.version,
    actions: [] as Action[],
  };

  if (data.email) {
    requestPayload.actions.push({
      action: 'changeEmail',
      email: data.email,
    });
  }

  if (data.firstName) {
    requestPayload.actions.push({
      action: 'setFirstName',
      firstName: data.firstName,
    });
  }

  if (data.lastName) {
    requestPayload.actions.push({
      action: 'setLastName',
      lastName: data.lastName,
    });
  }

  if (data.dateOfBirth) {
    requestPayload.actions.push({
      action: 'setDateOfBirth',
      dateOfBirth: dayjs(data.dateOfBirth).format('YYYY-MM-DD'),
    });
  }
  try {
    return axios.post(`${REG_USER_URL}/${userId}`, requestPayload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    throw error;
  }
};

const updateUserAddress = async (data: ProfileForm) => {
  const accessToken = localStorage.getItem('accessToken') || 'notFoundToken';
  const userId = localStorage.getItem('userId') || 'notFoundId';
  const user = JSON.parse(localStorage.getItem('user') as string);
  const requestPayload = {
    version: user.version,
    actions: [
      {
        action: 'changeAddress',
        addressId: data.id,
        address: {
          streetName: data.streetName,
          postalCode: data.postalCode,
          country: data.country,
          city: data.city,
        },
      },
    ],
  };

  try {
    return axios.post(`${REG_USER_URL}/${userId}`, requestPayload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    throw error;
  }
};

const updateBillingAddress = async (data: ProfileForm) => {
  const accessToken = localStorage.getItem('accessToken') || 'notFoundToken';
  const userId = localStorage.getItem('userId') || 'notFoundId';
  const user = JSON.parse(localStorage.getItem('user') as string);
  const action = data.shippingBillingAddress ? 'addBillingAddressId' : 'removeBillingAddressId';
  const requestPayload = {
    version: user.version,
    actions: [
      {
        action: action,
        addressId: data.id,
      },
    ],
  };
  try {
    return axios.post(`${REG_USER_URL}/${userId}`, requestPayload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    throw error;
  }
};

const updateShippingAddress = async (data: ProfileForm) => {
  const accessToken = localStorage.getItem('accessToken') || 'notFoundToken';
  const userId = localStorage.getItem('userId') || 'notFoundId';
  const user = JSON.parse(localStorage.getItem('user') as string);
  const action = data.billingShippingAddress ? 'addShippingAddressId' : 'removeShippingAddressId';
  const requestPayload = {
    version: user.version,
    actions: [
      {
        action: action,
        addressId: data.id,
      },
    ],
  };
  try {
    return axios.post(`${REG_USER_URL}/${userId}`, requestPayload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    throw error;
  }
};

const ProfileService = {
  setDefaultShippingAddress,
  setDefaultBillingAddress,
  removeAddress,
  addAddress,
  addShippingBillingAddresses,
  updateUser,
  updateUserAddress,
  updateBillingAddress,
  updateShippingAddress,
};

export default ProfileService;
