import React from 'react';
import './index.css';

const ExploreItem = (props) => (
  <div className="col-md-4 col-sm-6">
    <div className="explore-item">
      <div
        className="explore-item--image"
        style={{ background: `url(${props.image_url}) no-repeat` }}
      />
      <b>{props.name}</b>
      <span className="explore-item--rating-icon">
        <i className="fa fa-star" /> {props.rating}
      </span>
      <p>{props.short_description}</p>
    </div>
  </div>
)

const Explore = (props) => {
  const exploreList = props.places.map(place => (
    <ExploreItem key={place.id} {...place} />
  ));
  return (
    <div className="container container-fluid py-5">
      <div className="explore-title">Tokyo points of interest</div>
      <div className="row">
        {exploreList}
      </div>
    </div>
  );
};

export default Explore;
