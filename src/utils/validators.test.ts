import dayjs, { Dayjs } from 'dayjs';

import { validateDate } from './validators';

describe('validateDate', () => {
  it('returns "invalidDate" for null date', () => {
    const result = validateDate(null);
    expect(result).toBe('invalidDate');
  });

  it('returns "maxDate" for date of a person under the age limit', () => {
    const currentDate = new Date();
    const dateOfBirth = currentDate.getFullYear() - 12 + '-08-21';
    const result = validateDate(dayjs(dateOfBirth) as Dayjs);
    expect(result).toBe('maxDate');
  });

  it('returns null for a valid date', () => {
    const result = validateDate(dayjs('1990-01-01') as Dayjs);
    expect(result).toBeNull();
  });
});
