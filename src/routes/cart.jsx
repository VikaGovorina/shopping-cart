import { useCart } from "../context/CartContext";

export default function Cart() {
    const { cart, updateQuantity, removeFromCart } = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

    if (cart.length === 0) {
        return (
            <>
                <h1>Shopping Cart</h1>
                <p>Your cart is epmty!</p>
            </>
        );
    }

    return (
      <>
        <h1>Shopping Cart</h1>
        <div className="cart-products">
            {cart.map(product => (
                <div className="cart-item">
                    <div className="product-cart-img">
                        <img src={product.image} alt="product image"></img>
                    </div>
                    <div className="cart-item-info">
                        <span className="product-name">{product.title}</span>
                        <div>
                            <div className="product-quantity-cart">
                                <button type="button" onClick={() => updateQuantity(product, -1)}>-</button>
                                <input type="number" min={1} value={product.quantity} onChange={(e) => updateQuantity(product, Number(e.target.value), true)}></input>
                                <button type="button" onClick={() => updateQuantity(product, 1)}>+</button>
                            </div>
                            <span className="item-price">{"$" + (product.price * product.quantity)}</span>
                            <span onClick={() => removeFromCart(product)} className="delete-item">Remove</span>
                        </div>
                    </div>
                </div>
            ))}
            <div className="total">
                <div className="total-price">
                    <h2>Total:</h2>
                    <h2>{"$" + totalAmount}</h2>
                </div>
                <button>Checkout</button>
            </div>
        </div>

      </>
    );
}