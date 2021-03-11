import { HashRouter, Switch, Route } from 'react-router-dom';

import './app.scss';

import { HeaderComponent } from '../components/header/header';
import { Routes } from './routes';
import { HomePage } from './home/homePage';
import { ExpensePage } from './expense/expensePage';
import { LabelPage } from './label/labelPage';
import { GroupPage } from './group/groupPage';
import { GlobalContextProvider } from '../contexts/globalContext';

function App() {
  return (
    <div className="App">
      <HashRouter basename={'/'}>
        <HeaderComponent />
        <div className="App-body container">
          <GlobalContextProvider>
            <Switch>
              <Route key={Routes.group} path={Routes.group} component={GroupPage} />
              <Route key={Routes.label} path={Routes.label} component={LabelPage} />
              <Route key={Routes.expense} path={Routes.expense} component={ExpensePage} />
              <Route key={Routes.home} path={Routes.home} component={HomePage} />
              <Route key={'*'} path="*">
                <h1> 404 </h1>
              </Route>
            </Switch>
          </GlobalContextProvider>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
