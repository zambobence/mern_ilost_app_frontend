import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import Authentication from './authentication/pages/Authentication';
import AddItem from './item/page/AddItem';
import ItemDetails from './item/page/ItemDetails';
import Header from './header/Header';
import BrowseItem from './item/page/BrowseItem';
import Profile from './user/pages/Profile';
import AuthCtx from './shared/context/auth-context';
import useAuth from './shared/hooks/use-auth';
import Footer from './footer/Footer';
import { useState } from 'react';
function App() {

  const {token, login, logout, userId} = useAuth()
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(prevState => !prevState)
  }

  const closeMenu = () => {
    console.log('Close menu clicked')
    setShowMenu(false)
  }


  let routes
  if (token){
    routes =
    <Routes>
        <Route path="/" element={<BrowseItem />} />
        <Route path="/browse" element={<BrowseItem />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path='/item/:itemId' element={<ItemDetails />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="*" element={<Navigate to="/browse" />}/>
    </Routes>
  } else {
    routes =
    <Routes>
      <Route path='/authentication' element={<Authentication />} />
      <Route path="/browse" element={<BrowseItem />} />
      <Route path="/item/:itemId" element={<ItemDetails />} />
      <Route path="*" element={<Navigate to="/authentication" />}/>
    </Routes>
  }

  return (
    <AuthCtx.Provider value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        userId: userId
      }}>
      <Router>
      <Header 
        show={showMenu} 
        toggleMenu={toggleMenu}
        closeMenu={closeMenu} 
      />
        {routes}
      <Footer />
      </Router>
    </AuthCtx.Provider>
  );
}

export default App;
