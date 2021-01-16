import * as React from 'react';
import {useParams} from 'react-router-dom';

import Header from './components/Header';
import ProfileAvatar from './components/ProfileAvatar';
import Biography from './components/Biography';
import Tuit from '../../screens/HomeTuits/components/Tuit';
import LoadingComponent from '../../layout-components/LoadingComponent';
import NotFound from '../../layout-components/NotFound';

import {useAuth} from '../../context/authApp/auth-context';
import useAsync from '../../hooks/useAsync';

function Profile({history}) {
  const {user_tuits, getUserTuits, user: userOnline} = useAuth();
  const [user, setUser] = React.useState({});
  const [renderComponent, setRenderComponent] = React.useState(false);
  const {run, success, asyncData, loading, errorMsg, error} = useAsync();
  const params = useParams();

  function handleGetUserInformation() {
    run('user', null, 'GET', params.username);
  }

  React.useLayoutEffect(() => {
    handleGetUserInformation();
    getUserTuits(params.username);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.username]);

  React.useEffect(() => {
    if (asyncData) {
      setUser(asyncData);
      setRenderComponent(true);
    }
  }, [asyncData]);

  if (renderComponent) {
    return (
      <section className="profile-layout-screen">
        {!loading && success ? (
          <>
            <Header history={history} user={user} user_tuits={user_tuits} />
            <ProfileAvatar user={user} userOnline={userOnline} />
            <Biography user={user} />
            <div className="profile-nav-tuits">
              <span>Tuits</span>
            </div>
            <section className="profile-user-all-tuits">
              {user_tuits.map(tuit => (
                <Tuit key={tuit._id} tuit={tuit} />
              ))}
            </section>
          </>
        ) : error ? (
          <NotFound msg={errorMsg} />
        ) : null}
      </section>
    );
  } else {
    return <LoadingComponent />;
  }
}

export default Profile;
