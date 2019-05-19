import axios from 'axios';
import { placesUrl } from '../config/api';

const PlaceService = {

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
      localStorage.setItem('dailyList', JSON.stringify(places));
      this.DailyListChange();
    }
  },

  saveToList(place) {
    let places = localStorage.getItem('dailyList') && JSON.parse(localStorage.getItem('dailyList'));
    if (places) {
      const existedIds = places.map(place => place.id);
      if (!existedIds.includes(place.id)) {
        places = [...places, place];
        localStorage.setItem('dailyList', JSON.stringify(places));
      }
    } else {
      places = [place];
      localStorage.setItem('dailyList', JSON.stringify(places));
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
    window.removeEventListener('dailyListChange', callback, false);
  },
};

export default PlaceService;
