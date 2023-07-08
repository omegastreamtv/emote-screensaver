type UserData = {
  data: {
    username: string;
    id: string;
  };
};
type UserError = {
  err: string;
};
type UserResponse = UserData | UserError;

export const getTwitchId = async (channelName: string) => {
  const res = await fetch(`https://api.retpaladinbot.com/twitch/id?user=${channelName}`);

  if (res.ok) {
    const data: UserResponse = await res.json();

    if ('data' in data) {
      return data.data.id;
    }
  }
};
