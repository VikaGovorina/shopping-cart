// import { render, screen, waitFor } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import { afterEach, beforeEach, describe, expect, vi } from "vitest";
// import Shop from "../src/routes/shop";
// import { CartProvider } from "../src/context/CartContext";

// const mockProducts = [
//   {
//     id: 1,
//     title: "Test Product 1",
//     price: 12.5,
//     image: "https://test.com/1.jpg",
//   },
//   {
//     id: 2,
//     title: "Test Product 2",
//     price: 7.0,
//     image: "https://test.com/2.jpg",
//   },
// ];

// describe("data fetching and error handling",  () => {
//     beforeEach(() => {
//         global.fetch = vi.fn();
//     });
//     afterEach(() => {
//         vi.resetAllMocks();
//     });

//     it("shows spinner while loading then renders products on success", async () => {
//         global.fetch.mockResolvedValueOnce({
//             ok: true,
//             json: async () => mockProducts,
//         });
//         global.fetch = vi.fn(() =>
//             Promise.resolve({
//                 ok: true,
//                 json: () => Promise.resolve(mockProducts),
//             })
//         );

//         const { container } = render(
//         <CartProvider>
//             <Shop />
//         </CartProvider>
//         );

//         const spinner = container.querySelector('.spinner');
//         expect(spinner).toBeInTheDocument();

//         for (const p of mockProducts) {
//             expect(await screen.findByText(p.title)).toBeInTheDocument();
//         }
//     })
// });