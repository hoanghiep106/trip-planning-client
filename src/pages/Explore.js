import React from 'react';
import Select from 'react-select';
import PlaceService from '../services/Place';
import PlaceItem from '../components/PlaceItem';
import currentTrip from '../utils/currentTrip';
import { transformPlaces } from '../utils';
import { CATEGORY } from '../constants/common';
import TripItem from '../components/TripItem';
import LoadingIndicator from '../components/LoadingIndicator';
import Modal from '../components/Modal';
import Plan from './Plan';
import PlannerService from '../services/Planner';

const Categories = [
  ...Object.keys(CATEGORY).map(key => ({
    label: CATEGORY[key][0].toUpperCase() + CATEGORY[key].slice(1),
    value: CATEGORY[key]
  })),
]


class Explore extends React.Component {
  state = {
    places: [],
    categories: [],
    showRelatedTrip: false,
    placePage: 1,
    placeEnd: false,
    currentTrip: currentTrip.get(),
    trips: [],
    tripPage: 1
  }

  componentDidMount() {
    this.fetchPlaces();
    window.addEventListener('scroll', this.checkScrollFetchMore);
    this.removeCurrenttripListener = currentTrip.onChange(() => this.setState({ currentTrip: currentTrip.get() }));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkScrollFetchMore);
    this.removeCurrenttripListener();
  }

  handleSelectCategory = (categories) => {
    this.setState({ categories, placePage: 1 }, () => this.fetchPlaces());
  }

  fetchPlaces() {
    if (!this.state.currentTrip.lat || !this.state.currentTrip.lng) {
      PlaceService.getGooglePlace(this.state.currentTrip.location_google_id).then(res => console.log(res));
    }
    const params = {
      page: this.state.placePage,
      location: `${this.state.currentTrip.lat},${this.state.currentTrip.lng}`,
      categories: this.state.categories.length > 0 ? this.state.categories.map(category => category.value).join(',') : null,
    };
    this.setState({ loading: true });
    setTimeout(() => {
      PlaceService.getPlaces(params).then((res) => {
        const results = transformPlaces(res.data.results);
        this.setState({
          places: params.page === 1 ? results : [...this.state.places, ...results],
          loading: false,
          placeEnd: parseInt(res.data.page, 10) === res.data.total_pages,
        });
      }).catch(() => this.setState({ loading: false, end: true }));
    }, 300);
  }

  fetchTrips() {
    const params = {
      page: this.state.tripPage,
      location_google_id: this.state.currentTrip.location_google_id,
      location_name: this.state.currentTrip.location_name,
    };
    this.setState({ loading: true });
    setTimeout(() => {
      PlannerService.getTrips(params).then((res) => {
        const results = res.data.trips;
        this.setState({
          trips: params.page === 1 ? results : [...this.state.trips, ...results],
          loading: false,
          tripEnd: res.data.page * res.data.items_per_page > res.data.total_items,
        }, () => console.log(this.state.tripEnd));
      }).catch(() => this.setState({ loading: false, end: true }));
    }, 300);
  }

  fetchMore() {
    if (!this.state.loading) {
      if (this.state.showRelatedTrip) {
        if (!this.state.tripEnd) {
          this.setState({
            tripPage: this.state.tripPage + 1,
          }, () => this.fetchTrips());
        }
      } else if (!this.state.placeEnd) {
        this.setState({
          placePage: this.state.placePage + 1,
        }, () => this.fetchPlaces());
      }
    }
  }

  checkScrollFetchMore = () => {
    if (window.innerHeight + window.scrollY
        > document.getElementById('root').clientHeight - 100) {
      this.fetchMore();
    }
  }

  toggleRelatedTrip = () => {
    this.setState({ showRelatedTrip: !this.state.showRelatedTrip }, () => {
      if (this.state.showRelatedTrip && !this.state.tripEnd) {
        this.fetchTrips();
      }
    })
  }

  handleTripBookmarkChange = (tripId, bookmarked) => {
    this.setState({
      trips: this.state.trips.map((trip) => {
        if (trip.id === tripId) {
          trip.bookmarked = bookmarked;
        }
        return trip;
      }),
    })
  }

  render() {
    const { places, categories, currentTrip: trip, trips, showRelatedTrip } = this.state;
    const exploreList = places && places.map(place => (
      <PlaceItem key={place.id} {...place} />
    ));
    return (
      <div className="container container-fluid py-5">
        <div>
          <button className="btn btn-link pl-0" onClick={() => currentTrip.set(null)}>
            <i className="fa fa-arrow-left mr-2" />
            Change the destination
          </button>
          <div className="pull-right">
            {!showRelatedTrip &&
              <Select
                className="category-select"
                placeholder="Select a category"
                value={categories}
                onChange={this.handleSelectCategory}
                options={Categories}
                isSearchable={false}
                clearable={false}
                isMulti
              />
            }
          </div>
        </div>
        <div className="explore-title pl-3">{trip.name}</div>
        {trip.id &&
          <button className="btn btn-link pl-0" onClick={this.toggleRelatedTrip}>
            {!showRelatedTrip ? `See related trips to ${trip.location_name || trip.name} - 3 days` : `See places  in ${trip.location_name || trip.name}`}
          </button>
        }
        {!showRelatedTrip ?
          <div className="row mt-4 px-4 mb-5">
            {exploreList}
          </div>
          :
          trips.map(trip => <TripItem {...trip} onTripBookmarkChange={this.handleTripBookmarkChange} /> )
        }
        {this.state.loading && <LoadingIndicator />}
      </div>
    );
  }
}

export default Explore;
