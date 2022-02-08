import { Link } from 'react-router-dom';

const GoHome = ({ text }) => (
  <div className="text-center">
    <h4 className="mb-5 text-center">{text}</h4>
    <Link to="/">
      <button type="button" className="btn btn-primary">
        Go home
      </button>
    </Link>
  </div>
);

export default GoHome;
