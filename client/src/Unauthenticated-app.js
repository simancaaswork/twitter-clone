import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import HomePage from './screens/HomePage';
import Login from './screens/Login';

function UnauthenticatedApp() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route path="*" component={() => <Redirect to={'/'} />} />
      </Switch>
    </Router>
  );
}

export default UnauthenticatedApp;
