import React from 'react';
import PlannerService from '../services/Planner';
import PlaceService from '../services/Place';

class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      place: null,
      isOnList: false,
    };
  }

  componentDidMount() {
    PlannerService.getPlace(this.props.match.params.id).then((response) => {
      this.setState({ 
        place: response.data,
        isOnList: PlaceService.placeInList(response.data.id),
      });
    })

    PlaceService.addDailyListChangeListener(() => this.setState({ isOnList: PlaceService.placeInList(this.state.place.id)}));
  }

  render() {
    const { place, isOnList } = this.state;
    if (place === null) return null;
    return (
      <div>
        <div className="detail-content">
          Details
        </div>
      </div>
    );
  }
}

export default Detail;