import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateAccount from './pages/CreateAccount';
import PolicyDashboard from './pages/PolicyDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/create-account-with-nric-1-1" element={<CreateAccount />} />
        <Route path="/login" element={<Dashboard />} />
        <Route path="/dashboard" element={<PolicyDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
