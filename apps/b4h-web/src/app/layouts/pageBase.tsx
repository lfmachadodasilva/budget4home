import { Box, Flex, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const B4hPageTemplate = ({
  children,
  title
}: {
  children: JSX.Element[];
  title?: string;
}) => {
  const [t] = useTranslation();

  const header = children.find(child => child?.props?.slot === 'header');
  const body = children.find(child => child?.props?.slot === 'body');
  const actionTop = children.find(child => child?.props?.slot === 'actionTop');
  const actionBottom = children.find(child => child?.props?.slot === 'actionBottom');

  console.debug('B4hPageTemplate', { header, body, actionTop, actionBottom });

  return (
    <>
      <head>
        <title>{title ?? t('global.header.title')} test</title>
      </head>
      <Flex justifyContent="space-between" alignItems="center" gap={3}>
        <Heading as="h2" size="xl" noOfLines={1}>
          {header}
        </Heading>
        {actionTop}
      </Flex>
      {body}
      {actionBottom && (
        <>
          <Box p={3} />
          {actionBottom}
        </>
      )}
    </>
  );
};
