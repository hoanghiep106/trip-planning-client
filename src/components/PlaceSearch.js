import React from 'react';
import toastr from 'toastr';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import LoadingIndicator from '../components/LoadingIndicator';
import currentTrip from '../utils/currentTrip';
import history from '../utils/history';

class PlaceSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        getLatLng(results[0])
          .then(latLng => {
            currentTrip.set({
              ...latLng,
              name: results[0].formatted_address,
              googleId: results[0].place_id,
            });
            history.push('/explore');
          }).catch(error => toastr.error('Error', error));
      });
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={{ types: ['(regions)'] }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <React.Fragment>
            <input
              {...getInputProps({
                placeholder: 'Search for areas...',
                className: 'form-control location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <LoadingIndicator />}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <i className="fa fa-location-arrow mr-2" />
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default PlaceSearch;
