import { Route, Routes } from "react-router-dom"
import ProductList from "./ProductList"
import OrderDetailPage from "./OrderDetailPage"
import OrderListPage from "./OrderListPage"


function App() {

  return (
    <>
     <Routes>
      <Route index element={<ProductList />}></Route>
      <Route path="/orders" element={<OrderListPage />}></Route>
      <Route path="/orders/:id" element={<OrderDetailPage />}></Route>
     </Routes>
    </>
  )
}

export default App
