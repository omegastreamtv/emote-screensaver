import { useMemo } from 'react';
import { Modal, Button } from 'react-bootstrap';
import GalleryMenu from './GalleryMenu';
import Gallery from './Gallery';
import GeneralSettings from './general/GeneralSettings';
import type { SettingsAction } from '@/util/hooks/settingsReducer';
import type { OverlaySettings } from '@/util/types';

type Props = {
  data: OverlaySettings;
  visible: boolean;
  update: React.Dispatch<SettingsAction>;
  show: React.Dispatch<React.SetStateAction<boolean>>;
};

function Settings({ data, update, visible, show }: Props) {
  const allowSave = useMemo(
    () => data.emotes.filter((emote) => emote.selected).length > 0,
    [data.emotes]
  );

  const toggleEmote = (idx: number) => {
    update({ type: 'toggleEmote', value: idx });
  };

  const showHelp = () => {
    show(false);
    update({ type: 'showHelp', value: true });
  };

  const saveAndClose = () => {
    update({ type: 'setAll', value: data });
    show(false);
  };

  return (
    <Modal
      show={visible}
      centered
      size="lg"
      animation={false}
      onHide={() => show(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GeneralSettings data={data} update={update} />
        <h4 className="mt-4 border-bottom">Emotes</h4>
        <p className="text-body">
          These are all the Twitch, BTTV, FFZ, and 7TV emotes you have. Select the emotes
          you want in to appear in the overlay.
        </p>
        <GalleryMenu emotes={data.emotes} update={update} />
        <Gallery emotes={data.emotes} toggleEmote={toggleEmote} />
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <span className="text-link" onClick={() => showHelp()}>
          Show help
        </span>
        <Button variant="primary" disabled={!allowSave} onClick={() => saveAndClose()}>
          Save &amp; Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Settings;
