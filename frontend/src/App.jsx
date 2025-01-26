import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import LandingPage from './pages/LandingPage';
import SchedulePage from './pages/SchedulePage';
import './App.css';
import { LoginProvider } from './pages/LoginContext';
import LoginPage from './pages/LoginPage';
import ScheduleBackground from './pages/ScheduleBackground';


function App() {

  return (
    <LoginProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="login" element={<LoginPage />} />
            {/* should not have sb page*/}
            <Route path="sb" element={<ScheduleBackground />} />
          </Route>
        </Routes>
      </Router>
    </LoginProvider>
    
  )
}

export default App;