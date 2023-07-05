'use client';

import { useReducer, useState, useEffect } from 'react';
import Emote from './Emote';
import Instructions from './Instructions';
import Settings from './Settings/Settings';
import loadSettings from '@/util/settings/overlay';
import { useEmote } from '@/util/hooks/useEmote';
import { settingsReducer } from '@/util/hooks/useOverlaySettings';
import { Emote as EmoteT } from '@/util/types';

type Props = {
  channelName: string;
  emotes: EmoteT[];
};

function Overlay({ channelName, emotes }: Props) {
  const [settings, updateSettings] = useReducer(
    settingsReducer,
    loadSettings(emotes, channelName)
  );
  const [emote, changeEmote] = useEmote(settings.emotes);
  const [settingsActive, showSettings] = useState(false);

  useEffect(() => {
    changeEmote();
  }, []);

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
      <h1
        id="emote-name"
        className="position-absolute start-50 translate-middle-x drop-shadow"
        style={{ fontSize: `${settings.textSize}pt` }}
      >
        {emote ? emote.name : settings.emotes[0].name}
      </h1>
      {settings.showHelp && (
        <Instructions channelName={channelName} update={updateSettings} />
      )}
      <Emote
        url={emote ? emote.url : settings.emotes[0].url}
        speed={settings.emoteSpeed}
        size={settings.emoteSize}
        onBounce={changeEmote}
      />
    </div>
  );
}

export default Overlay;
