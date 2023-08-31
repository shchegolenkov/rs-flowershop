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
}

export interface ProfileAddress extends Address {
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
