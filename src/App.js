import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from './config/actions/actionLogin';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';
import Carts from './components/Carts';
import Layout from './components/Navbar/Layout';
import NotFound from './components/NotFound';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.token !== null);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/" element={<Layout />}>
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/" replace />}
          />
          <Route path="/product" element={<Product />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
