import { Form } from 'react-bootstrap';
import Setting from './Setting';
import type { OverlaySettings } from '@/util/types';
import type { SettingsAction } from '@/util/hooks/settingsReducer';

const SPEED_MIN = 5;
const SPEED_MAX = 200;

const SIZE_MIN = 20;
const SIZE_MAX = 300;

type Props = {
  data: OverlaySettings;
  update: React.Dispatch<SettingsAction>;
};

const scaleVal = (
  number: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

const modifySpeedIn = (val: number) =>
  scaleVal(val, SPEED_MIN, SPEED_MAX, 0, 100);

const modifySizeIn = (val: number) => scaleVal(val, SIZE_MIN, SIZE_MAX, 0, 100);

function GeneralSettings({ data, update }: Props) {
  const modifySpeedOut = (val: number) =>
    update({
      type: 'setEmoteSpeed',
      value: scaleVal(val, 0, 100, SPEED_MIN, SPEED_MAX),
    });

  const modifySizeOut = (val: number) =>
    update({
      type: 'setEmoteSize',
      value: scaleVal(val, 0, 100, SIZE_MIN, SIZE_MAX),
    });

  return (
    <div className="d-flex flex-wrap">
      <Setting label="Emote size">
        <Form.Range
          value={modifySizeIn(data.emoteSize)}
          onChange={(e) => modifySizeOut(Number(e.target.value))}
        />
      </Setting>
      <Setting label="Emote speed">
        <Form.Range
          value={modifySpeedIn(data.emoteSpeed)}
          onChange={(e) => modifySpeedOut(Number(e.target.value))}
        />
      </Setting>
      <div className="setting-group d-flex gap-2">
        <Setting label="Show name">
          <Form.Switch
            checked={data.showName}
            onChange={(e) =>
              update({ type: 'showName', value: e.target.checked })
            }
          />
        </Setting>
        <Setting label="Name size">
          <Form.Range
            value={data.nameSize}
            disabled={!data.showName}
            onChange={(e) =>
              update({ type: 'setNameSize', value: Number(e.target.value) })
            }
          />
        </Setting>
      </div>
      <Setting label="Enable newly added emotes by default">
        <Form.Switch
          checked={data.emoteDefault}
          onChange={(e) =>
            update({ type: 'setEmoteDefault', value: e.target.checked })
          }
        />
      </Setting>
    </div>
  );
}

export default GeneralSettings;
