import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';
import Carts from './components/Carts';
import Layout from './components/Navbar/Layout';
import NotFound from './components/NotFound'

function App() {

  return (
    <Router>
      <Routes>
        <Route index Component={Login} />
        <Route path='/' element={<Layout />}>
          <Route path='/home' Component={Home} />
          <Route path='/product' Component={Product} />
          <Route path='/carts' Component={Carts} />
          <Route path='/product/:productId' element={<ProductDetail />} />
          <Route path='*' Component={NotFound} />
        </Route>

      </Routes>
    </Router>
  );

}


export default App;
