import { DateValidationError } from '@mui/x-date-pickers/models';
import dayjs, { Dayjs } from 'dayjs';

export const validateDate = (date: Dayjs | null): DateValidationError | null => {
  if (!date) {
    return 'invalidDate';
  } else {
    if (date.format('YYYY')[0] !== '0' && date.format('DD')[0] !== '0') {
      const currentDate = dayjs();
      const ageLimit = 13;
      const minDate = new Date(1900, 1, 1);

      if (currentDate.diff(date, 'years') < ageLimit) {
        return 'maxDate';
      }

      if (date.toDate() < minDate) {
        return 'minDate';
      }
    }
  }

  return null;
};
