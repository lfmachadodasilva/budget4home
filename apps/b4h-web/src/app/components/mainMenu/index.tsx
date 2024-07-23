import {
  Center,
  Link as ChakraLink,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { B4hRoutes } from '../../config/routes';
import { SmallCloseIconStyle } from '../styles';

export interface MainMenuProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const MainMenu = ({ onClose, isOpen }: MainMenuProps) => {
  return (
    <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Flex justifyContent="space-between">
            <span>budget4home</span>
            <Center>
              <SmallCloseIconStyle onClick={onClose} />
            </Center>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Flex justifyContent="center" flexDir="column" gap={5}>
            <ChakraLink as={ReactRouterLink} to={B4hRoutes.groups} onClick={onClose}>
              Groups
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} onClick={onClose}>
              Labels
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} onClick={onClose}>
              Expenses
            </ChakraLink>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
