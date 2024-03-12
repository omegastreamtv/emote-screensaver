import { useEffect, useState } from 'react';
import emoteGroups from '../emoteGroups';
import { HomeSettings as Settings } from '../types';

const HOME_STORAGE_KEY = 'home';
const DEFAULTS = emoteGroups.reduce(
  (obj, val) => ({
    ...obj,
    [val.paramKey]: val.home.default,
  }),
  {} as Settings
);

export function useHomeSettings() {
  const [settings, updateSettings] = useState(DEFAULTS);

  useEffect(() => {
    const storedSettings = loadSettings();
    storedSettings && updateSettings(storedSettings);
  }, []);

  useEffect(() => {
    storeSettings(settings);
  }, [settings]);

  return [settings, updateSettings] as const;
}

function loadSettings(): Settings | undefined {
  if (typeof window !== 'undefined') {
    const storedSettings = localStorage.getItem(HOME_STORAGE_KEY);

    if (storedSettings) {
      return JSON.parse(storedSettings);
    }
  }
}

function storeSettings(settings: Settings) {
  if (typeof window !== 'undefined') {
    const currentSettings = loadSettings();
    const newSettings = Object.assign({}, currentSettings, settings);
    localStorage.setItem(HOME_STORAGE_KEY, JSON.stringify(newSettings));
  }
}

export function getParamString() {
  const settings = loadSettings();

  if (!settings) {
    return '';
  }

  return (
    '&' +
    Object.entries(settings)
      .filter((x) => x[1])
      .flatMap((x) => `${x[0]}=${x[1]}`)
      .join('&')
  );
}
