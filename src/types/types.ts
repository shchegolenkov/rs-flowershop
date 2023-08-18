export interface CustomerData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
}
