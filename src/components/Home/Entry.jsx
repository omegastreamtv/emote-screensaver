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
      <div className="footer body-text text-black-50 text-center">
        <a
          href="https://github.com/Mahcks/YEAHBUTDVDs"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://cdn.onlinewebfonts.com/svg/img_44605.png"
            alt="GitHub"
            className="mb-3"
            rel="noreferrer"
          />
        </a>
        <p>
          <span>Made with </span>
          <img
            src="https://static-cdn.jtvnw.net/emoticons/v2/300272604/static/light/1.0"
            alt="love"
            className="inline-icon"
            title="esfandL"
          />
          <span> by </span>
          <a
            href="https://twitch.tv/chudbungus"
            target="_blank"
            rel="noreferrer"
          >
            Chud Bungus
          </a>
          <span> and </span>
          <a href="https://github.com/mahcks" target="_blank" rel="noreferrer">
            Mahcksimus
          </a>
          <span>.</span>
        </p>
      </div>
    </>
  );
};

export default Entry;
