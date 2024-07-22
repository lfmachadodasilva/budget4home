import {
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Link
} from '@chakra-ui/react';
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
            <span>Basic Drawer</span>
            <Center>
              <SmallCloseIconStyle onClick={onClose} />
            </Center>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Flex justifyContent="center" flexDir="column" gap={5}>
            <Link onClick={onClose}>Groups</Link>
            <Link onClick={onClose}>Labels</Link>
            <Link onClick={onClose}>Expenses</Link>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
