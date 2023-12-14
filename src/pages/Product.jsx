import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/Slice/ProductSlice";
import { Card, Col, Row } from "antd";

const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.productList);

  useEffect(() => {
    dispatch(fetchData())
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching product data: ", error);
      });
  },[]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        {product &&
          Array.isArray(product) &&
          product.map((item, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card
                style={{ margin: "12px" }}
                cover={<img
                  src={item.image}
                  alt={item.name}
                  style={{ maxWidth: "100%", height: "auto" }}
                />}
              >
                <p>
                  <strong>Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Price:</strong> {item.price}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {item.status ? "Available" : "Unavailable"}
                </p>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Product;
