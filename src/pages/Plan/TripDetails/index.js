import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PlaceDetails from './PlaceDetails';

const TripDetails = (props) => {
  const placeList = props.places.map(place => (
    <PlaceDetails place={place} key={place.id} handleClickItem={props.onClickItem} />
  ));
  return (
    <div className="place-list">
      <h4>
        Trip Details
        <span className="pull-right"><i className="fa fa-times" onClick={props.close} /></span>
      </h4>
      <div className="place-list-height">
        <Scrollbars>
          {placeList}
        </Scrollbars>
      </div>
    </div>
  )
};

export default TripDetails;
