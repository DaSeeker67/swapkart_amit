import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LandingPage from './pages/Home'
import { AppProvider } from './context/AppContext'
import ProductsPage from './pages/ProductsPage'
import ProductDetailsPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import ProductAdditionPage from './pages/ProductAdditionPage'
import SellerPage from './pages/SellerPage'


function App() {

  return (
    <>
    <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/sellersPage' element={<SellerPage/>}/>
        <Route path='/products/' element={<ProductsPage/>}/>
        <Route path='/product/:id' element={<ProductDetailsPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/addProduct' element={<ProductAdditionPage/>}/> 
        

      </Routes>
    </BrowserRouter>
    </AppProvider>
    </>
  )
}

export default App
