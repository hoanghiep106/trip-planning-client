import React from 'react';
import { withGoogleMap, GoogleMap, Marker, Polyline } from 'react-google-maps';
import { googleConfig } from '../../config/app';
import { decodePolyline } from '../../utils';

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
      {props.markers && props.markers.map(marker => (
        <Marker
          key={marker.id}
          position={marker.location}
        />
      ))
      }
      {(props.polylines && props.polylines.length > 0) &&
        props.polylines.map((trip, index) => (
          <Polyline
            key={index}
            path={trip.route ? decodePolyline(trip.route) : []}
            geodesic
            options={{
              strokeColor: props.highlight === trip.id && '#414141',
              strokeOpacity: (!props.highlight || props.highlight === trip.id) ? 1.0 : 0,
              strokeWeight: 3,
            }}
          />
        ))
      }
    </div>
  </GoogleMap>
));

export default MainGoogleMap;
