import s from './BirthDateInput.module.scss';

import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import {
  Control,
  Controller,
  DefaultValues,
  FieldError,
  KeepStateOptions,
  UseFormRegister,
} from 'react-hook-form';
import { CustomerData } from '../../../../types/types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { DateValidationError } from '@mui/x-date-pickers/models';

const validateDate = (date: Dayjs | null): DateValidationError | null => {
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

interface BirthDateInputProps {
  register: UseFormRegister<CustomerData>;
  errors: {
    birthDate?: FieldError;
  };
  control: Control<CustomerData>; // Добавьте это
  reset: (
    values?: DefaultValues<CustomerData> | CustomerData,
    keepStateOptions?: KeepStateOptions
  ) => void;
}

const thirteenYearsAgo = dayjs().subtract(13, 'year');
const minDate1900 = dayjs('1900-01-01');

const BirthDateInput: React.FC<BirthDateInputProps> = ({ register, errors, control, reset }) => {
  const [dataError, setDataError] = React.useState<DateValidationError | null>(null);

  const errorMessage = React.useMemo(() => {
    switch (dataError) {
      case 'maxDate': {
        return (
          <span className={s.err__message}>
            <ErrorIcon color="error" /> You must be at least 13 years old
          </span>
        );
      }
      case 'minDate': {
        return (
          <span className={s.err__message}>
            <ErrorIcon color="error" /> The minimum date here is January 1, 1900
          </span>
        );
      }
      case 'invalidDate': {
        return (
          <span className={s.err__message}>
            <ErrorIcon color="error" /> Please select a valid date
          </span>
        );
      }
      default: {
        return '';
      }
    }
  }, [dataError]);

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue !== null) {
      const validationError = validateDate(newValue);
      if (validationError) {
        setDataError(validationError);
      }
      const formattedDate: Date | null = newValue ? newValue.toDate() : null;
      reset({ birthDate: formattedDate || undefined });
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={s.form__field_size}>
        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => {
            const dayjsValue = field.value ? dayjs(field.value) : null;

            return (
              <DatePicker
                {...field}
                value={dayjsValue}
                maxDate={thirteenYearsAgo}
                minDate={minDate1900}
                onError={(newError) => setDataError(newError)}
                {...register('birthDate')}
                format="DD/MM/YYYY"
                label="Date of birth *"
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    helperText: errorMessage,
                    fullWidth: true,
                    error: !!errors?.birthDate,
                  },
                }}
              />
            );
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default BirthDateInput;
