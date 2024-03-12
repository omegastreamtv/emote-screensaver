import { Emote } from '@/util/types';

type EmoteRes = {
  id: string;
  name: string;
  format: ('static' | 'animated')[];
};

type ChannelRes = {
  data: EmoteRes[];
};

export async function getChannelEmotes(channelId: string) {
  const res = await fetch(`https://itsathirdpartything.com/twitch/emotes/${channelId}`);
  const data: ChannelRes = await res.json();

  const emotes: Emote[] = data.data.map((e: EmoteRes) => ({
    name: e.name,
    url: getCdnUrl(e.id, e.format.includes('animated')),
    service: 'twitch',
    scope: 'channel',
    zeroWidth: false,
    selected: true,
  }));

  return emotes;
}

function getCdnUrl(emoteId: string, animated: boolean) {
  return `https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/${
    animated ? 'animated' : 'static'
  }/light/3.0`;
}
