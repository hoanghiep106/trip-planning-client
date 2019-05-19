import React from 'react';
import { secondsToTime, getDistance } from '../utils';

const RouteDetails = (props) => (
  <div className={`route-item ${props.chosenRouteId === props.route.id ? 'route-chosen': ''}`}>
    <div className="px-4 py-3">
      <a href={`${window.location.host}/#/explore/${props.route.origin && props.route.origin.id}`} target="_blank">
        <h6 style={{ display: 'inline' }}>{props.route.origin && props.route.origin.name}</h6>
      </a>
      <i className="fa fa-long-arrow-right mx-3 pointer" onClick={() => props.onChooseRoute(props.route.id)} />
      <a href={`${window.location.host}/#/explore/${props.route.dest && props.route.dest.id}`} target="_blank">
        <h6 style={{ display: 'inline' }}>{props.route.dest && props.route.dest.name}</h6>
      </a>
      <div>Distance: <b> {getDistance(props.route.distance)}</b></div>
      <div>Time estimate: <b> {secondsToTime(props.route.time)}</b></div>
    </div>
    <hr />
  </div>
);

export default RouteDetails;
