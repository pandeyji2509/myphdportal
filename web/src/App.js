import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import LandingPage from "./pages/LandingPage";
import { useSelector } from 'react-redux';
import ProtectAdminRoute from "./components/protectAdminRoute";
import ProtectStudentRoute from "./components/protectStudentRoute";
import StudentDashboard from "./pages/dashboard/student/StudentDashboard";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<LandingPage />} />
          <Route path="/admin/*" element={
              <ProtectAdminRoute>
                <AdminDashboard />
              </ ProtectAdminRoute>
          } />
          <Route path="/student/*" element={
              <ProtectStudentRoute>
                <StudentDashboard />
              </ ProtectStudentRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
