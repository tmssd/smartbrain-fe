import { useState } from 'react';
import { Userpage } from '../pages/Userpage/Userpage';
import { Notfoundpage } from '../pages/Notfoundpage/Notfoundpage';
import { Layout } from '../components/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import Signin from '../components/Signin/Signin.jsx';
import Register from '../components/Register/Register.jsx';

const AppRouter = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
  )
}

export default AppRouter;
