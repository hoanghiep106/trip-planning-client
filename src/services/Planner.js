import axios from 'axios';
import { placesUrl, routeUrl } from '../config/api';

const PlannerService = {
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
  },
  getWeather() {
    return axios({
      method: 'get',
      url: 'https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appId=ef9be4f9e634372e1d382cc0087f5d6c',
    });
  }
};

export default PlannerService;
