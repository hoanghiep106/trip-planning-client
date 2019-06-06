import React from 'react';
import Select from 'react-select';
import currentTrip from '../utils/currentTrip';
import PlannerService from '../services/Planner';
import auth from '../utils/auth';
import history from '../utils/history';

class DailyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      currentTrip: currentTrip.get(),
    };
  }

  componentDidMount() {
    this.removeCurrenttripListener = currentTrip.onChange(() => this.setState({ currentTrip: currentTrip.get() }))
    if(this.state.lengthOfStay) this.fetchTrip();
  }

  componentWillUnmount() {
    this.removeCurrenttripListener();
  }

  fetchTrip() {
    currentTrip.fetch();
  }

  toggleDailyList() {
    this.setState({ showList: !this.state.showList });
  }

  handleSelectDuration = (select) => {
    if (!auth.getUser()) {
      history.push('/login');
      return; 
    }
    PlannerService.createTrip({
      length_of_stay: select.value,
      location_name: currentTrip.get().name,
      location_google_id: currentTrip.get().googleId,
    }).then((res) => {
      currentTrip.set({
        ...currentTrip.get(),
        ...res.data,
      });
    })
  }

  removePlace = (placeId) => {
    PlannerService.deletePlace(placeId).then(() => {
      currentTrip.fetch();
    })
  } 

  render() {
    const { currentTrip } = this.state;
    return (
      <div className="daily-list">
        {currentTrip.itineraries ?
          <React.Fragment>
            {currentTrip.itineraries && currentTrip.itineraries.length > 0 && this.state.showList &&
              currentTrip.itineraries.map((itinerary, index) => (
                <div key={itinerary.id}>
                  <div className="daily-list--day">
                    Day {index + 1}
                  </div>
                  {itinerary.places.map(place => (
                    <div key={place.id} className="daily-list--places">
                      <div className="daily-list--place">
                        {place.name.length > 28 ? `${place.name.slice(0, 25)}...` : place.name}
                        <i
                          className="fa fa-minus-circle pull-right pointer"
                          onClick={() => this.removePlace(place.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))
            }
            <div className="daily-list--extend-button pointer" onClick={() => this.toggleDailyList()}>
              <i className={`fa fa-chevron-circle-${this.state.showList ? 'down' : 'up'} mr-2`} />
              Your itineraries
              <div className="badge badge-dark badge-pill pull-right">
                {[].concat.apply([], currentTrip.itineraries.map(itinerary => itinerary.places)).length}
              </div>
            </div>
          </React.Fragment>
          :
          <Select
            placeholder="Select a trip duration"
            onChange={this.handleSelectDuration}
            value={this.state.lengthOfStay || null}
            options={[1, 2, 3, 4, 5, 6, 7].map(day => ({ label: `${day} day${day > 1 ? 's' : ''}`, value: day }))}
            isSearchable={false}
            clearable={false}
            menuPlacement="top"
          />
        }
      </div>
    );
  }
}

export default DailyList;
