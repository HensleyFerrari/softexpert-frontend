import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Product from "./Pages/Product/Product";
import Layout from "./Layouts/Layout";
import CreateType from "./Pages/CreateType/CreateType";
import CreateProduct from "./Pages/CreateProduct/CreateProduct";
import ShoppingCart from "./Pages/ShoppingCart/ShoppingCart";

const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/createType" element={<CreateType />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
      </Routes>
    </Layout>
  );
};

export default Router;
