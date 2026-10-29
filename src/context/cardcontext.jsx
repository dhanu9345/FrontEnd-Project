import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    function addToCart(product) {
        console.log("cart funtion called:",product.name)
        setCart((previousCart) => {
            const existingProduct = previousCart.find(
                (item) => item._id === product._id
            );

            if (existingProduct) {
                return previousCart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...previousCart, { ...product, quantity: 1 }];
        });
    }

    function removeFromCart(id) {
        setCart((previousCart) =>
            previousCart.filter((item) => item._id !== id)
        );
    }

    function changeCartQuantity(id, amount) {
        setCart((previousCart) =>
            previousCart
                .map((item) =>
                    item._id === id
                        ? { ...item, quantity: item.quantity + amount }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartTotal = cart.reduce(
        (total, item) => total + Number(item.price || 0) * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                changeCartQuantity,
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}