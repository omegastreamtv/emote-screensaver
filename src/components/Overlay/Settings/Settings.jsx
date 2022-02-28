import { Modal, Button } from 'react-bootstrap';

import GalleryMenu from './GalleryMenu';
import Gallery from './Gallery';
import GeneralSettings from './General/GeneralSettings';

const Settings = ({ data, update, visible, show }) => {
  const allowSave = data.emotes.filter((emote) => emote.selected).length > 0;

  const showHelp = () => {
    show(false);
    update({ type: 'toggleHelp', value: true });
  };

  const saveAndClose = () => {
    localStorage.setItem('settings', JSON.stringify(data));
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
          These are all the Twitch sub, BTTV, FFZ, and 7TV emotes you have.
          Select the emotes you want in to appear in the overlay.
        </p>
        <GalleryMenu update={update} />
        <Gallery
          emotes={data.emotes}
          toggleEmote={(idx) => update({ type: 'toggleEmote', value: idx })}
        />
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <span className="text-link" onClick={() => showHelp()}>
          Show help
        </span>
        <Button
          variant="primary"
          disabled={!allowSave}
          onClick={() => saveAndClose()}
        >
          Save &amp; Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Settings;
