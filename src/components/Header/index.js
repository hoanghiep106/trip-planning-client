import React from 'react';
import SearchBar from '../SearchBar';
import './index.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoute: window.location.hash,
    };
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
            <SearchBar search={this.props.handleSearch} />
          </li>
          <li className="nav-right">
            <a
              className={this.state.currentRoute === '#/recommendation' ? 'active' : ''}
              onClick={() => this.changeRoute('#/recommendation')}
            >Plan</a>
          </li>
          <li className="nav-right">
            <a
              className={this.state.currentRoute === '#/explore' ? 'active' : ''}
              onClick={() => this.changeRoute('#/explore')}
            >Explore</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Header;
