import React from 'react';
import cnames from 'classnames';
import TripItem from '../components/TripItem';
import PlannerService from '../services/Planner';

class ProfilePage extends React.Component {
  state = {
    trips: [],
    bookmark: false,
  }

  componentDidMount() {
    this.fetchTrips();
  }

  fetchTrips = () => {
    PlannerService.getUserTrips().then(res => this.setState({ trips: res.data.trips, bookmark: false }))
  }

  fetchBookmarkedTrips = () => {
    PlannerService.getTrips({ type: 'bookmarked' }).then(res => this.setState({ trips: res.data.trips, bookmark: true }))
  }

  handleTripBookmarkChange = (tripId) => {
    this.setState({
      trips: this.state.trips.filter(trip => trip.id !== tripId),
    })
  }

  render() {
    const { trips } = this.state;
    return (
      <div className="container container-fluid py-5">
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body" style={{ width: '280px', padding: '1rem 0rem 1.8rem 1.1rem' }}>
                <i className="fa fa-user-circle fa-4x mr-2" />
                <h4 style={{ margin: '-40px 2rem 0 4rem'}}>Hiep Nguyen</h4>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body mt-2" style={{ width: '280px', padding: '1.2rem 0rem 1.2rem 1.1rem' }}>
                <h4 className="pull-left">{this.state.bookmark ? 'Total bookmarks' : 'Total trips'}</h4>
                <h4 className="pull-right">{trips.length}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <button
            className={cnames('btn mr-2', { 'btn-secondary': !this.state.bookmark})}
            onClick={this.fetchTrips}
          >My trips</button>
          <button
            className={cnames('btn mr-2', { 'btn-secondary': this.state.bookmark})}
            onClick={this.fetchBookmarkedTrips}
          >My bookmarks</button>
        </div>
        <div>
          {trips.map(trip => <TripItem key={trip.id} {...trip} onTripBookmarkChange={this.handleTripBookmarkChange} /> )}
        </div>
      </div>
    )
  }
}

export default ProfilePage;
