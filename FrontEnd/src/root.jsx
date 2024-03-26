import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import dotenv from "dotenv";
// dotenv.config();
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App.jsx";
import Auth from "./auth/index.jsx";
import "./index.css";
import Nests from "./nests/index.jsx";
import Nest from "./nests/nest.jsx";
import Map from "./map/index.jsx";
import NewNest from "./nests/new.jsx";
import MultiStepForm from "./nests/multi.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/nests" element={<Nests />} />
            <Route path="/nest/:id" element={<Nest />} />
            <Route path="/map" element={<Map />} />
            <Route path="/new" element={<NewNest />} />
            <Route path="/beta" element={<MultiStepForm />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  </React.StrictMode>
);
