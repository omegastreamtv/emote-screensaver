import { Outlet } from 'react-router-dom';

const Home = () => (
  <main
    id="home"
    className="d-flex justify-content-center align-items-center vw-100 vh-100"
  >
    <div id="content">
      <div className="mb-5">
        <img src="https://i.imgur.com/Nu9SaDH.png" alt="YEAHBUTDVDS" />
      </div>
      <Outlet />
    </div>
  </main>
);

export default Home;
