import React from 'react';
import FacebookLogin from 'react-facebook-login';
import LoadingIndicator from '../components/LoadingIndicator';
import AuthenticationService from '../services/Authentication';
import auth from '../utils/auth';


class LoginForm extends React.Component {
  state = {
    data: {},
    loading: false,
    isSignup: false,
  };

  handleChange = (e) => {
    const data = { ...this.state.data };
    data[e.target.name] = e.target.value;
    this.setState({ data });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { data } = this.state;
    this.setState({ loading: true });
    if (this.state.isSignup) {
      AuthenticationService.register(data)
        .then(this.handleAuthenticationSuccess)
        .catch(this.handleAuthenticationFailed);
    } else {
      AuthenticationService.login(data)
        .then(this.handleAuthenticationSuccess)
        .catch(this.handleAuthenticationFailed);
    }
  }

  handleAuthenticationSuccess = (res) => {
    if (res.data) auth.setAuthToken(res.data.access_token);
  }

  handleAuthenticationFailed = (e) => {
    this.setState({ loading: false });
  }

  handleFacebookResponse = (res) => {
    AuthenticationService.connectFacebook({
      user_id: res.userID,
      access_token: res.accessToken,
    }).then(this.handleAuthenticationSuccess)
      .catch(this.handleAuthenticationFailed);
  }

  render() {
    const { loading, isSignup } = this.state;
    const title = isSignup ? 'SIGN UP' : 'LOGIN';
    return (
      <div className="sign-up text-center">
        <div className="sign-up--main-text">{title}</div>
        <div className="sign-up--card welcome-page">
          <form onSubmit={this.handleSubmit} method="POST">
            {isSignup &&
              <div className="text-left mb-4">
                <label htmlFor="username" className="font-weight-bold">Full name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={e => this.handleChange(e)}
                />
              </div>
            }
            <div className="text-left mb-4">
              <label htmlFor="username" className="font-weight-bold">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="text-left mb-4">
              <label htmlFor="password" className="font-weight-bold">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="text-right mb-4">
              <button
                className="btn btn-link"
                type="button"
                onClick={() => this.setState({ isSignup: !this.state.isSignup })}
              >
                {isSignup ? 'Login' : 'Sign up'}
              </button>
            </div>
            {loading ? <LoadingIndicator /> : (
              <button
                className="btn btn-primary px-4 mt-2 text-uppercase"
              >
                {title}
              </button>
            )}
            <FacebookLogin
              appId="2122120801218128"
              autoLoad={false}
              fields="name,email,picture"
              callback={this.handleFacebookResponse}
              cssClass="btn btn-link px-4 mt-2 text-uppercase d-block mx-auto"
              textButton="Connect with Facebook"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
