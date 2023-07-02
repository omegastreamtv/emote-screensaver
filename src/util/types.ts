export type Service = 'twitch' | 'bttv' | 'ffz' | '7tv';

export type Scope = 'global' | 'channel';

export type GroupKey = Service | 'bttvg' | 'ffzg' | '7tvg' | 'zw';

export type HomeSettings = Record<GroupKey, boolean>;
