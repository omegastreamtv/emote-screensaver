import { useCallback, useMemo } from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import EmoteGroupDropdown from './EmoteGroupDropdown';
import type { SettingsAction } from '@/util/hooks/settingsReducer';
import type { Emote, Scope, Service } from '@/util/types';

type Props = {
  emotes: Emote[];
  update: React.Dispatch<SettingsAction>;
};

function GalleryMenu({ emotes, update }: Props) {
  const emoteGroupExists = useCallback(
    (service: Service) => emotes.filter((e) => e.service === service).length > 0,
    [emotes]
  );

  const zwEmotesExist = useMemo(
    () => emotes.filter((e) => e.zeroWidth).length > 0,
    [emotes]
  );

  const toggleEmoteGroup = (service: Service, scope: Scope, value: boolean) =>
    update({ type: 'toggleEmoteGroup', service, scope, value });

  return (
    <div id="gallery-menu" className="d-flex flex-wrap pb-2 sticky-top">
      <ButtonGroup className="mt-2 me-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() => update({ type: 'toggleAllEmotes', value: true })}
        >
          Select All
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => update({ type: 'toggleAllEmotes', value: false })}
        >
          Deselect All
        </Button>
      </ButtonGroup>
      <EmoteGroupDropdown title="Twitch" toggle={toggleEmoteGroup} channelOnly />
      {emoteGroupExists('7tv') && (
        <EmoteGroupDropdown title="7TV" toggle={toggleEmoteGroup} />
      )}
      {emoteGroupExists('bttv') && (
        <EmoteGroupDropdown title="BTTV" toggle={toggleEmoteGroup} />
      )}
      {emoteGroupExists('ffz') && (
        <EmoteGroupDropdown title="FFZ" toggle={toggleEmoteGroup} />
      )}
      {zwEmotesExist && (
        <DropdownButton title="Zero-Width" size="sm" className="d-inline-block mt-2 me-2">
          <Dropdown.Item onClick={() => update({ type: 'toggleZeroWidth', value: true })}>
            Select all
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => update({ type: 'toggleZeroWidth', value: false })}
          >
            Deselect all
          </Dropdown.Item>
        </DropdownButton>
      )}
    </div>
  );
}

export default GalleryMenu;
