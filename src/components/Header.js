import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import DailyList from './DailyList';
import auth from  '../utils/auth';
import history from '../utils/history';
import currentTrip from '../utils/currentTrip';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoute: history.location.pathname,
      isAuth: auth.isAuth(),
      currentTrip: currentTrip.get(),
    };
  }

  componentDidMount() {
    this.removeAuthListener = auth.onChange(() => this.setState({ isAuth: auth.isAuth() }));
    this.removeCurrenttripListener = currentTrip.onChange(() => this.setState({ currentTrip: currentTrip.get() }));
  }

  componentWillUnmount() {
    this.removeAuthListener();
    this.removeCurrenttripListener();
  }

  render() {
    return (
      <div className="nav-bar">
        <ul>
          <li className="nav-left pointer" onClick={() => history.push('/explore')}>
            <i className="fa fa-globe fa-3x mr-1" />
            Travel Planner
          </li>
          {this.state.isAuth ?
            <React.Fragment>
              <li className="nav-right"><a onClick={() => auth.logout()}>Logout</a></li>
              <li className="nav-right"><NavLink to="/profile" activeClassName="active">Profile</NavLink></li>
              {this.state.currentTrip && this.state.currentTrip.id &&
                <li className="nav-right"><NavLink to="/plan" activeClassName="active">Plan</NavLink></li>
              }
            </React.Fragment>
            :
            <li className="nav-right"><NavLink to="/login" activeClassName="active">Login</NavLink></li>
          }
          <li className="nav-right"><NavLink to="/explore" activeClassName="active">Explore</NavLink></li>
        </ul>
        {this.state.currentRoute !== '/plan' && <DailyList />}
      </div>
    )
  }
}

export default withRouter(Header);
