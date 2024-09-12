import logo from './logo.svg';
import './App.css';
import ListProductComponent from './components/ListProductComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductComponent from './components/ProductComponent';
import Dashboard from './Dashboard';
import ListPendingProductComponent from './components/ListPendingProductComponent';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <HeaderComponent /> */}
        <Routes>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/products' element={<ListProductComponent />}></Route>
          <Route path='/add-product' element={<ProductComponent />}></Route>
          <Route path='/update-product/:id' element={<ProductComponent />}></Route>
          <Route path='/pending-products' element={<ListPendingProductComponent />}></Route>
        </Routes>
        {/* <FooterComponent /> */}
      </BrowserRouter>
    </>
    
  );
}

export default App;
