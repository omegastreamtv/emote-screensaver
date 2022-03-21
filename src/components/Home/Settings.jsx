import { useReducer } from 'react';
import { Form } from 'react-bootstrap';

import settingsReducer, {
  loadSettings,
} from '../../util/hooks/useHomeSettings';
import emoteGroups from '../../util/emoteGroups';

const defaults =
  loadSettings() ||
  emoteGroups.reduce(
    (obj, val) => ({
      ...obj,
      [val.paramKey]: val.home.default,
    }),
    {}
  );

const Settings = ({ visible, show }) => {
  const [settings, update] = useReducer(settingsReducer, defaults);

  return (
    <>
      <Form.Check
        type="switch"
        label="Preselect emotes by group"
        checked={visible}
        onChange={() => show((x) => !x)}
        className="mb-2"
      />
      {visible && (
        <div className="option-list d-flex flex-wrap pt-2 border-top">
          {Object.entries(settings).map(([key, val]) => (
            <Form.Check
              key={key}
              type="switch"
              label={emoteGroups.find((x) => x.paramKey === key).home.text}
              checked={val}
              onChange={() => update(key)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Settings;
