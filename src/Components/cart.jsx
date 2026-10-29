import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cardcontext.jsx";
import "./Cart.css";

export default function Cart() {
    let { cart, removeFromCart, changeCartQuantity, cartTotal } =
        useContext(CartContext);
    let navigate = useNavigate();

    return (
        <div className="cart-page">
            <h1>My Cart</h1>
            <button  className="back-shopping-btn"
            onClick={() => navigate(-1)}>
                ← Back to Shopping
            </button>

            {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty!</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div className="cart-item" key={item._id}>
                                <img src={item.image} alt={item.name} />

                                <div className="cart-details">
                                    <h3>{item.name}</h3>
                                    <p>₹{item.price}</p>

                                    <div className="quantity-controls">
                                        <button
                                            onClick={() =>
                                                changeCartQuantity(item._id, -1)
                                            }
                                        >
                                            -
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            onClick={() =>
                                                changeCartQuantity(item._id, 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2>Total: ₹{cartTotal}</h2>
                </>
            )}
        </div>
    );
}