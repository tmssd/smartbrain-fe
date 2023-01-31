import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../store/reducers/user/userSlice';
import { useGetRegisterUserMutation } from '../../store/reducers/api/apiSlice';

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  };

  const onNameChange = (event) => {
    setRegisterName(event.target.value);
  }

  const onEmailChange = (event) => {
    setRegisterEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setRegisterPassword(event.target.value);
  }

  const [
    getRegisterUserFromApi,
    // {
    // isLoading: isLoadingUser,
    // isSuccess: isSuccessUser,
    // isError: isErrorUser,
    // error: errorUser
    // }
  ] = useGetRegisterUserMutation();

  const onSubmitSignIn = () => {
    getRegisterUserFromApi({ email: registerEmail, password: registerPassword, name: registerName }).unwrap()
      .then(user => {
        if (user.id) {
          saveAuthTokenInSession(user.token);
          dispatch(loadUser(user));
          navigate('/user', { replace: true });
        }
      })
  }

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
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
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register" />
          </div>
          <div className="lh-copy mt3">
            <Link to='/' className="f6 link dim black db pointer">Sign In</Link>
          </div>
        </div>
      </main>
    </article>
  );
}

export default Register;
