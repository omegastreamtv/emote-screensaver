import { Modal, Button, Form } from 'react-bootstrap';

import GalleryMenu from './GalleryMenu';
import Gallery from './Gallery';

const SPEED_MIN = 5;
const SPEED_MAX = 200;

const SIZE_MIN = 20;
const SIZE_MAX = 300;

const scaleVal = (number, inMin, inMax, outMin, outMax) =>
  ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
const modifySpeedIn = (val) => scaleVal(val, SPEED_MIN, SPEED_MAX, 0, 100);
const modifySizeIn = (val) => scaleVal(val, SIZE_MIN, SIZE_MAX, 0, 100);

const Settings = ({ data, update, visible, show }) => {
  const allowSave = data.emotes.filter((emote) => emote.selected).length > 0;

  const modifySpeedOut = (val) =>
    update({
      type: 'setEmoteSpeed',
      value: scaleVal(val, 0, 100, SPEED_MIN, SPEED_MAX),
    });

  const modifySizeOut = (val) =>
    update({
      type: 'setEmoteSize',
      value: scaleVal(val, 0, 100, SIZE_MIN, SIZE_MAX),
    });

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
        <div className="row">
          <div className="col border-end">
            <Form.Label>Emote size</Form.Label>
            <Form.Range
              value={modifySizeIn(data.emoteSize)}
              onChange={(e) => modifySizeOut(e.target.value)}
            />
            <Form.Label>Emote speed</Form.Label>
            <Form.Range
              value={modifySpeedIn(data.emoteSpeed)}
              onChange={(e) => modifySpeedOut(e.target.value)}
            />
          </div>
          <div className="col">
            <Form.Label>Text size</Form.Label>
            <Form.Range
              value={data.textSize}
              onChange={(e) =>
                update({ type: 'setTextSize', value: e.target.value })
              }
            />
            <Form.Check
              type="switch"
              label="Enable newly added emotes by default"
              checked={data.emoteDefault}
              onChange={(e) =>
                update({ type: 'setEmoteDefault', value: e.target.checked })
              }
            />
          </div>
        </div>
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
      <Modal.Footer>
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
