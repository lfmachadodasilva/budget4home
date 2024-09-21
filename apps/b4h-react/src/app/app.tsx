import { Route, Routes } from 'react-router-dom';
import { B4hHeader } from './components/header/header';
import { ProtectedRoute } from './components/protectedRoute';
import { ExpensesPage } from './pages/expenses/expensesPage';
import { ForgotPage } from './pages/forgot/forgot';
import { GroupPage } from './pages/groups/groupsPage';
import { HomePage } from './pages/home';
import { LabelPage } from './pages/labels/labelsPage';
import { LoginPage } from './pages/login/login';
import { RegisterPage } from './pages/register/register';
import { B4hRoutes } from './shared/routes';

import styles from './app.module.scss';

export const App = () => {
  return (
    <div className={styles.container}>
      <B4hHeader />
      <Routes>
        <Route path={B4hRoutes.home} Component={HomePage} />
        <Route path={B4hRoutes.login} Component={LoginPage} />
        <Route path={B4hRoutes.register} Component={RegisterPage} />
        <Route path={B4hRoutes.forgot} Component={ForgotPage} />
        <Route element={<ProtectedRoute />}>
          <Route path={B4hRoutes.groups} Component={GroupPage} />
          <Route path={B4hRoutes.labels} Component={LabelPage} />
          <Route path={B4hRoutes.expenses} Component={ExpensesPage} />
        </Route>
      </Routes>
    </div>
  );
};
