import axios from 'axios';
import dayjs from 'dayjs';

import { CustomerData, RequestPayload } from '../../types/types';

const ACC_TOKEN_URL = process.env.CTP_ACCTOKEN_URL as string;
const REG_USER_URL = process.env.CTP_REGUSER_URL as string;
const CLIENT_ID = process.env.CTP_CLIENT_ID as string;
const CLIENT_SECRET = process.env.CTP_CLIENT_SECRET as string;
const AUTH_USER_URL = process.env.CTP_LOGINUSER_URL as string;
const LOGIN_URL = process.env.CTP_LOGIN_URL as string;
const LOGOUT_URL = process.env.CTP_LOGOUT_URL as string;
const INTROSPECT_URL = process.env.CTP_INTROSPECT_URL as string;

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
    return null;
  }
};

const getAccessClientToken = async (data: Pick<CustomerData, 'email' | 'password'>) => {
  try {
    const response = await axios.post(AUTH_USER_URL, null, {
      params: {
        grant_type: 'password',
        username: data.email,
        password: data.password,
      },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    });

    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    throw error;
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
      dateOfBirth: dayjs(data.dateOfBirth).format('YYYY-MM-DD'),
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

interface requestPayloadLogin {
  email: string;
  password: string;
  anonymousCart?: {
    id: string;
    typeId: string;
  };
}

const loginUser = async (data: Pick<CustomerData, 'email' | 'password'>) => {
  try {
    const accessToken = await getAccessClientToken(data);
    localStorage.setItem('accessToken', accessToken);
    const anonymousToken = localStorage.getItem('anonymousToken') || null;

    if (accessToken) {
      const requestPayload: requestPayloadLogin = {
        email: data.email,
        password: data.password,
      };

      if (anonymousToken) {
        const cart = JSON.parse(localStorage.getItem('cart')) || '';
        if (cart.anonymousId) {
          requestPayload['anonymousCart'] = {
            id: cart.id,
            typeId: 'cart',
          };
        }
      }

      return axios.post(LOGIN_URL, requestPayload, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }
  } catch (error) {
    throw error;
  }
};

const logoutUser = () => {
  const token = localStorage.getItem('accessToken');
  return axios
    .post(LOGOUT_URL, null, {
      params: {
        token: token,
        token_type_hint: 'access_token',
      },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const tokenIntrospection = async () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return null;
  }

  try {
    const response = await axios.post(INTROSPECT_URL, null, {
      params: { token: accessToken },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error introspecting token:', error);
  }
};

const getUser = async () => {
  const accessToken = localStorage.getItem('accessToken') || 'notFoundToken';
  const userId = localStorage.getItem('userId') || 'notFoundId';
  return axios.get(`${REG_USER_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

const AuthService = {
  registerUser,
  loginUser,
  logoutUser,
  tokenIntrospection,
  getUser,
};

export default AuthService;
