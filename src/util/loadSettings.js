const defaults = {
  channel: null,
  textSize: 48,
  emoteSize: 100,
  emoteSpeed: 50,
  emoteDefault: true,
  showHelp: true,
  emotes: [],
};

const loadSettings = (requestedEmotes, channel) => {
  const settings = JSON.parse(localStorage.getItem('settings'));

  if (!settings || channel.toLowerCase() !== settings.channel) {
    const newSettings = Object.assign({}, defaults, {
      channel: channel.toLowerCase(),
      emotes: requestedEmotes,
    });
    localStorage.setItem('settings', JSON.stringify(newSettings));

    return newSettings;
  }

  const updatedEmotes = requestedEmotes.map((emote) => ({
    ...emote,
    selected: !!settings.emotes.find(
      (savedEmote) => savedEmote.name === emote.name
    )?.selected,
  }));

  return Object.assign({}, defaults, settings, { emotes: updatedEmotes });
};

export default loadSettings;
