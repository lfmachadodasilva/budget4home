import { useTranslation } from 'react-i18next';

export const ValidationRequired = () => {
  const [t] = useTranslation();

  return {
    required: t('global.validation.required')
  };
};

export const ValidationLenght = (min: number = 6, max: number = 64) => {
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
