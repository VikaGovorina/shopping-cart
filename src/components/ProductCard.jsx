import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
    const [qty, setQty] = useState(1);
    const { cart, addToCart } = useCart();

    const getBtnText = () => {
        return cart.filter(item => item.id === product.id).length > 0 ? "Add more" : "Add to Cart";
    };

    return (
        <div className="product-card">
            <div className="product-img">
                <img src={product.image} alt="product image"></img>
            </div>
            <div className="product-info"> 
                <span className="product-price">{"$" + product.price}</span>
                <span className="product-name">{product.title}</span>
                <div className="product-quantity">
                    <button type="button" onClick={() => setQty(qty - 1 > 0 ? qty - 1 : 1)}>-</button>
                    <input type="number" min={1} value={qty} onChange={(e) => setQty(e.target.value)}></input>
                    <button type="button" onClick={() => setQty(qty + 1)}>+</button>
                </div>
                <button 
                    type="button" onClick={() => addToCart(product, qty)}>{getBtnText()}</button>
            </div>
        </div>
    );
}