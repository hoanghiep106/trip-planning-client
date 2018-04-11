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
  getRoute(params) {
    return axios({
      method: 'get',
      url: routeUrl,
      params,
    });
  }
};

export default RecommendationService;
