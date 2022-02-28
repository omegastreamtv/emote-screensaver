const defaults = {
  channel: null,
  textSize: 48,
  emoteSize: 100,
  emoteSpeed: 50,
  emoteDefault: true,
  showHelp: true,
  emotes: [],
};

function loadSettings(requestedEmotes, channel) {
  const currentSettings = JSON.parse(localStorage.getItem('settings'));
  let newSettings = {};

  if (!currentSettings || channel.toLowerCase() !== currentSettings.channel) {
    newSettings = Object.assign({}, defaults, {
      channel: channel.toLowerCase(),
      emotes: requestedEmotes,
    });
  } else {
    const params = getParams();
    const updatedEmotes = requestedEmotes.map((emote) => ({
      ...emote,
      selected:
        emoteParamSelected(params, emote) ||
        savedEmoteSelected(currentSettings, emote) ||
        currentSettings.emoteDefault,
    }));

    newSettings = Object.assign({}, defaults, currentSettings, {
      emotes: updatedEmotes,
    });
  }

  localStorage.setItem('settings', JSON.stringify(newSettings));
  return newSettings;
}

function savedEmoteSelected(currentSettings, emote) {
  return !!currentSettings.emotes.find(
    (savedEmote) => savedEmote.name === emote.name
  )?.selected;
}

function emoteParamSelected(params, emote) {
  if (emote.zeroWidth && params.zw !== undefined) {
    return params.zw;
  } else if (emote.scope === 'channel' && params.channel !== undefined) {
    return params.channel;
  } else if (emote.scope === 'global' && params.global !== undefined) {
    return params.global;
  } else {
    return params[emote.service]?.[emote.scope] || false;
  }
}

function getParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    zw: stringToBoolean(params.get('zw')),
    channel: stringToBoolean(params.get('channel')),
    global: stringToBoolean(params.get('global')),
    twitch: {
      channel: stringToBoolean(params.get('twitch')),
    },
    bttv: {
      channel: stringToBoolean(params.get('bttv')),
      global: stringToBoolean(params.get('bttvg')),
    },
    ffz: {
      channel: stringToBoolean(params.get('ffz')),
      global: stringToBoolean(params.get('ffzg')),
    },
    '7tv': {
      channel: stringToBoolean(params.get('7tv')),
      global: stringToBoolean(params.get('7tvg')),
    },
  };
}

function stringToBoolean(str) {
  return str === 'true' ? true : str === 'false' ? false : undefined;
}

export default loadSettings;
