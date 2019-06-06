import React from 'react';
import toastr from 'toastr';
import { Scrollbars } from 'react-custom-scrollbars';
import RouteInfo from './RouteInfo';
import PlannerService from '../services/Planner';
import currentTrip from '../utils/currentTrip';
import DeleteModal from './DeleteModal';
import PlaceOrderModal from './PlaceOrderModal';
import UpdateTripModal from './UdpateTripModal';

class TripDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      dayDeleteModal: false,
      tripDeleteModal: false,
      placeOrderModal: false,
    };
  }

  componentDidMount() {
    window.document.addEventListener('click', this.hideDropDown);
  }

  componentWillUnmount() {
    window.document.removeEventListener('click', this.hideDropDown);
  }

  hideDropDown = (e) => {
    if (this.state.dropdown && this.dropDownToggleRef && !this.dropDownToggleRef.contains(e.target)) {
      this.setState({ dropdown: false });
    }
  }

  addNewDay = () => {
    PlannerService.addDay({ trip_id: currentTrip.get().id}).then(() => {
      toastr.success(`Day ${this.props.currentTrip.itineraries.length + 1} was added successfully`);
      currentTrip.fetch();
    });
  }

  removeDay = () => {
    PlannerService.deleteDay(this.props.currentTrip.itineraries[this.props.currentDay].id).then(() => {
      toastr.success(`Day ${this.props.currentDay + 1} was deleted successfully`)
      this.props.onRemoveDay()
      currentTrip.fetch();
      this.setState({ dayDeleteModal: false });
    })
  }

  removeTrip = () => {
    PlannerService.deleteTrip(this.props.currentTrip.id).then(() => currentTrip.set(null));
  }

  handlePlaceOrderChanged = () => {
    currentTrip.fetch();
    this.setState({ placeOrderModal: false });
  }

  handleTripUpdated = () => {
    currentTrip.fetch();
    this.setState({ tripUpdateModal: false });
  }

  render() {
    const routeList = this.props.routes.map(route => (
      <RouteInfo
        route={route}
        key={route.id}
        onChooseRoute={this.props.onChooseRoute}
        chosenRouteId={this.props.chosenRouteId}
      />
    ));
    const { currentTrip } = this.props;
    return (
      <div className="route-list">
        <h4>
          {currentTrip && (currentTrip.name || currentTrip.location_name)}
          <span className="pull-right" style={{ fontSize: '.9rem' }}>
            <i className="fa fa-pencil pointer mr-2" onClick={() => this.setState({ tripUpdateModal: true })} />
            <i className="fa fa-trash pointer" onClick={() => this.setState({ tripDeleteModal: true })} />
          </span>
        </h4>
        <div className="route-list-height">
          <Scrollbars>
            <div className="dropdown">
              <button className="btn btn-link text-danger pull-right" onClick={() => this.setState({ dayDeleteModal: true })}>Remove day</button>
              <button className="btn btn-link pull-right" onClick={this.addNewDay}>Add day</button>
              <button
                ref={ref => this.dropDownToggleRef = ref}
                className="btn btn-light dropdown-toggle form-control py-2 mb-2"
                type="button"
                onClick={() => this.setState({ dropdown: true })}
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
              Itineraries Day {this.props.currentDay + 1}
              </button>
              <div className={`dropdown-menu text-center form-control ${this.state.dropdown ? 'show' : ''}`}>
                {currentTrip && currentTrip.itineraries.map((itinerary, index) => (
                  <a
                    key={itinerary.id}
                    className="dropdown-item form-control"
                    onClick={() => this.props.onChooseDay(index)}
                  >Day {index + 1}
                  </a>
                ))}
              </div>
            </div>
            {/* <WeatherInfo weather={this.props.weather}/> */}
            <div>
              {routeList}
            </div>
            <button className="btn btn-link pull-right mt-2" onClick={() => this.setState({ placeOrderModal: true })}>Udpate places and order</button>
          </Scrollbars>
        </div>
        <DeleteModal
          isOpen={this.state.dayDeleteModal}
          close={() => this.setState({ dayDeleteModal: false })}
          targetType="day itinerary"
          delete={this.removeDay}
        />
        <DeleteModal
          isOpen={this.state.tripDeleteModal}
          close={() => this.setState({ tripDeleteModal: false })}
          targetType="trip"
          delete={this.removeTrip}
        />
        {this.state.tripUpdateModal &&
          <UpdateTripModal
            isOpen={this.state.tripUpdateModal}
            close={() => this.setState({ tripUpdateModal: false })}
            currentTrip={currentTrip}
            onTripUpdated={this.handleTripUpdated}
          />
        }
        {this.state.placeOrderModal &&
          <PlaceOrderModal
            isOpen={this.state.placeOrderModal}
            close={() => this.setState({ placeOrderModal: false })}
            currentItinerary={this.props.currentTrip && this.props.currentTrip.itineraries[this.props.currentDay]}
            onPlaceOrderChanged={this.handlePlaceOrderChanged}
          />
        }
      </div>
    );
  };
}

export default TripDetails;
