import React, { Component } from 'react';
import RecommendationService from '../../services/Recommendation';
import TripDetails from './TripDetails';
import GoogleMaps from '../../components/GoogleMaps';

import './index.css';

class Plan extends Component {
  constructor(props) {
    super(props);
    this.places = [];
    this.state = {
      routes: [],
      dailyList: localStorage.getItem('dailyList') ?
        JSON.parse(localStorage.getItem('dailyList')) : [],
    };
    this.getRoute = this.getRoute.bind(this);
  }

  componentDidMount() {
    this.getRoute();
  }

  getRoute() {
    RecommendationService.getRoute({
      place_ids: this.state.dailyList.map(place => place.id).join(','),
    }).then((res) => {
      this.setState({ routes: res.data.routes });
    });
  }

  render() {
    return (
      <React.Fragment>
        <TripDetails 
          places={this.state.dailyList}
          close={this.hideSearchResults}
          onClickItem={this.handleClickItem}
        />
        <GoogleMaps
          containerElement={
            <div className="google-maps-container" />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          center={this.state.dailyList && this.state.dailyList[0].location}
          markers={this.state.dailyList}
          polylines={this.state.routes}
        />
      </React.Fragment>
    );
  }
}

export default Plan;
