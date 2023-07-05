import { useState } from 'react';
import { Emote } from '@/util/types';

function useEmote(emotes: Emote[]) {
  const [currentEmote, setCurrentEmote] = useState<Emote | null>(null);

  const changeEmote = () => {
    const selectedEmotes = emotes.filter((e: Emote) => e.selected);
    const randomIndex = Math.floor(Math.random() * selectedEmotes.length);
    const randomEmote = selectedEmotes[randomIndex];

    setCurrentEmote(randomEmote);
  };

  return [currentEmote, changeEmote];
}

export default useEmote;
