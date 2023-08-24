import axios from 'axios';
import dayjs from 'dayjs';

import { CustomerData, RequestPayload } from '../../types/types';

const ACC_TOKEN_URL = process.env.CTP_ACCTOKEN_URL as string;
const REG_USER_URL = process.env.CTP_REGUSER_URL as string;
const CLIENT_ID = process.env.CTP_CLIENT_ID as string;
const CLIENT_SECRET = process.env.CTP_CLIENT_SECRET as string;
const AUTH_USER_URL = process.env.CTP_LOGINUSER_URL as string;

const getAccessToken = async () => {
  try {
    const response = await axios.post(ACC_TOKEN_URL, null, {
      params: {
        grant_type: 'client_credentials',
      },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    });

    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.log('Error getting access token:', error);
    return null;
  }
};

const registerUser = async (data: CustomerData) => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    const requestPayload: RequestPayload = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: dayjs(data.birthDate).format('YYYY-MM-DD'),
      addresses: [],
    };
    if (
      data.shippingStreet &&
      data.shippingCity &&
      data.shippingPostalCode &&
      data.shippingCountry
    ) {
      requestPayload.addresses.push({
        streetName: data.shippingStreet,
        postalCode: data.shippingPostalCode,
        country: data.shippingCountry,
        city: data.shippingCity,
      });
      requestPayload['shippingAddresses'] = [0];
    }
    if (data.billingStreet && data.billingCity && data.billingPostalCode && data.billingCountry) {
      requestPayload.addresses.push({
        streetName: data.billingStreet,
        postalCode: data.billingPostalCode,
        country: data.billingCountry,
        city: data.billingCity,
      });
      requestPayload['billingAddresses'] = [1];
    }
    if (data.shippingDefaultAddress) {
      requestPayload['defaultShippingAddress'] = 0;
    }
    if (data.billingDefaultAddress && !data.shippingBillingAddress) {
      requestPayload['defaultBillingAddress'] = 1;
    }
    if (data.shippingBillingAddress) {
      requestPayload['defaultBillingAddress'] = 0;
      requestPayload['billingAddresses'] = [0];
    }
    return axios.post(REG_USER_URL, requestPayload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
};

const loginUser = async (data: Pick<CustomerData, 'email' | 'password'>) => {
  const accessToken = await getAccessToken();
  localStorage.setItem('accesToken', accessToken);
  if (accessToken) {
    const requestPayload: Pick<RequestPayload, 'email' | 'password'> = {
      email: data.email,
      password: data.password,
    };
    return axios.post(AUTH_USER_URL, requestPayload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
};

const AuthService = {
  registerUser,
  loginUser,
};

export default AuthService;
