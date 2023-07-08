import { Form } from 'react-bootstrap';

type Props = {
  label?: string;
  children: JSX.Element;
};

function Setting({ label, children }: Props) {
  return (
    <div className="general-setting">
      {label && <Form.Label>{label}</Form.Label>}
      {children}
    </div>
  );
}

export default Setting;
