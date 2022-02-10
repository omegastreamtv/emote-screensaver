const defaults = {
  textSize: 48,
  emoteSize: 100,
  emoteSpeed: 50,
  emoteDefault: true,
  showHelp: true,
  emotes: [],
};

const loadSettings = (requestedEmotes) => {
  const settings = JSON.parse(localStorage.getItem('settings'));

  if (!settings) {
    return Object.assign({}, defaults, { emotes: requestedEmotes });
  }

  const updatedEmotes = requestedEmotes.map((emote) => ({
    ...emote,
    selected: !!settings.emotes.find(
      (savedEmote) => savedEmote.name === emote.name
    )?.selected,
  }));

  return Object.assign({}, settings, { emotes: updatedEmotes });
};

export default loadSettings;
