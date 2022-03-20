import axios from 'axios';

const getTwitchId = async (channelName) => {
  const channelIdRequest = await axios(
    `https://api.retpaladinbot.com/twitch/id?user=${channelName}`
  );

  return channelIdRequest?.data.data?.id;
};

export default getTwitchId;
