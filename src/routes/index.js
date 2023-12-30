import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import FurnitureCreate from "../pages/FurnitureCreate";
import FurnitureList from "../pages/FurnitureList";
import Home from "../pages/Home";

const MyRoute = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} /> */}
        <Route path="/furnitures" element={<FurnitureList />} />
        <Route path="/furnitures/create" element={<FurnitureCreate />} />
      </Routes>
    </>
  );
};

export default MyRoute;
