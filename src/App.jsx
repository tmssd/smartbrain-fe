import AppRouter from './router/AppRouter';

const App = () => {

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

  return <AppRouter />
}

export default App;
