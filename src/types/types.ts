export interface CustomerData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  shippingBillingAddress: boolean;
  shippingDefaultAddress: boolean;
  billingStreet: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
  billingDefaultAddress: boolean;
}

export type Address = {
  streetName: string;
  postalCode: string;
  country: string;
  city: string;
};

export type RequestPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  shippingAddresses?: number[];
  billingAddresses?: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}

export type ProductImage = {
  url: string;
  label: string;
  dimensions: {
    w: number;
    h: number;
  };
};

export type ProductPrice = {
  type: 'centPrecision';
  currencyCode: 'EUR';
  centAmount: number;
  fractionDigits: number;
};

export type ProductResponseTextField = {
  'en-US': string;
};

export enum ProductSize {
  SMALL = 'S',
  MEDIUM = 'M',
  LARGE = 'L',
}

export interface IProduct {
  id: string;
  version: number;
  productType: { typeId: string; id: string };
  name: ProductResponseTextField;
  description: ProductResponseTextField;
  categories: [
    {
      typeId: string;
      id: string;
    },
  ];
  slug: ProductResponseTextField;
  metaTitle: ProductResponseTextField;
  metaDescription: ProductResponseTextField;
  masterVariant: {
    id: number;
    sku: string;
    prices: [
      {
        id: string;
        value: ProductPrice;
        discounted?: {
          value: ProductPrice;
          discount?: {
            typeId: string;
            id: string;
          };
        };
      },
    ];
    images: ProductImage[];
    attributes: [
      {
        name: 'size';
        value: {
          key: ProductSize;
          label: ProductSize;
        };
      },
      {
        name: 'discount';
        value: boolean;
      },
      {
        name: 'composition';
        value: string;
      },
    ];
  };
  variants: [];
  hasStagedChanges: boolean;
  published: boolean;
  key: string;
  taxCategory: {
    typeId: 'tax-category';
    id: string;
  };
  priceMode: string;
  createdAt: string;
  lastModifiedAt: string;
}

export interface IPageQueryResult {
  offset: number;
  limit: number;
  count: number;
  total: number;
  results: IProduct[];
}
