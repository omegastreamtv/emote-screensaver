'use client';

import { useState } from 'react';
import Emote from './Emote';
import Instructions from './Instructions';
import Settings from './settings/Settings';
import { useOverlaySettings } from '@/util/hooks/useOverlaySettings';
import { useEmote } from '@/util/hooks/useEmote';
import { Emote as TEmote } from '@/util/types';

type Props = {
  channelName: string;
  emotes: TEmote[];
};

function Overlay({ channelName, emotes }: Props) {
  const [settings, updateSettings] = useOverlaySettings(emotes, channelName);
  const [emote, changeEmote] = useEmote(settings.emotes);
  const [settingsActive, showSettings] = useState(false);

  return (
    <div id="overlay">
      <Settings
        data={settings}
        update={updateSettings}
        visible={settingsActive}
        show={showSettings}
      />
      <button
        id="settings-btn"
        className="vw-100 vh-100"
        onClick={() => showSettings(true)}
        disabled={settings.showHelp}
      />
      {settings.showName && (
        <h1
          id="emote-name"
          className="position-absolute start-50 translate-middle-x drop-shadow"
          style={{ fontSize: `${settings.nameSize}pt` }}
        >
          {emote?.name}
        </h1>
      )}
      {settings.showHelp && <Instructions update={updateSettings} />}
      {emote && (
        <Emote
          url={emote.url}
          speed={settings.emoteSpeed}
          size={settings.emoteSize}
          onBounce={changeEmote}
        />
      )}
    </div>
  );
}

export default Overlay;
