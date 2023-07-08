import { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { Emote, Scope, Service } from '@/util/types';

const properNames = {
  twitch: 'Twitch',
  bttv: 'BTTV',
  ffz: 'FFZ',
  '7tv': '7TV',
  channel: 'Channel',
  global: 'Global',
};

type Props = {
  service: Service;
  scope: Scope;
  emotes: Emote[];
  idxOffset: number;
  toggleEmote: (idx: number) => void;
};

function GalleryGroup({ service, scope, emotes, idxOffset, toggleEmote }: Props) {
  const [contentVisible, showContent] = useState(false);

  const content =
    contentVisible &&
    emotes.map((emote, i) => (
      <div
        key={emote.name}
        className={`emote${emote.selected ? ' selected' : ''}`}
        onClick={() => toggleEmote(i + idxOffset)}
      >
        <img src={emote.url} className="h-auto m-auto" alt={emote.name} />
        <p className="emote-name text-center mb-0">{emote.name}</p>
      </div>
    ));

  return (
    <Accordion.Item className="gallery-group" eventKey={service + scope}>
      <Accordion.Header className="group-title">{`${properNames[service]} (${properNames[scope]})`}</Accordion.Header>
      <Accordion.Body onEnter={() => showContent(true)} className="emote-group">
        {content}
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default GalleryGroup;
