import { Route, Routes } from 'react-router-dom';
import { B4hHeader } from '../components/header/header';
import { ProtectedRoute } from '../components/protectedRoute';
import { ExpensesPage } from '../pages/expenses/expensesPage';
import { AddGroupPage } from '../pages/groups/addGroupPage/addGroupPage';
import { GroupPage } from '../pages/groups/groupsPage';
import { HomePage } from '../pages/home';
import { AddLabelPage } from '../pages/labels/addLabelPage/addLabelPage';
import { LabelPage } from '../pages/labels/labelsPage';
import { LoginPage } from '../pages/login';
import { B4hRoutes } from '../shared/routes';

export function App() {
  return (
    <>
      <B4hHeader />
      <Routes>
        <Route path={B4hRoutes.home} Component={HomePage} />
        <Route path={B4hRoutes.login} Component={LoginPage} />
        <Route element={<ProtectedRoute />}>
          <Route path={B4hRoutes.groups} Component={GroupPage} />
          <Route path={B4hRoutes.groupsAdd} Component={AddGroupPage} />
          <Route path={B4hRoutes.labels} Component={LabelPage} />
          <Route path={B4hRoutes.labelsAdd} Component={AddLabelPage} />
          <Route path={B4hRoutes.expenses} Component={ExpensesPage} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
