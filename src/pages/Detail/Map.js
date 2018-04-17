// defaultCenter: { lat: 35.6732619, lng: 139.5703052 },
// defaultZoom: 11,

import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={props.zoom}
    center={props.location}
    defaultOptions={{
      mapTypeControl: false,
      minZoom: 2,
      maxZoom: 20,
    }}
  >
    <div>
    <Marker
      key={props.id}
      position={props.location}
    />
    </div>
  </GoogleMap>
));

export default Map;
