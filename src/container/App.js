import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import ExploreService from '../services/Explore';

import Header from '../components/Header';

import Recommendation from '../pages/Recommendation';
import Plan from '../pages/Plan';
import Detail from '../pages/Detail';
import Explore from '../pages/Explore';

class App extends Component {
  constructor(props) {
    super(props);
    this.places = [];
    this.state = {
      places: [],
      dailyList: localStorage.getItem('dailyList') ?
        JSON.parse(localStorage.getItem('dailyList')) : [],
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.fetchPlaces();
  }

  fetchPlaces() {
    ExploreService.getPlaces().then((res) => {
      this.places = res.data.places;
      this.setState({ places: res.data.places });
    });
  }

  handleSearch(term) {
    if (term) {
      this.setState({
        places: this.places && this.places.length > 0 && this.places.filter(place =>
          place.name.toUpperCase().indexOf(term.toUpperCase()) > -1),
      });
    } else {
      this.setState({ places: this.places });
    }
  }

  RenderExplore = () => (
    <Explore places={this.state.places} />
  );

  render() {
    return (
      <div>
        <Header
          handleSearch={this.handleSearch}
        />
        <HashRouter>
          <Switch>
            <Route path="/recommendation" name="Recommendation" component={Recommendation} />
            <Route path="/plan" name="Plan" component={Plan} />
            <Route path="/explore/:id" name="Detail" component={Detail} />
            <Route path="/explore" name="Explore" render={this.RenderExplore} />
            <Redirect to="/explore" />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
