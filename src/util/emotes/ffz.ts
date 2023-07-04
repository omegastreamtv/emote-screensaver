import { Emote } from '@/util/types';

type EmoteRes = {
  id: string;
  code: string;
  modifier: boolean;
};

type ChannelRes = EmoteRes[];
type GlobalRes = EmoteRes[];

function getCdnUrl(id: string) {
  return `https://cdn.betterttv.net/emote/${id}/3x`;
}

export async function getChannelEmotes(channelId: string) {
  const res = await fetch(
    `https://api.betterttv.net/3/cached/frankerfacez/users/twitch/${channelId}`
  );
  const data: ChannelRes = await res.json();

  const emotes: Emote[] = data.map((e: EmoteRes) => ({
    name: e.code,
    url: getCdnUrl(e.id),
    service: 'ffz',
    scope: 'channel',
    zeroWidth: false,
    selected: true,
  }));

  return emotes;
}

export async function getGlobalEmotes() {
  const res = await fetch(
    'https://api.betterttv.net/3/cached/frankerfacez/emotes/global'
  );
  const data: GlobalRes = await res.json();

  const emotes: Emote[] = data.map((e: EmoteRes) => ({
    name: e.code,
    url: getCdnUrl(e.id),
    service: 'ffz',
    scope: 'global',
    zeroWidth: false,
    selected: false,
  }));

  return emotes;
}
