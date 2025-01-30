import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import EAFTracker from './EAFTracker';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/eaf-tracker" element={<EAFTracker />} />
    </Routes>
  );
}

export default AppRoutes;
