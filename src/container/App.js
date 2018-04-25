import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import ExploreService from '../services/Explore';

import Header from '../components/Header';

import Plan from '../pages/Plan';
import Detail from '../pages/Detail';
import Explore from '../pages/Explore';

class App extends Component {
  constructor(props) {
    super(props);
    this.places = [];
    this.state = {
      places: [],
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.checkPlaceInList = this.checkPlaceInList.bind(this);
  }

  componentDidMount() {
    this.fetchPlaces();
    ExploreService.addDailyListChangeListener(this.checkPlaceInList);
  }

  componentWillUnmount() {
    ExploreService.removeDailyListChangeListener(this.checkPlaceInList());
  }

  checkPlaceInList() {
    this.setState({
      places: this.state.places.map(place => ({
        ...place,
        inDailyList: ExploreService.placeInList(place.id),
      })),
    });
  }

  fetchPlaces() {
    ExploreService.getPlaces().then((res) => {
      this.places = res.data.places;
      this.setState({ places: res.data.places }, () => this.checkPlaceInList());
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

  RenderPlan = () => (
    <Plan places={this.places} />
  );

  render() {
    return (
      <div>
        <Header handleSearch={this.handleSearch} />
        <HashRouter>
          <Switch>
            <Route path="/plan" name="Plan" render={this.RenderPlan} />
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
