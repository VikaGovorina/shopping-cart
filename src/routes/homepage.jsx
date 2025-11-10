import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    return (
      <>
        <h1>Shop now!</h1>
        <p>Discover our handpicked selection of premium goods. All your essentials, conveniently gathered for you.</p>
        <button onClick={() => navigate("/shop")}>Start Shopping</button>
      </>
    );
}