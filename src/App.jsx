// React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import MapPage from "./pages/MapPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// React-Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOutPage from "./pages/CheckOutPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer autoClose={4000} position="top-center" />
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
