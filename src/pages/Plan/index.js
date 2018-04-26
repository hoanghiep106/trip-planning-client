import React, { Component } from 'react';
import RecommendationService from '../../services/Recommendation';
import TripDetails from './TripDetails';
import GoogleMaps from '../../components/GoogleMaps';

import { GoodWeatherIds } from '../../constants/common';

import './index.css';

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      dailyList: localStorage.getItem('dailyList') ?
        JSON.parse(localStorage.getItem('dailyList')) : [],
      chosenRouteId: null,
      weather: {},
    };
    this.getRoute = this.getRoute.bind(this);
    this.handleChooseRoute = this.handleChooseRoute.bind(this);
    this.onMapLoad = this.onMapLoad.bind(this);
  }

  componentDidMount() {
    RecommendationService.getWeather().then(res => {
      console.log(res.data);
      this.setState({ weather: { ...res.data.main, ...res.data.weather[0] }}, () => this.getRoute());
    });
  }

  onMapLoad(map) {
    this.map = map;
    if (this.map) {
      const bounds = new window.google.maps.LatLngBounds();
      this.state.dailyList.forEach((place) => {
          bounds.extend(place.location);
      });
      this.map.fitBounds(bounds);
    }
  }

  getRoute() {
    let weather_condition = 1;
    if (GoodWeatherIds.includes(this.state.weather.id)) {
      weather_condition = 0;
    }
    RecommendationService.getRoute({
      place_ids: this.state.dailyList.map(place => place.id).join(','),
      weather_condition,
    }).then((res) => {
      this.setState({
        routes: res.data.routes,
      });
    });
  }

  handleChooseRoute(id) {
    this.setState({ chosenRouteId: id });
  }

  render() {
    return (
      <React.Fragment>
        <TripDetails
          weather={this.state.weather}
          routes={this.state.routes}
          onChooseRoute={this.handleChooseRoute}
          chosenRouteId={this.state.chosenRouteId}
        />
        <GoogleMaps
          containerElement={
            <div className="google-maps-container" />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          onMapLoad={this.onMapLoad}
          center={this.state.dailyList && this.state.dailyList[1].location}
          markers={this.state.dailyList}
          bounds={this.state.bounds}
          polylines={this.state.routes}
          highlight={this.state.chosenRouteId}
        />
      </React.Fragment>
    );
  }
}

export default Plan;
