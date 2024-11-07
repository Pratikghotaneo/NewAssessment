
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import ProductsDetails from './pages/ProductsDetails'
import Cart from './pages/Cart'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<Home />} />
          <Route path='/product/:id' element={<ProductsDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
