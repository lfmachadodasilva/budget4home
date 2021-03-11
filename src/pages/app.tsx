import { HashRouter, Switch, Route } from 'react-router-dom';

import { HeaderComponent } from '../components/header/header';
import { Routes } from './routes';
import { HomePage } from './home/homePage';
import { ExpensePage } from './expense/expensePage';
import { LabelPage } from './label/labelPage';
import { GroupPage } from './group/groupPage';

import './app.scss';

function App() {
  return (
    <div className="App">
      <HashRouter basename={'/'}>
        <HeaderComponent />
        <Switch>
          <Route key={Routes.group} path={Routes.group} component={GroupPage} />
          <Route key={Routes.label} path={Routes.label} component={LabelPage} />
          <Route key={Routes.expense} path={Routes.expense} component={ExpensePage} />
          <Route key={Routes.home} path={Routes.home} component={HomePage} />
          <Route key={'*'} path="*">
            <h1> 404 </h1>
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
