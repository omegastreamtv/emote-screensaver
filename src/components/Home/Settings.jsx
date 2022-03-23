import { useReducer } from 'react';
import { Form } from 'react-bootstrap';

import settingsReducer, {
  defaultSettings,
} from '../../util/hooks/useHomeSettings';
import emoteGroups from '../../util/emoteGroups';

const Settings = ({ visible, show }) => {
  const [settings, update] = useReducer(settingsReducer, defaultSettings);

  const toggleSettings = () => {
    show((x) => !x);

    // Reverse condition, state hasn't switched yet
    if (!visible) {
      localStorage.setItem('groups', JSON.stringify(defaultSettings));
    } else {
      localStorage.removeItem('groups');
    }
  };

  return (
    <>
      <Form.Check
        type="switch"
        label="Preselect emotes by group"
        checked={visible}
        onChange={toggleSettings}
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
