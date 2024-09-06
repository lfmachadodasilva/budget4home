// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Link, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { LoginPage } from '../pages/login';
import { B4hRoutes } from '../shared/routes';

export function App() {
  return (
    <div>
      <div role="navigation">
        <ul>
          <li>
            <Link to={B4hRoutes.home}>Home</Link>
          </li>
          <li>
            <Link to={B4hRoutes.login}>login</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path={B4hRoutes.home} Component={HomePage} />
        <Route path={B4hRoutes.login} Component={LoginPage} />
      </Routes>
    </div>
  );
}

export default App;
