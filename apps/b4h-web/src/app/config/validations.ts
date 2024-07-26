import { RegisterOptions } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LoginFormValues } from '../models/loginFormValues';

export const ValidationRequired = () => {
  const [t] = useTranslation();

  return {
    required: t('global.validation.required')
  };
};

export const ValidationLenght = (
  min: number = 6,
  max: number = 64
): RegisterOptions<LoginFormValues, 'email'> => {
  const [t] = useTranslation();

  return {
    minLength: {
      value: min,
      message: t('global.validation.minLength', {
        min: min
      })
    },
    maxLength: { value: max, message: t('global.validation.maxLength', { max: max }) }
  };
};
