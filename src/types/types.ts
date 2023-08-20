export interface CustomerData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date | null;
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
