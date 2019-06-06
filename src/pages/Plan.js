import React from 'react';
import uuidv4 from 'uuid/v4';
import TripInfo from '../components/TripInfo';
import GoogleMaps from '../components/GoogleMaps';
import currentTrip from '../utils/currentTrip';


const getPlaceLocation = (place) => ({
  id: uuidv4(),
  name: place.name,
  location: {
    lat: place.latitude,
    lng: place.longitude,
  }
});

class Plan extends React.Component {
  state = {
    currentTrip: currentTrip.get(),
    chosenRouteId: null,
    // Itinerary index
    currentDay: 0,
  };

  componentDidMount() {
    this.removeCurrenttripListener = currentTrip.onChange(() => this.setState({ currentTrip: currentTrip.get() }));
  }

  componentWillUnmount() {
    this.removeCurrenttripListener();
  }

  onMapLoad = (map) => {
    const { currentTrip } = this.state;
    this.map = map;
    if (this.map && this.state.currentTrip) {
      const bounds = new window.google.maps.LatLngBounds();
      currentTrip.itineraries && [].concat.apply([], currentTrip.itineraries.map(itinerary => itinerary.places)).forEach((place) => {
          bounds.extend({
            lat: place.latitude,
            lng: place.longitude,
          });
      });
      this.map.fitBounds(bounds);
    }
  }

  handleChooseDay = (index) => {
    this.setState({ currentDay: index, chosenRouteId: null });
    if (this.map && this.state.currentTrip) {
      const bounds = new window.google.maps.LatLngBounds();
      this.state.currentTrip.itineraries[index].places.forEach((place) => {
        bounds.extend({
          lat: place.latitude,
          lng: place.longitude,
        });
      });
      this.map.fitBounds(bounds);
    }
  }

  handleChooseRoute = (id) => {
    this.setState({ chosenRouteId: this.state.chosenRouteId === id ? null : id });
  }

  handleRemoveDay = () => this.handleChooseDay(0);

  render() {
    const { currentTrip } = this.state;
    const places = currentTrip && [].concat.apply([], currentTrip.itineraries.map(itinerary => itinerary.places));
    const defaultLocation = places && places[0] && { lat: places[0].latitude, lng: places[0].longitude };
    const currentItinerary = currentTrip && currentTrip.itineraries[this.state.currentDay];
    const placeMap = {};
    currentItinerary.places.forEach(place => {
      placeMap[place.id] = place
    });
    const routes = currentItinerary.ordered_places && currentItinerary.ordered_places.filter((placeId, index) => index < currentItinerary.ordered_places.length - 1).map((placeId, index) => {
      const origin = placeMap[currentItinerary.ordered_places[index]];
      const dest = placeMap[currentItinerary.ordered_places[index + 1]];
      return {
        id: index + 1,
        origin,
        dest,
        distance: 200,
        time: 120,
        route: [getPlaceLocation(origin).location, getPlaceLocation(dest).location],
      };
    });
    return (
      <React.Fragment>
        <TripInfo
          currentTrip={this.state.currentTrip}
          weather={this.state.weather}
          routes={routes || []}
          onChooseDay={this.handleChooseDay}
          currentDay={this.state.currentDay}
          onChooseRoute={this.handleChooseRoute}
          chosenRouteId={this.state.chosenRouteId}
          onRemoveDay={this.handleRemoveDay}
        />
        <GoogleMaps
          containerElement={
            <div className="google-maps-container" />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          onMapLoad={this.onMapLoad}
          center={defaultLocation}
          markers={currentItinerary.places.map(place => getPlaceLocation(place))}
          bounds={this.state.bounds}
          polylines={routes}
          highlight={this.state.chosenRouteId}
        />
      </React.Fragment>
    );
  }
}

export default Plan;
