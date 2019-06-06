import { getJson, setJson } from './storage';
import PlannerService from '../services/Planner';

const CURRENT_TRIP = 'currentTrip';

class CurrentTrip {
  constructor() {
    this.data = getJson(CURRENT_TRIP) || null;
    this.listeners = [];
    this.fetch();
  }

  get() {
    return this.data;
  }

  set(data, callback) {
    this.data = data;
    this.listeners.forEach(listener => listener());
    setJson(CURRENT_TRIP, this.data);
    if (callback) callback();
  }

  fetch(callback) {
    if (this.data && this.data.id) {
      PlannerService.getTrip(this.data.id).then(res => this.set({ ...this.data, ...res.data }, callback));
    }
  }

  switch(id, callback) {
    this.data = { id };
    this.fetch(callback);
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


export default new CurrentTrip();
