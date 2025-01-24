import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Account from './components/Account';
import Home from './components/HomePage';
import AboutUs from './components/AboutUs';
import ScanLeaf from './components/ScanLeaf';
import TermsOfService from './components/TermsofService';
import './App.css';


const App = () => {
    const location = useLocation();

    // Paths where the Navbar should not appear
    const excludeNavbarRoutes = ['/', '/login'];

    return (
        <div>
            {/* Conditionally render Navbar */}
            {!excludeNavbarRoutes.includes(location.pathname) && <Navbar />}
            
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Signup />} />
                <Route path="/scan" element={<ScanLeaf />} />
                <Route path="/login" element={<Login />} />
                <Route path="/account" element={<Account />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/terms" element={<TermsOfService />} />
            </Routes>
        </div>
    );
};

export default App;

