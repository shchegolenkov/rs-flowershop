import { Dispatch } from '@reduxjs/toolkit';

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

export interface SizeAttr {
  name: 'size';
  value: {
    key: ProductSize;
    label: ProductSize;
  };
}

export interface DiscountAttr {
  name: 'discount';
  value: boolean;
}

export interface CompositionAttr {
  name: 'composition';
  value: string;
}

export interface CategoryAttr {
  name: 'category';
  value: string;
}

type ProductAttribute = SizeAttr | DiscountAttr | CompositionAttr | CategoryAttr;

export interface Product {
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
    attributes: ProductAttribute[];
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

export interface PageQueryResult {
  offset: number;
  limit: number;
  count: number;
  total: number;
  results: Product[];
}

export enum Categories {
  FRESH = '"54b4ad75-0c60-481e-a2e0-f7cdca5f1308"',
  DRY = '"1fb8f0a3-f3cd-4270-b13b-39b7b3af9d94"',
  LIVE = '"d806a4ef-4557-4558-ae13-27b9368e78e8"',
  FRESHENERS = '"c2bcebb2-464a-4c11-b397-3ce113a56525"',
  CANDLES = '"a4169ddb-0ad6-4aa4-9148-351c0a182085"',
}

export interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface ThunkAPI {
  dispatch: Dispatch;
  rejectWithValue: (value: null) => void;
}

export interface UpdateCart {
  action: string;
  productId?: string;
  lineItemId?: string;
  quantity?: number;
  code?: string;
  discountCode?: DiscountCode;
}

export interface Cart {
  anonymousId?: string;
  cartState: string;
  createdAt: string;
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
    anonymousId: string;
  };
  customLineItems: [];
  deleteDaysAfterLastModification: number;
  directDiscounts: [];
  discountCodes: DiscountCode[];
  id: string;
  inventoryMode: string;
  itemShippingAddresses: [];
  lastMessageSequenceNumber: number;
  lastModifiedAt?: string;
  lastModifiedBy?: {
    clientId: string;
    isPlatformClient: boolean;
    anonymousId: string;
  };
  lineItems: LineItem[];
  origin: string;
  refusedGifts: [];
  shipping: [];
  shippingMode: string;
  taxCalculationMode: string;
  taxMode: string;
  taxRoundingMode: string;
  totalLineItemQuantity: number;
  totalPrice: Money;
  type: string;
  version: number;
  versionModifiedAt: string;
}

export interface LineItem {
  id: string;
  productId: string;
  productKey: string;
  name: Record<string, string>;
  productType: {
    typeId: string;
    id: string;
    version: number;
  };
  discountedPrice: {
    includedDiscounts: { discount: DiscountCode }[];
    value: Money;
  };
  productSlug: Record<string, string>;
  variant: {
    id: number;
    sku: string;
    prices: ItemMoney[];
    images: ProductImage[];
    attributes: ProductAttribute[];
    assets?: [];
  };
  price: Money;
  quantity: number;
  discountedPricePerQuantity?: [];
  perMethodTaxRate?: [];
  addedAt: string;
  lastModifiedAt?: string;
  state: {
    quantity: number;
    state: {
      typeId: string;
      id: string;
    };
  }[];
  priceMode: string;
  lineItemMode: string;
  totalPrice: Money;
  taxedPricePortions?: [];
}

export interface Money {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

type ItemMoney = {
  id: string;
  value: Money;
  discounted?: {
    value: Money;
    discount?: {
      typeId: string;
      id: string;
    };
  };
};

export interface ApiResponse {
  type: string;
  payload: User;
  meta: {
    arg: {
      streetName: string;
      postalCode: string;
      country: string;
      city: string;
      id: string;
      shippingBillingAddress: boolean;
      shippingDefaultAddress: boolean;
      typeAddress: string;
    };
    requestId: string;
    requestStatus: string;
  };
}

export interface Logout {
  accessToken: string;
  refreshToken: string;
}

export type DiscountCode = {
  discountCode: {
    id: string;
    typeId: string;
  };
};

export enum WelcomeCodes {
  WELCOME = 'f9a4674b-e2bf-41b8-ab1f-b7c3670e7a82',
}

export enum RouteLinks {
  MAIN = '/',
  ABOUT = '/about',
  LOGIN = '/login',
  REGISTER = '/register',
  PROFILE = '/profile',
  CHANGE_PASSWORD = '/profile/change-password',
  CART = '/cart',
  CATALOG = '/catalog',
  CATALOG_FRESH = '/catalog/fresh-flowers',
  CATALOG_DRY = '/catalog/dried-flowers',
  CATALOG_LIVE = '/catalog/live-plants',
  CATALOG_FRESHENERS = '/catalog/fresheners',
  CATALOG_CANDLES = '/catalog/candles',
}
