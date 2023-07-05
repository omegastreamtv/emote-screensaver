import { Dispatch } from 'react';
import { Button } from 'react-bootstrap';
import { SettingsAction } from '@/util/hooks/useOverlaySettings';
import { getStorageKey, getStoredSettings } from '@/util/settings/overlay';

type Props = {
  channelName: string;
  update: Dispatch<SettingsAction>;
};

const Instructions = ({ channelName, update }: Props) => {
  const hide = () => {
    const settings = getStoredSettings(channelName);
    const storageKey = getStorageKey(channelName);

    localStorage.setItem(storageKey, JSON.stringify({ ...settings, showHelp: false }));

    update({ type: 'showHelp', value: false });
  };

  return (
    <div
      id="instructions"
      className="position-absolute top-50 start-50 translate-middle d-flex flex-column"
    >
      <h5>Instructions</h5>
      <ol>
        <li className="body-text">
          Add a new browser source to OBS using your personalized channel URL.
        </li>
        <li className="body-text">
          With the new source selected, click the "interact" button to view the page in
          interactive mode.
        </li>
        <li className="body-text">
          Click anywhere on the screen to open and change your settings.
        </li>
      </ol>
      <p className="body-text mb-3">
        Leave the option "Shutdown source when not visible" unchecked or the page will
        reset after switching scenes.
      </p>
      <Button onClick={hide}>Got it!</Button>
    </div>
  );
};

export default Instructions;
