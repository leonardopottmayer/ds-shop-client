import { ChangeEvent, useEffect, useState } from "react";
import api from "../../services/api";
import Product from "../../models/Product";
import ProductCard from "../../components/ProductCard";
import { Row } from "antd";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userEmail, setUserEmail] = useState<string>("");

  const fetchAllProducts = async () => {
    try {
      const response = await api.get("/products");

      if (response.status == 200) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    const lsUserEmail = localStorage.getItem("userEmail");
    if (lsUserEmail) {
      setUserEmail(lsUserEmail);
    }
  }, []);

  const handleUserEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
    localStorage.setItem("userEmail", e.target.value);
  };

  const handleResetButtonClick = async () => {
    const response = await api
      .post("/reset-stock")
      .then((res) => {
        if (res.status == 200) {
          alert(res.data.message);
          fetchAllProducts();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        alert(err?.response?.data?.message ?? "Something went wrong");
      });
  };

  return (
    <div className="App">
      <h1>E-commerce</h1>
      <input
        value={userEmail}
        type="text"
        placeholder="User e-mail"
        onChange={handleUserEmailChange}
      />
      <button onClick={handleResetButtonClick}>Reset</button>
      <div className="products-container">
        <Row gutter={16}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              fetchAllProducts={fetchAllProducts}
            />
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
