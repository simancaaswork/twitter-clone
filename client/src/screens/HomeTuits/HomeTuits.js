import HomeForm from './components/HomeForm';
import Tuit from './components/Tuit';
import {useAuth} from '../../context/authApp/auth-context';
import LoadingComponent from '../../layout-components/LoadingComponent';

function HomeTuits() {
  const {tuits, user} = useAuth();

  return (
    <div className="home-tuits-layout">
      <div className="home-tuits-header">
        <h4>Home</h4>
      </div>
      <HomeForm user={user} />
      <div className="home-tuits-all">
        {tuits.length === 0 ? (
          <LoadingComponent />
        ) : (
          tuits.map(tuit => {
            return <Tuit key={tuit._id} tuit={tuit} />;
          })
        )}
      </div>
    </div>
  );
}

export default HomeTuits;
