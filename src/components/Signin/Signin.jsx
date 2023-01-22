import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../features/user/userSlice';
import { useGetSigninUserMutation, useGetSigninUserProfileMutation } from '../../features/api/apiSlice';
import './Signin.css'

const Signin = () => {

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveAuthTokenInSession = (token) => {
    // here we use 'sessionStorage' method of the browser API
    // wich will store session for the current window only
    // we could use 'localStorage' as well wich stores the
    // session throughout the whole browser's windows,
    // i.e.the current one and the future ones with the same url
    window.sessionStorage.setItem('token', token);
  };

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  const [
    getSigninUserFromApi,
    // {
    // isLoading: isLoadingUser,
    // isSuccess: isSuccessUser,
    // isError: isErrorUser,
    // error: errorUser
    // }
  ] = useGetSigninUserMutation();

  const [
    getSigninUserProfileFromApi,
    // {
    // isLoading: isLoadingUserProfile,
    // isSuccess: isSuccessUserProfile,
    // isError: isErrorUserProfile,
    // error: errorUserProfile
    // }
  ] = useGetSigninUserProfileMutation();

  const onSubmitSignIn = () => {
    getSigninUserFromApi({ email: signInEmail, password: signInPassword }).unwrap()
      .then(data => {
        if (data.userId && data.success === 'true') {
          saveAuthTokenInSession(data.token);
          getSigninUserProfileFromApi({ userId: data.userId, token: data.token }).unwrap()
            .then(user => {
              if (user && user.email) {
                dispatch(loadUser(user));
                navigate('/user', { replace: true });
              }
            })
            .catch(console.log)
        }
      })
  }

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black w-100 hover-black"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black w-100 hover-black"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib hover-black"
              type="submit"
              value="Sign in" />
          </div>
          <div className="lh-copy mt3">
            <Link to='/register' className="f6 link dim black db pointer">Register</Link>
          </div>
        </div>
      </main>
    </article>
  );
}

export default Signin;
