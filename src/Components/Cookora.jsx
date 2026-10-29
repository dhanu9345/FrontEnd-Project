import { useState, useEffect,useContext } from "react";
import { CartContext } from "../context/cardcontext.jsx";
import "./Cookora.css";

export default function Cookora() {
    let [products, setProducts] = useState([]);
    let [loading, setLoading] = useState(true);
    let {addToCart} = useContext(CartContext)

    let url = import.meta.env.VITE_URL

    useEffect(() => {
        fetch(`${url}/product`)
            .then((res) => res.json())
            .then((data) => {
                let kitchenProducts = (data.products || []).filter(
                    (product) =>
                        product.brand?.toLowerCase().trim() === "cookora"
                );

                console.log("Cookora products:", kitchenProducts.length);
                setProducts(kitchenProducts);
            })
            .catch((error) => console.log("Fetch error:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <h2 className="cookora-message">Loading products...</h2>;
    }

    return (
        <div className="cookora-page">
            <h1>Cookora</h1>
            <p className="cookora-subtitle">
                Discover Your Kitchen Essentials
            </p>

            <div className="cookora-container">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="cookora-card" key={product._id}>
                            <div className="cookora-image">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                />
                            </div>

                            <div className="cookora-details">
                                <h3>{product.name}</h3>
                                <p>{product.category}</p>
                                <p className="cookora-price">
                                    ₹{product.price}
                                </p>
                                <p className="cookora-discount">
                                    {product.discount}% OFF
                                </p>
                                <p>⭐ {product.rating}</p>

                                <button
                                    className="cookora-button"
                                    onClick={() => addToCart(product)}
                                >
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="cookora-message">
                        Cookora products found aagala!
                    </p>
                )}
            </div>
        </div>
    );
}

