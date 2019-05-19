import React from 'react';
import SearchBar from '../SearchBar';
import DailyList from '../DailyList';
import auth from  '../../utils/auth';
import './index.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoute: window.location.hash,
      isAuth: auth.isAuth(),
    };
  }

  componentDidMount() {
    this.removeAuthListener = auth.onChange(() => this.setState({ isAuth: auth.isAuth() }));
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  changeRoute(route) {
    window.location.hash = route;
    this.setState({ currentRoute: route });
  }

  render() {
    return (
      <div className="nav-bar">
        <ul>
          <li className="nav-left">
            {this.state.currentRoute !== '#/plan' && <SearchBar search={this.props.handleSearch} />}
          </li>
          {this.state.isAuth ?
            <React.Fragment>
              <li className="nav-right"><a onClick={() => auth.logout()}>Logout</a></li>
              <li className="nav-right">
                <a
                  className={this.state.currentRoute === '#/plan' ? 'active' : ''}
                  onClick={() => this.changeRoute('#/plan')}
                >Plan</a>
              </li>
            </React.Fragment>
            :
            <li className="nav-right">
              <a
                className={this.state.currentRoute === '#/login' ? 'active' : ''}
                onClick={() => this.changeRoute('#/login')}
              >Login</a>
            </li>
          }
          <li className="nav-right">
            <a
              className={this.state.currentRoute === '#/explore' ? 'active' : ''}
              onClick={() => this.changeRoute('#/explore')}
            >Explore</a>
          </li>
        </ul>
        {this.state.currentRoute !== '#/plan' && <DailyList />}
      </div>
    )
  }
}

export default Header;
