export const getItem = key => localStorage.getItem(key);

export const setItem = (key, value) => localStorage.setItem(key, value);

export const removeItem = key => localStorage.removeItem(key);

export const removeAllItems = () => localStorage.clear();

export const getJson = (key) => {
  const value = getItem(key);
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

export const setJson = (key, value) => setItem(key, JSON.stringify(value));
