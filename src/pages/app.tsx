import { useEffect, useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import './app.scss';

import { HeaderComponent } from '../components/header/header';
import { Routes } from './routes';
import { HomePage } from './home/homePage';
import { ExpensePage } from './expense/expensePage';
import { LabelPage } from './label/labelPage';
import { GroupPage } from './group/groupPage';
import { GlobalContextProvider } from '../contexts/globalContext';

function App() {
  const [user, initialising] = useAuthState(firebase.auth());
  const [isLoading, setLoading] = useState(false);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    if (initialising || !user) {
      return;
    }

    if (user) {
      setLoading(true);
      user
        .getIdTokenResult()
        .then((value: any) => {
          axios.defaults.headers.common.Authorization = value.token;
          setReady(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, initialising]);

  return (
    <div className="App">
      <HashRouter basename={'/'}>
        <HeaderComponent />
        <div className="App-body container">
          <GlobalContextProvider>
            {isReady && user ? (
              <Switch>
                <Route key={Routes.group} path={Routes.group} component={GroupPage} />
                <Route key={Routes.label} path={Routes.label} component={LabelPage} />
                <Route key={Routes.expense} path={Routes.expense} component={ExpensePage} />
                <Route key={Routes.home} path={Routes.home} component={HomePage} />
                <Route key={'*'} path="*">
                  <h1> 404 </h1>
                </Route>
              </Switch>
            ) : (
              <>
                {isLoading && (
                  <div>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <br></br>
                  </div>
                )}
                <HomePage />
              </>
            )}
          </GlobalContextProvider>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
