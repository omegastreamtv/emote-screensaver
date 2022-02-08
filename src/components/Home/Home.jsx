import { Outlet } from 'react-router-dom';

import logo from '../../images/logo.png';

const Home = () => (
  <main
    id="home"
    className="d-flex justify-content-center align-items-center vw-100 vh-100"
  >
    <div id="content">
      <div className="mb-5">
        <img src={logo} alt="YEAHBUTDVDS" />
      </div>
      <Outlet />
    </div>
  </main>
);

export default Home;
