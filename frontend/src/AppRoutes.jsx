
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Product from "./pages/Product";
import AboutMe from "./components/AboutMe";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import CheckoutPage from './pages/CheckoutPage';



export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

        </Routes>
    );
}
