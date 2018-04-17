import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import Recommendation from '../pages/Recommendation';
import Plan from '../pages/Plan';
import Detail from '../pages/Detail';
import Explore from '../pages/Explore';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/recommendation" name="Recommendation" component={Recommendation} />
          <Route path="/plan" name="Plan" component={Plan} />
          <Route path="/explore/:id" name="Detail" component={Detail} />
          <Route path="/explore" name="Explore" component={Explore} />
          <Redirect to="/explore" />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
