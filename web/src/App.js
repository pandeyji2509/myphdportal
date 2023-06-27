import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import NewLandingPage from "./pages/NewLandingPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/*" element={<AdminDashboard />} />
          <Route path="/newlanding/*" element={<NewLandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
