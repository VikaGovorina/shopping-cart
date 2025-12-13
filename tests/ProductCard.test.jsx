import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CartProvider } from "../src/context/CartContext";
import ProductCard from "../src/components/ProductCard";


const product = {
    id: 10,
    title: "Test Product",
    price: 5,
    image: "img.jpg",
};

describe("ProductCard", () => {
    it("renderd product info and adds to cart", () => {
        render(
            <CartProvider>
                <ProductCard product={product} />
            </CartProvider>  
        );

        expect(screen.getByText("Test Product")).toBeInTheDocument();
        expect(screen.getByText("$5")).toBeInTheDocument();

        const addBtn = screen.getByRole("button", {name: /add to cart|add more/i});
        fireEvent.click(addBtn);

        expect(screen.getByRole("button", {name: /add more/i})).toBeInTheDocument();
    });

    it("qty controls", () => {
        render(
            <CartProvider>
                <ProductCard product={product} />
            </CartProvider>  
        );

        const minus = screen.getByRole("button", {name: "-"});
        const plus = screen.getByRole("button", {name: "+"});
        const input = screen.getByRole("spinbutton");

        expect(input.value).toBe("1");

        fireEvent.click(plus);
        expect(input.value).toBe("2");

        fireEvent.click(minus);
        expect(input.value).toBe("1");
    });
});