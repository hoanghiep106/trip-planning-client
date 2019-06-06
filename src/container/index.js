import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/Header.js';

import Plan from '../pages/Plan';
import Login from '../pages/Login';
import Explore from '../pages/Explore.js';
import Destination from '../pages/Destination';
import Profile from '../pages/Profile';
import history from '../utils/history';

import auth from '../utils/auth';
import currentTrip from '../utils/currentTrip';


class App extends Component {
  constructor(props) {
    super(props);
    this.places = [];
    this.state = {
      places: [],
      isAuth: auth.isAuth(),
      currentTrip: currentTrip.get(),
    }
  }

  componentDidMount() {
    this.removeAuthListener = auth.onChange(() => this.setState({ isAuth: auth.isAuth() }));
    this.removecurrentTripListener = currentTrip.onChange(() => this.setState({ currentTrip: currentTrip.get() }));
  }

  componentWillUnmount() {
    this.removeAuthListener();
    this.removecurrentTripListener();
  }

  renderRoutes() {
    if (!this.state.currentTrip) {
      return (
        <Switch>
          <Route path="/destination" name="Destination" component={Destination} />
          <Redirect to="/destination" />
        </Switch>
      )
    }
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/explore" name="Explore" component={Explore} />
          {this.state.isAuth ?
            <React.Fragment>
              <Route path="/plan" name="Plan" component={Plan} />
              <Route path="/profile" name="Profile" component={Profile} />
            </React.Fragment>
            :
            <Route path="/login" name="Login" component={Login} />
          }
          <Redirect from="/" to="/explore" />
        </Switch>
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        <Router history={history}>
          {this.renderRoutes()}
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
