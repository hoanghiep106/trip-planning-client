import React from 'react';
import StarRatingComponent from 'react-star-rating-component'; 

const Heading = ({ name, rating, placeType, onAddClick, onRemoveClick, isOnList }) => (
  <React.Fragment>
    <h6>{placeType}</h6>
    <h1>{name}</h1>
    <StarRatingComponent 
      name="rate2" 
      editing={false}
      starCount={5}
      value={Math.floor(rating)}
    />
    {
      isOnList ?
      <button 
        style={{ marginTop: '-30px' }}
        className="btn btn-warning pull-right"
        onClick={onRemoveClick}
      >
        Remove From Today List
      </button>
    :
      <button 
        style={{ marginTop: '-30px' }}
        className="btn btn-dark pull-right"
        onClick={onAddClick}
      >
        To Today List
      </button>
    }
    
  </React.Fragment>
);

export default Heading;