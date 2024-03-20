import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App.jsx'
import Auth from './auth/index.jsx';
import "./index.css";
import Nests from './nests/index.jsx';
import Nest from './nests/nest.jsx';
import Map from './map/index.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/nests" element={<Nests />} />
        <Route path="/nest/:id" element={<Nest />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>  
  </React.StrictMode>
);
