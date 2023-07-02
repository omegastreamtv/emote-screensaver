import axios from 'axios';

const getTwitchId = async (channelName) => {
  const res = await axios(`https://api.ivr.fi/v2/twitch/user?login=${channelName}`);
  return res?.data[0]?.id;
};

export default getTwitchId;
