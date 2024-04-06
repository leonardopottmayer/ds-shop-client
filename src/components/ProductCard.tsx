import { Col } from "antd";
import Product from "../models/Product";
import api from "../services/api";
import { useState } from "react";

type ProductCardProps = {
  product: Product;
  fetchAllProducts: () => void;
};

const ProductCard = (props: ProductCardProps) => {
  const [productQuantity, setProductQuantity] = useState<number>(0);

  const handleBuyProduct = async (product: Product) => {
    if (productQuantity <= 0) {
      alert("Please insert a valid quantity");
      return;
    }

    const userEmail = localStorage.getItem("userEmail");

    const response = await api
      .post("/products/buy", {
        id: product.id,
        quantity: productQuantity,
        userEmail,
      })
      .then((res) => {
        if (res.status == 200) {
          alert(res.data.message);
          props.fetchAllProducts();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        alert(err?.response?.data?.message ?? "Something went wrong");
      });
  };

  return (
    <Col xs={24} sm={12} md={6} lg={6} xl={4} className="product-card-col">
      <div className="product-card">
        <span>
          <b>Name:</b> {props.product.name}
        </span>
        <p>
          <b>Description:</b> {props.product.description}
        </p>
        <p>
          <b>Price:</b> {props.product.price}
        </p>
        <p>
          <b>In stock:</b> {props.product.inStock}
        </p>
        <img src={props.product.image} alt="Product image" />
        <div>
          <input
            type="number"
            min={0}
            onChange={(e) => setProductQuantity(e.target.valueAsNumber)}
          />
          <button onClick={() => handleBuyProduct(props.product)}>Buy</button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
