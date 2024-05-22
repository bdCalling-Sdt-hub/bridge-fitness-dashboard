
import React, { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Dropdown, Input,Table } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LuRefreshCw } from "react-icons/lu";
import avater from '../../assets/avater.png';
const data = [
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        photo: avater,
        package: "Premium Membership",
        status: "General",
        price: "40 CAD",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        photo: avater,
        package: "Premium Membership",
        status: "General",
        price: "40 CAD",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        photo: avater,
        package: "Premium Membership",
        status: "General",
        price: "40 CAD",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        photo: avater,
        package: "Premium Membership",
        status: "General",
        price: "40 CAD",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        photo: avater,
        package: "Premium Membership",
        status: "General",
        price: "40 CAD",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        photo: avater,
        package: "Premium Membership",
        status: "General",
        price: "40 CAD",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        photo: avater,
        package: "Premium Membership",
        status: "General",
        price: "40 CAD",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        photo: avater,
        package: "Premium Membership",
        status: "General",
        price: "40 CAD",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        photo: avater,
        package: "Premium Membership",
        status: "General",
        price: "40 CAD",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        photo: avater,
        package: "Premium Membership",
        status: "General",
        price: "40 CAD",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        photo: avater,
        package: "Premium Membership",
        status: "General",
        price: "40 CAD",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        photo: avater,
        package: "Premium Membership",
        status: "General",
        price: "40 CAD",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        photo: avater,
        package: "Premium Membership",
        status: "General",
        price: "40 CAD",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        photo: avater,
        package: "Premium Membership",
        status: "General",
        price: "40 CAD",
        balance: "600",
    },
    {
        key: "1",
        name: "Tushar",
        email: "tushar@gmail.com",
        date: "18 Jul, 2023  4:30pm",
        photo: avater,
        package: "Premium Membership",
        status: "General",
        price: "40 CAD",
        balance: "600",
    },

];

const SubscriptionIncome = () => {
    const [value, setValue] = useState(new URLSearchParams(window.location.search).get('date') || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(new URLSearchParams(window.location.search).get('category') || "All")
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
    const [open, setOpen] = useState();
    const [filter, setFilter] = useState(false);
    const [date, setDate] = useState(false);
    const dropdownRef = useRef();
    const navigate = useNavigate()
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
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Package name",
            dataIndex: "package",
            key: "package",
        },
        {
            title: "Package Price",
            dataIndex: "price",
            key: "price",
          
        },
    ];

    const handlePageChange = (page) => {
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.pushState(null, "", `?${params.toString()}`);
    }

    const onClick = ({ key }) => {
        setCategory(key)
        const params = new URLSearchParams(window.location.search);
        params.set('category', key);
        window.history.pushState(null, "", `?${params.toString()}`);
    };



    const onSelect = (newValue) => {
        const date = newValue.format('MMM-DD-YYYY')
        setValue(date);
        const params = new URLSearchParams(window.location.search);
        params.set('date', date);
        window.history.pushState(null, "", `?${params.toString()}`);
    };
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px 0" }}>
                <div className='flex justify-start items-center  gap-5'>
                    <button onClick={() => navigate(-1)} className='p-2 bg-white rounded-md'>
                        <FaArrowLeft />
                    </button>
                    <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>Subscription Income Details</h1>
                </div>
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
                    <div
                        style={{
                            height: "40px",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0px 18px",
                            color: "#8B8B8B",
                            background: '#fefefe',
                        }}
                    >
                        <Dropdown menu={{ items, onClick }} >
                            <p
                                style={{
                                    cursor: "pointer",
                                    color: '#717171',
                                    borderRadius: "4px",
                                }}
                                onClick={(e) => e.preventDefault()}
                            >
                                {category}
                                <DownOutlined style={{ paddingLeft: "18px" }} color='#717171' />
                            </p>
                        </Dropdown>
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
        </div>
    )
}

export default SubscriptionIncome