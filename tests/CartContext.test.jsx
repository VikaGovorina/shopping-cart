import { beforeEach, it, expect } from "vitest";
import { CartProvider, useCart } from "../src/context/CartContext";
import { fireEvent, render, screen } from "@testing-library/react";


function TestConsumer() {
    const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

    return (
        <div>
            <button onClick={() => addToCart({ id: 1, title: "P", price: 2.5 }, 2)}>add</button>
            <button onClick={() => updateQuantity({ id: 1 }, 1)}>inc</button>
            <button onClick={() => updateQuantity({ id: 1 }, -1)}>dec</button>
            <button onClick={() => removeFromCart({ id: 1 })}>remove</button>
            <div data-testid="cart">{JSON.stringify(cart)}</div>
        </div>
    );
}

describe("CartContext", () => {
    beforeEach(() => {});

    it("adds items, updates qty and removes", () => {
        render(
            <CartProvider>
                <TestConsumer />
            </CartProvider>
        );

        const addBtn = screen.getByText("add");
        const incBtn = screen.getByText("inc");
        const decBtn = screen.getByText("dec");
        const removeBtn = screen.getByText("remove");
        const cartDiv = screen.getByTestId("cart");

        fireEvent.click(addBtn);
        expect(cartDiv.textContent).toContain('"id":1');
        expect(cartDiv.textContent).toContain('"quantity":2');

        fireEvent.click(incBtn);
        expect(cartDiv.textContent).toContain('"quantity":3');

        fireEvent.click(decBtn);
        expect(cartDiv.textContent).toContain('"quantity":2');

        fireEvent.click(removeBtn);
        expect(cartDiv.textContent).toBe("[]");
    });
});