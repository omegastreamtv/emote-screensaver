export const getTwitchId = async (channelName: string) => {
  const res = await fetch(`https://itsathirdpartything.com/twitch/id/${channelName}`);

  if (res.ok) {
    return await res.text();
  }
};
