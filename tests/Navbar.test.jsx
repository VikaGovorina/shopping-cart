import { beforeEach, it, expect, describe } from "vitest";
import { CartProvider, useCart } from "../src/context/CartContext";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navbar from "../src/components/Navbar";
import { useEffect } from "react";

describe("Navbar", () => {
    it("shows zero when cart is empty", () => {
        render(
            <MemoryRouter>
                <CartProvider>
                    <Navbar />
                </CartProvider>
            </MemoryRouter>
        );

        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/Cart/i)).toBeInTheDocument();
        expect(screen.queryByText(/\d+/)).not.toBeInTheDocument();
    });
    
    it("shows number of products in cart", () => {
        function NavbarAdded() {
            const { addToCart } = useCart();
            useEffect(() => {
                addToCart({ id: 1, title: "A", price: 1}, 3);
            }, []);
            return <Navbar />;
        }

        render(
            <MemoryRouter>
                <CartProvider>
                    <NavbarAdded />
                </CartProvider>
            </MemoryRouter>
        );

        expect(screen.getByText("Cart")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    });
});