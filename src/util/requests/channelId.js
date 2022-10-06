import axios from 'axios';

const getTwitchId = async (channelName) => {
  const channelIdRequest = await axios(
    `https://api.ivr.fi/v2/twitch/user?login=${channelName}`
  );

  return channelIdRequest?.data[0]?.id;
};

export default getTwitchId;
