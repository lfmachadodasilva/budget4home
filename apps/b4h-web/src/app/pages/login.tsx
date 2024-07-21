import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';

export const LoginPage = () => {
  return (
    <Flex maxW="md" justifyContent="center" flexDir="column" m={3} p={3} gap={5}>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        {/* <FormErrorMessage>Test</FormErrorMessage> */}
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
      <Button>Login</Button>
      <Button variant="outline">Register</Button>
    </Flex>
  );
};
