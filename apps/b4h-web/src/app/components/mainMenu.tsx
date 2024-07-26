import { Link as ChakraLink } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { B4hRoutes } from '../config/routes';
import { B4hDrawerLayout, B4hDrawerLayoutBaseProps } from '../layouts/drawer';

interface MainMenuProps extends B4hDrawerLayoutBaseProps {}

export const MainMenu = ({ onClose, isOpen, onOpen }: MainMenuProps) => {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const handleHome = () => {
    navigate(B4hRoutes.home);
    onClose();
  };

  return (
    <B4hDrawerLayout placement="left" onClose={onClose} isOpen={isOpen} onOpen={onOpen}>
      <slot slot="header" onClick={handleHome} style={{ cursor: 'pointer' }}>
        {t('global.header.title')}
      </slot>
      <slot slot="body">
        <ChakraLink as={ReactRouterLink} to={B4hRoutes.groups} onClick={onClose}>
          {t('global.header.groups')}
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} onClick={onClose}>
          {t('global.header.labels')}
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} onClick={onClose}>
          {t('global.header.expenses')}
        </ChakraLink>
      </slot>
    </B4hDrawerLayout>
  );
};
