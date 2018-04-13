import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar';
import RecommendationService from '../../services/Recommendation';
import RecommendationList from './RecommendationList';
import GoogleMaps from '../../components/GoogleMaps';

import './index.css';

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.places = [];
    this.state = {
      places: [],
      pickedPlaces: {},
      searchResults: false,
      center: undefined,
      routes: [],
    };
    this.getPlaces = this.getPlaces.bind(this);
    this.getRoute = this.getRoute.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
    this.showSearchResults = this.showSearchResults.bind(this);
    this.hideSearchResults = this.hideSearchResults.bind(this);
  }

  componentDidMount() {
    this.getPlaces();
  }

  getPlaces() {
    RecommendationService.getPlaces().then((res) => {
      this.places = res.data.places;
      this.setState({ places: res.data.places });
    });
  }

  getRoute() {
    RecommendationService.getRoute({
      place_ids: Object.keys(this.state.pickedPlaces).join(','),
    }).then((res) => {
      this.setState({ routes: res.data.routes });
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

  handleClickItem(item) {
    const pickedPlaces = { ...this.state.pickedPlaces };
    if (!pickedPlaces[item.id]) {
      pickedPlaces[item.id] = item;
      this.places = this.places.filter(place => place.id !== item.id)
      this.setState({
        pickedPlaces,
        places: this.state.places.filter(place => place.id !== item.id),
        center: item.location,
      });
    }
  }

  showSearchResults() {
    this.setState({ searchResults: true });
  }

  hideSearchResults() {
    this.setState({ searchResults: false });
  }

  render() {
    return (
      <div>
        <SearchBar search={this.handleSearch} onFocus={this.showSearchResults} />
        {this.state.searchResults &&
        <RecommendationList 
          places={this.state.places}
          close={this.hideSearchResults}
          onClickItem={this.handleClickItem}
        />
        }
        <GoogleMaps
          containerElement={
            <div className="google-maps-container" />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          center={this.state.center}
          markers={Object.keys(this.state.pickedPlaces).map(key => this.state.pickedPlaces[key])}
          polylines={this.state.routes}
        />
        <button className="btn btn-success get-route-btn" onClick={this.getRoute}>Get best route</button>
      </div>
    );
  }
}

export default Recommendation;
