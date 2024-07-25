import { HamburgerIcon } from '@chakra-ui/icons';
import { Avatar, Center, chakra, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { B4hRoutes } from '../../config/routes';
import { useAuth } from '../../providers/authProvider';
import { MainMenu } from '../mainMenu';
import { UserMenu } from '../userMenu';

export const B4hHeader = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [t] = useTranslation();

  const { isOpen: isOpenMain, onOpen: onOpenMain, onClose: onCloseMain } = useDisclosure();
  const { isOpen: isOpenUser, onOpen: onOpenUser, onClose: onCloseUser } = useDisclosure();

  const handleHome = () => {
    navigate(B4hRoutes.home);
  };

  return (
    <>
      <Flex alignContent="center" justifyContent="space-between" pr={3}>
        <Center>
          <HamburgerIconStyle boxSize={5} onClick={onOpenMain} />
          <Heading as="h1" size="md" style={{ cursor: 'pointer' }} onClick={handleHome}>
            {t('global.header.title')}
          </Heading>
        </Center>
        <Center>
          <AvatarStyle
            boxSize={8}
            ml="auto"
            onClick={onOpenUser}
            src={user?.photoURL ?? undefined}
          />
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
