import { Collapse, Flex, Spinner } from '@chakra-ui/react';

export const LoadingData = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Collapse in={isLoading}>
      <Flex justifyContent="center" m={5}>
        <Spinner />
      </Flex>
    </Collapse>
  );
};
