import { HamburgerIcon } from '@chakra-ui/icons';
import { Avatar, Center, chakra, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MainMenu } from '../mainMenu';
import { UserMenu } from '../userMenu';

export const B4hHeader = () => {
  const navigate = useNavigate();

  const { isOpen: isOpenMain, onOpen: onOpenMain, onClose: onCloseMain } = useDisclosure();
  const { isOpen: isOpenUser, onOpen: onOpenUser, onClose: onCloseUser } = useDisclosure();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <>
      <Flex alignContent="center" justifyContent="space-between" pr={3}>
        <Center>
          <HamburgerIconStyle boxSize={5} onClick={onOpenMain} />
          <Heading as="h1" size="md" style={{ cursor: 'pointer' }} onClick={handleHome}>
            budget4home
          </Heading>
        </Center>
        <Center>
          <AvatarStyle boxSize={5} ml="auto" onClick={onOpenUser} />
        </Center>
      </Flex>
      <MainMenu isOpen={isOpenMain} onClose={onCloseMain} onOpen={onOpenMain} />
      <UserMenu isOpen={isOpenUser} onClose={onCloseUser} onOpen={onOpenUser} />
    </>
  );
};

const HamburgerIconStyle = chakra(HamburgerIcon, {
  baseStyle: {
    m: 3
  }
});

const AvatarStyle = chakra(Avatar, {
  baseStyle: {
    cursor: 'pointer'
  }
});
