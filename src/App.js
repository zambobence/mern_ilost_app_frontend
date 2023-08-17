import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentication from './authentication/pages/Authentication';
import AddItem from './item/page/AddItem';
import ItemDetails from './item/page/ItemDetails';
import Header from './header/Header';
import BrowseItem from './item/page/BrowseItem';
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <>
    <Router>
    <Header />
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/browse-item" element={<BrowseItem />} />
        <Route path="/item/:itemId" element={<ItemDetails />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
