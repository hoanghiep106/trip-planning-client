import React from 'react';
import toastr from 'toastr';
import currentTrip from '../utils/currentTrip';
import PlannerService from '../services/Planner';

class PlaceItem extends React.Component {
  state = {
    dropdown: false,
    currentTrip: currentTrip.get(),
  }

  componentDidMount() {
    window.document.addEventListener('click', e => this.hideDropdown(e));
    this.removeCurrenttripListener = currentTrip.onChange(() => this.setState({ currentTrip: currentTrip.get() }))
  }

  componentWillUnmount() {
    window.document.removeEventListener('click', e => this.hideDropdown(e));
    this.removeCurrenttripListener();
  }

  addToList(place, itineraryId) {
    PlannerService.addPlace({
      day_itinerary_id: itineraryId,
      name: place.name,
      latitude: place.location.lat,
      longitude: place.location.lng,
    }).then((res) => {
      currentTrip.fetch();
    });
  }

  hideDropdown = (e) => {
    if (this.dropDownToggleRef && !this.dropDownToggleRef.contains(e.target)
        && this.state.dropdown) {
      this.setState({ dropdown: false });
    }
  }

  removePlace =  (placeId) => {
    PlannerService.deletePlace(placeId).then(() => {
      currentTrip.fetch();
    })
  }

  render() {
    const place = this.props;
    const { currentTrip } = this.state;
    const itineraries = currentTrip && currentTrip.itineraries;
    const places = itineraries && [].concat.apply([], currentTrip.itineraries.map(itinerary => itinerary.places));
    const placeNames = places && places.map(p => p.name);
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 mt-3">
        <div className="explore-item">
          <div
            className="explore-item--image"
            style={{
              background: `url(${place.image_url}) no-repeat center center`,
              backgroundSize: 'cover',
              borderRadius: '5px',
            }}
          >
            {placeNames && placeNames.includes(place.name) ?
              <button
                className="btn btn-danger explore-item--button"
                onClick={() => this.removePlace(places.filter(p => p.name === place.name)[0].id)}
              >Remove from plan
              </button>
              :
              <div className="dropdown explore-item--button">
                <button
                  ref={ref => this.dropDownToggleRef = ref}
                  className="btn btn-dark dropdown-toggle"
                  type="button"
                  onClick={() => itineraries ? this.setState({ dropdown: true }) : toastr.error('Please choose a trip duration first')}
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                Add to plan
                </button>
                <div className={`dropdown-menu ${this.state.dropdown ? 'show' : ''}`}>
                  {itineraries && itineraries.map((itinerary, index) => (
                    <a key={index} className="dropdown-item" onClick={() => this.addToList(place, itinerary.id)}>Day {index + 1}</a>
                  ))}
                </div>
              </div>
            }
          </div>
          <a href={`${window.location.href}/${place.id}`} target="_blank">
            <h5 className="explore-item--name pl-2 my-2">{place.name}</h5>
          </a>
          <span className="explore-item--rating-icon pull-right pr-2">
            <i className="fa fa-star" /> {place.rating}
          </span>
          <p className="explore-item--description px-2">{place.short_description && `${place.short_description.slice(0, 50)}...`}</p>
        </div>
      </div>
    );
  }
}

export default PlaceItem;
