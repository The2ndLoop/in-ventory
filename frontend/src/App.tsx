import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import InternalServerError from "./routes/500";
import OrderList from "./routes/OrderList";
import CustomerList from "./routes/CustomerList";
import ProductList from "./routes/ProductList";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/orders" element={<OrderList />} />
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/500" element={<InternalServerError />} />
    </Routes>
  );
}

export default App;
