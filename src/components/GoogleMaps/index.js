import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { googleConfig } from '../../config/app';

const MainGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={props.zoom || googleConfig.defaultZoom}
    center={props.center || googleConfig.defaultCenter}
    bounds={props.bounds}
    onClick={props.onMapClick ? props.onMapClick : () => null}
    defaultOptions={{
      mapTypeControl: false,
      styles: googleConfig.mapStyles,
      minZoom: 2,
      maxZoom: 20,
    }}
  >
    <div>
      {props.getCurrentLocation &&
        (props.loading ?
          <button type="button" disabled className="btn btn-default current-location">
            <i className="fa fa-spinner fa-spin mr-2" aria-hidden="true" />
            {props.t('LOADING_CURRENT_LOCATION')}
          </button>
          :
          <button
            type="button"
            className="btn btn-primary current-location"
            onClick={props.getCurrentLocation}
          >
            <i className="fa fa-location-arrow mr-2" aria-hidden="true" /> {props.t('MY_CURRENT_LOCATION')}
          </button>
        )
      }
      <Marker
        icon={{ url: "assets/img/location-marker.svg", scaledSize: new window.google.maps.Size(35, 35)}}
        position={props.center}
      />
    </div>
  </GoogleMap>
));

export default MainGoogleMap;
