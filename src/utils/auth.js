import { getJson, setJson, removeAllItems } from './storage';

const AUTH_KEY = 'authentication';

class Auth {
  constructor() {
    this.data = getJson(AUTH_KEY) || {};
    this.listeners = [];
  }

  isAuth() {
    return !!(this.getToken());
  }

  getToken() {
    return this.data && this.data.token;
  }

  getUser() {
    return this.data && this.data.user;
  }

  setAuthToken(token) {
    this.data.token = token;
    this.listeners.forEach(listener => listener());
    setJson(AUTH_KEY, this.data);
  }

  setUser(user) {
    this.data.user = user;
    this.listeners.forEach(listener => listener());
    setJson(AUTH_KEY, this.data);
  }

  logout() {
    this.data = {};
    this.listeners.forEach(listener => listener());
    removeAllItems();
  }

  onChange(listener) {
    this.listeners.push(listener);
    return () => this.removeListener(listener);
  }

  removeListener(listener) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
}


export default new Auth();
