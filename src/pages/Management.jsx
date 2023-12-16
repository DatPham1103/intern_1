import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../styles/Management.css'
import {
    createProduct,
    deleteProduct,
    fetchData,
    updateProduct,
} from "../redux/Slice/ProductSlice";
import { Button, Table, Modal, Form, Input, InputNumber, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Item } = Form;

function Management() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product.productList);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [formMode, setFormMode] = useState("add");
    const [selectedProductId, setSelectedProductId] = useState(null);

    useEffect(() => {
        dispatch(fetchData())
            .unwrap()
            .then(() => {})
            .catch((error) => {
                console.error("Error: ", error);
            });
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    };

    const handleAdd = (values) => {
        dispatch(createProduct(values))
            .then(() => {
                window.location.reload();
                form.resetFields();
                setModalVisible(false);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    };

    const handleUpdate = (values) => {
        dispatch(updateProduct(values))
            .then(() => {
                window.location.reload();
                form.resetFields();
                setModalVisible(false);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    };

    const handleFormSubmit = (values) => {
        if (formMode === "add") {
            handleAdd(values);
        } else if (formMode === "update" && selectedProductId) {
            const updatedValues = { ...values, id: selectedProductId };
            handleUpdate(updatedValues);
        }
    };

    const showModal = (mode, record) => {
        setFormMode(mode);
        if (mode === "update" && record) {
            setSelectedProductId(record.id);
            form.setFieldsValue({
                name: record.name,
                price: record.price,
                status: record.status,
            });
        } else {
            form.resetFields();
        }
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (_, record) => (
                <div>
                    <img src={record.image}
                    style={{width:'200px'}}/>
                </div>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                return status ? "Available" : "Unavailable";
            },
        },
        {
            title: "Action",
            dataIndex: "",
            key: "action",
            render: (_, record) => (
                <div>
                    <Button danger onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                    <Button
                        style={{ marginLeft: "5px" }}
                        onClick={() => showModal("update", record)}
                    >
                        Update
                    </Button>
                </div>
            ),
        },
    ];
// search function
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProductList = productList.filter((product) => {
        const productName = product.name ? product.name.toLowerCase() : '';
        const productPrice = product.price ? String(product.price).toLowerCase() : '';
        return productName.includes(searchQuery) || productPrice.includes(searchQuery);
    });
    
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <Button onClick={() => showModal("add")}>Add a product</Button>
            <Input
                placeholder="Search product"
                prefix={<SearchOutlined />}
                onChange={handleSearch}
                style={{ marginBottom: "10px", width: "300px" }}
            />
            </div>
            <Table columns={columns} dataSource={filteredProductList} />

            <Modal
                title={formMode === "add" ? "Add Product" : "Update Product"}
                visible={modalVisible}
                onCancel={hideModal}
                footer={null}
            >
                <Form form={form} onFinish={handleFormSubmit}>
                    <Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name!",
                            },
                        ]}
                    >
                        <Input />
                    </Item>

                    <Item
                        name="image"
                        label="Image"
                        rules={[
                            {
                                required: true,
                                message: "Please input the link!",
                            },
                            {
                                pattern: '^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$',
                                message: 'Please enter a valid URL!',
                            },
                        ]}
                    >
                        <Input />
                    </Item>

                    <Item
                        name="price"
                        label="Price"
                        rules={[
                            {
                                required: true,
                                message: "Please input the price!",
                            },
                        ]}
                    >
                        <InputNumber min={0} />
                    </Item>
                    <Item name="status" label="Status" valuePropName="checked">
                        <Switch
                            checkedChildren="Available"
                            unCheckedChildren="Unavailable"
                        />
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit">
                            {formMode === "add" ? "Add" : "Update"}
                        </Button>
                    </Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Management;