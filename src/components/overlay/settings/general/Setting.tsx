import { Form } from 'react-bootstrap';

type Props = React.PropsWithChildren & {
  label?: string;
};

function Setting({ label, children }: Props) {
  return (
    <div className="setting">
      {label && <Form.Label>{label}</Form.Label>}
      <div className="d-flex">{children}</div>
    </div>
  );
}

export default Setting;
