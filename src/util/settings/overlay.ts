import { Emote, GroupKey, OverlaySettings as Settings } from '../types';

const defaults = <Settings>{
  textSize: 48,
  emoteSize: 100,
  emoteSpeed: 50,
  emoteDefault: true,
  showHelp: true,
  emotes: [],
};

export function getStorageKey(channelName: string) {
  return `settings-${channelName}`;
}

export function getStoredSettings(channelName: string): Settings | undefined {
  const storageKey = getStorageKey(channelName);
  const _storedSettings = localStorage.getItem(storageKey);

  if (_storedSettings) {
    return JSON.parse(_storedSettings);
  }
}

function loadSettings(emotes: Emote[], channelName: string) {
  const params = getParams();
  const storedSettings = getStoredSettings(channelName);

  let settings: Settings = Object.assign({}, defaults);

  if (!storedSettings) {
    settings = Object.assign(settings, {
      emotes: emotes.map((emote) => {
        emote.selected = emoteSelectedInParams(params, emote);
        return emote;
      }),
    } as Settings);
  } else {
    const updatedEmotes = emotes.map((emote) => {
      emote.selected =
        emoteSelectedInParams(params, emote) ||
        emoteSelectedInStorage(storedSettings, emote);
      return emote;
    });

    settings = Object.assign(settings, storedSettings, {
      emotes: updatedEmotes,
    } as Settings);
  }

  const storageKey = getStorageKey(channelName);
  localStorage.setItem(storageKey, JSON.stringify(settings));

  return settings;
}

function getParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    zw: getParam(params, 'zw'),
    twitch: {
      channel: getParam(params, 'twitch'),
    },
    bttv: {
      channel: getParam(params, 'bttv'),
      global: getParam(params, 'bttvg'),
    },
    ffz: {
      channel: getParam(params, 'ffz'),
      global: getParam(params, 'ffzg'),
    },
    '7tv': {
      channel: getParam(params, '7tv'),
      global: getParam(params, '7tvg'),
    },
  };
}

function getParam(params: URLSearchParams, param: GroupKey) {
  if (params.has(param)) {
    const val = params.get(param);
    return val === 'true' || val === '1';
  }

  return false;
}

function emoteSelectedInParams(params: ReturnType<typeof getParams>, emote: Emote) {
  if (emote.zeroWidth) {
    return params.zw;
  }

  if (emote.service === 'twitch') {
    return params.twitch.channel;
  }

  return params[emote.service][emote.scope];
}

function emoteSelectedInStorage(currentSettings: Settings, emote: Emote) {
  const storedEmote = currentSettings.emotes.find(
    (savedEmote) => savedEmote.name === emote.name
  );

  return storedEmote?.selected || false;
}

export default loadSettings;
