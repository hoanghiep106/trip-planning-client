import auth from '../utils/auth';

const PLANNER_BASE_API_URL = 'http://127.0.0.1:5001';
const PLACE_SEARCH_BASE_API_URL = 'http://127.0.0.1:5000';

export const getHeaders = () => {
  const token = auth.getToken();
  const authorizationHeader = token ? {'Authorization': `Bearer ${token}`} : {}
  return {
    'Content-Type': 'application/json',
    ...authorizationHeader,
  };
};

export const placesUrl = `${PLACE_SEARCH_BASE_API_URL}/places/explore`;
export const routeUrl = `${PLANNER_BASE_API_URL}/routes`;


export const AuthenticationUrls = {
  register: `${PLANNER_BASE_API_URL}/users/signup`,
  login: `${PLANNER_BASE_API_URL}/users/login`,
  facebook: `${PLANNER_BASE_API_URL}/users/connect/facebook`,
};

export const tripUrls = {
  list: `${PLANNER_BASE_API_URL}/trips`,
  userList: userId => `${PLANNER_BASE_API_URL}/users/${userId}/trips`,
  userTrip: (userId, tripId) => `${PLANNER_BASE_API_URL}/users/${userId}/trips/${tripId}`,
  bookmark: tripId => `${PLANNER_BASE_API_URL}/trips/${tripId}/bookmarks`,
  detail: tripId => `${PLANNER_BASE_API_URL}/trips/${tripId}`,
  places: `${PLANNER_BASE_API_URL}/places`,
  placeById: id => `${PLANNER_BASE_API_URL}/places/${id}`,
  itineraries: `${PLANNER_BASE_API_URL}/day_itineraries`,
  itineraryById: id => `${PLANNER_BASE_API_URL}/day_itineraries/${id}`,
};
