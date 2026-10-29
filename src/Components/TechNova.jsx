import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/cardcontext.jsx";
import "./TechNova.css";

export default function TechNova() {
    let [products, setProducts] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState("");
    let { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetch("http://localhost:2025/product")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Products fetch failed");
                }
                return response.json();
            })
            .then((data) => {
                let laptops = (data.products || []).filter(
                    (product) =>
                        product.brand?.trim().toLowerCase() === "technova"
                );

                setProducts(laptops);
            })
            .catch(() => {
                setError("Products load aagala. Backend check pannu bro.");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading laptops...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="technova-page">
            <h1>TechNova Laptops</h1>
            <p className="technova-subtitle">
                Discover your next laptop
            </p>

            <div className="technova-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="technova-card" key={product._id}>
                            <img
                                src={product.image}
                                alt={product.name}
                            />

                            <div className="technova-details">
                                <h3>{product.name}</h3>
                                {/* <p>{product.description}</p> */}
                                <p>⭐⭐⭐⭐ {product.rating}</p>

                                <div className="technova-price">
                                    ₹{product.price}
                                    {product.discount > 0 && (
                                        <span>
                                            {product.discount}% OFF
                                        </span>
                                    )}
                                </div>

                                <button className="technova-button" onClick={() => addToCart(product)}>
                                    Add to card
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No TechNova laptops found.</p>
                )}
            </div>
        </div>
    );
}