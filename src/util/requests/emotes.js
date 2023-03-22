import axios from 'axios';
import 'allsettled-polyfill';

const bttvZeroWidth = ['SoSnowy', 'IceCold', 'cvHazmat', 'cvMask'];

const urls = {
  twitch: {
    channel: (channelId) =>
      `https://api.ivr.fi/v2/twitch/emotes/channel/${channelId}?id=true`,
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
  '7tv': {
    channel: (channelName) =>
      `https://api.7tv.app/v2/users/${channelName}/emotes`,
    global: () => 'https://api.7tv.app/v2/emotes/global',
    cdn: (emoteId) => `https://cdn.7tv.app/emote/${emoteId}/3x.webp`,
  },
};

export default async function getEmotes(channelName, channelId) {
  return Promise.allSettled([
    getTwitchEmotes('twitch', 'channel', 'code', channelId),
    getBttvChannelEmotes(channelId),
    getEmotesFromService('bttv', 'global', 'code'),
    getEmotesFromService('ffz', 'channel', 'code', channelId),
    getEmotesFromService('ffz', 'global', 'code'),
    getEmotesFromService('7tv', 'channel', 'name', channelName),
    getEmotesFromService('7tv', 'global', 'name'),
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
  if (service === 'twitch' && type === 'channel' && nameProp === 'code') {
    const channelEmotes = [];
    data.subProducts.forEach((emoteTier) => {
      channelEmotes.push(...emoteTier.emotes);
    });

    data = channelEmotes;
  }

  return (
    data.map((emote) => ({
      name: emote[nameProp],
      url: getCdnUrl(emote, service),
      service,
      scope: type,
      zeroWidth: isZeroWidth(emote, emote[nameProp]),
      selected: true,
    })) || []
  );
}

function getTwitchEmotes(service, type, nameProp, param) {
  return axios
    .get(urls[service][type](param))
    .then((res) => mapEmoteData(res?.data, service, type, nameProp));
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

function getCdnUrl(emote, service) {
  return service === 'twitch' && emote.assetType === 'ANIMATED'
    ? urls[service].cdn(emote.id).replace(/\/static\//, '/animated/')
    : urls[service].cdn(emote.id);
}

function isZeroWidth(emote, name) {
  return (
    !!emote?.visibility_simple?.includes('ZERO_WIDTH') ||
    bttvZeroWidth.includes(name)
  );
}
