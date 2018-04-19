import React from 'react';

const RecommendationItem = (props) => (
  <div key={props.place.id} className="place-item">
    <hr/>
    <div className="image">
      <img src={props.place.image_url} alt="1" />
    </div>
    <div className="text">
      {props.place.name}
    </div>
    <span className="rating-icon"><i className="fa fa-star" /> {props.place.rating}</span>
  </div>
);

export default RecommendationItem;
