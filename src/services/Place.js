import axios from 'axios';
import { placesUrl } from '../config/api';

const PlaceService = {
  getPlaces(params) {
    return axios({
      method: 'get',
      url: placesUrl,
      params,
    });
  },
  getGooglePlace(id) {
    return axios({
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&fields=geometry&key=AIzaSyDPgb0q9Zm5Rw0VqXF9wvNLULK_IQRcNys`,
    });
  }
};

export default PlaceService;
