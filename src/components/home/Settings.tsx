'use client';

import { Form } from 'react-bootstrap';
import { useHomeSettings } from '@/util/hooks/useHomeSettings';
import emoteGroups from '@/util/emoteGroups';
import { GroupKey, HomeSettings } from '@/util/types';

type Props = {
  active: boolean;
  show: React.Dispatch<React.SetStateAction<boolean>>;
};

function Settings({ active, show }: Props) {
  const [settings, updateSettings] = useHomeSettings();

  const toggleGroup = (group: GroupKey) => {
    updateSettings((s: HomeSettings) => {
      s[group] = !s[group];
      return s;
    });
  };

  return (
    <Form.Group>
      <Form.Check
        type="switch"
        label="Preselect emote groups"
        defaultChecked={active}
        onChange={() => show((x) => !x)}
        className="mb-2"
      />
      {active && (
        <div className="option-list d-flex flex-wrap pt-2 border-top">
          {Object.entries(settings).map(([key, val]) => (
            <Form.Check
              key={key}
              type="switch"
              label={emoteGroups.find((x) => x.paramKey === key)?.home.text}
              defaultChecked={val}
              onChange={() => toggleGroup(key as GroupKey)}
            />
          ))}
        </div>
      )}
    </Form.Group>
  );
}

export default Settings;
