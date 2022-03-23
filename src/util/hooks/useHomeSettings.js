import emoteGroups from '../emoteGroups';

const homeSettingsReducer = (state, group) => {
  const newState = {
    ...state,
    [group]: !state[group],
  };

  localStorage.setItem('groups', JSON.stringify(newState));
  return newState;
};

const loadSettings = () => JSON.parse(localStorage.getItem('groups'));

export const getParamString = () => {
  const settings = loadSettings();

  if (!settings) {
    return '';
  }

  return Object.entries(settings).reduce((str, [k, v]) => {
    str += `${str.length === 0 ? '?' : '&'}${k}=${v ? 1 : 0}`;
    return str;
  }, '');
};

const initialSettings = emoteGroups.reduce(
  (obj, val) => ({
    ...obj,
    [val.paramKey]: val.home.default,
  }),
  {}
);

export const defaultSettings = loadSettings() || initialSettings;

export default homeSettingsReducer;
