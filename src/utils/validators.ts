import { Dispatch, SetStateAction } from 'react';

type EmailValidator = (email: string, setEmailError: Dispatch<SetStateAction<string>>) => boolean;

export const validateEmail: EmailValidator = (email: string, setEmailError) => {
  setEmailError('');
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailLeftPartPattern = /^[a-zA-Z0-9._%+-]+$/;
  const emailDomainNamePattern = /^[a-zA-Z0-9.-]+$/;
  const emailTldPattern = /^[a-zA-Z]{2,}$/;
  const validate = emailPattern.test(email);
  if (!validate) {
    let errorMessage = '';
    if (!email) {
      errorMessage = 'Please, type your email.';
    } else {
      errorMessage = 'Invalid email address:';
      if (!email.includes('@')) {
        errorMessage +=
          " email must contain the '@' symbol and domain name (e.g., example@example.com),";
      } else {
        if (!email.split('@')[0]) {
          errorMessage += ' local part must not be at least 1 character,';
        }
        if (email.split('@')[0] && !emailLeftPartPattern.test(email.split('@')[0])) {
          errorMessage +=
            ' local part can contain letters (a-z, A-Z), digits (0-9), characters ._%+-,';
        }
        if (!email.split('@')[1]) {
          errorMessage += ' email must contain a domain name (e.g., example.com),';
        } else {
          if (!email.split('@')[1].split('.')[0]) {
            errorMessage += ' email must contain a domain name (e.g., example.com),';
          } else if (!emailDomainNamePattern.test(email.split('@')[1].split('.')[0])) {
            errorMessage += ' domain name can contain letters, digits, dots, and hyphens,';
          }
          if (!email.split('@')[1].split('.')[1]) {
            errorMessage += ' email must contain top-level domain,';
          } else if (!emailTldPattern.test(email.split('@')[1].split('.')[1])) {
            errorMessage += ' top-level domain must consist of at least two letters,';
          }
        }
      }
    }

    setEmailError(errorMessage.slice(0, -1) + '.');
    return false;
  }
  setEmailError('');
  return true;
};
