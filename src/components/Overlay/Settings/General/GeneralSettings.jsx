import { Form } from 'react-bootstrap';
import Setting from './Setting';

const SPEED_MIN = 5;
const SPEED_MAX = 200;

const SIZE_MIN = 20;
const SIZE_MAX = 300;

const scaleVal = (number, inMin, inMax, outMin, outMax) =>
  ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
const modifySpeedIn = (val) => scaleVal(val, SPEED_MIN, SPEED_MAX, 0, 100);
const modifySizeIn = (val) => scaleVal(val, SIZE_MIN, SIZE_MAX, 0, 100);

const GeneralSettings = ({ data, update }) => {
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

  return (
    <div className="d-flex flex-wrap">
      <Setting label="Emote size">
        <Form.Range
          value={modifySizeIn(data.emoteSize)}
          onChange={(e) => modifySizeOut(e.target.value)}
        />
      </Setting>
      <Setting label="Emote speed">
        <Form.Range
          value={modifySpeedIn(data.emoteSpeed)}
          onChange={(e) => modifySpeedOut(e.target.value)}
        />
      </Setting>
      <Setting label="Text size">
        <Form.Range
          value={data.textSize}
          onChange={(e) =>
            update({ type: 'setTextSize', value: e.target.value })
          }
        />
      </Setting>
      <Setting>
        <Form.Check
          type="switch"
          label="Enable newly added emotes by default"
          checked={data.emoteDefault}
          onChange={(e) =>
            update({ type: 'setEmoteDefault', value: e.target.checked })
          }
        />
      </Setting>
    </div>
  );
};

export default GeneralSettings;
