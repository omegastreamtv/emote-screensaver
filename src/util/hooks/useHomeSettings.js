const homeSettingsReducer = (state, group) => {
  const newState = {
    ...state,
    [group]: !state[group],
  };

  localStorage.setItem('groups', JSON.stringify(newState));
  return newState;
};

export const loadSettings = () => JSON.parse(localStorage.getItem('groups'));

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

export default homeSettingsReducer;
