import request from '../utils/request';
import { AuthenticationUrls } from '../config/api';

const AuthenticationService = {
  register(data) {
    return request({
      url: AuthenticationUrls.register,
      method: 'post',
      data,
    });
  },
  login(data) {
    return request({
      url: AuthenticationUrls.login,
      method: 'post',
      data,
    });
  },
  connectFacebook(data) {
    return request({
      url: AuthenticationUrls.facebook,
      method: 'post',
      data,
    });
  }
}

export default AuthenticationService;
