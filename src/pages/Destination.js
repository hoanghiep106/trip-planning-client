import React from 'react';
import PlaceSearch from '../components/PlaceSearch';

const Destination  = () => (
  <div className="destination">
    <div style={{margin: '0 auto', width: '768px', paddingTop: '18%' }}>
      <div className="destination--text">
        Where are you going to visit?
      </div>
      <div className="row">
        <PlaceSearch />
      </div>
    </div>
  </div>
);

export default Destination;
