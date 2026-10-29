import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/cardcontext.jsx"
import "./Stridex.css";

export default function StrideX() {
    let [products, setProducts] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState("");
    let { addToCart } = useContext(CartContext)

    useEffect(() => {
        fetch("http://localhost:2025/product")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Products fetch aagala");
                }
                return response.json();
            })
            .then((data) => {
                let shoes = (data.products || []).filter(
                    (product) =>
                        product.brand?.trim().toLowerCase() === "stridex"
                );

                setProducts(shoes);
            })
            .catch(() => {
                setError("Products load aagala. Backend check pannu bro.");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading shoes...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="stridex-page">
            <h1>StrideX Shoes</h1>
            <p className="stridex-subtitle">
                Find your perfect pair
            </p>

            <div className="stridex-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="stridex-card" key={product._id}>
                            <img
                                src={product.image}
                                alt={product.name}
                            />

                            <div className="stridex-details">
                                <h3>{product.name}</h3>
                                {/* <p>{product.description}</p> */}

                                <p> ⭐⭐⭐⭐{product.rating}</p>

                                <div className="stridex-price">
                                    ₹{product.price}
                                    {product.discount > 0 && (
                                        <span>
                                            {" "}{product.discount}% OFF
                                        </span>
                                    )}
                                </div>

                                <button className="stridex-button" onClick={() => addToCart(product)}>
                                    See More
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No StrideX shoes found.</p>
                )}
            </div>
        </div>
    );
}