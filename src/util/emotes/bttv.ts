import { Emote } from '@/util/types';

type EmoteRes = {
  id: string;
  code: string;
};

type ChannelRes = {
  channelEmotes: EmoteRes[];
  sharedEmotes: EmoteRes[];
};

type GlobalRes = EmoteRes[];

const zeroWidthEmotes = ['SoSnowy', 'IceCold', 'cvHazmat', 'cvMask'];

function getCdnUrl(id: string) {
  return `https://cdn.betterttv.net/emote/${id}/3x`;
}

export async function getChannelEmotes(channelId: string) {
  const res = await fetch(`https://api.betterttv.net/3/cached/users/twitch/${channelId}`);
  const { channelEmotes, sharedEmotes }: ChannelRes = await res.json();
  const allEmotes = [...channelEmotes, ...sharedEmotes];

  const emotes: Emote[] = allEmotes.map((e: EmoteRes) => ({
    name: e.code,
    url: getCdnUrl(e.id),
    service: 'bttv',
    scope: 'channel',
    zeroWidth: false,
    selected: true,
  }));

  return emotes;
}

export async function getGlobalEmotes() {
  const res = await fetch('https://api.betterttv.net/3/cached/emotes/global');
  const data: GlobalRes = await res.json();

  const emotes: Emote[] = data.map((e: EmoteRes) => ({
    name: e.code,
    url: getCdnUrl(e.id),
    service: 'bttv',
    scope: 'global',
    zeroWidth: zeroWidthEmotes.includes(e.code),
    selected: false,
  }));

  return emotes;
}
