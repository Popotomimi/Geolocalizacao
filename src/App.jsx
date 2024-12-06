// Hooks
import { useState, useEffect } from "react";

// React-Router-Dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Axios
import axios from "axios";

// React-Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import MapPage from "./pages/MapPage";
import AdminPage from "./pages/AdminPage";
import CheckOutPage from "./pages/CheckOutPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import EventDetail from "./pages/EventDetail";

// Context
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <ToastContainer autoClose={4000} position="top-center" />
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
