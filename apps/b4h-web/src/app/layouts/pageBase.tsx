import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertStatus,
  AlertTitle,
  Box,
  Flex,
  Heading
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface B4hPageLayoutBanner {
  status: AlertStatus;
  title?: string;
  description?: string;
}
export const B4hPageLayout = ({
  children,
  title,
  alerts
}: {
  children: JSX.Element[];
  title?: string;
  alerts?: B4hPageLayoutBanner[] | null;
}) => {
  const [t] = useTranslation();

  useEffect(() => {
    document.title = title ? `${title} | ${t('global.header.title')}` : t('global.header.title');
  }, [title]);

  const header = children.find(child => child?.props?.slot === 'header');
  const body = children.find(child => child?.props?.slot === 'body');
  const actionTop = children.find(child => child?.props?.slot === 'actionTop');
  const actionBottom = children.find(child => child?.props?.slot === 'actionBottom');

  console.debug('B4hPageTemplate', { header, body, actionTop, actionBottom, alerts });

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" gap={3}>
        <Heading as="h2" size="xl" noOfLines={1}>
          {header}
        </Heading>
        {actionTop}
      </Flex>
      {body}
      {alerts && alerts.length > 0 && (
        <>
          <Box p={3} />
          {alerts?.map(
            alert =>
              alert &&
              (alert.title || alert.description) && (
                <Alert status={alert.status}>
                  <AlertIcon />
                  {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
                  {alert.description && <AlertDescription>{alert.description}</AlertDescription>}
                </Alert>
              )
          )}
        </>
      )}
      {actionBottom && (
        <>
          <Box p={3} />
          {actionBottom}
        </>
      )}
    </>
  );
};
