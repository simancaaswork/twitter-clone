import {Link} from 'react-router-dom';
import header from '../../../assets/imgs/header/header-light.png';

function ProfileAvatar({user, userOnline}) {
  return (
    <div className="profile-user-imgs">
      <img src={header} alt="" />
      <div className="profile-user-profile-img">
        <img src={user.avatar} alt="" />
        {user._id !== userOnline._id ? null : (
          <Link to={`/${user.username}/edit/profile`}>Edit profile</Link>
        )}
      </div>
    </div>
  );
}

export default ProfileAvatar;
