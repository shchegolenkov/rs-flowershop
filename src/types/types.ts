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
  shippingAddressIds?: string[];
  billingAddressIds?: string[];
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
  addresses?: Address[] | [];
}

export type Address = {
  streetName: string;
  postalCode: string;
  country: string;
  city: string;
};

export interface ProfileForm extends Address {
  shippingBillingAddress?: boolean;
  billingShippingAddress?: boolean;
  shippingDefaultAddress?: boolean;
  billingDefaultAddress?: boolean;
  id: string;
  typeAddress?: AddressAction;
}

export interface ProfileAddress extends Address {
  id: string;
}

export interface AddShipBillProperty {
  typeAddress: string;
  id: string;
}

export type AddressAction = 'shipping' | 'billing' | 'no_assigned';

export type DelAddress = {
  id: string;
  action: string;
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

export interface User {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: ProfileAddress[] | [];
  authenticationMode: string;
  billingAddressIds?: string[];
  shippingAddressIds?: string[];
  isEmailVerified: boolean;
  stores: string[];
  defaultBillingAddressId?: string | null;
  defaultShippingAddressId?: string | null;
  dateOfBirth: string;
  lastMessageSequenceNumber?: number;
  versionModifiedAt: string;
}

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

export enum Categories {
  FRESH = '"c54e10d9-2556-4433-93bf-f7b32ee7614a"',
  DRY = '"7adbf30f-055b-485a-9914-6b778934373f"',
  LIVE = '"cfa5c147-fac3-48d6-89e9-9a4be3ffa382"',
  FRESHENERS = '"2093d9b8-4a2a-4db2-a49a-6af3de7ce3e0"',
  CANDLES = '"b1898ea3-45ea-4306-ad02-3914c1e38610"',
}
