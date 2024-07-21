// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react';
import { B4hHeader } from './components/header';

export function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <B4hHeader />

      <div>
        {/* <B4hButton buttonType="primary">Test1</B4hButton> */}
        {/* <B4hButton buttonType="secondary">Test2</B4hButton> */}
        <Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button>
        <Button colorScheme="blue" variant="outline">
          Test chakra
        </Button>
        <Button colorScheme="primary">Test chakra</Button>
        <Button variant="outline">Test chakra</Button>
        <Button>Default</Button>

        <br></br>
        <Button onClick={onOpen}>Open</Button>
        <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              borderBottomWidth="1px"
            >
              <>
                <span>Basic Drawer</span>
                <CloseIcon style={{ cursor: 'pointer' }} onClick={onClose} />
              </>
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
      </div>
    </>
  );
}

export default App;
