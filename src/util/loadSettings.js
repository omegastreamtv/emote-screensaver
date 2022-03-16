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
  const params = getParams();
  const currentSettings = JSON.parse(localStorage.getItem('settings'));
  let newSettings = {};

  if (!currentSettings || channel.toLowerCase() !== currentSettings.channel) {
    newSettings = Object.assign({}, defaults, {
      channel: channel.toLowerCase(),
      emotes: requestedEmotes.map((emote) => ({
        ...emote,
        selected: emoteParamVal(params, emote) ?? emote.selected,
      })),
    });
  } else {
    const updatedEmotes = requestedEmotes.map((emote) => ({
      ...emote,
      selected:
        emoteParamVal(params, emote) ??
        savedEmoteSelected(currentSettings, emote),
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

function emoteParamVal(params, emote) {
  if (emote.zeroWidth && params.zw !== undefined) {
    return params.zw;
  } else if (params[emote.service][emote.scope] !== undefined) {
    return params[emote.service][emote.scope];
  } else if (emote.scope === 'channel' && params.channel !== undefined) {
    return params.channel;
  } else if (emote.scope === 'global' && params.global !== undefined) {
    return params.global;
  } else {
    return undefined;
  }
}

function getParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    zw: getParam(params, 'zw'),
    channel: getParam(params, 'channel'),
    global: getParam(params, 'global'),
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

function getParam(params, param) {
  if (params.has(param)) {
    const val = params.get(param);
    return val === 'true' || val === '1' ? true : false;
  } else {
    return undefined;
  }
}

export default loadSettings;
