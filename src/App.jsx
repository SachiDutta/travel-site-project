import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./components/index";
import LoginPage from "./components/LoginPage";
import Bookings from "./components/Bookings";
import Flight from "./components/Flight";
import TravelDestinations from "./components/TravelDestinations";
import Contact from "./components/Contact";
import About from "./components/About";
import About2 from "./components/About2";
import FAQ from "./components/FAQ";
import Privacy from "./components/Privacy";
import Layout from "./components/Layout";

import "./styles/index.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="flights" element={<Flight />} />
          <Route path="destinations" element={<TravelDestinations />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="about2" element={<About2 />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<Index />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;



