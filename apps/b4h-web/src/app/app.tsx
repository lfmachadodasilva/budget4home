// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { useColorMode, useDisclosure } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

import { B4hHeader } from './components/header';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { ResetPage } from './pages/reset';

export function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const router = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: <></>
  //   },
  //   {
  //     path: '/login',
  //     element: <LoginPage />
  //   }
  // ]);

  return (
    <>
      <B4hHeader />

      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/reset" Component={ResetPage} />
        {/* <Route path="/" exact component={Home} />
          <Route path="/products" component={Products} />
          <PrivateRoute path="/admin" component={Admin} /> */}
      </Routes>

      {/* <Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button> */}
      {/* <div>
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
      </div> */}
    </>
  );
}

export default App;
