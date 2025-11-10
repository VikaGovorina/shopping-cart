import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    function addToCart(product, quantity = 1) {
        setCart(prev => {
            if (prev.find(pr => pr.id === product.id)) {
                return prev.map(pr => pr.id === product.id ? { ...pr, quantity: pr.quantity + Number(quantity)} : pr);
            }
            return [...prev, { ...product, quantity: Number(quantity) }];
        });
    }

    function updateQuantity(product, delta, isNewQty = false) {
        setCart(prev => 
            prev
              .map(pr => pr.id === product.id 
                ? { ...pr, quantity: isNewQty 
                    ? delta 
                    : Math.max(0, pr.quantity + delta)} 
                : pr)
              .filter(pr => pr.quantity > 0)
        );
    }

    function removeFromCart(product) {
        updateQuantity(product, 0, true);
    }

    return (
        <CartContext value={ {cart, addToCart, updateQuantity, removeFromCart} }>
            {children}
        </CartContext>
    );
}

export const useCart = () => useContext(CartContext);
