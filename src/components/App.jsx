import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home/Home';
import Entry from './Home/Entry';
import GoHome from './Home/GoHome';
import Loader from './Loader';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Entry />} />
        <Route
          path="/channel-not-found"
          element={<GoHome text="That channel doesn't exist." />}
        />
        <Route path="*" element={<GoHome text="Nothing to see here." />} />
      </Route>
      <Route path="/channel/:channelName" element={<Loader />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
