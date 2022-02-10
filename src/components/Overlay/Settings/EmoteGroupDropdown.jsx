import { Dropdown, DropdownButton } from 'react-bootstrap';

const EmoteGroupDropdown = ({ title, toggle, channelOnly }) => {
  const service = title.toLowerCase();

  return (
    <DropdownButton title={title} size="sm" className="d-inline-block me-2">
      <Dropdown.Item onClick={() => toggle(service, 'channel', true)}>
        Select all (channel)
      </Dropdown.Item>
      {!channelOnly && (
        <Dropdown.Item onClick={() => toggle(service, 'global', true)}>
          Select all (global)
        </Dropdown.Item>
      )}
      <Dropdown.Item onClick={() => toggle(service, 'channel', false)}>
        Deselect all (channel)
      </Dropdown.Item>
      {!channelOnly && (
        <Dropdown.Item onClick={() => toggle(service, 'global', false)}>
          Deselect all (global)
        </Dropdown.Item>
      )}
    </DropdownButton>
  );
};

export default EmoteGroupDropdown;
