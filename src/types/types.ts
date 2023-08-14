export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CustomerData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  addresses: Address[];
}
