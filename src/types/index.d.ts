declare module '*.module.css' {
  interface ClassNames {
    [className: string]: string;
  }

  const classNames: ClassNames;
  export = classNames;
}

declare module '*.module.scss' {
  interface ClassNames {
    [className: string]: string;
  }

  const classNames: ClassNames;
  export = classNames;
}

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
