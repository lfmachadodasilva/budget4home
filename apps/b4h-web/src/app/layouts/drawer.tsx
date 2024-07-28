import {
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading
} from '@chakra-ui/react';

import { memo } from 'react';
import { SmallCloseIconStyle } from '../../style/shared';

export interface B4hDrawerLayoutBaseProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface B4hDrawerLayoutProps extends B4hDrawerLayoutBaseProps {
  placement: 'top' | 'right' | 'bottom' | 'left';
  children: JSX.Element[];
}

export const B4hDrawerLayout = memo(
  ({ onClose, isOpen, children, placement }: B4hDrawerLayoutProps) => {
    let header = children.find(child => child?.props?.slot === 'header');
    const body = children.find(child => child?.props?.slot === 'body');

    // console.debug('B4hDrawerLayout', { header, body });

    if (typeof header === 'string') {
      header = (
        <Heading as="h1" size="md" style={{ cursor: 'pointer' }}>
          {header}
        </Heading>
      );
    }

    return (
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" p={3}>
            <Flex justifyContent="space-between">
              {header}
              <Center>
                <SmallCloseIconStyle onClick={onClose} />
              </Center>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Flex justifyContent="center" flexDir="column" gap={2}>
              {body}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }
);
