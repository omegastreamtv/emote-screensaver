import { Form } from 'react-bootstrap';

const Setting = ({ label, children }) => (
  <div className="general-setting">
    {label && <Form.Label>{label}</Form.Label>}
    {children}
  </div>
);

export default Setting;
