import { Accordion } from 'react-bootstrap';

const properNames = {
  twitch: 'Twitch',
  bttv: 'BTTV',
  ffz: 'FFZ',
  '7tv': '7TV',
  channel: 'Channel',
  global: 'Global',
};

const GalleryGroup = ({ service, scope, emotes, idxOffset, toggleEmote }) => (
  <Accordion.Item className="gallery-group" eventKey={service + scope}>
    <Accordion.Header className="group-title">{`${properNames[service]} (${properNames[scope]})`}</Accordion.Header>
    <Accordion.Body className="emote-group">
      {emotes.map((emote, i) => (
        <div
          key={emote.name}
          className={`emote${emote.selected ? ' selected' : ''}`}
          onClick={() => toggleEmote(i + idxOffset)}
        >
          <img src={emote.url} className="h-auto m-auto" alt={emote.name} />
          <p className="emote-name text-center mb-0">{emote.name}</p>
        </div>
      ))}
    </Accordion.Body>
  </Accordion.Item>
);

export default GalleryGroup;
