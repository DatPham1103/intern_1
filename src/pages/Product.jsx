import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/Slice/ProductSlice";
import { Card, Col, Pagination, Row } from "antd";

const Product = () => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.productList);

    useEffect(() => {
        dispatch(fetchData())
            .unwrap()
            .then(() => {})
            .catch((error) => {
                console.error("Error fetching product data: ", error);
            });
    }, [dispatch]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = product?.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Row gutter={[16, 16]}>
                {currentItems &&
                    Array.isArray(currentItems) &&
                    currentItems.map((item, index) => (
                        <Col key={index} xs={24} sm={12} md={8}>
                            <Card
                                style={{ margin: "12px" }}
                                cover={
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            maxWidth: "100%",
                                            height: "auto",
                                        }}
                                    />
                                }
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
            <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={product?.length || 0}
                onChange={paginate}
                style={{ marginTop: "20px",marginBottom:"20px", textAlign: "center" }}
            />
        </div>
    );
};

export default Product;
