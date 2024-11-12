import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext'; 
import Home from './views/Home';
import Register from './views/Register'; 
import Login from './views/Login'; 
import ManageBooks from './views/ManageBooks';
import MyBooks from './views/MyBooks';
import EditBook from './views/EditBook'; 
import BookDetail from './views/BookDetail';
import Authors from './views/Authors';
import EditAuthor from './views/EditAuthor';
import Collections from './views/Collections';
import Recommendation from './views/Recommendation';
import CreateReview from './views/CreateReview';

function App() {
  return (
    <UserProvider>  
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage-books" element={<ManageBooks />} /> 
          <Route path="/my-books" element={<MyBooks />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/book-detail/:id" element={<BookDetail />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/edit-author/:id" element={<EditAuthor />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/create-review" element={<CreateReview />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
