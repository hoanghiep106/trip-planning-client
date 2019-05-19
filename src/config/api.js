import auth from '../utils/auth';

const BASE_API_URL = 'http://127.0.0.1:5000';

export const getHeaders = () => {
  const token = auth.getToken();
  const authorizationHeader = token ? {'Authorization': `Bearer ${token}`} : {}
  return {
    'Content-Type': 'application/json',
    ...authorizationHeader,
  };
};

export const placesUrl = `${BASE_API_URL}/places`;
export const routeUrl = `${BASE_API_URL}/routes`;


export const AuthenticationUrls = {
  register: `${BASE_API_URL}/users/signup`,
  login: `${BASE_API_URL}/users/login`,
  facebook: `${BASE_API_URL}/users/connect/facebook`,
  profile: `${BASE_API_URL}/profile`,
};
