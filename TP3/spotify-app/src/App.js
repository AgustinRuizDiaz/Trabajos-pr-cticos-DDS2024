import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import ArtistDetail from './views/ArtistDetail';
import './styles/styles.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artist/:id" element={<ArtistDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
