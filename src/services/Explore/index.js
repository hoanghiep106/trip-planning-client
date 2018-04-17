import axios from 'axios';
import { placesUrl } from '../../config/api';

const ExploreService = {

  dailyListChangeEvent: new CustomEvent('dailyListChange'),

  getPlaces(params) {
    return axios({
      method: 'get',
      url: placesUrl,
      params,
    });
  },

  placeInList(id) {
    let places = localStorage.getItem('dailyList') && JSON.parse(localStorage.getItem('dailyList'));
    if (places) {
      places = places.filter(place => place.id === id);
      if (places.length > 0) return true; 
    }
    return false;
  },

  removeFromList(id) {
    let places = localStorage.getItem('dailyList') && JSON.parse(localStorage.getItem('dailyList'));
    if (places) {
      places = places.filter(place => place.id !== id);
      localStorage.setItem('dailyList', places);
      this.DailyListChange();
    }
  },

  saveToList(place) {
    let places = localStorage.getItem('dailyList') && JSON.parse(localStorage.getItem('dailyList'));
    if (places) {
      places = [...places, place];
      localStorage.setItem('dailyList', places);
    } else {
      places = [place];
      localStorage.setItem('dailyList', places);
    }
    this.DailyListChange();
  },

  DailyListChange() {
    window.dispatchEvent(this.dailyListChangeEvent);
  },

  addDailyListChangeListener(callback) {
    window.addEventListener('dailyListChange', callback);
  },

  removeDailyListChangeListener(callback) {
    window.removeEventListener('dailyListChange', callback);
  },
};

export default ExploreService;
