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

declare module '*.svg' {
  const value: string;
  export = value;
}

declare module '*.svg?url' {
  const value: string;
  export = value;
}
