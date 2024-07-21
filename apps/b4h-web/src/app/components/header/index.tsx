import { HamburgerIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Center,
  chakra,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  useDisclosure
} from '@chakra-ui/react';

export const B4hHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenUser, onOpen: onOpenUser, onClose: onCloseUser } = useDisclosure();
  return (
    <>
      <Flex alignContent="center" justifyContent="space-between" pr={3}>
        <Center>
          <HamburgerIconStyle onClick={onOpen} boxSize={5} />
          <Heading as="h1" size="md">
            budget4home
          </Heading>
        </Center>
        <Center>
          <AvatarStyle boxSize={5} ml="auto" onClick={onOpenUser} />
        </Center>
      </Flex>

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
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p style={{ marginTop: '200px' }}>Some contents...</p>
            <p style={{ marginTop: '200px' }}>Some contents...</p>
            <p style={{ marginTop: '200px' }}>Some contents...</p>
            <p style={{ marginTop: '200px' }}>Some contents...</p>

            <p style={{ marginTop: '200px' }}>Some contents...</p>
            <p style={{ marginTop: '200px' }}>Some contents...</p>
            <p style={{ marginTop: '200px' }}>Some contents...</p>
            <p style={{ marginTop: '200px' }}>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer placement={'right'} onClose={onCloseUser} isOpen={isOpenUser}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Flex justifyContent="space-between">
              <span>Basic Drawer</span>
              <Center>
                <SmallCloseIconStyle onClick={onCloseUser} />
              </Center>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p style={{ marginTop: '200px' }}>Some contents...</p>
            <p style={{ marginTop: '200px' }}>Some contents...</p>
            <p style={{ marginTop: '200px' }}>Some contents...</p>
            <p style={{ marginTop: '200px' }}>Some contents...</p>

            <p style={{ marginTop: '200px' }}>Some contents...</p>
            <p style={{ marginTop: '200px' }}>Some contents...</p>
            <p style={{ marginTop: '200px' }}>Some contents...</p>
            <p style={{ marginTop: '200px' }}>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const HamburgerIconStyle = chakra(HamburgerIcon, {
  baseStyle: {
    m: 3
  }
});

const SmallCloseIconStyle = chakra(SmallCloseIcon, {
  baseStyle: {
    cursor: 'pointer'
  }
});

const AvatarStyle = chakra(Avatar, {
  baseStyle: {
    cursor: 'pointer'
  }
});
