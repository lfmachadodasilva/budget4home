import { Alert, AlertDescription, AlertIcon, Collapse } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const ErrorAlert = ({ show }: { show: boolean }) => {
  const [t] = useTranslation();

  return (
    <Collapse in={show}>
      <Alert status="error">
        <AlertIcon />
        <AlertDescription>{t('global.error')}</AlertDescription>
      </Alert>
    </Collapse>
  );
};
