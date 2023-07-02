import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getEmotes from '../util/requests/emotes';
import getChannelId from '../util/requests/channelId';
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
    (async () => {
      try {
        const channelId = await getChannelId(params.channelName);

        if (!channelId) {
          navigate('/channel-not-found');
          return;
        }

        setStatusText('Collecting emotes');
        const newEmotes = await getEmotes(channelId);

        setStatusText('Loading preferences');
        setSettings(loadSettings(newEmotes, params.channelName));
      } catch (err) {
        navigate('/error');
      }
    })();
  }, [params.channelName, navigate]);

  return settings ? <Overlay settings={settings} /> : <Loading status={status} />;
};

export default Loader;
