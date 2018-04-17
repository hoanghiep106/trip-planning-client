import React from 'react';
import StarRatingComponent from 'react-star-rating-component'; 

const Heading = ({ name, rating, placeType, onAddClick }) => (
  <React.Fragment>
    <h7>{placeType}</h7>
    <h1>{name}</h1>
    <StarRatingComponent 
      name="rate2" 
      editing={false}
      starCount={5}
      value={Math.floor(rating)}
    />
    <button 
      style={{ marginTop: '-30px' }}
      className="btn btn-secondary pull-right"
    >
      To Today List
    </button>
  </React.Fragment>
);

export default Heading;