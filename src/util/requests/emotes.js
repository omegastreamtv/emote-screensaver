import axios from 'axios';

const urls = {
  twitch: {
    channel: (channelName) =>
      `https://api.retpaladinbot.com/twitch/emotes?id=${channelName}`,
    cdn: (emoteId) =>
      `https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/static/light/3.0`,
  },
  bttv: {
    channel: (channelId) =>
      `https://api.betterttv.net/3/cached/users/twitch/${channelId}`,
    global: () => 'https://api.betterttv.net/3/cached/emotes/global',
    cdn: (emoteId) => `https://cdn.betterttv.net/emote/${emoteId}/3x`,
  },
  ffz: {
    channel: (channelId) =>
      `https://api.betterttv.net/3/cached/frankerfacez/users/twitch/${channelId}`,
    global: () =>
      'https://api.betterttv.net/3/cached/frankerfacez/emotes/global',
    cdn: (emoteId) => `https://cdn.frankerfacez.com/emoticon/${emoteId}/2`,
  },
  stv: {
    channel: (channelName) =>
      `https://api.7tv.app/v2/users/${channelName}/emotes`,
    global: () => 'https://api.7tv.app/v2/emotes/global',
    cdn: (emoteId) => `https://cdn.7tv.app/emote/${emoteId}/3x`,
  },
};

export default async function getEmotes(channelName, channelId) {
  return Promise.allSettled([
    getTwitchEmotes('twitch', 'channel', 'name', channelName),
    getBttvChannelEmotes(channelId),
    getEmotesFromService('bttv', 'global', 'code'),
    getEmotesFromService('ffz', 'channel', 'code', channelId),
    getEmotesFromService('ffz', 'global', 'code'),
    getEmotesFromService('stv', 'channel', 'name', channelName),
    getEmotesFromService('stv', 'global', 'name'),
  ]).then((resAll) =>
    resAll
      .filter((res) => res.status === 'fulfilled')
      .map((res) => res.value)
      .flat()
  );
}

function getEmotesFromService(service, type, nameProp, param) {
  return axios
    .get(urls[service][type](param))
    .then((res) => mapEmoteData(res?.data, service, type, nameProp));
}

function mapEmoteData(data, service, type, nameProp) {
  return (
    data.map((emote) => ({
      name: emote[nameProp],
      url: urls[service].cdn(emote.id),
      service: service === 'stv' ? '7tv' : service,
      scope: type,
      zeroWidth: !!emote?.visibility_simple?.includes('ZERO_WIDTH'),
      selected: true,
    })) || []
  );
}

function getTwitchEmotes(service, type, nameProp, param) {
  return axios
    .get(urls[service][type](param))
    .then((res) => mapEmoteData(res?.data.data, service, type, nameProp));
}

function getBttvChannelEmotes(channelId) {
  return axios.get(urls.bttv.channel(channelId)).then((res) => {
    const channelEmotes = mapEmoteData(
      res?.data.channelEmotes,
      'bttv',
      'channel',
      'code'
    );
    const sharedEmotes = mapEmoteData(
      res?.data.sharedEmotes,
      'bttv',
      'channel',
      'code'
    );

    return channelEmotes.concat(sharedEmotes);
  });
}
