import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, vi } from "vitest";
import { CartProvider } from "../src/context/CartContext";
import Shop from "../src/routes/shop";


const testProducts = [
    { id: 1, title: "A", price: 1, image: "a.jpg"},
    { id: 2, title: "B", price: 2, image: "b.jpg"},  
];

describe("Shop", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("fetches and shows products", async () => {
        vi.stubGlobal("fetch", vi.fn(() => 
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(testProducts)
            })
        ));

        render(
            <CartProvider>
                <Shop />
            </CartProvider>
        );

        expect(screen.getByTestId("spinner")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText("Our products")).toBeInTheDocument();
        });

        expect(screen.getByText("A")).toBeInTheDocument();
        expect(screen.getByText("B")).toBeInTheDocument();
    });

    it("shows error message on fetch failure", async () => {
        vi.stubGlobal("fetch", vi.fn(() => 
            Promise.resolve({
                ok: false,
                status: 500,
            })
        ));

        render(
            <CartProvider>
                <Shop />
            </CartProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/A network error was occured:/i)).toBeTruthy();
        });
    });
});