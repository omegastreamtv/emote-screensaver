'use client';

import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { baseSettings, getStoredSettings } from '@/util/settings/home';
import emoteGroups from '@/util/emoteGroups';
import { GroupKey, HomeSettings } from '@/util/types';

type Props = {
  active: boolean;
  show: React.Dispatch<React.SetStateAction<boolean>>;
};

const Settings = ({ active, show }: Props) => {
  // const [settings, update] = useReducer(homeSettingsReducer, baseSettings);
  const [settings, update] = useState(baseSettings);

  useEffect(() => {
    const storedSettings = getStoredSettings();
    storedSettings && update(storedSettings);
  }, []);

  const toggleGroup = (group: GroupKey) => {
    update((s: HomeSettings) => {
      s[group] = !s[group];
      return s;
    });

    localStorage.setItem('groups', JSON.stringify(settings));
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
};

export default Settings;
