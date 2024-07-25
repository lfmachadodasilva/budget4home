import { Flex, Heading } from '@chakra-ui/react';

export const PageTemplateBase = ({ children }: { children: JSX.Element[] }) => {
  const header = children.find(child => child?.props?.slot === 'header');
  const body = children.find(child => child?.props?.slot === 'body');
  const action = children.find(child => child?.props?.slot === 'action');

  return (
    <Flex maxW="md" justifyContent="center" flexDir="column" m={3} gap={2}>
      <Flex justifyContent="space-between" alignItems="center" m={3} gap={2}>
        <Heading as="h2" size="xl" noOfLines={1}>
          {header}
        </Heading>
        {action}
      </Flex>
      {body}
    </Flex>
  );
};
