import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import LandingPage from './pages/LandingPage';
import Schedule from './pages/Schedule';
import './App.css';
import { LoginProvider } from './pages/LoginContext';


function App() {

  return (
    <LoginProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="schedule" element={<Schedule />} />
          </Route>
        </Routes>
      </Router>
    </LoginProvider>
    
  )
}

export default App;
