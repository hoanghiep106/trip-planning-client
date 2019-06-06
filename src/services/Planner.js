import { tripUrls } from '../config/api';
import request from '../utils/request';
import auth from '../utils/auth';

const PlannerService = {
  createTrip(data) {
    return request({
      method: 'post',
      url: tripUrls.userList(auth.getUser().id),
      data,
    });
  },
  getUserTrips(params) {
    return request({
      method: 'get',
      url: tripUrls.userList(auth.getUser().id),
      params,
    });
  },
  getTrips(params) {
    return request({
      method: 'get',
      url: tripUrls.list,
      params,
    });
  },
  getTrip(tripId) {
    return request({
      method: 'get',
      url: tripUrls.detail(tripId),
    });
  },
  updateTrip(tripId, data) {
    return request({
      method: 'put',
      url: tripUrls.userTrip(auth.getUser().id, tripId),
      data,
    });
  },
  deleteTrip(tripId) {
    return request({
      method: 'delete',
      url: tripUrls.userTrip(auth.getUser().id, tripId),
    });
  },
  bookmarkTrip(tripId) {
    return request({
      method: 'post',
      url: tripUrls.bookmark(tripId),
    });
  },
  removeTripBookmark(tripId) {
    return request({
      method: 'delete',
      url: tripUrls.bookmark(tripId),
    });
  },
  addPlace(data) {
    return request({
      method: 'post',
      url: tripUrls.places,
      data,
    });
  },
  updatePlace(placeId, data) {
    return request({
      method: 'put',
      url: tripUrls.placeById(placeId),
      data,
    });
  },
  deletePlace(placeId) {
    return request({
      method: 'delete',
      url: tripUrls.placeById(placeId),
    });
  },
  addDay(data) {
    return request({
      method: 'post',
      url: tripUrls.itineraries,
      data,
    });
  },
  updateDay(id, data) {
    return request({
      method: 'put',
      url: tripUrls.itineraryById(id),
      data
    });
  },
  deleteDay(id) {
    return request({
      method: 'delete',
      url: tripUrls.itineraryById(id),
    });
  },
  getWeather() {
    return request({
      method: 'get',
      url: 'https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appId=ef9be4f9e634372e1d382cc0087f5d6c',
    });
  },
};

export default PlannerService;
