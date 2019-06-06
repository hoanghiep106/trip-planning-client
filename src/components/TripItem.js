import React from 'react';
import auth from '../utils/auth';
import PlannerService from '../services/Planner';
import history from '../utils/history';
import currentTrip from '../utils/currentTrip';

class TripItem extends React.Component {
  state = {
    plannerModal: false,
  }

  addBookmark = () => {
    PlannerService.bookmarkTrip(this.props.id).then(() => {
      this.props.onTripBookmarkChange(this.props.id, true);
    });
  }

  removeBookmark = () => {
    PlannerService.removeTripBookmark(this.props.id).then(() => {
      this.props.onTripBookmarkChange(this.props.id, false);
    });
  }

  goToPlannerPage = () => {
    if (this.props.id === currentTrip.get().id) {
      history.push('/plan');
      return;
    }
    currentTrip.switch(this.props.id, () => history.push('/plan'));
  }

  render() {
    const trip = this.props;
    const isOwner = auth.getUser().id === trip.creator.id;
    return (
      <div className="row trip-item my-3">
        <div
          className=" col-md-3 trip-item--image"
        >
          {trip.cover_photo ?
            <img src={trip.cover_photo} alt="Cover" width="100%" height="160px" style={{ borderRadius: '5px' }} />
            :
            <div style={{ width: '100%', height: '160px', border: '2px solid #888', borderRadius: '5px' }}>
              <i className="fa fa-camera-retro fa-5x mx-auto d-block" style={{ width: 'fit-content', marginTop: '40px' }} />
            </div>
          }
        </div>
        <div className="col-md-9 px-3 py-2">
          <h5 className="explore-item--name pl-2 my-3">{trip.name} - 3 days</h5>
          {!isOwner &&
            <i
              className={`fa fa-bookmark${trip.bookmarked ? '' : '-o'} pull-right mr-3 fa-2x pointer`}
              onClick={trip.bookmarked ? this.removeBookmark : this.addBookmark}
            />
          }
          <p className="explore-item--description px-2 mt-2">
            {trip.description && (trip.description.length > 220 ? `${trip.description.slice(0,200)}...` : trip.description)}
          </p>
          <button
            className="btn btn-dark mr-3 pull-right pointer"
            onClick={isOwner ? this.goToPlannerPage : () => this.setState({ plannerModal: true })}
          >{isOwner ? 'Go to planner page' : 'See itineraries'}
          </button>
        </div>
      </div>
    );
  }
}

export default TripItem;
