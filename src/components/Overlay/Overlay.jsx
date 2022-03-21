import { useReducer, useState, useRef, useEffect } from 'react';
import useEmote from '../../util/hooks/useEmote';
import settingsReducer from '../../util/hooks/useOverlaySettings';

import Emote from './Emote';
import Instructions from './Instructions';
import Settings from './Settings/Settings';

const Overlay = ({ settings: initialSettings }) => {
  const [settings, updateSettings] = useReducer(
    settingsReducer,
    initialSettings
  );
  const [emote, changeEmote] = useEmote(settings.emotes);
  const [settingsVisible, showSettings] = useState(false);

  const overlayRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    changeEmote();
  }, [changeEmote]);

  return (
    <div id="overlay" ref={overlayRef}>
      <Settings
        data={settings}
        update={updateSettings}
        visible={settingsVisible}
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
        ref={titleRef}
      >
        {emote ? emote.name : initialSettings.emotes[0].name}
      </h1>
      {settings.showHelp && <Instructions update={updateSettings} />}
      <Emote
        url={emote ? emote.url : initialSettings.emotes[0].url}
        speed={settings.emoteSpeed}
        size={settings.emoteSize}
        overlay={overlayRef}
        onBounce={changeEmote}
      />
    </div>
  );
};

export default Overlay;
