// React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import MapPage from "./pages/MapPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
