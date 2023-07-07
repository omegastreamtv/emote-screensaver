export type Service = 'twitch' | 'bttv' | 'ffz' | '7tv';
export type Scope = 'global' | 'channel';

export type GroupKey = Service | 'bttvg' | 'ffzg' | '7tvg' | 'zw';

export type HomeSettings = Record<GroupKey, boolean>;

export type OverlaySettings = {
  channelName: string | null;
  textSize: number;
  emoteSize: number;
  emoteSpeed: number;
  emoteDefault: boolean;
  showHelp: boolean;
  emotes: Emote[];
};

export type Emote = {
  name: string;
  url: string;
  service: Service;
  scope: Scope;
  zeroWidth: boolean;
  selected: boolean;
};
