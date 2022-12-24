import { useState } from 'react';
import './Signin.css'

const Signin = ({ loadUser, onRouteChange }) => {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  }

  const saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  const onSubmitSignIn = () => {
    fetch('http://localhost:3000/back/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.userId && data.success === 'true') {
          saveAuthTokenInSession(data.token);
          fetch(`http://localhost:3000/back/profile/${data.userId}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': data.token
            }
          })
            .then(resp => resp.json())
            .then(user => {
              if (user && user.email) {
                loadUser(user);
                onRouteChange('home');
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
            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
          </div>
        </div>
      </main>
    </article>
  );
}

export default Signin;
