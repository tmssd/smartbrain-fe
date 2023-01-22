import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Userpage } from './pages/Userpage/Userpage';
import { Notfoundpage } from './pages/Notfoundpage/Notfoundpage';
import { Layout } from './components/Layout/Layout';
import Signin from './components/Signin/Signin.jsx';
import Register from './components/Register/Register.jsx';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // const onRouteChange = useCallback((route) => {
  //   if (route === 'signout') {
  //     deleteLogoutUserTokenFromApi({ userId: user.id, token: window.sessionStorage.getItem('token') });
  //     removeSessionToken();
  //     setInput('');
  //     setImageUrl('');
  //     setBoxes([]);
  //     setRoute('signin');
  //     setIsSignedIn(false);
  //     setIsProfileOpen(false);
  //     dispatch(resetUser());
  //     return
  //   } else if (route === 'home') {
  //     setIsSignedIn(true);
  //   }
  //   setRoute(route);
  // }, [deleteLogoutUserTokenFromApi, user.id, dispatch])

  const toggleModal = () => {
    setIsProfileOpen(
      (isProfileOpen) => !isProfileOpen
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} toggleModal={toggleModal} />}>
          <Route index element={<Signin />} />
          <Route path="register" element={<Register />} />
          <Route path="user" element={<Userpage setIsSignedIn={setIsSignedIn} isProfileOpen={isProfileOpen} toggleModal={toggleModal} />} />
          <Route path="*" element={<Notfoundpage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
