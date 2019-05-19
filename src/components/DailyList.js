import React from 'react';
import PlaceService from '../services/Place';

class DailyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyList: localStorage.getItem('dailyList') ?
        JSON.parse(localStorage.getItem('dailyList')) : [],
      showList: false,
    };
    this.updateDailyList = this.updateDailyList.bind(this);
  }

  componentDidMount() {
    PlaceService.addDailyListChangeListener(this.updateDailyList);
  }

  componentWillUnmount() {
    PlaceService.removeDailyListChangeListener(this.updateDailyList);
  }

  updateDailyList() {
    this.setState({
      dailyList: localStorage.getItem('dailyList') ?
      JSON.parse(localStorage.getItem('dailyList')) : [],
    })
  }

  toggleDailyList() {
    this.setState({ showList: !this.state.showList });
  }

  render() {
    return (
      <div className="daily-list">
        <div className="daily-list--extend-button pointer" onClick={() => this.toggleDailyList()}>
          <i className={`fa fa-chevron-circle-${this.state.showList ? 'down' : 'up'} mr-2`} />
          Daily List
          <div className="badge badge-dark badge-pill pull-right">
            {this.state.dailyList.length}
          </div>
        </div>
        {this.state.dailyList && this.state.dailyList.length > 0 && this.state.showList &&
        this.state.dailyList.map(place => (
        <div key={place.id} className="daily-list--places">
          <div className="daily-list--place">
            {place.name}
            <i
              className="fa fa-minus-circle pull-right pointer"
              onClick={() => PlaceService.removeFromList(place.id)}
            />
          </div>
        </div>
        ))
        }
      </div>
    );
  }
}

export default DailyList;
