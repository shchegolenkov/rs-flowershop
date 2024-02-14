import React from 'react';

import ErrorIcon from '@mui/icons-material/Error';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateValidationError } from '@mui/x-date-pickers/models';
import dayjs, { Dayjs } from 'dayjs';
import {
  Control,
  Controller,
  DefaultValues,
  FieldError,
  KeepStateOptions,
  UseFormRegister,
} from 'react-hook-form';

import { CustomerData } from '@/types/types';
import { validateDate } from '@/utils/validators';

import EditIco from '@/assets/svg/edit.svg';
import EditIcoActive from '@/assets/svg/editActive.svg';
import EditIcoErr from '@/assets/svg/editErr.svg';

import s from '../FormFields.module.scss';

interface BirthDateInputProps {
  register: UseFormRegister<CustomerData>;
  errors: {
    dateOfBirth?: FieldError;
  };
  control: Control<CustomerData>;
  reset: (
    values?: DefaultValues<CustomerData> | CustomerData,
    keepStateOptions?: KeepStateOptions
  ) => void;
  defaultValue?: Date | null;
  isEditField?: boolean;
  isDisabled?: boolean;
  switchEditModeField?: () => void;
}

const thirteenYearsAgo = dayjs().subtract(13, 'year');
const minDate1900 = dayjs('1900-01-01');

const BirthDateInput: React.FC<BirthDateInputProps> = ({
  register,
  errors,
  control,
  reset,
  defaultValue,
  isEditField,
  isDisabled,
  switchEditModeField,
}) => {
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
      reset({ dateOfBirth: formattedDate || undefined });
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={s.form__field_size_birthday}>
        <Controller
          name="dateOfBirth"
          defaultValue={defaultValue}
          control={control}
          render={({ field }) => {
            const dayjsValue = field.value instanceof Date ? dayjs(field.value) : null;

            return (
              <div className={s.edit__field_container}>
                <DatePicker
                  {...field}
                  disabled={isEditField ? isDisabled : false}
                  value={dayjsValue}
                  maxDate={thirteenYearsAgo}
                  minDate={minDate1900}
                  onError={(newError) => setDataError(newError)}
                  {...register('dateOfBirth')}
                  format="DD/MM/YYYY"
                  label="Date of birth *"
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      helperText: errorMessage,
                      fullWidth: true,
                      error: !!errors?.dateOfBirth,
                    },
                  }}
                />
                {isEditField ? (
                  <button type="button" onClick={!dataError ? switchEditModeField : undefined}>
                    {isDisabled ? (
                      <EditIco />
                    ) : !dataError ? (
                      <EditIcoActive />
                    ) : (
                      <div className={s.err_edit_btn}>
                        <EditIcoErr />
                      </div>
                    )}
                  </button>
                ) : null}
              </div>
            );
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default BirthDateInput;
