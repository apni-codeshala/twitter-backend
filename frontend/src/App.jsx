import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Group Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {/* Layout or Outlet for nested protected routes */}
              <Home />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Feeds />} />
          <Route path="tweet" element={<PostTweet />} />
          <Route path="trends" element={<PopularHashtags />} />
        </Route>
      </Routes>
    </Router>
  );
};

const ProtectedRoutesLayout = () => {
  return (
    <div>
      {/* Common layout for protected pages */}
      <h1>Protected Pages</h1>
      <Outlet />
    </div>
  );
};

export default App;