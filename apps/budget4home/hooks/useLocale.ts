import { useIntl } from 'react-intl';

export const useLocale = () => {
  const { formatMessage } = useIntl();
  return {
    formatMessage: (id: string, values?: any) => (id ? formatMessage({ id }, values) : '')
  };
};
