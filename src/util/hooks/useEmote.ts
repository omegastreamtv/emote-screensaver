import { useCallback, useEffect, useState } from 'react';
import { Emote } from '@/util/types';

export function useEmote(emotes: Emote[]) {
  const [currentEmote, setCurrentEmote] = useState<Emote | null>(null);

  const changeEmote = useCallback(() => {
    const selectedEmotes = emotes.filter((e: Emote) => e.selected);
    const randomIndex = Math.floor(Math.random() * selectedEmotes.length);
    const randomEmote = selectedEmotes[randomIndex];

    setCurrentEmote(randomEmote);
  }, [emotes]);

  useEffect(() => {
    changeEmote();
  }, [changeEmote]);

  return [currentEmote, changeEmote] as const;
}
