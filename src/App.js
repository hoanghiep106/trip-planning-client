import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import Recommendation from './pages/Recommendation';
import Plan from './pages/Plan';

class App extends Component {
  render() {
    return (
      <div className="app-body">
        <div className="main">
          <div className="container container-fluid">
            <HashRouter>
              <Switch>
                <Route path="/recommendation" name="Recommendation" component={Recommendation} />
                <Route path="/plan" name="Plan" component={Plan} />
                <Redirect to="/recommendation" />
              </Switch>
            </HashRouter>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
