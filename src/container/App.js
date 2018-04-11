import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import Recommendation from '../pages/Recommendation';
import Plan from '../pages/Plan';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/recommendation" name="Recommendation" component={Recommendation} />
          <Route path="/plan" name="Plan" component={Plan} />
          <Redirect to="/recommendation" />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
