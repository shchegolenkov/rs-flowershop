import axios from 'axios';

import { UpdateCart } from '../../types/types';

const CLIENT_ID = process.env.CTP_CLIENT_ID as string;
const CLIENT_SECRET = process.env.CTP_CLIENT_SECRET as string;
const CTP_API_URL = process.env.CTP_API_URL as string;
const CTP_PROJECT_KEY = process.env.CTP_PROJECT_KEY as string;
const CTP_AUTH_URL = process.env.CTP_AUTH_URL as string;
const URL_ANONIM = `${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/anonymous/token`;
const URL_CART = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts`;

const getAnonymousToken = async () => {
  try {
    const response = await axios.post(URL_ANONIM, null, {
      params: {
        grant_type: 'client_credentials',
      },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    });

    const anonymousToken = await response.data.access_token;
    const refreshAnonymousToken = await response.data.refresh_token;
    localStorage.setItem('accessToken', anonymousToken);
    localStorage.setItem('refreshToken', refreshAnonymousToken);
    return anonymousToken;
  } catch (error) {
    throw new Error('Error getting Anonymous Token');
  }
};

const createCart = async () => {
  const accessToken = localStorage.getItem('accessToken') || (await getAnonymousToken());
  try {
    const response = await axios.post(
      URL_CART,
      {
        currency: 'EUR',
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const cart = await response.data;
    localStorage.setItem('cart', JSON.stringify(cart));
    return response;
  } catch (error) {
    throw new Error('Error creating cart');
  }
};

interface UpdateCartRequest {
  version: number;
  actions: UpdateCart[];
}

const updateCart = async (data: UpdateCart) => {
  const accessToken = localStorage.getItem('accessToken') || (await getAnonymousToken());
  const cartData = localStorage.getItem('cart') || null;
  const cart = cartData ? JSON.parse(cartData) : '';
  if (cart) {
    const cartId = cart.id;
    const cartVersion = Number(cart.version);
    const updateCartItem: UpdateCart = {
      action: data.action,
    };
    if (data.productId) {
      updateCartItem['productId'] = data.productId;
    }
    if (data.quantity) {
      updateCartItem['quantity'] = data.quantity;
    }
    if (data.lineItemId) {
      updateCartItem['lineItemId'] = data.lineItemId;
    }
    const requestPayload: UpdateCartRequest = {
      version: cartVersion,
      actions: [updateCartItem],
    };
    try {
      const response = await axios.post(URL_CART + `/${cartId}`, requestPayload, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const cart = await response.data;
      localStorage.setItem('cart', JSON.stringify(cart));
      return response;
    } catch (error) {
      throw new Error('Error updating cart');
    }
  }
};

const clearCart = async (data: UpdateCart[]) => {
  const accessToken = localStorage.getItem('accessToken') || (await getAnonymousToken());
  const cartData = localStorage.getItem('cart') || null;
  const cart = cartData ? JSON.parse(cartData) : '';
  if (cart) {
    const cartId = cart.id;
    const cartVersion = Number(cart.version);
    const requestPayload: UpdateCartRequest = {
      version: cartVersion,
      actions: data,
    };
    try {
      const response = await axios.post(URL_CART + `/${cartId}`, requestPayload, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const cart = await response.data;
      localStorage.setItem('cart', JSON.stringify(cart));
      return response;
    } catch (error) {
      throw new Error('Error clear cart');
    }
  }
};

const applyPromo = async (data: UpdateCart) => {
  const accessToken = localStorage.getItem('accessToken') || (await getAnonymousToken());
  const cartData = localStorage.getItem('cart') || null;
  const cart = cartData ? JSON.parse(cartData) : '';
  if (cart) {
    const cartId = cart.id;
    const cartVersion = Number(cart.version);
    const updateCartItem: UpdateCart = {
      action: data.action,
      code: data.code,
    };
    const requestPayload: UpdateCartRequest = {
      version: cartVersion,
      actions: [updateCartItem],
    };
    try {
      const response = await axios.post(
        URL_CART + `/${cartId}?expand=cartDiscounts%5B*%5D`,
        requestPayload,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const cart = await response.data;
      localStorage.setItem('cart', JSON.stringify(cart));
      return response;
    } catch (error) {
      throw new Error('Error applying promo');
    }
  }
};

const resetPromo = async () => {
  const accessToken = localStorage.getItem('accessToken') || (await getAnonymousToken());
  const cartData = localStorage.getItem('cart') || null;
  const cart = cartData ? JSON.parse(cartData) : '';
  if (cart) {
    const cartId = cart.id;
    const cartVersion = Number(cart.version);
    const discountCode = cart.discountCodes[0].discountCode;
    const updateCartItem: UpdateCart = {
      action: 'removeDiscountCode',
      discountCode: discountCode,
    };
    const requestPayload: UpdateCartRequest = {
      version: cartVersion,
      actions: [updateCartItem],
    };
    try {
      const response = await axios.post(URL_CART + `/${cartId}`, requestPayload, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const cart = await response.data;
      localStorage.setItem('cart', JSON.stringify(cart));
      return response;
    } catch (error) {
      throw new Error('Error resetting promo');
    }
  }
};

const CartService = {
  createCart,
  updateCart,
  clearCart,
  applyPromo,
  resetPromo,
};

export default CartService;
