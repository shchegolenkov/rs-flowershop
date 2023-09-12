import axios from 'axios';
import { UpdateCart } from '../../types/types';

const CLIENT_ID = process.env.CTP_CLIENT_ID as string;
const CLIENT_SECRET = process.env.CTP_CLIENT_SECRET as string;
const CTP_API_URL = process.env.CTP_API_URL as string;
const CTP_PROJECT_KEY = process.env.CTP_PROJECT_KEY as string;
const CTP_AUTH_URL = process.env.CTP_AUTH_URL as string;
const URL_ANONIM = `${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/anonymous/token`;
const URL_CARD = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts`;

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
    localStorage.setItem('anonymousToken', anonymousToken);
    localStorage.setItem('refreshAnonymousToken', refreshAnonymousToken);
    return anonymousToken;
  } catch (error) {
    return null;
  }
};

const createCart = async () => {
  const accessToken = localStorage.getItem('accessToken') || (await getAnonymousToken());
  try {
    const response = await axios.post(
      URL_CARD,
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
  } catch (error) {}
};

const updateCart = async (data: UpdateCart) => {
  const accessToken =
    localStorage.getItem('accessToken') ||
    localStorage.getItem('anonymousToken') ||
    (await getAnonymousToken());
  const cartData = localStorage.getItem('cart') || null;
  const cart = cartData ? JSON.parse(cartData) : '';
  if (cart) {
    const cartId = cart.id;
    const cartVersion = Number(cart.version);
    try {
      const response = await axios.post(
        URL_CARD + `/${cartId}`,
        {
          version: cartVersion,
          actions: [
            {
              action: 'addLineItem',
              productId: data.productID,
              quantity: data.quantity,
            },
          ],
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const cart = await response.data;
      localStorage.setItem('cart', JSON.stringify(cart));
      return response;
    } catch (error) {}
  }
};

const CartService = {
  createCart,
  updateCart,
};

export default CartService;
