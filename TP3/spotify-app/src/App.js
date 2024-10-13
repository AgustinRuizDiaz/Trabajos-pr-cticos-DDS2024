import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home';
import ArtistDetail from './views/ArtistDetail';
import AlbumDetail from './views/AlbumDetail';
import FavoriteSongs from './views/FavoriteSongs';
import Login from './views/Login';
import './styles/styles.css';

function ProtectedRoute({ children }) {
  const clientId = localStorage.getItem('spotifyClientId');
  const clientSecret = localStorage.getItem('spotifyClientSecret');

  if (!clientId || !clientSecret) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/artist/:id" element={
            <ProtectedRoute>
              <ArtistDetail />
            </ProtectedRoute>
          } />
          <Route path="/album/:id" element={
            <ProtectedRoute>
              <AlbumDetail />
            </ProtectedRoute>
          } />
          <Route path="/favorite-songs" element={
            <ProtectedRoute>
              <FavoriteSongs />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;