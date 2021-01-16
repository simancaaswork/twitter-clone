import * as React from 'react';
import {useAuth} from './context/authApp/auth-context';
import FullPageLoading from './layout-components/FullPageLoading';

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './Authenticated-app'),
);
const UnauthenticatedApp = React.lazy(() => import('./Unauthenticated-app'));

function App() {
  const {isAuth} = useAuth();
  return (
    // Here we're rendenring a whole different app for the two
    // kind of user, users that are not logged and logged users.
    // So, this is a good way to:
    //    1. Protect some kind of information that there's not available
    //    for all user.
    //    2. It's allow work with react-router-dom in a easier way.
    //    3. Not have to render components when is not necessary.
    //
    // If you want to see the AuthenticatedApp just go to:
    //    src/context/authApp/auth-context.js
    // and change from initialState: isAuth: `true` and save it! :D

    <React.Suspense fallback={<FullPageLoading />}>
      {isAuth ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
