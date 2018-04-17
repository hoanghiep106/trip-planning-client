import React from 'react';
import StarRatingComponent from 'react-star-rating-component'; 

const Heading = ({ name, rating, placeType }) => (
  <React.Fragment>
    <h7>{placeType}</h7>
    <h1>{name}</h1>
    <StarRatingComponent 
      name="rate2" 
      editing={false}
      starCount={5}
      value={Math.floor(rating)}
    />
  </React.Fragment>
);

export default Heading;