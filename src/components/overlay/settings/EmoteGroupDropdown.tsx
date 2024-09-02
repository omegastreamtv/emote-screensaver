import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Scope, Service } from '@/util/types';

type Props = {
  title: string;
  toggle: (service: Service, scope: Scope, value: boolean) => void;
  channelOnly?: boolean;
};

function EmoteGroupDropdown({ title, toggle, channelOnly }: Props) {
  const service = title.toLowerCase() as Service;

  return (
    <DropdownButton
      title={title}
      size="sm"
      className="d-inline-block mt-2 me-2"
    >
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
}

export default EmoteGroupDropdown;
