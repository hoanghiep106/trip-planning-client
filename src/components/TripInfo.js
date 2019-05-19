import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import RouteInfo from './RouteInfo';
import WeatherInfo from './WeatherInfo';

class TripDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const routeList = this.props.routes.map(route => (
      <RouteInfo
        route={route}
        key={route.id}
        handleClickItem={this.props.onClickItem}
        onChooseRoute={this.props.onChooseRoute}
        chosenRouteId={this.props.chosenRouteId}
      />
    ));
    return (
      <div className="route-list">
        <h4>
          Trip Details
          <span className="pull-right">
            <i
              className={`fa fa-chevron-circle-${this.state.show ? 'up' : 'down'} mr-2`}
              onClick={this.toggle}
            />
          </span>
        </h4>
        {this.state.show &&
        <div className="route-list-height">
          <Scrollbars>
            <WeatherInfo weather={this.props.weather}/>
            <div>
              {routeList}
            </div>
          </Scrollbars>
        </div>
        }
      </div>
    )
  };
}

export default TripDetails;
