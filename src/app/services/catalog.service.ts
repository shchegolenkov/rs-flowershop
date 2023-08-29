import axios from 'axios';
import { IPageQueryResult } from '../../types/types';
import { ITEMS_PER_PAGE } from '../../constants/const';

const ACC_TOKEN_URL = process.env.CTP_ACCTOKEN_URL as string;
const CLIENT_ID = process.env.CTP_CLIENT_ID as string;
const CLIENT_SECRET = process.env.CTP_CLIENT_SECRET as string;
const API_URL = process.env.CTP_API_URL as string;
const PROJECT_KEY = process.env.CTP_PROJECT_KEY as string;

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

const getProducts = async (pageNumber: number, query = '') => {
  const accessToken = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : await getAccessToken();
  try {
    const response = await axios.get<IPageQueryResult>(
      `${API_URL}/${PROJECT_KEY}/product-projections/search`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          limit: ITEMS_PER_PAGE,
          offset: ITEMS_PER_PAGE * pageNumber - ITEMS_PER_PAGE,
          'text.en-US': `${query}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error('error getting products');
  }
};

const CatalogService = {
  getProducts,
};

export default CatalogService;
