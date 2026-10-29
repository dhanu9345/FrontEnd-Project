import { useState } from "react";
import { BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Signup from "./Components/sign";
import Login from "./Components/login";
import Home from "./Components/home";
import Styleaura from "./Components/Styleaura.jsx";
import Cookora from "./Components/Cookora";
import StrideX from "./Components/Stridex";
import TechNova from "./Components/TechNova";
import { CartProvider } from "./context/cardcontext.jsx";
import Cart from "./Components/cart.jsx";
import Contact from "./Components/contact.jsx";
import Profile from "./Components/Profile.jsx";

export default function App() {
    // let [showSignup, setShowSignup] = useState(false);
    // let [showLogin, setShowLogin] = useState(false);

    // function handleSignupSuccess() {
    //     setShowLogin(true);
    //     setShowSignup(false);
    // }

    return (
        <CartProvider>
            <BrowserRouter>
                <Navbar
                    onProfileClick={() =>navigate("/login")
                 }
                />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/styleaura" element={<Styleaura />} />
                    <Route path="/cookora" element={<Cookora />} />
                    <Route path="/stridex" element={<StrideX />} />
                    <Route path="/technova" element={<TechNova />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}