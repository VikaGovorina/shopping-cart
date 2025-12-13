import { beforeEach, it, expect, describe } from "vitest";
import { CartProvider, useCart } from "../src/context/CartContext";
import Cart from "../src/routes/cart";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { useEffect } from "react";

function CartFilled() {
    const { addToCart } = useCart();
    useEffect(() => {
        addToCart({ id: 1, title: "A", price: 4, image: "img.jpg"}, 2);
    }, []);
    return <Cart />;
}

describe("CartPage", () => {
    it("shows products and allows to update and remove", async () => {
        render(
            <MemoryRouter>
                <CartProvider>
                    <CartFilled />
                </CartProvider>
            </MemoryRouter>
        );

        expect(await screen.findByText("Shopping Cart")).toBeInTheDocument();
        expect(screen.getByText("A")).toBeInTheDocument();
        expect(screen.getByText(/\$8.00/)).toBeInTheDocument();

        const plusBtn = screen.getAllByText("+")[0];
        fireEvent.click(plusBtn);
        expect(screen.getByText(/\$12.00/)).toBeInTheDocument();

        const removeBtn = screen.getByText(/remove/i);
        fireEvent.click(removeBtn);
        expect(screen.getByText(/Your cart is epmty!/i)).toBeInTheDocument();
        
    });
});