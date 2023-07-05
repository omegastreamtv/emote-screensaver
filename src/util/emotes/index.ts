import 'allsettled-polyfill';
import * as twitch from './twitch';
import * as bttv from './bttv';
import * as ffz from './ffz';
import * as stv from './7tv';

// Use type predicate as type guard for result filter
function fulfilledResult<T>(
  res: PromiseSettledResult<T>
): res is PromiseFulfilledResult<T> {
  return res.status === 'fulfilled';
}

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
      .filter(fulfilledResult)
      .map((res) => res.value)
      .flat()
  );
}
