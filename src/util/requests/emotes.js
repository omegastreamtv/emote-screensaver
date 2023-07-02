import axios from 'axios';
import 'allsettled-polyfill';

const bttvZeroWidth = ['SoSnowy', 'IceCold', 'cvHazmat', 'cvMask'];

const urls = {
  twitch: {
    channel: (channelId) =>
      `https://api.ivr.fi/v2/twitch/emotes/channel/${channelId}?id=true`,
    cdn: (emoteId, animated) =>
      `https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/${
        animated ? 'animated' : 'static'
      }/light/3.0`,
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
    global: () => 'https://api.betterttv.net/3/cached/frankerfacez/emotes/global',
    cdn: (emoteId) => `https://cdn.frankerfacez.com/emoticon/${emoteId}/2`,
  },
  stv: {
    channel: (channelId) => `https://7tv.io/v3/users/twitch/${channelId}`,
    global: 'https://7tv.io/v3/emote-sets/global',
    cdn: (emoteId) => `https://cdn.7tv.app/emote/${emoteId}/2x.webp`,
  },
};

export default function getEmotes(channelId) {
  return Promise.allSettled([
    getTwitchChannelEmotes(channelId),
    getBttvChannelEmotes(channelId),
    getEmotesFromService('bttv', 'global', 'code'),
    getEmotesFromService('ffz', 'channel', 'code', channelId),
    getEmotesFromService('ffz', 'global', 'code'),
    get7TVChannelEmotes(channelId),
    get7TVGlobalEmotes(),
  ]).then((resAll) =>
    resAll
      .filter((res) => res.status === 'fulfilled')
      .map((res) => res.value)
      .flat(),
  );
}

function getEmotesFromService(service, type, nameProp, param) {
  return axios
    .get(urls[service][type](param))
    .then((res) => mapEmoteData(res?.data, service, type, nameProp));
}

function getTwitchChannelEmotes(channelId) {
  return axios.get(urls.twitch.channel(channelId)).then((res) => {
    if (!res.data) {
      return [];
    }

    return Object.values(res.data)
      .flatMap((group) => group.flatMap((set) => set.emotes))
      .map((emote) => ({
        name: emote.code,
        url: urls.twitch.cdn(emote.id, emote.assetType === 'ANIMATED'),
        service: 'twitch',
        scope: 'channel',
        zeroWidth: false,
        selected: true,
      }));
  });
}

function getBttvChannelEmotes(channelId) {
  return axios.get(urls.bttv.channel(channelId)).then((res) => {
    const channelEmotes = mapEmoteData(
      res?.data.channelEmotes,
      'bttv',
      'channel',
      'code',
    );
    const sharedEmotes = mapEmoteData(res?.data.sharedEmotes, 'bttv', 'channel', 'code');

    return channelEmotes.concat(sharedEmotes);
  });
}

function get7TVChannelEmotes(channelId) {
  return axios.get(urls.stv.channel(channelId)).then(
    (res) =>
      res?.data.emote_set.emotes.map((emote) => ({
        name: emote.name,
        url: urls.stv.cdn(emote.id),
        service: '7tv',
        scope: 'channel',
        zeroWidth: emote.data.flags === 1 << 8,
        selected: true,
      })) || [],
  );
}

function get7TVGlobalEmotes() {
  return axios.get(urls.stv.global).then(
    (res) =>
      res?.data.emotes.map((emote) => ({
        name: emote.name,
        url: urls.stv.cdn(emote.id),
        service: '7tv',
        scope: 'global',
        zeroWidth: emote.data.flags === 1 << 8,
        selected: true,
      })) || [],
  );
}

function mapEmoteData(data, service, type, nameProp) {
  return (
    data.map((emote) => ({
      name: emote[nameProp],
      url: urls[service].cdn(emote.id),
      service,
      scope: type,
      zeroWidth: isZeroWidth(emote, emote[nameProp]),
      selected: true,
    })) || []
  );
}

function isZeroWidth(emote, name) {
  return (
    !!emote?.visibility_simple?.includes('ZERO_WIDTH') || bttvZeroWidth.includes(name)
  );
}
