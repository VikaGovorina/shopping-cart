import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const fetchProducts = () => {
  const [productsData, setProductsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const productsJson = await response.json();
        setProductsData(productsJson);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { productsData, error, loading };
};

export default function Shop() {
  const { productsData, error, loading } = fetchProducts();
  
  if (loading) return (
    <div className="spinner-container">
      <div data-testid="spinner" className="spinner"></div>
    </div>
  );
  if (error) return <p>A network error was occured: {error}</p>;

  console.log(productsData);

  return (
    <>
      <h1>Our products</h1>

      <div className="products-grid">
        {productsData.map((productData) => {
          return <ProductCard key={productData.id} product={productData} />;
        })}
      </div>
    </>
  );
}