import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AuthenticationService from '../../services/Authentication';

const Header = (props) => {
  return (
    <header className="app-header navbar">
      <ul class="d-md-down-none navbar-nav">
        <li class="px-3 nav-item">
          <a href="#" class="nav-link">Recommendation</a>
        </li>
        <li class="px-3 nav-item">
          <a href="#" class="nav-link">Planning</a>
        </li>
      </ul>
    </header>
  );
};

export default withRouter(Header);
