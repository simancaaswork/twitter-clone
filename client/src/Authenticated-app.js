import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import {useAuth} from './context/authApp/auth-context';

// Importing layout components
import NavBarDesktop from './layout-components/NavBarDesktop';
import NavBarMobile from './layout-components/NavBarMobile';
import PeopleRegistered from './layout-components/PeopleRegistered';
import ModalTuitah from './layout-components/ModalTuitah';

// Importing authenticated screens
import HomeTuits from './screens/HomeTuits';
import Profile from './screens/Profile';
import Tuit from './screens/Tuit';
import EditProfile from './screens/EditProfile';

function AuthenticatedApp() {
  const [openModal, setOpenModal] = React.useState(false);
  const {user} = useAuth();
  const history = useHistory();

  React.useLayoutEffect(() => {
    history.goBack();
  }, [history]);

  return (
    <Router>
      <main className="wrapper-principal-layout">
        <section className="nav-principal-layout">
          <NavBarDesktop
            setOpenModal={setOpenModal}
            openModal={openModal}
            user={user}
          />
        </section>
        <section className="content-principal-layout">
          <Switch>
            <Route exact path={'/'} component={HomeTuits} />
            <Route exact path={'/community/:username'} component={Profile} />
            <Route exact path={'/:username/tuit/:id'} component={Tuit} />
            <Route
              exact
              path={'/:username/edit/profile'}
              component={EditProfile}
            />
          </Switch>
        </section>
        <section className="suggest-content-layout">
          <PeopleRegistered />
        </section>
      </main>
      {openModal ? (
        <ModalTuitah setOpenModal={setOpenModal} openModal={openModal} />
      ) : null}
      <NavBarMobile
        setOpenModal={setOpenModal}
        openModal={openModal}
        user={user}
      />
    </Router>
  );
}

export default AuthenticatedApp;
