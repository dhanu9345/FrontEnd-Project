
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/cardcontext.jsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./Styleaura.css";

 export default function Styleaura() {
    let [products, setProducts] = useState([]);
    let { addToCart } = useContext(CartContext);
    let navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:2025/product")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Backend data:", data);

                let allProducts = data.products || [];

                let dresses = allProducts.filter(
                    (product) =>
                        product.category
                            ?.toLowerCase()
                            .trim()
                            .startsWith("dress") &&
                        product.image?.startsWith(
                            "https://res.cloudinary.com/"
                        )
                );

                console.log("Dress products:", dresses.length);
                setProducts(dresses);
            })
            .catch((error) => {
                console.log("Fetch error:", error);
            });
    }, []);

    return (
        <div className="styleaura-page">
            <h1>StyleAura</h1>

            <div className="dress-container">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="dress-card" key={product._id}>
                            <img
                                src={product.image}
                                alt={product.name}
                            />

                            <div className="dress-details">
                                <h3>{product.name}</h3>
                                <p>₹{product.price}</p>
                                <p>{product.discount}% OFF</p>

                                <button
                                    onClick={() =>
                                    {const user=Cookies.get("userDetails")
                                        if(!user){
                                            navigate("/login")
                                            return;
                                        }
                                        console.log("Adding product:",product)
                                        addToCart(product)
                                    }
                                    }>
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No dress products found.</p>
                )}
            </div>
        </div>
    );
}
