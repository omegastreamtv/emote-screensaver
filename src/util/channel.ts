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
  const res = await fetch(`http://itsathirdpartything.com/twitch/id/${channelName}`);

  if (res.ok) {
    const data: UserResponse = await res.json();
    return data;
  }
};
