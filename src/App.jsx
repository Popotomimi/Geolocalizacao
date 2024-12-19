// Hooks
import { useState, useEffect } from "react";

// React-Router-Dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// React-Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import MapPage from "./pages/MapPage";
import AdminPage from "./pages/AdminPage";
import CheckOutPage from "./pages/CheckOutPage";
import EventDetail from "./pages/EventDetail";

// Components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";

// Context
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      {" "}
      <UserProvider>
        {" "}
        <Navbar /> <ToastContainer
          autoClose={4000}
          position="top-center"
        />{" "}
        <Routes>
          {" "}
          <Route path="/" element={<MapPage />} />{" "}
          <Route path="/checkout" element={<CheckOutPage />} />{" "}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                {" "}
                <AdminPage />{" "}
              </PrivateRoute>
            }
          />{" "}
          <Route
            path="/event/:id"
            element={
              <PrivateRoute>
                <EventDetail />
              </PrivateRoute>
            }
          />{" "}
          <Route path="/login" element={<Login />} />{" "}
        </Routes>{" "}
        <Footer />{" "}
      </UserProvider>{" "}
    </BrowserRouter>
  );
}
export default App;
