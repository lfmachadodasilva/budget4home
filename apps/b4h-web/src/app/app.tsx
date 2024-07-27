// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { B4hHeader } from './components/header';
import { B4hRoutes } from './config/routes';
import { ExpensesPage } from './pages/expenses';
import { GroupsPage } from './pages/groups';
import { HomePage } from './pages/home';
import { LabelsPage } from './pages/labels';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { ResetPage } from './pages/reset';
import { useAuth } from './providers/authProvider';

export default function App() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      !loading &&
      !user &&
      ![B4hRoutes.login, B4hRoutes.register, B4hRoutes.reset].includes(location.pathname)
    ) {
      navigate('/login');
    }
  }, [user, loading, location]);

  return (
    <Flex justifyContent="center">
      <Box m={3} w="2xl">
        <B4hHeader />
        <Routes>
          <Route path={B4hRoutes.home} Component={HomePage} />
          <Route path={B4hRoutes.login} Component={LoginPage} />
          <Route path={B4hRoutes.register} Component={RegisterPage} />
          <Route path={B4hRoutes.reset} Component={ResetPage} />

          <Route path={B4hRoutes.groups} Component={GroupsPage} />
          <Route path={B4hRoutes.labels} Component={LabelsPage} />
          <Route path={B4hRoutes.expenses} Component={ExpensesPage} />
        </Routes>
      </Box>
    </Flex>
  );
}
