import {Link} from 'react-router-dom';
import {useAuth} from '../context/authApp/auth-context';
import LoadingComponent from './LoadingComponent';
function PeopleRegistered() {
  const {usersRelated} = useAuth();

  return (
    <div className="might-like-users">
      <h3>You might like</h3>
      <div className="list-might-users">
        {usersRelated.length === 0 ? (
          <LoadingComponent />
        ) : (
          usersRelated.map(user => (
            <div className="might-user-like" key={user._id}>
              <div className="might-user-img">
                <img src={user.avatar} alt="" />
              </div>
              <div className="might-user-info">
                <Link to={`/community/${user.username}`}>
                  <strong>{user.name}</strong>
                  <span>@{user.username}</span>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PeopleRegistered;
