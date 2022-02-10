import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';
import getTwitchId from '../../util/requests/twitchId';

const Entry = () => {
  const [channel, setChannel] = useState('');
  const [validateText, setValidateText] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    validateText && setValidateText(null);
    setChannel(e.target.value);
  };

  const validateChannel = (e) => {
    e.preventDefault();
    getTwitchId(channel)
      .then(() => navigate(`/channel/${channel}`))
      .catch(() => setValidateText("That Twitch channel doesn't exist"));
  };

  return (
    <>
      <h4 className="mb-5 text-center">
        Generate a DVD-style bouncing emote overlay for your Twitch stream with
        a single click.
      </h4>
      <div className="mb-5">
        <Form onSubmit={validateChannel} className="mb-2">
          <InputGroup>
            <Form.Control
              value={channel}
              placeholder="Twitch channel name"
              onChange={onChange}
              autoFocus
            />
            <Button type="submit">Start bouncing</Button>
          </InputGroup>
        </Form>
        {validateText && <p className="text-danger">{validateText}</p>}
      </div>
      <h5>Instructions</h5>
      <ol>
        <li className="body-text">
          Add a new browser source to OBS using your personalized channel URL.
        </li>
        <li className="body-text">
          With the new source selected, click the "interact" button to view the
          page in interactive mode.
        </li>
        <li className="body-text">
          Click anywhere on the screen to open and change your settings.
        </li>
      </ol>
      <p className="body-text">
        Leave the option "Shutdown source when not visible" unchecked or the
        page will break after switching scenes.
      </p>
    </>
  );
};

export default Entry;
