import 'allsettled-polyfill';
import * as twitch from './twitch';
import * as bttv from './bttv';
import * as ffz from './ffz';
import * as stv from './7tv';

export default function getEmotes(channelId: string) {
  return Promise.allSettled([
    twitch.getChannelEmotes(channelId),
    bttv.getChannelEmotes(channelId),
    bttv.getGlobalEmotes(),
    ffz.getChannelEmotes(channelId),
    ffz.getGlobalEmotes(),
    stv.getChannelEmotes(channelId),
    stv.getGlobalEmotes(),
  ]).then((resAll) =>
    resAll
      .filter((res) => res.status === 'fulfilled')
      .map((res) => res.status === 'fulfilled' && res.value)
      .flat()
  );
}
