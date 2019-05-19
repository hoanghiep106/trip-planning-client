import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import PlaceService from '../services/Place';

import Header from '../components/Header';
import Login from '../components/Login/index';

import Plan from '../pages/Plan';
import Detail from '../pages/Detail';
import Explore from '../pages/Explore';
import auth from '../utils/auth';


class App extends Component {
  constructor(props) {
    super(props);
    this.places = [];
    this.state = {
      places: [],
      isAuth: auth.isAuth(),
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.checkPlaceInList = this.checkPlaceInList.bind(this);
  }

  componentDidMount() {
    // this.fetchPlaces();
    PlaceService.addDailyListChangeListener(this.checkPlaceInList);
    this.removeAuthListener = auth.onChange(() => this.setState({ isAuth: auth.isAuth() }));
  }

  componentWillUnmount() {
    PlaceService.removeDailyListChangeListener(this.checkPlaceInList());
    this.removeAuthListener();
  }

  checkPlaceInList() {
    this.setState({
      places: this.state.places.map(place => ({
        ...place,
        inDailyList: PlaceService.placeInList(place.id),
      })),
    });
  }

  fetchPlaces() {
    PlaceService.getPlaces().then((res) => {
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
            {this.state.isAuth ?
              <Route path="/plan" name="Plan" render={this.RenderPlan} />
              :
              <Route path="/login" name="Login" component={Login} />
            }
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
