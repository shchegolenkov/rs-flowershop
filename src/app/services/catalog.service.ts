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

interface IQueryParams {
  limit: string;
  offset: string;
  filter: string | string[];
  'text.en-US': string;
  sort?: string;
}

const getProducts = async (
  pageNumber: number,
  query: string,
  sortQuery: string,
  filters: string[]
) => {
  const accessToken = await getAccessToken();
  try {
    const queryParams: IQueryParams = {
      limit: `${ITEMS_PER_PAGE}`,
      offset: `${ITEMS_PER_PAGE * pageNumber - ITEMS_PER_PAGE}`,
      filter: filters,
      'text.en-US': `${query}`,
    };
    if (sortQuery) {
      queryParams.sort = sortQuery;
    } else if (Object.hasOwn(queryParams, 'sort') && !sortQuery) {
      delete queryParams.sort;
    }
    const response = await axios.get<IPageQueryResult>(
      `${API_URL}/${PROJECT_KEY}/product-projections/search`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: queryParams,
        paramsSerializer: {
          indexes: null,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error('error getting products');
  }
};

const getProduct = async (productKey: string) => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.get<IPageQueryResult>(
      `${API_URL}/${PROJECT_KEY}/product-projections/key=${productKey}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response;
  } catch (error) {
    throw new Error('error getting product');
  }
};

const CatalogService = {
  getProducts,
  getProduct,
};

export default CatalogService;
