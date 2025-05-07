import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";  // Ensure you are importing Home correctly
import CheckoutPage from './pages/CheckoutPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
    );
}
