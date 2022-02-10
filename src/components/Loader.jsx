import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getEmotes from '../util/requests/emotes';
import getTwitchId from '../util/requests/twitchId';
import loadSettings from '../util/loadSettings';

import Loading from './Loading';
import Overlay from './Overlay/Overlay';

const Loader = () => {
  const [status, setStatusText] = useState('Finding channel');
  const [settings, setSettings] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  // Redirect to /channel-not-found if no ID is returned.
  // Emote request errors are handled externally and global
  // emotes will always be returned here for every channel.
  useEffect(() => {
    getTwitchId(params.channelName)
      .then((channelId) => {
        setStatusText('Collecting emotes');
        return getEmotes(params.channelName, channelId);
      })
      .then((newEmotes) => {
        setStatusText('Loading preferences');
        setSettings(loadSettings(newEmotes, params.channelName));
      })
      .catch(() => navigate('/channel-not-found'));
  }, [params.channelName, navigate]);

  return settings ? (
    <Overlay settings={settings} />
  ) : (
    <Loading status={status} />
  );
};

export default Loader;
