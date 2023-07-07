'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, InputGroup } from 'react-bootstrap';
import HomeSettings from './Settings';
import { getTwitchId } from '@/util/channel';
import { getParamString } from '@/util/hooks/useHomeSettings';

function HomeForm() {
  const [channelName, setChannelName] = useState('');
  const [validating, setValidating] = useState(false);
  const [validationText, setValidationText] = useState<string | null>(null);
  const [settingsActive, showSettings] = useState(false);

  const router = useRouter();

  const onChannelTyped: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    validationText && setValidationText(null);
    setChannelName(e.currentTarget.value);
  };

  const validateChannel = async (e: React.FormEvent) => {
    e.preventDefault();

    setValidating(true);

    try {
      const channelId = await getTwitchId(channelName);

      if (channelId) {
        router.push(
          `/channel/${channelName}${settingsActive ? getParamString() : ''}`
        );
      } else {
        setValidating(false);
        setValidationText("That Twitch channel doesn't exist.");
      }
    } catch {
      setValidating(false);
      setValidationText(
        'Unable to lookup Twitch channel. Try again in a minute.'
      );
    }
  };

  return (
    <Form onSubmit={validateChannel} className="mb-5">
      <InputGroup hasValidation className="mb-2">
        <Form.Control
          value={channelName}
          placeholder="Twitch channel name"
          onChange={onChannelTyped}
          disabled={validating}
          autoFocus
          required
        />
        <Button type="submit" disabled={validating}>
          Start bouncing
        </Button>
      </InputGroup>
      {validationText && <p className="text-danger">{validationText}</p>}
      <HomeSettings active={settingsActive} show={showSettings} />
    </Form>
  );
}

export default HomeForm;
