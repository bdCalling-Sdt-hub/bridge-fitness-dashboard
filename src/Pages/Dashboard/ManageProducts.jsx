import React, { useEffect, useRef, useState } from 'react';
import { FiEye, FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { Calendar, Dropdown, Input, Slider, Table } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { FaRegTrashCan } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CiMenuKebab } from 'react-icons/ci';
import { LuRefreshCw } from "react-icons/lu";
import product from '../../assets/icon/product.png';
import user from '../../assets/icon/user.png';
import { RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';
import { Form, Modal, Button } from 'antd';
import { MdOutlineDelete } from 'react-icons/md';
import BackButton from './BackButton';
import { FaPlus } from 'react-icons/fa6';

const data = [
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
    {
        key: "1",
        name: "The Dumbbell",
        gender: "Men",
        price: "150 CND",
        photo: product,
        date: "05/12/2024",
        store: "500",
    },
];
const ManageProducts = () => {
    const [value, setValue] = useState(new URLSearchParams(window.location.search).get('date') || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(new URLSearchParams(window.location.search).get('category') || "All")
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [open, setOpen] = useState();
    const [filter, setFilter] = useState(false);
    const [date, setDate] = useState(false);
    const dropdownRef = useRef();
    const [openAddModel, setOpenAddModel] = useState(false);
    const [reFresh, setReFresh] = useState("");

    if (reFresh) {
        setTimeout(() => {
            setReFresh("")
        }, 1500)
    }
    const items = [
        {
            label: "Package name",
            key: "All",
        },
        {
            label: "Car",
            key: "Car",
        },
        {
            label: "Bike",
            key: "Bike",
        },
        {
            label: "Cycle",
            key: "Cycle",
        },
    ];

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDate(false)
                setOpen("");
                setFilter(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const columns = [
        {
            title: "S.No",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Products Name",
            dataIndex: "name",
            render: (text, record) => (
                <span style={{
                    display: 'flex',
                    justifyContent: "start",
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <img src={record.photo} alt="" />
                    <span>
                        {record.name}
                    </span>
                </span>
            ),
            key: "product name",
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Store",
            dataIndex: "store",
            key: "store",
        },
        {
            title: "ACTION",
            dataIndex: "printView",
            key: "printView",
            render: (_, record) => (
                <div style={{ position: "relative", display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '10px' }}>
                    <RiEditLine size={20} color='#5B52A3' style={{ cursor: "pointer" }} />
                    <RiDeleteBin6Line size={20} color='#C11415' style={{ cursor: "pointer" }} />
                </div>
            ),
        },
    ];

    const handlePageChange = (page) => {
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.pushState(null, "", `?${params.toString()}`);
    }

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px 0" }}>
                <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>All Products</h1>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>

                    <div
                        style={{
                            width: "304px",
                            height: "40px",
                            borderRadius: "8px",
                            background: '#fefefe'
                        }}
                    >
                        <Input
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            prefix={<FiSearch size={14} color="#868FA0" />}
                            style={{
                                width: "100%",
                                height: "100%",
                                fontSize: "14px",
                                border: 'none',
                                outline: 'none',
                            }}
                            size="middle"
                            value={search}
                        />
                    </div>
                    <button
                        onClick={() => setOpenAddModel(true)}
                        style={{
                            borderRadius: "4px",
                            color: "#F2F2F2",
                            backgroundColor: "#B47000",
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '10px 20px',
                            fontWeight: '500'
                        }}
                    >
                        <FaPlus style={{
                            marginTop: '-2px'
                        }} />
                        Add Product
                    </button>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        gap: '4px',
                        height: '40px',
                        background: '#fefefe',
                        padding: '0 10px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>
                        <button style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer'
                        }}>Data Refresh </button><LuRefreshCw />
                    </div>
                </div>

            </div>
            <div
                style={{
                    background: "white",
                    padding: "20px",
                }}
            >
                <div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            pageSize: 10,
                            defaultCurrent: parseInt(page),
                            onChange: handlePageChange
                        }}
                    />
                </div>
            </div>
            <Modal
                centered
                open={openAddModel}
                onCancel={() => setOpenAddModel(false)}
                width={500}
                footer={false}
            >
                <div>
                    <h1 style={{ marginBottom: "12px" }}>Add Product</h1>
                    <Form
                        name="normal_login"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", marginBottom: "5px" }}>Full Name</label>
                            <Form.Item
                                style={{ marginBottom: 0 }}
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input User Full Name",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Enter Full Name"
                                    type="text"
                                    style={{
                                        border: "1px solid #E0E4EC",
                                        height: "52px",
                                        background: "white",
                                        borderRadius: "8px",
                                        outline: "none",
                                    }}
                                />
                            </Form.Item>
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", marginBottom: "5px" }} htmlFor="">Email </label>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input User Email",
                                    },
                                ]}
                                style={{ marginBottom: 0 }}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter User Email"
                                    style={{
                                        border: "1px solid #E0E4EC",
                                        height: "52px",
                                        background: "white",
                                        borderRadius: "8px",
                                        outline: "none",
                                    }}
                                />
                            </Form.Item>
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", marginBottom: "5px" }} htmlFor="password">Password</label>
                            <Form.Item
                                style={{ marginBottom: 0 }}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input User Password!",
                                    },
                                ]}
                            >
                                <Input.Password
                                    type="password"
                                    placeholder="Enter User password"
                                    style={{
                                        border: "1px solid #E0E4EC",
                                        height: "52px",
                                        background: "white",
                                        borderRadius: "8px",
                                        outline: "none",
                                    }}
                                />
                            </Form.Item>
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", marginBottom: "5px" }} htmlFor="password">User Type</label>
                            <Form.Item
                                style={{ marginBottom: 0 }}
                                name="userType"
                            >
                                <Input
                                    type="Text"
                                    placeholder="Enter User password"
                                    style={{
                                        border: "1px solid #E0E4EC",
                                        height: "52px",
                                        background: "white",
                                        borderRadius: "8px",
                                        outline: "none",
                                    }}
                                    defaultValue="ADMIN"
                                    readOnly
                                />
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{
                                    border: "none",
                                    height: "52px",
                                    background: "#B47000",
                                    color: "white",
                                    borderRadius: "8px",
                                    outline: "none",
                                }}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}
export default ManageProducts
