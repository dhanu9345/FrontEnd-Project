import { useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cardcontext.jsx";
import "./Navbar.css";
import { Heart, User, ShoppingBag } from "lucide-react";

export default function Navbar({ onProfileClick }) {
    const [showMenu, setShowMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();
    const { cartCount } = useContext(CartContext);

    // Frontend cookie check
    useEffect(() => {
        const checkLogin = () => {
            setIsLoggedIn(Boolean(Cookies.get("userDetails")));
        };

        checkLogin();

        window.addEventListener("loginStatusChanged", checkLogin);

        return () => {
            window.removeEventListener("loginStatusChanged", checkLogin);
        };
    }, []);

    // Logout function
    const handleLogout = () => {
        Cookies.remove("userDetails");

        setIsLoggedIn(false);

        window.dispatchEvent(new Event("loginStatusChanged"));

        navigate("/login");
    };

    return (
        <>
            <nav>
                <img
                    src="https://wpthemes.themehunk.com/amaze-mania/wp-content/uploads/sites/249/2024/07/amaze1.png"
                    alt="Amaze logo"
                />

                <div className="search-box">
                    <select>
                        <option value="">All</option>
                        <option value="Brushes">Brushes</option>
                        <option value="Equipments">Equipments</option>
                        <option value="Make up">Make up</option>
                        <option value="Mirror">Mirror</option>
                        <option value="Shoes">Shoes</option>
                        <option value="T-shirt">T-shirt</option>
                        <option value="Tracker">Tracker</option>
                    </select>

                    <input type="text" placeholder="🔍 search..." />

                    <button type="button">🔍</button>
                </div>

                <div className="icons">
                    <Heart />

                    <User
                        onClick={() => {
                            if (isLoggedIn) {
                                // if (onProfileClick) {
                                //     onProfileClick();
                                // } 
                                 navigate("/profile");
                            } else {
                                navigate("/login");
                            }
                        }}
                        className={`profile-icon ${
                            isLoggedIn ? "logged-in" : ""
                        }`}
                        style={{ cursor: "pointer" }}
                    />

                    {isLoggedIn && (
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    )}

                    <div
                        className="cart-icon"
                        onClick={() => navigate("/cart")}
                        title="Open cart"
                        style={{ cursor: "pointer" }}
                    >
                        <ShoppingBag />
                        <span>{cartCount}</span>
                    </div>
                </div>
            </nav>

            <div className="homenav">
                {showMenu && (
                    <div className="category-menu">
                        <p>Brushes</p>
                        <p>Equipments</p>
                        <p>Make up</p>
                        <p>Mirror</p>
                        <p>Shoes</p>
                        <p>T-shirt</p>
                        <p>Tracker</p>
                    </div>
                )}

                <a
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                    }}
                >
                    Home
                </a>

                <a
                    href="/#shop"
                    onClick={(e) => {
                        e.preventDefault();

                        if (window.location.pathname !== "/") {
                            navigate("/#shop");
                        } else {
                            document.getElementById("shop")?.scrollIntoView({
                                behavior: "smooth"
                            });
                        }
                    }}
                >
                    Shop
                </a>

                <a href="/#brands">Brands</a>

                <a
                    href="#new-arrivals"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/#new-arrivals");
                    }}
                >
                    New Arrivals
                </a>

                <a href="/#footer">About</a>

                <a
                    href="/contact"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/contact");
                    }}
                >
                    Contact Us
                </a>

                <a href="tel:+180009007">
                    ☎ Call To +180 009 007
                </a>
            </div>
        </>
    );
}