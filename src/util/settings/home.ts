import emoteGroups from '../emoteGroups';
import { HomeSettings as Settings } from '../types';

export const baseSettings = emoteGroups.reduce(
  (obj, val) => ({
    ...obj,
    [val.paramKey]: val.home.default,
  }),
  {} as Settings
);

export const getStoredSettings = (): Settings | undefined => {
  const storedSettings = localStorage.getItem('groups');

  if (storedSettings) return JSON.parse(storedSettings);
};

export const getParamString = () => {
  const settings = getStoredSettings();

  if (!settings) {
    return '';
  }

  return (
    '?' +
    Object.entries(settings)
      .filter((x) => x[1])
      .flatMap((x) => `${x[0]}=${x[1]}`)
      .join('&')
  );
};
