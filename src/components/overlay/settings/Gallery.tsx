import { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import GalleryGroup from './GalleryGroup';
import type { Emote, Scope, Service } from '@/util/types';

type Props = {
  emotes: Emote[];
  toggleEmote: (idx: number) => void;
};

type Group = {
  service: Service;
  scope: Scope;
  emotes: Emote[];
  idxOffset: number;
};

function Gallery({ emotes, toggleEmote }: Props) {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const groups = [];
    let newGroupStartIdx = 0;

    for (let i = 0; i < emotes.length; i++) {
      const prevEmote = i ? emotes[i - 1] : emotes[i];

      if (
        emotes[i].service !== prevEmote?.service ||
        emotes[i].scope !== prevEmote?.scope ||
        i === emotes.length - 1
      ) {
        groups.push({
          service: prevEmote.service,
          scope: prevEmote.scope,
          emotes: emotes.slice(newGroupStartIdx, i),
          idxOffset: newGroupStartIdx,
        });

        newGroupStartIdx = i;
      }
    }

    setGroups(groups);
  }, [emotes]);

  return (
    <Accordion id="gallery" alwaysOpen>
      {groups.map((group) => (
        <GalleryGroup
          key={`${group.service}_${group.scope}`}
          toggleEmote={toggleEmote}
          {...group}
        />
      ))}
    </Accordion>
  );
}

export default Gallery;
