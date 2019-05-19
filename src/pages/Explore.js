import React from 'react';
import PlaceService from '../services/Place';

const ExploreItem = (props) => (
  <div className="col-md-4 col-sm-6 mt-3">
    <div className="explore-item">
      <div
        className="explore-item--image"
        style={{
          background: `url(${props.image_url}) no-repeat center center`,
          backgroundSize: 'cover',
        }}
      >
        {props.inDailyList ?
        <button
          className="btn btn-danger explore-item--button"
          onClick={() => PlaceService.removeFromList(props.id)}
        >Remove from today list
        </button>
        :
        <button
          className="btn btn-dark explore-item--button"
          onClick={() => PlaceService.saveToList(props)}
        >Add to today list
        </button>
        }
      </div>
      <a href={`${window.location.href}/${props.id}`} target="_blank">
        <h5 className="explore-item--name pl-2 my-2">{props.name}</h5>
      </a>
      <span className="explore-item--rating-icon pull-right pr-2">
        <i className="fa fa-star" /> {props.rating}
      </span>
      <p className="explore-item--description px-2">{`${props.short_description.slice(0, 50)}...`}</p>
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
