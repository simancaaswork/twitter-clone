import * as React from 'react';
import {Link} from 'react-router-dom';
import EditProfileForm from './components/EditProfileForm';
import {useAuth} from '../../context/authApp/auth-context';
import useAsync from '../../hooks/useAsync';

function EditProfile({history}) {
  const [userModified, setUserModified] = React.useState({});
  const {user, updateUserInformation} = useAuth();
  const {loading, success, run} = useAsync();

  function handleOnChange(e) {
    setUserModified({
      ...userModified,
      [e.target.name]: e.target.value,
    });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    run('user', userModified, 'PUT', user._id);
  }

  React.useEffect(() => {
    if (user) {
      setUserModified(user);
    }
    if (success) {
      updateUserInformation();
      history.goBack();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, success]);
  return (
    <>
      <div className="configure-profile-header">
        <Link to={`/community/${user.username}`}>
          <svg viewBox="0 0 24 24" className="arrow-left">
            <g>
              <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
            </g>
          </svg>
        </Link>
        <div className="configure-profile-header-info">
          <h5>Edit profile</h5>
          <span>and show who you are (:</span>
        </div>
      </div>
      <EditProfileForm
        userModified={userModified}
        onChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        loading={loading}
      />
    </>
  );
}

export default EditProfile;
