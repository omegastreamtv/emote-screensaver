import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import EmoteGroupDropdown from './EmoteGroupDropdown';

const GalleryMenu = ({ update }) => {
  const toggleEmoteGroup = (service, scope, state) =>
    update({ type: 'toggleEmoteGroup', service, scope, state });

  return (
    <div id="gallery-menu" className="py-2 sticky-top">
      <ButtonGroup className="me-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() => update({ type: 'toggleAllEmotes', state: true })}
        >
          Select All
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => update({ type: 'toggleAllEmotes', state: false })}
        >
          Deselect All
        </Button>
      </ButtonGroup>
      <EmoteGroupDropdown
        title="Twitch"
        toggle={toggleEmoteGroup}
        channelOnly
      />
      <EmoteGroupDropdown title="7TV" toggle={toggleEmoteGroup} />
      <EmoteGroupDropdown title="BTTV" toggle={toggleEmoteGroup} />
      <EmoteGroupDropdown title="FFZ" toggle={toggleEmoteGroup} />
      <DropdownButton
        title="Zero-Width"
        size="sm"
        className="d-inline-block me-2"
      >
        <Dropdown.Item
          onClick={() => update({ type: 'toggleZeroWidth', state: true })}
        >
          Select all
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => update({ type: 'toggleZeroWidth', state: false })}
        >
          Deselect all
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default GalleryMenu;
