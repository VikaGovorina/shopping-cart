import { Link } from "react-router";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const { cart } = useCart();
    const itemsInCartNumber = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/shop"}>Shop</Link>
                </li>
                <li>
                    <Link to={"/cart"}>Cart {itemsInCartNumber > 0 ? <span className="items-in-cart">{itemsInCartNumber}</span> : ""}</Link>
                </li>
            </ul>
        </nav>
    );
} 