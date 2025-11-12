import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Terms from "./pages/Terms";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import UnderConstruction from "./pages/UnderConstruction";


const App = () => {
  return (
    <div className="main-container">
      <main className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<UnderConstruction />} />
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
    </div>
  );
};

export default App;
