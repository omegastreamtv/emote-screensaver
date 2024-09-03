'use client';

import { useEffect, useReducer } from 'react';
import { useSearchParams, type ReadonlyURLSearchParams } from 'next/navigation';
import { settingsReducer } from './settingsReducer';
import type {
  Emote,
  GroupKey,
  OverlaySettings,
  StoredSettings,
} from '../types';

const DEFAULTS: OverlaySettings = {
  channelName: '',
  showName: true,
  nameSize: 48,
  emoteSize: 100,
  emoteSpeed: 50,
  emoteDefault: true,
  showHelp: true,
  emotes: [],
};

export function useOverlaySettings(emotes: Emote[], channelName: string) {
  const params = useSearchParams();
  const [settings, updateSettings] = useReducer(settingsReducer, DEFAULTS);

  useEffect(() => {
    const storedSettings = loadSettings(channelName);
    let newSettings: OverlaySettings = Object.assign({}, DEFAULTS, {
      channelName,
    } as OverlaySettings);

    if (!storedSettings) {
      newSettings = Object.assign(newSettings, {
        emotes: emotes.map((emote) => {
          emote.selected = emoteSelectedInParams(params, emote);
          return emote;
        }),
      } as OverlaySettings);

      storeSettings(newSettings);
    } else {
      const updatedEmotes = emotes.map((emote) => {
        emote.selected = emoteSelectedInStorage(storedSettings, emote);
        return emote;
      });

      newSettings = Object.assign(newSettings, storedSettings, {
        emotes: updatedEmotes,
      } as OverlaySettings);
    }

    updateSettings({ type: 'setAll', value: newSettings });
  }, []);

  return [settings, updateSettings] as const;
}

function getStorageKey(channelName: string) {
  return `settings-${channelName}`;
}

function loadSettings(channelName: string): StoredSettings | undefined {
  if (typeof window !== 'undefined') {
    const storageKey = getStorageKey(channelName);
    const _storedSettings = localStorage.getItem(storageKey);

    if (_storedSettings) {
      return JSON.parse(_storedSettings);
    }
  }
}

export function storeSettings(settings: Partial<OverlaySettings>) {
  if (typeof window !== 'undefined' && settings.channelName) {
    const storageKey = getStorageKey(settings.channelName);
    const storedSettings = {
      ...settings,
      emotes: settings.emotes?.filter((e) => e.selected).map((e) => e.name),
    } as StoredSettings;

    localStorage.setItem(storageKey, JSON.stringify(storedSettings));
  }
}

function emoteSelectedInParams(params: ReadonlyURLSearchParams, emote: Emote) {
  if (emote.zeroWidth) {
    return !!params.get('zw');
  }

  if (emote.service === 'twitch') {
    return !!params.get('twitch');
  }

  if (emote.scope === 'global') {
    const param: GroupKey = `${emote.service}g`;
    return !!params.get(param);
  }

  return !!params.get(emote.service);
}

function emoteSelectedInStorage(
  currentSettings: StoredSettings,
  emote: Emote
): boolean {
  return currentSettings.emotes.indexOf(emote.name) > -1;
}
