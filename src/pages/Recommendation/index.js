import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar';
import RecommendationService from '../../services/Recommendation';
import RecommendationList from './RecommendationList';
import GoogleMaps from '../../components/GoogleMaps';
import { googleConfig } from '../../config/app';

import './index.css';

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.places = [];
    this.state = {
      places: [],
      pickedPlaces: [],
      searchResults: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.showSearchResults = this.showSearchResults.bind(this);
    this.hideSearchResults = this.hideSearchResults.bind(this);
  }

  componentDidMount() {
    RecommendationService.getPlaces().then((res) => {
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

  handleClickItem(item) {

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
          defaultZoom={googleConfig.defaultZoom}
          markers={this.state.pickedPlaces}
        />
      </div>
    );
  }
}

export default Recommendation;
