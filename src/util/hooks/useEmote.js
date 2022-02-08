import { useCallback, useState } from 'react';

const useEmote = (emotes) => {
  const [currentEmote, setCurrentEmote] = useState(null);

  // console.log(
  //   'selection',
  //   emotes.filter((emote) => emote.selected)
  // );

  const changeEmote = useCallback(() => {
    const selectedEmotes = emotes.filter((emote) => emote.selected);
    const randomEmote =
      selectedEmotes[Math.floor(Math.random() * selectedEmotes.length)];
    setCurrentEmote(randomEmote);
  }, [emotes]);

  return [currentEmote, changeEmote];
};

export default useEmote;
