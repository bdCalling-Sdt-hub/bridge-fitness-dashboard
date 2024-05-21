import { Input, Table } from 'antd'
import React, { useState } from 'react'
import { FiEye, FiSearch } from 'react-icons/fi'
import { LuRefreshCw } from 'react-icons/lu';
import avater from '../../assets/avater.png';
const data = [
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        deliveryTime: "05/12/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "Pending",
        totalItems: "500",
        Price: "600"
    },
    {
        key: "2",
        name: "John",
        email: "john@example.com",
        deliveryTime: "05/13/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "Confirm",
        totalItems: "300",
        Price: "450"
    },
    {
        key: "3",
        name: "Emma",
        email: "emma@example.com",
        deliveryTime: "05/14/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "Delivery",
        totalItems: "700",
        Price: "800"
    },
    {
        key: "4",
        name: "Michael",
        email: "michael@example.com",
        deliveryTime: "05/15/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "Delivery",
        totalItems: "400",
        Price: "700"
    },
    {
        key: "5",
        name: "Sophia",
        email: "sophia@example.com",
        deliveryTime: "05/16/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "Completed",
        totalItems: "600",
        Price: "900"
    },
    {
        key: "6",
        name: "Ethan",
        email: "ethan@example.com",
        deliveryTime: "05/17/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "pending",
        totalItems: "200",
        Price: "300"
    },
    {
        key: "7",
        name: "Ava",
        email: "ava@example.com",
        deliveryTime: "05/18/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "Completed",
        totalItems: "800",
        Price: "1000"
    },
    {
        key: "8",
        name: "William",
        email: "william@example.com",
        deliveryTime: "05/19/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "pending",
        totalItems: "350",
        Price: "500"
    },
    {
        key: "9",
        name: "Olivia",
        email: "olivia@example.com",
        deliveryTime: "05/20/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "Delivery",
        totalItems: "450",
        Price: "650"
    },
    {
        key: "10",
        name: "James",
        email: "james@example.com",
        deliveryTime: "05/21/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "pending",
        totalItems: "250",
        Price: "400"
    },
    {
        key: "11",
        name: "Charlotte",
        email: "charlotte@example.com",
        deliveryTime: "05/22/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "pending",
        totalItems: "550",
        Price: "750"
    },
    {
        key: "12",
        name: "Noah",
        email: "noah@example.com",
        deliveryTime: "05/23/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "Completed",
        totalItems: "700",
        Price: "900"
    },
    {
        key: "13",
        name: "Amelia",
        email: "amelia@example.com",
        deliveryTime: "05/24/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "pending",
        totalItems: "400",
        Price: "600"
    },
    {
        key: "14",
        name: "Liam",
        email: "liam@example.com",
        deliveryTime: "05/25/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "Delivery",
        totalItems: "600",
        Price: "850"
    },
    {
        key: "15",
        name: "Isabella",
        email: "isabella@example.com",
        deliveryTime: "05/26/2024",
        photo: avater,
        product: "The Dumbbell",
        totalItems: "350",
        Price: "500"
    },
    {
        key: "16",
        name: "Mason",
        email: "mason@example.com",
        deliveryTime: "05/27/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "pending",
        totalItems: "450",
        Price: "700"
    },
    {
        key: "17",
        name: "Evelyn",
        email: "evelyn@example.com",
        deliveryTime: "05/28/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "Completed",
        totalItems: "550",
        Price: "800"
    },
    {
        key: "18",
        name: "Logan",
        email: "logan@example.com",
        deliveryTime: "05/29/2024",
        photo: avater,
        product: "The Dumbbell",
        status: "pending",
        totalItems: "250",
        Price: "400"
    },
]

const ManageOrder = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const handlePageChange = (page) => {
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.pushState(null, "", `?${params.toString()}`);
    }
    const columns = [
        {
            title: "S.No",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Name",
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
            key: "username",
        },
        {
            title: "User Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Delivery Time",
            dataIndex: "deliveryTime",
            key: "deliveryTime",
        },
        {
            title: "Product name",
            dataIndex: "product",
            key: "product",
        },
        {
            title: "Total Items",
            dataIndex: "totalItems",
            key: "totalItems",
        },
        {
            title: "Price",
            dataIndex: "Price",
            key: "Price",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, record) => (
                <p
                    style={{
                        color: record?.status === "Completed" ? 'white' : 'black',
                        width: '100%',
                        textAlign: 'center',
                        borderRadius: '4px',
                        background: record?.status === "Pending" ? "#f2f2f2" : record?.status === "Confirm" ? "#f8f1e6" : record?.status === "Delivery" ? '#e8d3b0' : '#b47000',
                        padding: '5px 0',
                        cursor:'pointer'
                    }}
                >
                    {record?.status}
                </p>
            )
        },
    ];
    return (
        <div id='manageOrder'>
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
    )
}

export default ManageOrder
