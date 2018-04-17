import axios from 'axios';
import { placesUrl, routeUrl } from '../../config/api';

const RecommendationService = {
  getPlaces(params) {
    return axios({
      method: 'get',
      url: placesUrl,
      params,
    });
  },
  getPlace(id) {
    return axios({
      method: 'get',
      url: `${placesUrl}/${id}`,
    });
  },
  getRoute(params) {
    return axios({
      method: 'get',
      url: routeUrl,
      params,
    });
  }
};

export default RecommendationService;
