import axios from 'axios';

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

const getProduct = async (productKey: string) => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.get(
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

const ProductService = {
  getProduct,
};

export default ProductService;
