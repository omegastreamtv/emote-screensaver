import { Emote } from '@/util/types';

type EmoteRes = {
  id: string;
  name: string;
  data: {
    flags: number;
  };
};

type ChannelRes = {
  emote_set: {
    emotes: EmoteRes[];
  };
};

type GlobalRes = {
  emotes: EmoteRes[];
};

function getCdnUrl(id: string) {
  return `https://cdn.7tv.app/emote/${id}/2x.webp`;
}

export async function getChannelEmotes(channelId: string) {
  const res = await fetch(`https://7tv.io/v3/users/twitch/${channelId}`);
  const data: ChannelRes = await res.json();

  const emotes: Emote[] = data.emote_set.emotes.map((e: EmoteRes) => ({
    name: e.name,
    url: getCdnUrl(e.id),
    service: '7tv',
    scope: 'channel',
    zeroWidth: e.data.flags === 1 << 8,
    selected: true,
  }));

  return emotes;
}

export async function getGlobalEmotes() {
  const res = await fetch('https://7tv.io/v3/emote-sets/global');
  const data: GlobalRes = await res.json();

  const emotes: Emote[] = data.emotes.map((e: EmoteRes) => ({
    name: e.name,
    url: getCdnUrl(e.id),
    service: '7tv',
    scope: 'global',
    zeroWidth: e.data.flags === 1 << 8,
    selected: false,
  }));

  return emotes;
}
