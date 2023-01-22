import { Link } from 'react-router-dom';
import ProfileIcon from '../Profile/ProfileIcon';

const Navigation = ({ isSignedIn, setIsSignedIn, toggleModal }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ProfileIcon setIsSignedIn={setIsSignedIn} toggleModal={toggleModal} />
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/" style={{ textDecoration: 'none' }} className='f3 link dim black underline pa3 pointer'>Sign In</Link>
        <Link to="/register" style={{ textDecoration: 'none' }} className='f3 link dim black underline pa3 pointer'>Register</Link>
      </nav>
    );
  }
}

export default Navigation;
